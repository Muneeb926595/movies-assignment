#!/bin/bash

# Helper script to encode files for GitHub Secrets
# Usage: ./scripts/setup-secrets.sh [file_path] [secret_name]

set -e

if [ -z "$1" ] || [ -z "$2" ]; then
    echo "Usage: $0 <file_path> <secret_name>"
    echo ""
    echo "Example:"
    echo "  $0 android/my-release-key.keystore ANDROID_KEYSTORE_BASE64"
    echo ""
    echo "This will output the base64-encoded content ready to paste into GitHub Secrets."
    exit 1
fi

FILE_PATH=$1
SECRET_NAME=$2

if [ ! -f "$FILE_PATH" ]; then
    echo "Error: File not found: $FILE_PATH"
    exit 1
fi

echo "Encoding $FILE_PATH for GitHub Secret: $SECRET_NAME"
echo ""
echo "Copy the following and paste it into GitHub Secrets:"
echo "---"
base64 -i "$FILE_PATH"
echo "---"
echo ""
echo "To add this secret to GitHub:"
echo "1. Go to your repository Settings > Secrets and variables > Actions"
echo "2. Click 'New repository secret'"
echo "3. Name: $SECRET_NAME"
echo "4. Value: (paste the base64 output above)"
echo "5. Click 'Add secret'"
