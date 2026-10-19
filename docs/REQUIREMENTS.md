# Portfolio requirements

Product spec for **nafim.dev**, the personal portfolio of S M Nafim Niloy.
Design rules live in [`DESIGN.md`](../DESIGN.md); page layouts in [`WIREFRAME.md`](WIREFRAME.md).

## 1. Goal

Give recruiters, supervisors and collaborators a quick, credible picture of Nafim's research and
engineering work, and an easy way to get in touch. The owner should be able to update everything
by editing plain text files and pushing to GitHub.

## 2. Audience

| Who | What they need |
|---|---|
| Recruiters / hiring managers | Role fit in 30 seconds: subtitle, skills, featured projects, resume link |
| Professors / research supervisors | Research topics, thesis, publications with status and venue |
| Collaborators / peers | Live demos, GitHub repos, blog posts, contact |

## 3. Functional requirements

### Home page (`/`)
- **F1 Hero:** name, subtitle, bio, availability line, location, email, stats (papers, projects, repos),
  buttons for Projects, GitHub, LinkedIn. Optional headshot (illustrated avatar, shown uncropped).
  The papers stat counts only real papers (see F4) unless a number is typed in `profile.js`.
- **F2 Interests marquee:** endless scrolling strip of research interests from `content/profile.js`.
- **F3 Sections:** Video resume, Education, Research & publications, Projects, Code (GitHub repos),
  Skills, Volunteering, Contact. Each one can be shown/hidden and reordered in `content/site.js`
  without touching code. Section numbers update automatically.
- **F4 Publications:** title, type (Journal/Conference), venue (optional link), status badge, optional
  DOI link, date and tags. Split into two lists:
  - **Papers:** journal papers that are Accepted or Published, conference papers that are Presented or Published.
  - **In progress:** everything else (Submitted, Under Review, a conference paper accepted but not yet presented).
- **F4a Experience:** jobs/positions (role, organisation, optional link, location, period, "Current" marker,
  optional description, bullet points and tags). The current job feeds the structured-data job title.
- **F4b Education:** a timeline, newest first: stage, period, institution, degree, location, optional grade.
  No narrative text.
- **F4c Research:** thesis/positions with an optional status line (e.g. "Under review at NetMAHIB").
- **F5 Projects:** featured projects shown large; others in a grid. Code link, optional live demo, icon.
- **F6 GitHub repos:** fetched at **build time**, never from the browser. Shows the top N repos
  (by stars, then most recently pushed), hides forks, archived repos and names in `content/github.js`.
  Falls back to a static list if GitHub is unreachable. The repo count in the hero stays in sync.
- **F7 Contact:** heading, short text, email/GitHub/LinkedIn buttons.

### Blog (`/blog`, `/blog/:slug`)
- **F8** Posts are Markdown files in `content/blog/` with frontmatter (title, date, cover, tags, excerpt, draft).
- **F9** The slug comes from the file name (`YYYY-MM-DD-slug.md` → `/blog/slug`). Files starting with `_` are ignored.
- **F10** `draft: true` posts appear in `npm run dev` only, never in production.
- **F11** Each post gets its own static HTML page with its own title/description/canonical URL for link previews.
- **F12** The blog can be turned off entirely with `site.showBlog = false`.

### Global
- **F13** Sticky header with section links (from `site.js`), Blog link, Resume button and a mobile menu.
- **F14** 404 page for unknown routes.
- **F15** No dark mode and no theme toggle.

## 4. Content management

- **C1** All editable content lives in `content/`, one file per topic. Components contain no personal data.
- **C2** Every content file starts with a comment explaining its fields.
- **C3** A blog template (`content/blog/_TEMPLATE.md`) shows every Markdown feature.
- **C4** `tools/optimize_images.py` converts large photos to WebP (max 1600px, ~82 quality, strips EXIF/GPS).

## 5. Hosting & automation (GitHub Actions)

Everything runs in `.github/workflows/deploy.yml`. Nothing is built or uploaded by hand.

| Trigger | What happens |
|---|---|
| Push to `main` | lint → DESIGN.md lint → image size check → build → deploy to GitHub Pages |
| Pull request | Same checks and build. Nothing is deployed. |
| Daily 03:00 UTC | Rebuild + deploy so the GitHub repos section stays fresh |
| Manual | "Run workflow" button in the Actions tab |

- **H1** Custom domain `nafim.dev` via `public/CNAME`.
- **H2** Static routes (`/blog`, `/blog/<slug>`), `404.html` and `sitemap.xml` are generated after every build.
- **H3** No secrets are needed. The built-in `GITHUB_TOKEN` is used only at build time and is never
  included in the published JavaScript.
- **H4** A failing lint or build blocks the deploy, so the live site is never broken.
- **H5** Large images produce a warning in the Actions run; they don't fail the build.

## 6. Non-functional requirements

- **N1 Performance:** JS ≤ ~130 KB gzip; fonts self-hosted (no third-party font requests); images ≤ 500 KB.
- **N2 Accessibility:** WCAG AA contrast (checked by `designmd lint`); visible focus rings; semantic
  headings; `aria-label`s on icon-only links; every loop stops under `prefers-reduced-motion`.
- **N3 Responsive:** works from 360px phones to wide desktops, with no horizontal scroll.
- **N4 SEO:** every page prerendered to static HTML; per-page title, description, canonical, Open Graph/X
  cards and 1200×630 share image; schema.org JSON-LD (Person, WebSite, ProfilePage, ScholarlyArticle,
  Blog, BlogPosting, BreadcrumbList) generated from `content/`; sitemap with images; RSS feed;
  404 marked `noindex`; Search Console verification codes configurable in `content/site.js`;
  IndexNow ping after each push.
- **N4a Redirects:** http→https and www→apex (GitHub Pages, 301); missing trailing slash → slash (301);
  `/index.html` tidied client-side; wrong-case paths lowercased on the 404 page; `site.redirects` generates
  instant meta-refresh + canonical redirect pages (noindex, not in the sitemap) for renamed pages and short
  links (`/resume`, `/cv`, `/github`, `/linkedin`); a redirect may never overwrite a real page.
- **N4b AI-friendliness:** `llms.txt` and `llms-full.txt` generated from content; `robots.txt` explicitly
  allows AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended…); all text readable without JS.
- **N5 Maintainability:** ESLint passes; one CSS file per concern under `src/styles/`; tokens in `tokens.css` match `DESIGN.md`.
- **N5b Anti-spam:** the email address never appears in plain text in published files. It's base64-encoded
  in the JS bundle, shown only after hydration (`ProtectedEmail`), obfuscated as "(at)/(dot)" in `llms.txt`,
  and left out of JSON-LD and RSS. The build fails if the plain address is found in `dist/`.
- **N6 Privacy:** no analytics or tracking; the YouTube embed uses `youtube-nocookie.com` and loads only on click.

## 7. Motion

| Animation | Type | Duration |
|---|---|---|
| Interests marquee | loop | 40s linear, pauses on hover |
| Rotating "open to opportunities" badge | loop | 22s linear |
| Education timeline travelling dot | loop | 6s ease-in-out |
| Hero blob | loop | 18s ease-in-out, alternate |
| Availability dot | loop | 2.4s breathe |
| Headshot float | loop | 6s ease-in-out |
| Section reveal | once | 0.7s fade-up |
| Hero text intro | once | 0.6s staggered |
| Stats count-up | once | 1.2s |

## 8. Out of scope

CMS or database, comments, analytics, contact form backend, multi-language, dark mode.
