# Zhirui Xia Personal Website

Personal website of Zhirui Xia, focused on AI/ML systems, research, publications, and selected personal interests.

Live site:

`https://raymondxzr.github.io/`

Repository:

`https://github.com/Raymondxzr/Raymondxzr.github.io`

## Site variants

This repository keeps two complete static website variants:

- `sites/classic/`: the original warm editorial portfolio.
- `sites/homepage-template/`: a second version adapted from `yizhixuanzhu/homepage-template`, filled with Zhirui Xia's profile, experience, education, publications, and life content.

The repository root contains the currently published GitHub Pages version. Switch the root version with:

```sh
./scripts/switch-site.sh classic
./scripts/switch-site.sh homepage-template
```

The script copies the selected site from `sites/<name>/` into the repository root and writes the active name to `.site-active`.

## Structure

- `sites/`: source copies for each website variant
- `scripts/switch-site.sh`: activates one variant at the repository root
- `index.html` and related root files: currently published static site
- `Zhirui_Xia_AIML_Resume.pdf`: shared resume asset

## Notes

- The site is fully static and does not require a build step.
- The local `mysite/` virtual environment is excluded from version control.
- Share previews are driven by `favicon.svg` and `social-preview.svg`.
