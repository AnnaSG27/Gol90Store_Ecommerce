#!/bin/bash

# Script to apply epic labels to GitHub issues
# This script requires GitHub CLI (gh) to be installed and authenticated
# Usage: ./apply-epic-labels.sh

set -e

REPO="AnnaSG27/Gol90Store_Ecommerce"

echo "Creating epic labels if they don't exist..."

# Define colors for each epic
declare -A EPIC_COLORS=(
    ["Épica 1"]="d73a4a"
    ["Épica 2"]="0075ca"
    ["Épica 3"]="cfd3d7"
    ["Épica 4"]="a2eeef"
    ["Épica 5"]="7057ff"
    ["Épica 6"]="008672"
    ["Épica 7"]="e4e669"
    ["Épica 8"]="d876e3"
)

# Create labels
for epic in "${!EPIC_COLORS[@]}"; do
    echo "Creating label: $epic"
    if gh label create "$epic" \
        --repo "$REPO" \
        --color "${EPIC_COLORS[$epic]}" \
        --description "Issues belonging to $epic" 2>/dev/null; then
        echo "  ✓ Created new label: $epic"
    else
        # Label exists, try to update it
        if gh label edit "$epic" \
            --repo "$REPO" \
            --color "${EPIC_COLORS[$epic]}" \
            --description "Issues belonging to $epic" 2>/dev/null; then
            echo "  ✓ Updated existing label: $epic"
        else
            echo "  ℹ Label '$epic' already exists (no changes needed)"
        fi
    fi
done

echo ""
echo "Applying labels to issues..."

# Apply labels based on epic-mapping.json
declare -A EPIC_ISSUES=(
    ["Épica 1"]="1 2 3 6 8 9 10"
    ["Épica 2"]="4 15 18 33"
    ["Épica 3"]="5 7 11 13 16 19 34"
    ["Épica 4"]="12 20 21 22"
    ["Épica 5"]="23 24 25"
    ["Épica 6"]="26 27 28"
    ["Épica 7"]="29 30 31"
    ["Épica 8"]="14 17 32"
)

for epic in "${!EPIC_ISSUES[@]}"; do
    echo "Processing $epic..."
    for issue in ${EPIC_ISSUES[$epic]}; do
        echo "  Adding '$epic' label to issue #$issue"
        gh issue edit "$issue" \
            --repo "$REPO" \
            --add-label "$epic" 2>/dev/null || echo "  Failed to label issue #$issue"
    done
done

echo ""
echo "✅ Epic labels have been applied!"
echo ""
echo "Summary:"
echo "- 8 epic labels created"
echo "- 34 issues labeled"
echo ""
echo "To view issues by epic, use:"
echo "  gh issue list --repo $REPO --label 'Épica 1'"
