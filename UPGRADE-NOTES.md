# CMS upgrade notes

## What changed

- Kept the original dark portfolio theme and all original CV/project/profile content.
- Added `content/home.json`, `content/navigation.json`, `content/schema.json` and the page manifest under `content/pages/`.
- Expanded the CMS with homepage content editing, global navigation editing, global theme tokens, and slug-based page creation/editing/deletion.
- Added structured page blocks: hero, text, feature grid, testimonials and CTA.
- Added validation for page slugs, supported block types, required block fields and theme colour values.
- Added a GitHub Actions static build/deploy workflow and a no-dependency Node build script. The build creates one static `/<slug>/index.html` route per page manifest entry.
- Retained `content/site.json` as a legacy fallback. Existing local drafts under `sabbirPortfolioDraft` are migrated into the new CMS draft key on first load.

## Files that changed

- `index.html` — retained the same visual shell and loaded root-relative static assets.
- `assets/site.js` — data-driven homepage/custom-page renderer; no CSS redesign.
- `assets/site.css` — only footer navigation styling appended; original theme rules retained.
- `admin/index.html`, `admin/admin.js`, `admin/admin.css` — CMS interface and GitHub publishing.
- `content/home.json`, `content/navigation.json`, `content/schema.json`, `content/pages/index.json` — structured content.
- `scripts/build.mjs`, `.github/workflows/deploy.yml` — static page generation and GitHub Pages deployment.

## Deploy

1. Back up the existing GitHub repository.
2. Replace the repository contents with the source package, keeping the repository name `mohammadsabbir-hub.github.io` and default branch `main`.
3. In **Settings → Pages**, choose **GitHub Actions** as the source.
4. Push to `main` or manually run **Build and deploy portfolio** in the Actions tab.
5. Open `/admin/`. Publish using a fine-grained token restricted to this repository with Contents read/write access.

## Validation performed

- JSON files parse successfully.
- JavaScript syntax checks pass for the renderer, CMS and build script.
- Static build succeeds with the current zero-custom-page manifest.
- A test slug page was generated from the manifest, and a subsequent build omitted it after removal from the manifest.
- Homepage renderer smoke test confirms original hero, section headings, navigation and footer render from JSON.
- Custom slug renderer smoke test confirms a custom page loads its configured hero block.

GitHub API publishing and the hosted GitHub Actions deployment have not been executed because they require the owner's repository credentials and an explicit push. The ZIP is a prepared source package, not a claim that the live repository has already been changed.
