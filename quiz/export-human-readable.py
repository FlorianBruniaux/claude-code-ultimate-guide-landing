#!/usr/bin/env python3
"""
Export questions.json to human-readable YAML format.
Optimized for manual review with clear visual separators.
"""

import json
from pathlib import Path

def main():
    repo_root = Path(__file__).parent.parent
    questions_file = repo_root / "questions.json"
    output_file = repo_root / "quiz" / "questions-human-readable.yaml"

    with open(questions_file, 'r', encoding='utf-8') as f:
        data = json.load(f)

    # Build category map
    categories = {cat['id']: cat['name'] for cat in data.get('categories', [])}

    # Group questions by category
    questions_by_category = {}
    for q in data.get('questions', []):
        cat_id = q.get('category_id', 0)
        cat_name = categories.get(cat_id, 'Unknown')
        if cat_name not in questions_by_category:
            questions_by_category[cat_name] = []
        questions_by_category[cat_name].append(q)

    with open(output_file, 'w', encoding='utf-8') as out:
        out.write("# ═══════════════════════════════════════════════════════════════\n")
        out.write("# Claude Code Quiz - Human-Readable Format\n")
        out.write("# ═══════════════════════════════════════════════════════════════\n\n")
        out.write(f"Total Questions: {len(data.get('questions', []))}\n")
        out.write(f"Categories: {len(categories)}\n\n")

        # Table of contents
        out.write("## Table of Contents\n\n")
        for cat_name, questions in sorted(questions_by_category.items()):
            out.write(f"  {cat_name}: {len(questions)} questions\n")
        out.write("\n" + "═" * 70 + "\n\n")

        # Questions by category
        for cat_name, questions in sorted(questions_by_category.items()):
            out.write(f"\n{'#' * 70}\n")
            out.write(f"# CATEGORY: {cat_name.upper()}\n")
            out.write(f"# {len(questions)} questions\n")
            out.write(f"{'#' * 70}\n\n")

            for q in questions:
                qid = q.get('id', 'unknown')
                difficulty = q.get('difficulty', 'unknown')
                question_text = q.get('question', '')
                options = q.get('options', {})
                correct_answer = q.get('correct', 'unknown')
                explanation = q.get('explanation', '')
                official_doc = q.get('official_doc', None)

                # Question header
                out.write(f"┌─────────────────────────────────────────────────────────────┐\n")
                out.write(f"│ ID: {qid:<15} Difficulty: {difficulty:<20} │\n")
                out.write(f"└─────────────────────────────────────────────────────────────┘\n\n")

                # Question text
                out.write(f"QUESTION:\n")
                for line in question_text.split('\n'):
                    out.write(f"  {line}\n")
                out.write("\n")

                # Options
                out.write(f"OPTIONS:\n")
                for key in sorted(options.keys()):
                    is_correct = (key == correct_answer)
                    marker = " ← ✓ CORRECT" if is_correct else ""
                    opt_text = options[key]

                    out.write(f"  [{key.upper()}] {opt_text}{marker}\n")
                out.write("\n")

                # Correct answer
                out.write(f"ANSWER: {correct_answer.upper()}\n\n")

                # Explanation
                out.write(f"EXPLANATION:\n")
                for line in explanation.split('\n'):
                    out.write(f"  {line}\n")
                out.write("\n")

                # Official doc link
                if official_doc:
                    out.write(f"OFFICIAL DOC: {official_doc}\n\n")

                out.write("─" * 65 + "\n\n")

    print(f"✅ Exported {len(data.get('questions', []))} questions")
    print(f"📁 Output: {output_file}")
    print(f"📊 Categories: {len(categories)}")
    print(f"\nCategories breakdown:")
    for cat_name, questions in sorted(questions_by_category.items()):
        print(f"  • {cat_name}: {len(questions)} questions")

if __name__ == "__main__":
    main()
