/**
 * Bash-aware input handling: history, tab completion, editing shortcuts,
 * command execution. Forked from just-bash's demo site
 * (examples/website/app/components/terminal-parts/input-handler.ts);
 * see VENDORED.md for the source commit and licensing note.
 *
 * Deviations from upstream:
 *  - No @vercel/analytics `track()` call (this site has its own analytics
 *    story and no reason to phone home to Vercel's).
 *  - No "agent"/"about"/"install"/"github" custom commands: those existed
 *    to power the official demo's AI agent and are out of scope for this
 *    POC (no LLM behind this terminal, by design; see the brainstorming
 *    spec).
 *  - HISTORY_KEY changed to avoid colliding with the upstream demo's own
 *    sessionStorage key if a visitor ever has both open.
 */
import type { Bash } from "just-bash/browser";
import { formatMarkdown } from "./markdown";

const HISTORY_KEY = "cc-guide-bash-playground-history";
const MAX_HISTORY = 100;

type Terminal = {
  write: (data: string) => void;
  writeln: (data: string) => void;
  onData: (callback: (data: string) => void) => void;
};

// Strip ANSI/OSC before echoing untrusted strings (e.g. a command inserted
// via setInitialCommand from a suggestion button); same defense-in-depth
// as LiteTerminal's own OSC 8 URL validation, applied on the input side.
// biome-ignore lint/suspicious/noControlCharactersInRegex: deliberately matching control chars
const STRIP_OSC = /\x1b\][^\x07\x1b]*(?:\x07|\x1b\\)/g;
// biome-ignore lint/suspicious/noControlCharactersInRegex: deliberately matching control chars
const STRIP_CSI = /\x1b\[[\d;?]*[A-Za-z@~]/g;
// biome-ignore lint/suspicious/noControlCharactersInRegex: deliberately matching control chars
const STRIP_ESC_OTHER = /\x1b[@-_]/g;
// biome-ignore lint/suspicious/noControlCharactersInRegex: deliberately matching control chars
const STRIP_C0 = /[\x00-\x08\x0B-\x1F\x7F]/g;

function stripDisplayAnsi(text: string): string {
  return text
    .replace(STRIP_OSC, "")
    .replace(STRIP_CSI, "")
    .replace(STRIP_ESC_OTHER, "")
    .replace(STRIP_C0, "");
}

function findPrevWordBoundary(str: string, pos: number): number {
  if (pos <= 0) return 0;
  let i = pos - 1;
  while (i > 0 && str[i] === " ") i--;
  while (i > 0 && str[i - 1] !== " ") i--;
  return i;
}

function findNextWordBoundary(str: string, pos: number): number {
  const len = str.length;
  if (pos >= len) return len;
  let i = pos;
  while (i < len && str[i] === " ") i++;
  while (i < len && str[i] !== " ") i++;
  return i;
}

function getCompletionContext(cmd: string, cursorPos: number): { prefix: string; wordStart: number } {
  let wordStart = cursorPos;
  while (wordStart > 0 && cmd[wordStart - 1] !== " ") {
    wordStart--;
  }
  return { prefix: cmd.slice(wordStart, cursorPos), wordStart };
}

// Commands for tab completion (first word only). No custom commands here;
// this shell only runs real coreutils against the preloaded templates.
const COMPLETION_COMMANDS = [
  "cat", "ls", "grep", "head", "tail", "wc", "sort", "uniq", "tr", "cut",
  "sed", "awk", "find", "xargs", "tee", "diff", "mkdir", "rm", "cp", "mv",
  "touch", "basename", "dirname", "realpath", "echo", "pwd", "cd", "jq",
  "help", "clear",
];

const colorizeUrls = (text: string) => text.replace(/(https?:\/\/[^\s]+)/g, "\x1b[36m\x1b[4m$1\x1b[0m");

export function createInputHandler(term: Terminal, bash: Bash) {
  const history: string[] = JSON.parse(sessionStorage.getItem(HISTORY_KEY) || "[]");
  let cmd = "";
  let cursorPos = 0;
  let historyIndex = history.length;

  const redrawLine = () => {
    term.write("\r$ " + cmd + "\x1b[K");
    const moveBack = cmd.length - cursorPos;
    if (moveBack > 0) {
      term.write(`\x1b[${moveBack}D`);
    }
  };

  const setCmd = (newCmd: string, newCursorPos?: number) => {
    cmd = newCmd;
    cursorPos = newCursorPos ?? newCmd.length;
    redrawLine();
  };

  const handleTabCompletion = async () => {
    const { prefix, wordStart } = getCompletionContext(cmd, cursorPos);
    if (!prefix) return;

    const isFirstWord = cmd.slice(0, wordStart).trim() === "";

    let candidates: string[];
    if (isFirstWord) {
      candidates = COMPLETION_COMMANDS;
    } else {
      const lsResult = await bash.exec("ls -1");
      candidates = lsResult.stdout
        .split("\n")
        .map((f) => f.trim())
        .filter((f) => f.length > 0);
    }

    const matches = candidates.filter((c) => c.toLowerCase().startsWith(prefix.toLowerCase()));

    if (matches.length === 0) {
      return;
    }

    if (matches.length === 1) {
      const completion = matches[0];
      cmd = cmd.slice(0, wordStart) + completion + cmd.slice(cursorPos);
      cursorPos = wordStart + completion.length;
      redrawLine();
    } else {
      let commonPrefix = matches[0];
      for (const match of matches) {
        let i = 0;
        while (i < commonPrefix.length && i < match.length && commonPrefix[i].toLowerCase() === match[i].toLowerCase()) {
          i++;
        }
        commonPrefix = commonPrefix.slice(0, i);
      }

      if (commonPrefix.length > prefix.length) {
        cmd = cmd.slice(0, wordStart) + commonPrefix + cmd.slice(cursorPos);
        cursorPos = wordStart + commonPrefix.length;
        redrawLine();
      } else {
        term.writeln("");
        term.writeln(matches.join("  "));
        term.write("$ " + cmd);
        const moveBack = cmd.length - cursorPos;
        if (moveBack > 0) {
          term.write(`\x1b[${moveBack}D`);
        }
      }
    }
  };

  const executeCommand = async (command: string) => {
    const trimmed = command.trim();
    if (!trimmed) return;

    history.push(trimmed);
    historyIndex = history.length;
    sessionStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(-MAX_HISTORY)));

    if (trimmed === "clear") {
      term.write("\x1b[2J\x1b[3J\x1b[H");
    } else {
      const result = await bash.exec(trimmed);
      if (result.stdout) {
        term.write(formatMarkdown(colorizeUrls(result.stdout)).replace(/\n/g, "\r\n"));
      }
      if (result.stderr) {
        term.write(result.stderr.replace(/\n/g, "\r\n"));
      }
    }

    cmd = "";
    cursorPos = 0;
    term.write("$ ");
  };

  term.onData(async (e: string) => {
    if (e === "\r") {
      term.writeln("");
      await executeCommand(cmd);
      return;
    }
    if (e === "\t") {
      await handleTabCompletion();
      return;
    }
    if (e === "\x01") {
      cursorPos = 0;
      redrawLine();
      return;
    }
    if (e === "\x05") {
      cursorPos = cmd.length;
      redrawLine();
      return;
    }
    if (e === "\x15") {
      cmd = cmd.slice(cursorPos);
      cursorPos = 0;
      redrawLine();
      return;
    }
    if (e === "\x0b") {
      cmd = cmd.slice(0, cursorPos);
      redrawLine();
      return;
    }
    if (e === "\x17") {
      const newPos = findPrevWordBoundary(cmd, cursorPos);
      cmd = cmd.slice(0, newPos) + cmd.slice(cursorPos);
      cursorPos = newPos;
      redrawLine();
      return;
    }
    if (e === "\x0c") {
      term.write("\x1b[2J\x1b[3J\x1b[H$ " + cmd + "\x1b[K");
      const moveBack = cmd.length - cursorPos;
      if (moveBack > 0) {
        term.write(`\x1b[${moveBack}D`);
      }
      return;
    }
    if (e === "\x1b\x7f") {
      const newPos = findPrevWordBoundary(cmd, cursorPos);
      cmd = cmd.slice(0, newPos) + cmd.slice(cursorPos);
      cursorPos = newPos;
      redrawLine();
      return;
    }
    if (e === "\x1bd") {
      const newPos = findNextWordBoundary(cmd, cursorPos);
      cmd = cmd.slice(0, cursorPos) + cmd.slice(newPos);
      redrawLine();
      return;
    }
    if (e === "\x1b[A") {
      if (historyIndex > 0) {
        historyIndex--;
        setCmd(history[historyIndex]);
      }
      return;
    }
    if (e === "\x1b[B") {
      if (historyIndex < history.length - 1) {
        historyIndex++;
        setCmd(history[historyIndex]);
      } else if (historyIndex === history.length - 1) {
        historyIndex = history.length;
        setCmd("");
      }
      return;
    }
    if (e === "\x1b[D") {
      if (cursorPos > 0) {
        cursorPos--;
        term.write("\x1b[D");
      }
      return;
    }
    if (e === "\x1b[C") {
      if (cursorPos < cmd.length) {
        cursorPos++;
        term.write("\x1b[C");
      }
      return;
    }
    if (e === "\x1b[1;3D" || e === "\x1b[1;5D" || e === "\x1bb") {
      cursorPos = findPrevWordBoundary(cmd, cursorPos);
      redrawLine();
      return;
    }
    if (e === "\x1b[1;3C" || e === "\x1b[1;5C" || e === "\x1bf") {
      cursorPos = findNextWordBoundary(cmd, cursorPos);
      redrawLine();
      return;
    }
    if (e === "\x1b[H" || e === "\x1bOH" || e === "\x1b[1~") {
      cursorPos = 0;
      redrawLine();
      return;
    }
    if (e === "\x1b[F" || e === "\x1bOF" || e === "\x1b[4~") {
      cursorPos = cmd.length;
      redrawLine();
      return;
    }
    if (e === "\x7F" || e === "\b") {
      if (cursorPos > 0) {
        cmd = cmd.slice(0, cursorPos - 1) + cmd.slice(cursorPos);
        cursorPos--;
        redrawLine();
      }
      return;
    }
    if (e === "\x1b[3~") {
      if (cursorPos < cmd.length) {
        cmd = cmd.slice(0, cursorPos) + cmd.slice(cursorPos + 1);
        redrawLine();
      }
      return;
    }
    if (e === "\x03") {
      term.writeln("^C");
      cmd = "";
      cursorPos = 0;
      term.write("$ ");
      return;
    }
    if (e >= " " && e <= "~") {
      cmd = cmd.slice(0, cursorPos) + e + cmd.slice(cursorPos);
      cursorPos++;
      redrawLine();
      return;
    }
  });

  return {
    history,
    setInitialCommand: (initialCmd: string) => {
      cmd = initialCmd;
      cursorPos = initialCmd.length;
      term.write(stripDisplayAnsi(initialCmd));
    },
    executeCommand: async (command: string) => {
      term.write(stripDisplayAnsi(command));
      term.writeln("");
      await executeCommand(command);
    },
  };
}
