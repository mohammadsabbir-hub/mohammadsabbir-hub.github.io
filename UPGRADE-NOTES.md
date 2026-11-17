# Portfolio 2.0 — Upgrade notes

## Rebuild summary

- Repositioned the portfolio as **Independent Data Entry Agent & Digital Builder**.
- Added two distinct service tracks: e-commerce/data operations at $3.99/hour and digital portfolio + custom CMS packages from $69, with a $99 standard package.
- Added the client-first briefing → demonstration/training → one free sample task → review → paid collaboration workflow.
- Replaced the previous visual shell with a premium dark editorial design, electric-lime accent, responsive layouts and scroll-reveal interactions.
- Added motion-reduction support, mobile navigation, semantic section structure and SEO/social metadata.
- Corrected project identity: ABLEHARBOR is the live project at https://ableharbor.github.io/.
- Rebuilt the CMS interface around the website's actual content sections and service model.
- Added draft preview, local draft saving, JSON backup export, profile image replacement and custom static page management.
- Reworked CMS publishing to create one atomic Git commit through the Git Data API.
- Prepared Cloudflare Pages Git integration deployment with a dependency-free Node build script.
- Added security-oriented response headers and no-cache behavior for the CMS.

## Important deployment note

The source package is prepared for Cloudflare Pages. The live Cloudflare project, GitHub repository, DNS and production domain have not been changed by this local rebuild. The owner must connect the repository to Cloudflare Pages, set `npm run build` and `dist`, and attach the custom domain. CMS publishing must then be tested with the owner's own fine-grained GitHub token.
