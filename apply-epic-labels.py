#!/usr/bin/env python3
"""
Script to apply epic labels to GitHub issues using the GitHub API.

Requirements:
    pip install requests

Usage:
    export GITHUB_TOKEN=your_github_personal_access_token
    python apply-epic-labels.py
"""

import json
import os
import sys
import requests
from urllib.parse import quote

# Configuration
REPO_OWNER = "AnnaSG27"
REPO_NAME = "Gol90Store_Ecommerce"
GITHUB_TOKEN = os.environ.get("GITHUB_TOKEN")

if not GITHUB_TOKEN:
    print("Error: GITHUB_TOKEN environment variable not set")
    print("Please set it with: export GITHUB_TOKEN=your_token")
    sys.exit(1)

# API headers
headers = {
    "Authorization": f"token {GITHUB_TOKEN}",
    "Accept": "application/vnd.github.v3+json"
}

# Epic label definitions
EPIC_LABELS = {
    "Épica 1": {
        "color": "d73a4a",
        "description": "Autenticación y Configuración Básica"
    },
    "Épica 2": {
        "color": "0075ca",
        "description": "Gestión de Tienda"
    },
    "Épica 3": {
        "color": "cfd3d7",
        "description": "Gestión de Productos"
    },
    "Épica 4": {
        "color": "a2eeef",
        "description": "Gestión de Pedidos"
    },
    "Épica 5": {
        "color": "7057ff",
        "description": "Gestión de Pagos"
    },
    "Épica 6": {
        "color": "008672",
        "description": "Marketplace"
    },
    "Épica 7": {
        "color": "e4e669",
        "description": "Administración"
    },
    "Épica 8": {
        "color": "d876e3",
        "description": "Infraestructura"
    }
}

# Load epic mapping
with open("epic-mapping.json", "r") as f:
    epic_mapping = json.load(f)


def create_label(name, color, description):
    """Create a label in the repository."""
    url = f"https://api.github.com/repos/{REPO_OWNER}/{REPO_NAME}/labels"
    data = {
        "name": name,
        "color": color,
        "description": description
    }
    response = requests.post(url, headers=headers, json=data)
    
    if response.status_code == 201:
        print(f"✓ Created label: {name}")
        return True
    elif response.status_code == 422:
        # Label already exists, try to update it
        encoded_name = quote(name, safe='')
        update_url = f"{url}/{encoded_name}"
        response = requests.patch(update_url, headers=headers, json=data)
        if response.status_code == 200:
            print(f"✓ Updated label: {name}")
            return True
    
    print(f"✗ Failed to create/update label {name}: {response.status_code}")
    return False


def add_label_to_issue(issue_number, label):
    """Add a label to an issue."""
    url = f"https://api.github.com/repos/{REPO_OWNER}/{REPO_NAME}/issues/{issue_number}/labels"
    data = {"labels": [label]}
    response = requests.post(url, headers=headers, json=data)
    
    if response.status_code == 200:
        print(f"  ✓ Added '{label}' to issue #{issue_number}")
        return True
    else:
        print(f"  ✗ Failed to label issue #{issue_number}: {response.status_code}")
        return False


def main():
    print("=" * 60)
    print("Epic Label Application Script")
    print(f"Repository: {REPO_OWNER}/{REPO_NAME}")
    print("=" * 60)
    print()
    
    # Step 1: Create labels
    print("Step 1: Creating epic labels...")
    print("-" * 60)
    for label_name, label_info in EPIC_LABELS.items():
        create_label(label_name, label_info["color"], label_info["description"])
    print()
    
    # Step 2: Apply labels to issues
    print("Step 2: Applying labels to issues...")
    print("-" * 60)
    
    success_count = 0
    fail_count = 0
    
    for epic in epic_mapping["epics"]:
        epic_name = epic["name"]
        issue_numbers = epic["issues"]
        
        print(f"\n{epic_name}:")
        for issue_num in issue_numbers:
            if add_label_to_issue(issue_num, epic_name):
                success_count += 1
            else:
                fail_count += 1
    
    print()
    print("=" * 60)
    print("Summary:")
    print(f"  ✓ Successfully labeled: {success_count} issues")
    print(f"  ✗ Failed: {fail_count} issues")
    print("=" * 60)
    print()
    print("To view issues by epic:")
    for epic_name in EPIC_LABELS.keys():
        print(f"  {epic_name}:")
        print(f"    https://github.com/{REPO_OWNER}/{REPO_NAME}/issues?q=label%3A%22{epic_name.replace(' ', '+')}%22")


if __name__ == "__main__":
    main()
