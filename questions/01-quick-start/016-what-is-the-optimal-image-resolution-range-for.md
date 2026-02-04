---
id: 01-016
category_id: 1
difficulty: intermediate
profiles:
- senior
- power
correct: b
options:
  a: 50-200px (smallest possible)
  b: 200-1568px (sweet spot for quality/token balance)
  c: 2000-4000px (maximum detail)
  d: 8000px+ (highest resolution)
doc_reference:
  file: guide/ultimate-guide.md
  section: 1.3 Essential Commands
  anchor: '#image-resolution-guidelines'
---

What is the optimal image resolution range for Claude Code visual analysis?

---

The optimal range is 200-1568px. Below 200px lacks detail, 200-1000px is the sweet spot for wireframes, 1000-1568px provides optimal quality/token balance, images above 1568px are auto-downscaled (wasting upload time), and images over 8000px are rejected by the API.
