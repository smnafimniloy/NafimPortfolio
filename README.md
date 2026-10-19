# nafim.dev

The personal portfolio of **S M Nafim Niloy**: research, projects, code and writing.
Live at **[nafim.dev](https://nafim.dev)**.

Built with React + Vite. Hosted on GitHub Pages. Every push to `main` is checked, built and deployed
automatically by GitHub Actions.

> **New to editing this site? Start with [HOW-TO-EDIT.md](HOW-TO-EDIT.md).** It has step-by-step
> recipes (editing on github.com, adding jobs, papers and posts), search-console setup and troubleshooting.

---

## Update the site in 3 steps

1. Open the file for what you want to change (see the table below).
2. Edit the text. Every file has comments at the top explaining each field.
3. Commit and push to `main`. About two minutes later the site is live.

You never need to touch anything in `src/` to change content.

| I want to change… | Edit this file |
|---|---|
| Name, bio, email, links, resume, stats, scrolling interests, contact text | [`content/profile.js`](content/profile.js) |
| Which sections show, their order, the menu, search-engine settings | [`content/site.js`](content/site.js) |
| Jobs and positions (e.g. Smile Care) | [`content/experience.js`](content/experience.js) |
| Education | [`content/education.js`](content/education.js) |
| Research positions / thesis | [`content/research.js`](content/research.js) |
| Papers and their status (Accepted, Presented, Under Review…) | [`content/publications.js`](content/publications.js) |
| Projects (and which are featured) | [`content/projects.js`](content/projects.js) |
| Skills | [`content/skills.js`](content/skills.js) |
| Volunteering | [`content/volunteering.js`](content/volunteering.js) |
| GitHub repos (how many, which to hide) | [`content/github.js`](content/github.js) |
| Blog posts | [`content/blog/`](content/blog/) (one Markdown file per post) |
| Images (photo, blog covers) | [`public/`](public/) |
| Colours, fonts, spacing | [`DESIGN.md`](DESIGN.md), then [`src/styles/tokens.css`](src/styles/tokens.css) |

### Common tasks

**Add a paper.** Copy an entry in `content/publications.js`:

```js
{
  title: "Your Paper Title",
  type: "Journal",                              // or "Conference"
  conference: "CONF 2026",
  conferenceLink: "https://conference-url.com", // "" for no link
  doi: "10.1234/your.doi",                      // "" hides the DOI
  status: "Accepted",
  date: "",
  tags: ["Python", "NLP"],
},
```

Only **journal papers that are Accepted/Published** and **conference papers that are
Presented/Published** are listed under "Papers" and counted in the hero. Everything else
appears under "In progress". When a paper moves on, just change its `status`.

**Write a blog post.** Copy `content/blog/_TEMPLATE.md` to `content/blog/2026-11-02-my-post.md`
and write in normal Markdown. The URL becomes `/blog/my-post`. Keep `draft: true` while you're
writing. Drafts show up in `npm run dev` but never on the live site.

**Hide or move a section.** In `content/site.js`, set `show: false` or drag the line up or down.
Numbering (01, 02…) updates itself. The Video resume and Volunteering sections are there but hidden.

**Add your photo.** Put it in `public/`, shrink it (see *Images* below), then set
`headshot: "/headshot.webp"` in `content/profile.js`.

**Change a project icon.** Use one of the names listed at the top of `content/projects.js`
(e.g. `"Robot"`, `"Brain"`, `"Flask"`). Icons are [Phosphor](https://phosphoricons.com) in the Light weight.

### Images

Big photos make the site slow. A small Python helper converts them to WebP:

```bash
source ../penv/bin/activate          # the Python env next to this folder
pip install -r requirements.txt      # first time only
python tools/optimize_images.py public/my-photo.jpg   # writes public/my-photo.webp
```

GitHub Actions warns you (without failing) when an image in `public/` is over 500 KB.
Full-size originals (like `public/headshot.png`) are listed in `.gitignore`, so they stay on your
computer and only the small `.webp` is uploaded. Add new originals there the same way.

---

## Run it on your computer

Needs Node.js 22 or newer.

```bash
npm install
npm run dev          # http://localhost:5173 (fetches your latest GitHub repos first)
```

Before pushing, you can run the same checks GitHub runs:

```bash
npm run check        # code lint + DESIGN.md lint + production build
```

---

## How deployment works

Everything is in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml):

| When | What happens |
|---|---|
| You push to `main` | Lint → check DESIGN.md → check image sizes → build → check SEO output → deploy → ping IndexNow |
| Someone opens a pull request | Same checks and build, nothing is published |
| Every day at 03:00 UTC | Rebuild so the "Recent code" section shows your newest repos |
| You click **Run workflow** in the Actions tab | Manual rebuild |

If any check fails, nothing is deployed and the live site stays as it was.

---

## Search engines & AI assistants

The build makes the site easy to find and easy for AI assistants to describe correctly:

- **Prerendered HTML.** Every page is rendered to real HTML at build time ([`src/entry-server.jsx`](src/entry-server.jsx)),
  so crawlers that don't run JavaScript (Bing, ChatGPT, Claude, Perplexity) still see all the text.
- **Per-page metadata:** title, description, canonical URL, Open Graph and X cards, plus a 1200×630 share image.
- **Structured data (schema.org JSON-LD):** Person (with current job, school, social profiles), WebSite,
  ProfilePage, ScholarlyArticle for papers, projects, Blog, BlogPosting and breadcrumbs. All generated from `content/`.
- **`sitemap.xml`** (with images), **RSS feed** at `/blog/feed.xml`, and a `robots.txt` that welcomes search and AI crawlers.
- **[`llms.txt`](https://llmstxt.org)** and **`llms-full.txt`**: plain-text summaries written for AI assistants.
- **IndexNow** pings Bing, Yandex, Naver and Seznam after each push.
- **Search Console verification:** paste the codes into `seo` in [`content/site.js`](content/site.js).
  Setup steps are in [HOW-TO-EDIT.md](HOW-TO-EDIT.md#5-search-engines-and-ai-assistants).

All of it is generated by [`scripts/postbuild.js`](scripts/postbuild.js) and [`scripts/lib/`](scripts/lib/).

**One-time setup** (already done for this repo): *Settings → Pages → Source: GitHub Actions*,
and `public/CNAME` contains `nafim.dev`. No secrets are needed.

---

## Design

The look is described in [`DESIGN.md`](DESIGN.md) using Google's
[DESIGN.md format](https://github.com/google-labs-code/design.md). AI coding agents read it, and
`npm run lint:design` checks it, including colour contrast.

- **Palette:** warm paper `#F4EFE6`, ink `#1F1B16`, terracotta `#A84A28`, moss `#5E6B3A`. Light theme only.
- **Type:** Playfair Display (headlines), Lato (text), Space Mono (labels), the trio used by
  [Bound](https://www.typewolf.com/site-of-the-day/bound). All self-hosted.
- **Icons:** Phosphor Light.
- **Motion:** looping interests marquee, rotating badge, drifting blob, breathing status dot,
  floating headshot and a dot that travels down the education timeline.
  All of them stop for visitors who turn on "reduce motion".

More docs: [`docs/REQUIREMENTS.md`](docs/REQUIREMENTS.md) (what the site must do) and
[`docs/WIREFRAME.md`](docs/WIREFRAME.md) (page layouts).

---

## Project map

```
content/              ← everything you edit
  profile.js  site.js  experience.js  education.js  research.js
  publications.js  projects.js  skills.js  volunteering.js  github.js
  blog/*.md
public/               ← images, favicon, share image, CNAME, robots.txt, IndexNow key
src/
  components/
    layout/           Header, Footer, Section wrapper
    sections/         Hero, Experience, Education, Research, Projects, Repos, Skills, …
    ui/               Tags, CountUp, Marquee, RotatingBadge, Cover, icons
  pages/              Home, Blog, BlogPost, NotFound
  styles/             tokens · base · layout · components · sections · blog · animations
  lib/                blog loader, frontmatter parser, date helpers, paper rules
  entry-server.jsx    build-time renderer (prerendering)
scripts/              fetch-github.js (before build) · postbuild.js (prerender + SEO) · indexnow.js
  lib/                data · seo (meta + JSON-LD) · feeds (sitemap, RSS) · ai-files (llms.txt)
tools/                optimize_images.py · make_og_image.py
docs/                 REQUIREMENTS.md · WIREFRAME.md
DESIGN.md             design system
HOW-TO-EDIT.md        editing guide
```
