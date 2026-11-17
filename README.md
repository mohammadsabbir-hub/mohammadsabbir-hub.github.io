# Sabbir Portfolio 2.0

A premium dark, responsive personal portfolio for Mohammad Sabbir Hossain, paired with a custom browser-based JSON CMS. The website presents two independent service tracks: e-commerce data entry/product content and AI-assisted digital building with custom CMS delivery.

## Hosting architecture

- **Source of truth:** GitHub repository `mohammadsabbir-hub.github.io`.
- **Static hosting:** Cloudflare Pages (Free plan).
- **Build:** `npm run build` (no third-party dependencies); output directory `dist`.
- **CMS:** `/admin/`, a static browser application that publishes content through the GitHub Git Data API.
- **Deployment:** Connect the GitHub repository to Cloudflare Pages using Git integration. Every pushed commit triggers a new build and deployment.
- **Content:** JSON files under `content/`; profile image under `assets/`.

## Cloudflare Pages setup

1. In Cloudflare, open **Workers & Pages → Create → Pages → Connect to Git**.
2. Connect GitHub and select `mohammadsabbir-hub/mohammadsabbir-hub.github.io`.
3. Set production branch to `main`.
4. Set build command to `npm run build` and build output directory to `dist`.
5. Save and deploy. Cloudflare will build and host the generated static site.
6. In the Pages project, add `sabbir.dpdns.org` as a custom domain. Complete the DNS validation Cloudflare requests. The domain's DNS zone must be managed/delegated to Cloudflare for the standard Pages custom-domain flow.

Cloudflare Pages Free currently has documented limits, including up to 500 builds per month, one concurrent build, 20,000 files per site and 25 MiB per individual asset. Check Cloudflare's current limits before accepting unusually high-traffic or asset-heavy client projects.

## CMS access and publishing

Open `https://sabbir.dpdns.org/admin/` after Cloudflare Pages and the custom domain are configured.

- Edit profile, hero, about, services, prices, client workflow, experience, projects, skills, education, contact, navigation, theme and section visibility.
- Create and manage additional static pages.
- Save drafts locally in the current browser.
- Preview drafts without publishing using the **Preview draft** control.
- Export a JSON content backup.
- Publish with a fine-grained GitHub personal access token restricted to this repository and **Contents: Read and write** permission.
- The token is held in memory only and cleared after publishing. It is not written to local storage or committed.
- Publishing creates one Git commit containing all content changes (and an optional profile image update), reducing unnecessary deployment builds.

## Local build and verification

Requirements: Node.js 20 or newer.

```bash
npm run build
```

The generated static site is written to `dist/`. No package installation is required.

## Pricing and service positioning

The public content currently presents data entry at **$3.99/hour** and a portfolio + custom CMS standard package at **$99 one-time**, with a simpler starter scope from $69. These are editable in the CMS. The $99 package should remain scope-defined; domains, email services, paid integrations, custom backend features and work outside the included scope are not included by default.

## Security and operating notes

- This is a static CMS, not a private multi-user database application. Anyone with the admin URL can open the CMS interface, but publishing requires a repository-scoped GitHub token.
- Never paste a token into repository files or share it. Use a fine-grained token restricted to this repository, with only Contents read/write access. Revoke the token if exposed.
- The CMS token is sent to GitHub's API from the browser only when you publish.
- Keep the GitHub repository private if source visibility is not desired; verify that the chosen GitHub plan and Cloudflare integration support your intended repository configuration.
- No recurring Cloudflare Pages or CMS subscription is required within free-tier limits. A custom domain, email service, paid integrations or usage beyond free limits may still incur costs.
