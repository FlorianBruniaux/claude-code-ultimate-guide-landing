#!/usr/bin/env python3
"""
One-time migration script: questions.json → 256 Markdown files + frontmatter

Crée:
- questions/_categories.yaml
- questions/{XX-slug}/YYY-question-slug.md (256 fichiers)

Format:
---
id: "01-001"
category_id: 1
difficulty: junior
profiles: [junior, senior, power, pm]
correct: d
options:
  a: "Option A text"
  b: "Option B text"
  c: "Option C text"
  d: "Option D text"
doc_reference:
  file: "guide/ultimate-guide.md"
  section: "Section Name"
  anchor: "#anchor"
official_doc: "https://..."
---

Question text here

---

Explanation text here
"""

import json
import re
from pathlib import Path
from typing import Dict, List
import yaml


def slugify(text: str, max_length: int = 50) -> str:
    """Convert text to kebab-case slug."""
    # Lowercase + strip
    text = text.lower().strip()
    # Remove special chars
    text = re.sub(r'[^\w\s-]', '', text)
    # Replace spaces/underscores with hyphens
    text = re.sub(r'[\s_]+', '-', text)
    # Remove duplicate hyphens
    text = re.sub(r'-+', '-', text)
    # Trim length
    if len(text) > max_length:
        text = text[:max_length].rsplit('-', 1)[0]
    return text.strip('-')


def extract_category_slug(name: str) -> str:
    """Extract category slug from name."""
    # Remove emoji + leading/trailing spaces
    clean = re.sub(r'[^\w\s-]', '', name).strip()
    return slugify(clean)


def create_categories_yaml(categories: List[Dict], output_path: Path):
    """Create _categories.yaml file."""
    categories_data = []
    for cat in categories:
        slug = extract_category_slug(cat['name'])
        categories_data.append({
            'id': cat['id'],
            'name': cat['name'],
            'slug': slug,
            'emoji': cat.get('emoji', '📚')
        })

    output_path.write_text(yaml.dump(
        categories_data,
        allow_unicode=True,
        sort_keys=False,
        default_flow_style=False
    ))
    print(f"✓ Created {output_path}")


def create_question_file(question: Dict, category_slug: str, output_dir: Path):
    """Create a single Markdown file for a question."""
    q_id = question['id']

    # Extract numeric parts for filename
    cat_num, q_num = q_id.split('-')

    # Create slug from question text (first 50 chars)
    q_text = question['question'].strip()
    q_slug = slugify(q_text)

    # Category directory
    cat_dir = output_dir / f"{cat_num}-{category_slug}"
    cat_dir.mkdir(parents=True, exist_ok=True)

    # Filename: YYY-question-slug.md
    filename = f"{q_num}-{q_slug}.md"
    filepath = cat_dir / filename

    # Build frontmatter
    frontmatter = {
        'id': q_id,
        'category_id': question['category_id'],
        'difficulty': question['difficulty'],
        'profiles': question['profiles'],
        'correct': question['correct'],
        'options': question['options']
    }

    # Optional fields
    if 'doc_reference' in question:
        frontmatter['doc_reference'] = question['doc_reference']
    if 'official_doc' in question:
        frontmatter['official_doc'] = question['official_doc']

    # Build content
    content_parts = [
        '---',
        yaml.dump(frontmatter, allow_unicode=True, sort_keys=False, default_flow_style=False).strip(),
        '---',
        '',
        question['question'].strip(),
        '',
        '---',
        '',
        question['explanation'].strip(),
        ''
    ]

    filepath.write_text('\n'.join(content_parts))
    return filepath


def main():
    """Main migration logic."""
    # Paths
    base_dir = Path(__file__).parent.parent
    questions_json = base_dir / 'questions.json'
    output_dir = base_dir / 'questions'

    # Load questions.json
    print(f"Loading {questions_json}...")
    data = json.loads(questions_json.read_text())

    categories = data['categories']
    questions = data['questions']

    print(f"Found {len(categories)} categories, {len(questions)} questions")

    # Create output directory
    output_dir.mkdir(exist_ok=True)

    # Create _categories.yaml
    categories_yaml = output_dir / '_categories.yaml'
    create_categories_yaml(categories, categories_yaml)

    # Create category slug map
    cat_slug_map = {}
    for cat in categories:
        slug = extract_category_slug(cat['name'])
        cat_slug_map[cat['id']] = slug

    # Create question files
    created_files = []
    for question in questions:
        cat_id = question['category_id']
        cat_slug = cat_slug_map[cat_id]

        filepath = create_question_file(question, cat_slug, output_dir)
        created_files.append(filepath)

    print(f"\n✓ Migration complete!")
    print(f"  - Created {len(created_files)} question files")
    print(f"  - Created 1 categories file")
    print(f"  - Total: {len(created_files) + 1} files")
    print(f"\nNext step: Run build-questions.py to verify round-trip")


if __name__ == '__main__':
    main()
