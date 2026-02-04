#!/usr/bin/env python3
"""
Build script: Compile 256 Markdown files → questions.json

Lit:
- questions/_categories.yaml
- questions/**/*.md

Génère:
- questions.json (format runtime inchangé)

Validations:
- Champs requis
- Options = exactement {a, b, c, d}
- correct ∈ options
- difficulty ∈ {junior, intermediate, senior, power}
- profiles ⊂ {junior, senior, power, pm}
- category_id cohérent avec répertoire parent
- ID unique + format XX-YYY
- Question et explanation non vides
- Gaps dans IDs séquentiels (warning)

Exit code 1 si erreur de validation
"""

import json
import re
import sys
from collections import defaultdict
from pathlib import Path
from typing import Dict, List, Set
import yaml


# Validation enums
VALID_DIFFICULTIES = {'junior', 'intermediate', 'senior', 'power'}
VALID_PROFILES = {'junior', 'senior', 'power', 'pm'}
VALID_OPTIONS = {'a', 'b', 'c', 'd'}


class ValidationError(Exception):
    """Custom validation error."""
    pass


def load_categories(yaml_path: Path) -> List[Dict]:
    """Load categories from _categories.yaml."""
    if not yaml_path.exists():
        raise ValidationError(f"Categories file not found: {yaml_path}")

    categories = yaml.safe_load(yaml_path.read_text())

    # Validate structure
    for cat in categories:
        if 'id' not in cat or 'name' not in cat or 'slug' not in cat:
            raise ValidationError(f"Invalid category structure: {cat}")

    return categories


def parse_frontmatter(content: str) -> tuple[Dict, str]:
    """
    Parse YAML frontmatter and body from Markdown content.

    Format:
    ---
    yaml: here
    ---

    body here

    Returns:
        (frontmatter_dict, body_text)
    """
    lines = content.split('\n')

    # Must start with ---
    if lines[0].strip() != '---':
        raise ValidationError("File must start with YAML frontmatter (---)")

    # Find closing ---
    closing_idx = None
    for idx in range(1, len(lines)):
        if lines[idx].strip() == '---':
            closing_idx = idx
            break

    if closing_idx is None:
        raise ValidationError("Invalid frontmatter structure (missing closing ---)")

    # Extract YAML and body
    yaml_text = '\n'.join(lines[1:closing_idx])
    body_text = '\n'.join(lines[closing_idx + 1:])

    try:
        frontmatter = yaml.safe_load(yaml_text)
    except yaml.YAMLError as e:
        raise ValidationError(f"Invalid YAML frontmatter: {e}")

    return frontmatter, body_text


def split_body(body: str) -> tuple[str, str]:
    """
    Split body into question and explanation at first --- (outside code blocks).

    The body text comes AFTER the frontmatter, so we don't need to worry about
    the frontmatter's closing ---.

    Returns:
        (question_text, explanation_text)
    """
    lines = body.split('\n')
    in_code_block = False
    separator_idx = None

    for idx, line in enumerate(lines):
        # Toggle code block state
        if line.strip().startswith('```'):
            in_code_block = not in_code_block
            continue

        # Look for --- outside code blocks
        if not in_code_block and line.strip() == '---':
            separator_idx = idx
            break

    if separator_idx is None:
        raise ValidationError("Body must contain --- separator between question and explanation")

    question = '\n'.join(lines[:separator_idx]).strip()
    explanation = '\n'.join(lines[separator_idx + 1:]).strip()

    return question, explanation


def validate_frontmatter(fm: Dict, filepath: Path, category_slug_map: Dict[int, str]):
    """Validate frontmatter structure and values."""
    # Required fields
    required = ['id', 'category_id', 'difficulty', 'profiles', 'correct', 'options']
    for field in required:
        if field not in fm:
            raise ValidationError(f"Missing required field: {field}")

    # ID format: XX-YYY
    if not re.match(r'^\d{2}-\d{3}$', fm['id']):
        raise ValidationError(f"Invalid ID format (expected XX-YYY): {fm['id']}")

    # Options = exactly {a, b, c, d}
    options_keys = set(fm['options'].keys())
    if options_keys != VALID_OPTIONS:
        raise ValidationError(f"Options must be {{a, b, c, d}}, got: {options_keys}")

    # correct ∈ options
    if fm['correct'] not in fm['options']:
        raise ValidationError(f"correct={fm['correct']} not in options: {options_keys}")

    # difficulty enum
    if fm['difficulty'] not in VALID_DIFFICULTIES:
        raise ValidationError(f"Invalid difficulty: {fm['difficulty']} (valid: {VALID_DIFFICULTIES})")

    # profiles subset
    profiles_set = set(fm['profiles'])
    if not profiles_set.issubset(VALID_PROFILES):
        raise ValidationError(f"Invalid profiles: {profiles_set} (valid: {VALID_PROFILES})")

    # category_id coherent with directory
    cat_id = fm['category_id']
    if cat_id not in category_slug_map:
        raise ValidationError(f"Unknown category_id: {cat_id}")

    expected_slug = category_slug_map[cat_id]
    parent_dir = filepath.parent.name

    # Parent dir format: XX-slug
    if not parent_dir.startswith(f"{cat_id:02d}-"):
        raise ValidationError(
            f"category_id={cat_id} inconsistent with directory: {parent_dir} (expected: {cat_id:02d}-{expected_slug})"
        )


def validate_body(question: str, explanation: str):
    """Validate question and explanation are non-empty."""
    if not question or not question.strip():
        raise ValidationError("Question text cannot be empty")
    if not explanation or not explanation.strip():
        raise ValidationError("Explanation text cannot be empty")


def check_id_gaps(questions: List[Dict]):
    """Check for gaps in sequential IDs (warning only)."""
    # Group by category
    by_category = defaultdict(list)
    for q in questions:
        cat_num = int(q['id'].split('-')[0])
        q_num = int(q['id'].split('-')[1])
        by_category[cat_num].append(q_num)

    # Check each category
    for cat_num, q_nums in sorted(by_category.items()):
        q_nums_sorted = sorted(q_nums)
        expected = list(range(1, len(q_nums_sorted) + 1))

        if q_nums_sorted != expected:
            print(f"⚠️  WARNING: ID gaps in category {cat_num:02d}")
            print(f"   Expected: {expected}")
            print(f"   Got:      {q_nums_sorted}")


def build_questions(questions_dir: Path) -> Dict:
    """Build questions.json from Markdown files."""
    # Load categories
    categories_yaml = questions_dir / '_categories.yaml'
    categories = load_categories(categories_yaml)

    # Build category slug map
    category_slug_map = {cat['id']: cat['slug'] for cat in categories}

    # Find all .md files
    md_files = sorted(questions_dir.glob('*/*.md'))
    if not md_files:
        raise ValidationError(f"No .md files found in {questions_dir}")

    print(f"Found {len(md_files)} question files")

    # Parse and validate all questions
    questions = []
    seen_ids: Set[str] = set()

    for filepath in md_files:
        try:
            content = filepath.read_text()

            # Parse frontmatter + body
            frontmatter, body = parse_frontmatter(content)

            # Split body
            question_text, explanation_text = split_body(body)

            # Validate
            validate_frontmatter(frontmatter, filepath, category_slug_map)
            validate_body(question_text, explanation_text)

            # Check ID uniqueness
            q_id = frontmatter['id']
            if q_id in seen_ids:
                raise ValidationError(f"Duplicate ID: {q_id}")
            seen_ids.add(q_id)

            # Build question object
            # Note: field order matches original questions.json
            # Note: strip trailing newlines for consistency (original had inconsistent newlines)
            question = {
                'id': q_id,
                'difficulty': frontmatter['difficulty'],
                'profiles': frontmatter['profiles'],
                'category_id': frontmatter['category_id'],
                'question': question_text,
                'options': frontmatter['options'],
                'correct': frontmatter['correct'],
                'explanation': explanation_text
            }

            # Optional fields (must be added in order)
            if 'doc_reference' in frontmatter:
                question['doc_reference'] = frontmatter['doc_reference']
            if 'official_doc' in frontmatter:
                question['official_doc'] = frontmatter['official_doc']

            questions.append(question)

        except ValidationError as e:
            print(f"❌ ERROR in {filepath.relative_to(questions_dir)}: {e}", file=sys.stderr)
            sys.exit(1)
        except Exception as e:
            print(f"❌ UNEXPECTED ERROR in {filepath.relative_to(questions_dir)}: {e}", file=sys.stderr)
            sys.exit(1)

    # Sort questions by ID
    questions.sort(key=lambda q: q['id'])

    # Check for ID gaps (warnings)
    check_id_gaps(questions)

    # Build final structure
    result = {
        'categories': categories,
        'questions': questions
    }

    return result


def main():
    """Main build logic."""
    # Paths
    base_dir = Path(__file__).parent.parent
    questions_dir = base_dir / 'questions'
    output_json = base_dir / 'questions.json'

    print(f"Building questions.json from {questions_dir}...")

    try:
        data = build_questions(questions_dir)

        # Write questions.json
        output_json.write_text(json.dumps(data, indent=2, ensure_ascii=False) + '\n')

        print(f"\n✓ Build successful!")
        print(f"  - {len(data['categories'])} categories")
        print(f"  - {len(data['questions'])} questions")
        print(f"  - Output: {output_json}")

    except ValidationError as e:
        print(f"❌ VALIDATION ERROR: {e}", file=sys.stderr)
        sys.exit(1)
    except Exception as e:
        print(f"❌ UNEXPECTED ERROR: {e}", file=sys.stderr)
        sys.exit(1)


if __name__ == '__main__':
    main()
