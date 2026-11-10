# Mohammad Sabbir Hossain — Personal Portfolio + CMS

A static GitHub Pages portfolio with a browser-based JSON CMS. The visual theme remains defined in `assets/site.css`; content is data-driven and stored in `content/`.

## Repository setup

Use the repository named `mohammadsabbir-hub.github.io`. Upload the contents of this project folder to the repository root.

## GitHub Pages deployment

1. Open **Settings → Pages**.
2. Under **Build and deployment → Source**, select **GitHub Actions**.
3. Push the repository to the `main` branch. `.github/workflows/deploy.yml` runs `scripts/build.mjs` and deploys the generated `dist/` directory.
4. Every push to `main`, including CMS JSON changes, triggers a build and deployment. The workflow can also be started manually from the Actions tab.

## CMS

Open `https://mohammadsabbir-hub.github.io/admin/` after deployment.

- **Homepage content:** edit the profile, hero, about, experience, projects, skills, education, contact, section labels and footer.
- **Header & footer navigation:** manage links centrally in `content/navigation.json`.
- **Page manager:** create, edit and delete slug-based pages. Pages use structured content blocks and share the site's global theme.
- **Global theme:** update the existing CSS design tokens without editing CSS.
- **Drafts:** saved in this browser. Export creates a JSON backup.
- **Publishing:** enter a fine-grained GitHub personal access token restricted to this repository, with **Contents: Read and write** permission. The token is held in memory only and cleared after publishing. It is never saved in local storage or committed.
- **Profile photo:** JPG, PNG or WebP up to 5 MB can be uploaded through the CMS.

## Content architecture

- `content/home.json` — homepage content, labels, metadata, section visibility and theme values.
- `content/navigation.json` — global header, footer and CTA links.
- `content/pages/index.json` — manifest of published custom pages.
- `content/pages/<slug>.json` — content blocks and metadata for each custom page.
- `content/site.json` — retained legacy source for backwards compatibility and fallback.

Custom pages support `hero`, `text`, `featureGrid`, `testimonials` and `cta` blocks. They use the same site stylesheet, header, footer and theme tokens. The build script creates `/<slug>/index.html` for each page in the manifest. Deleting a page removes its JSON source and it is omitted from the next generated Pages artifact.

## Security and compatibility

This is a no-backend static CMS. GitHub is the publishing destination; GitHub Actions builds static files for GitHub Pages. Do not paste a token into repository files or share it. Revoke exposed tokens in GitHub settings. The CMS requires a browser with JavaScript and network access to GitHub's API.

The original homepage content and theme values are retained. The renderer now reads content from `home.json`; `site.json` remains available as a legacy fallback. Existing sections and project data have been migrated without changing their wording or design tokens.
