/**
 * Glue: fetch a preloaded filesystem, spin up just-bash + the vendored
 * terminal UI, wire input handling. Loaded via dynamic import only when the
 * visitor opens a <details> playground, never on initial page load (the
 * just-bash browser bundle is ~333 KB gzip). Generic over which payload
 * URL and banner text it uses, so the same engine can back several
 * playgrounds (templates, security threat DB, CLI/settings reference)
 * without duplicating the mount logic.
 */
import { Bash } from "just-bash/browser";
import { LiteTerminal } from "./lite-terminal";
import { createInputHandler } from "./input-handler";
import { loadTerminalFs, FALLBACK_PAYLOAD, type TerminalFsPayload } from "./fs-payload";

const THEME = {
  background: "#0d1117",
  foreground: "#e6edf3",
  cursor: "#e6edf3",
  cyan: "#f97316",
  brightCyan: "#fdba74",
  brightBlack: "#8b949e",
};

export interface TerminalHandle {
  insertCommand(command: string): void;
  focus(): void;
  dispose(): void;
}

export interface MountOptions {
  payloadUrl?: string
  banner: string
  fallbackPayload?: TerminalFsPayload
}

export async function mountTerminal(el: HTMLElement, opts: MountOptions): Promise<TerminalHandle> {
  let payload: TerminalFsPayload;
  let reduced = false;
  try {
    payload = await loadTerminalFs({ url: opts.payloadUrl });
  } catch (err) {
    console.warn("[bash-playground] payload unavailable, falling back to reduced mode", err);
    payload = opts.fallbackPayload ?? FALLBACK_PAYLOAD;
    reduced = true;
  }

  const term = new LiteTerminal({ cursorBlink: true, theme: THEME });
  term.open(el);

  const bash = new Bash({ files: payload.files, cwd: payload.cwd });
  const inputHandler = createInputHandler(term, bash);

  requestAnimationFrame(() => {
    term.writeln(`\x1b[1m${opts.banner}\x1b[0m`);
    if (reduced) {
      term.writeln("\x1b[33mReduced mode: the full corpus is unavailable right now.\x1b[0m");
    }
    term.writeln("Type a command, or pick a suggestion above.");
    term.writeln("");
    term.write("$ ");
  });

  return {
    insertCommand: (command: string) => inputHandler.setInitialCommand(command),
    focus: () => term.focus(),
    dispose: () => term.dispose(),
  };
}
