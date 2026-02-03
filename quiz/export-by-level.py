#!/usr/bin/env python3
"""
Export questions.json split by difficulty level.
Creates 3 files: junior.yaml, senior.yaml, power.yaml
"""

import json
from pathlib import Path

def format_question(q, categories):
    """Format a single question in human-readable YAML."""
    qid = q.get('id', 'unknown')
    difficulty = q.get('difficulty', 'unknown')
    cat_id = q.get('category_id', 0)
    cat_name = categories.get(cat_id, 'Unknown')
    question_text = q.get('question', '')
    options = q.get('options', {})
    correct_answer = q.get('correct', 'unknown')
    explanation = q.get('explanation', '')
    official_doc = q.get('official_doc', None)

    output = []
    output.append(f"┌─────────────────────────────────────────────────────────────┐\n")
    output.append(f"│ ID: {qid:<15} Category: {cat_name:<25} │\n")
    output.append(f"└─────────────────────────────────────────────────────────────┘\n\n")

    # Question text
    output.append(f"QUESTION:\n")
    for line in question_text.split('\n'):
        output.append(f"  {line}\n")
    output.append("\n")

    # Options
    output.append(f"OPTIONS:\n")
    for key in sorted(options.keys()):
        is_correct = (key == correct_answer)
        marker = " ← ✓ CORRECT" if is_correct else ""
        opt_text = options[key]
        output.append(f"  [{key.upper()}] {opt_text}{marker}\n")
    output.append("\n")

    # Correct answer
    output.append(f"ANSWER: {correct_answer.upper()}\n\n")

    # Explanation
    output.append(f"EXPLANATION:\n")
    for line in explanation.split('\n'):
        output.append(f"  {line}\n")
    output.append("\n")

    # Official doc link
    if official_doc:
        output.append(f"OFFICIAL DOC: {official_doc}\n\n")

    output.append("─" * 65 + "\n\n")

    return ''.join(output)

def main():
    repo_root = Path(__file__).parent.parent
    questions_file = repo_root / "questions.json"
    output_dir = repo_root / "quiz"

    with open(questions_file, 'r', encoding='utf-8') as f:
        data = json.load(f)

    # Build category map
    categories = {cat['id']: cat['name'] for cat in data.get('categories', [])}

    # Group questions by difficulty
    questions_by_level = {
        'junior': [],
        'intermediate': [],
        'senior': [],
        'power': []
    }

    for q in data.get('questions', []):
        difficulty = q.get('difficulty', 'junior')
        if difficulty in questions_by_level:
            questions_by_level[difficulty].append(q)

    # Generate one file per level
    stats = {}
    for level, questions in questions_by_level.items():
        output_file = output_dir / f"questions-{level}.yaml"

        # Group by category for this level
        questions_by_category = {}
        for q in questions:
            cat_id = q.get('category_id', 0)
            cat_name = categories.get(cat_id, 'Unknown')
            if cat_name not in questions_by_category:
                questions_by_category[cat_name] = []
            questions_by_category[cat_name].append(q)

        with open(output_file, 'w', encoding='utf-8') as out:
            # Header
            out.write("# ═══════════════════════════════════════════════════════════════\n")
            out.write(f"# Claude Code Quiz - {level.upper()} Level\n")
            out.write("# ═══════════════════════════════════════════════════════════════\n\n")
            out.write(f"Total Questions: {len(questions)}\n")
            out.write(f"Difficulty: {level}\n")
            out.write(f"Categories: {len(questions_by_category)}\n\n")

            # Table of contents
            out.write("## Table of Contents\n\n")
            for cat_name, cat_questions in sorted(questions_by_category.items()):
                out.write(f"  {cat_name}: {len(cat_questions)} questions\n")
            out.write("\n" + "═" * 70 + "\n\n")

            # Questions by category
            for cat_name, cat_questions in sorted(questions_by_category.items()):
                out.write(f"\n{'#' * 70}\n")
                out.write(f"# CATEGORY: {cat_name.upper()}\n")
                out.write(f"# {len(cat_questions)} questions\n")
                out.write(f"{'#' * 70}\n\n")

                for q in cat_questions:
                    out.write(format_question(q, categories))

        stats[level] = {
            'total': len(questions),
            'categories': len(questions_by_category),
            'file': output_file.name
        }

    # Print summary
    print("✅ Generated files by difficulty level:\n")
    for level in ['junior', 'intermediate', 'senior', 'power']:
        s = stats[level]
        print(f"  📁 {s['file']:<25} {s['total']:>3} questions, {s['categories']:>2} categories")

    print(f"\n📊 Total: {sum(s['total'] for s in stats.values())} questions")

if __name__ == "__main__":
    main()
