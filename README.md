# Mohammad Sabbir Hossain — Personal Portfolio

A static, GitHub Pages portfolio with a browser-based content editor.

## Repository setup

For the root website URL `https://mohammadsabbir-hub.github.io`, create a repository named exactly:

`mohammadsabbir-hub.github.io`

Upload the contents of this folder to the repository root (not the containing folder).

## Enable deployment

1. Open the repository on GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment → Source**, select **GitHub Actions**.
4. Push to the `main` branch. The workflow in `.github/workflows/deploy.yml` will publish the site.

## CMS

Open `/admin/` on the published website.

- Edit the content groups and apply changes.
- Drafts are saved in the current browser.
- Export `site.json` as a backup.
- To publish from the CMS, create a **fine-grained personal access token** restricted to this repository, with **Contents: Read and write** permission. Enter it in the CMS only when publishing. The token is not saved by the editor.
- The CMS commits `content/site.json` and, if selected, `assets/profile.jpg` directly to GitHub.

Never paste a token into a public file, commit it to the repository, or share it with anyone. Revoke it in GitHub settings if it is exposed.

## Editing model

The public site is rendered from `content/site.json`. The CMS provides structured editing for all content groups, including lists such as projects, experience, education, skills and navigation. Theme colours and the profile photo can also be changed.

This is a no-backend static CMS: drafts are local to the browser; GitHub is the publishing destination. A future enhancement can add direct click-to-edit page canvas controls and richer block/layout editing.

## Current content

Initial content is based on the CV information supplied for this portfolio. Review all dates, links, details and wording before publishing. The profile photo is the supplied outdoor portrait.
