#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SITE_NAME="${1:-}"
TARGET_DIR="$ROOT_DIR/sites/$SITE_NAME"

usage() {
  printf 'Usage: %s <classic|homepage-template>\n' "$(basename "$0")" >&2
}

if [[ -z "$SITE_NAME" ]]; then
  usage
  exit 1
fi

if [[ ! -d "$TARGET_DIR" ]]; then
  printf 'Unknown site "%s". Available sites:\n' "$SITE_NAME" >&2
  find "$ROOT_DIR/sites" -mindepth 1 -maxdepth 1 -type d -exec basename {} \; | sort >&2
  exit 1
fi

managed_files=(
  index.html
  experience.html
  skillkit.html
  education.html
  publications.html
  life.html
  projects.html
  highlights.html
  styles.css
  site.js
  script.js
  favicon.svg
  social-preview.svg
  profile_photo.svg
  headshot.jpg
  template-headshot.jpg
  Zhirui_Xia_AIML_Resume.pdf
)

for file in "${managed_files[@]}"; do
  rm -f "$ROOT_DIR/$file"
done

find "$TARGET_DIR" -maxdepth 1 -type f -exec cp {} "$ROOT_DIR/" \;
printf '%s\n' "$SITE_NAME" > "$ROOT_DIR/.site-active"

printf 'Activated site: %s\n' "$SITE_NAME"
