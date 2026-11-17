# Sabbir Portfolio 2.0 — Locked project specification

## Professional positioning

**Mohammad Sabbir Hossain — Independent Data Entry Agent & Digital Builder.**

Primary service: international e-commerce product content, data entry and quality control. Client workflow: client briefing → demonstration and training → one free sample task → client review and approval → paid collaboration.

Secondary service: personal portfolio websites with custom CMS infrastructure, AI-assisted planning/development and a GitHub + Cloudflare delivery model.

## Public pricing

- Data entry and e-commerce operations: **$3.99 USD/hour**.
- Digital portfolio + custom CMS: **$69–$99 USD**, with **$99 USD one-time** as the standard package.
- The $99 package is scope-defined. Additional pages, integrations, backend functionality, paid services and work outside the agreed scope require a separate quote and client approval.
- No mandatory monthly hosting or CMS subscription within the included free-tier architecture. Domain registration/renewal, paid email, third-party integrations and usage beyond provider free limits are excluded.

## Featured project identity

- **ABLEHARBOR — Website and custom CMS ecosystem**
- Live URL: https://ableharbor.github.io/
- The former unrelated project identity has been removed from the redesigned portfolio.

## Visual system

- Premium dark editorial interface.
- Obsidian background, charcoal surfaces, off-white text and electric-lime accent.
- Manrope / DM Sans / DM Mono typography.
- Responsive desktop, tablet and mobile layouts.
- Scroll-reveal, orbital hero detail, hover transitions and mobile navigation.
- Reduced-motion support and no animation dependency for content access.

## CMS scope

Editable through `/admin/`:

- Profile and contact details
- Hero headline, intro and CTA
- About content
- Services, deliverables and pricing
- Client workflow and free-trial explanation
- Experience and recognition
- Projects, links, status, descriptions, features and optional image URLs
- Skills and categories
- Education
- Contact CTA
- Footer and copyright
- Section labels and headings
- SEO title, description and language
- Section visibility
- Theme color tokens
- Header/footer navigation and CTA
- Additional static pages and content blocks
- Profile image upload

The CMS saves drafts locally, previews drafts, exports JSON backups and publishes all content changes in one Git commit. Layout code and security-sensitive publishing logic remain code-controlled.

## Deployment architecture

- GitHub repository is the source of truth.
- Cloudflare Pages is the static host.
- Cloudflare Pages Git integration deploys on commits to `main`.
- Build command: `npm run build`.
- Build output directory: `dist`.
- CMS writes content through a repository-scoped fine-grained GitHub token with Contents read/write permission.
- No application server or database is required for the included static CMS model.

## Acceptance checks

- Build succeeds with Node.js 20+.
- Homepage, CMS, content JSON, assets and 404 output exist.
- CMS fields cover all public content and supported settings.
- Preview does not publish content.
- Publishing creates a single atomic commit.
- GitHub source updates trigger Cloudflare Pages deployment.
- Test mobile navigation, section links, external links, email CTA, reduced motion, SEO metadata and CMS publishing before production handover.
