#!/usr/bin/env python3
"""
Export questions.json to questions-debug.yaml for manual review.
Format: id, difficulty, category, question, options, correct, explanation, doc_reference
"""

import json
import sys
from pathlib import Path

def main():
    repo_root = Path(__file__).parent.parent
    questions_file = repo_root / "questions.json"
    output_file = repo_root / "quiz" / "questions-debug.yaml"

    if not questions_file.exists():
        print(f"Error: {questions_file} not found", file=sys.stderr)
        sys.exit(1)

    with open(questions_file, 'r', encoding='utf-8') as f:
        data = json.load(f)

    # Build category map
    categories = {cat['id']: cat['name'] for cat in data.get('categories', [])}

    questions = data.get('questions', [])

    with open(output_file, 'w', encoding='utf-8') as out:
        out.write("# Claude Code Quiz - Debug Export\n")
        out.write(f"# Total questions: {len(questions)}\n")
        out.write("# Format: id, difficulty, category, question, options, correct, explanation\n\n")
        out.write("questions:\n")

        for q in questions:
            qid = q.get('id', 'unknown')
            difficulty = q.get('difficulty', 'unknown')
            cat_id = q.get('category', 0)
            cat_name = categories.get(cat_id, 'Unknown')
            question_text = q.get('question', '').replace('\n', ' ')
            options = q.get('options', {})
            correct_answer = q.get('correct', 'unknown')
            explanation = q.get('explanation', '').replace('\n', ' ')

            out.write(f"  - id: {qid}\n")
            out.write(f"    difficulty: {difficulty}\n")
            out.write(f"    category: \"{cat_name}\"\n")
            out.write(f"    question: |\n")
            out.write(f"      {question_text}\n")
            out.write(f"    options:\n")

            # Options is a dict like {"a": "text", "b": "text"}
            for key in sorted(options.keys()):
                marker = " [CORRECT]" if key == correct_answer else ""
                opt_text = options[key].replace('\n', ' ')
                out.write(f"      - {key}) {opt_text}{marker}\n")

            out.write(f"    correct: {correct_answer}\n")
            out.write(f"    explanation: |\n")
            out.write(f"      {explanation}\n")
            out.write("\n")

    print(f"✅ Exported {len(questions)} questions to {output_file}")
    print(f"📊 Categories: {len(categories)}")

if __name__ == "__main__":
    main()
