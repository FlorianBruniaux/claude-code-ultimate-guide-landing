#!/bin/bash
# Sync guide-data.js from main guide repository
# Run from landing repo root: ./scripts/sync-guide-data.sh

GUIDE_REPO="../claude-code-ultimate-guide"
OUTPUT="guide-data.js"

# Check guide repo exists
if [ ! -d "$GUIDE_REPO/guide" ]; then
    echo "❌ Guide repo not found at $GUIDE_REPO"
    echo "   Expected structure: ../claude-code-ultimate-guide/guide/"
    exit 1
fi

echo "📖 Scanning guide files..."

# Count sections in each file
total=0
for file in "$GUIDE_REPO"/guide/*.md; do
    count=$(grep -c "^##" "$file" 2>/dev/null || echo 0)
    name=$(basename "$file")
    echo "   $name: $count sections"
    total=$((total + count))
done

echo ""
echo "📊 Total sections found: $total"
echo "📄 Current guide-data.js entries: $(grep -c "id: 'guide-" $OUTPUT 2>/dev/null || echo 0)"
echo ""
echo "⚠️  This script shows what needs syncing."
echo "    Manual update of guide-data.js is required for new sections."
echo ""
echo "🔗 Guide files to check:"
ls -la "$GUIDE_REPO"/guide/*.md | awk '{print "   " $NF}'
