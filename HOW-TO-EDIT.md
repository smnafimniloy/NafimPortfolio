# How to edit nafim.dev yourself

This guide covers everything you'll need to change on the site, from fixing a typo to adding a new job or paper. You don't need to know React.

**The one rule:** everything you'll normally change lives in the `content/` folder (plus images in `public/`).
After you save, GitHub Actions checks the site, builds it and publishes it. About 2–3 minutes later it's live at https://nafim.dev.

---

## Contents

1. [Two ways to edit](#1-two-ways-to-edit)
2. [Which file do I open?](#2-which-file-do-i-open)
3. [Step-by-step recipes](#3-step-by-step-recipes)
4. [Images](#4-images)
5. [Search engines and AI assistants](#5-search-engines-and-ai-assistants)
6. [Writing rules for the content files](#6-writing-rules-for-the-content-files)
7. [When something goes wrong](#7-when-something-goes-wrong)

---

## 1. Two ways to edit

### A. On the GitHub website (easiest, nothing to install)

1. Go to your repository on github.com and open the `content` folder.
2. Click the file you want, for example `experience.js`.
3. Click the **pencil icon** (Edit this file) at the top right.
4. Make your change.
5. Click **Commit changes…**, write a short message like `Add Smile Care description`, and keep **Commit directly to the main branch** selected.
6. Click the **Actions** tab. A yellow dot means it's building, a green tick means it's live, and a red ✗ means something needs fixing (see [section 7](#7-when-something-goes-wrong)).

To **upload an image**, open the `public` folder, click **Add file → Upload files**, drag it in, and commit.

### B. On your computer (to preview before publishing)

One-time setup (Node.js 22+ needs to be installed):

```bash
cd ~/Desktop/portfolio/portfolio
npm install
```

Every time:

```bash
npm run dev        # open http://localhost:5173. The page refreshes as you save files
npm run check      # optional: runs the same checks as GitHub
git add -A
git commit -m "Describe your change"
git push
```

> `npm run dev` also shows blog posts marked `draft: true`. The live site never does.

---

## 2. Which file do I open?

| What you want to change | File |
|---|---|
| Name, bio, email, links, resume link, location, "Open to…" line, scrolling interests, contact text | `content/profile.js` |
| Jobs and positions (e.g. Smile Care) | `content/experience.js` |
| Schools and degrees | `content/education.js` |
| Thesis / research positions | `content/research.js` |
| Papers (journal and conference) | `content/publications.js` |
| Projects | `content/projects.js` |
| Skills | `content/skills.js` |
| Volunteering (hidden by default) | `content/volunteering.js` |
| Which sections show, their order, the menu, **search engine settings** | `content/site.js` |
| GitHub repos section (how many, which to hide) | `content/github.js` |
| Blog posts | `content/blog/` (one `.md` file per post) |
| Photos, blog covers, favicon | `public/` |
| Colours, fonts, spacing | `DESIGN.md` first, then `src/styles/tokens.css` |

---

## 3. Step-by-step recipes

### Describe what you do at Smile Care

Open `content/experience.js` and fill in the empty fields:

```js
{
  role: "Student Research Assistant",
  organization: "Smile Care",
  link: "https://smilecare.example",        // their website, or leave ""
  location: "Dhaka, Bangladesh",
  period: "Oct 2026 – Present",
  current: true,                             // shows the green "Current" marker
  description: "One or two sentences about the work.",
  points: [
    "A short bullet point",
    "Another one",
  ],
  tags: ["Python", "Data Analysis"],
},
```

### Add a new job

Copy the whole `{ … },` block in `content/experience.js`, paste it **above** the old one (newest first), and change the text.
When an old job ends, set `current: false` and change `period` to something like `"Oct 2026 – Mar 2027"`.

> Your current job is also used as your job title in Google's structured data and in `llms.txt`, the summary for AI assistants.

### Add or update a paper

Open `content/publications.js`. Each paper looks like this:

```js
{
  title: "Full Paper Title",
  type: "Conference",          // or "Journal"
  conference: "ICEFronT",      // venue name shown on the site
  conferenceLink: "https://…", // "" if none
  doi: "",                     // e.g. "10.1109/xyz.2026.123", only the number
  status: "Accepted",          // see below
  date: "",                    // optional, e.g. "Dec 2026"
  tags: ["Radiomics", "Python"],
},
```

**Status decides where the paper appears:**

| Type | Counted as a **Paper** when status is | Otherwise shown under |
|---|---|---|
| Journal | `Accepted` or `Published` | In progress |
| Conference | `Presented` or `Published` | In progress |

So when you present ICEFronT, change `status: "Accepted"` to `status: "Presented"`. It moves into **Papers**, and the "Papers" number in the hero goes up by itself.
Other statuses you can use: `Submitted`, `Under Review`, `In Preparation`.

### Update the thesis status

In `content/research.js`, change the `status:` line, e.g. `"Accepted at NetMAHIB"`.

### Add a school (SSC)

`content/education.js` already has a ready-made block at the bottom. Remove the `//` at the start of each of its lines and fill it in.

### Add a project

Copy a block in `content/projects.js`. Set `featured: true` to make it big at the top (two featured looks best).
For `icon`, use one of the names listed at the top of that file. Leave `demo: ""` if there's no live demo.
To hide a project without deleting it, put `//` in front of each of its lines.

### Hide, show or reorder sections

In `content/site.js`:

```js
{ id: "volunteering", label: "Community", show: true, nav: false },
```

- `show: true/false` turns the section on or off
- `nav: true` adds it to the top menu
- Moving a line up or down changes the order. The section numbers (01, 02…) update themselves.

### Rename a blog post (or add a short link) without breaking old links

Search engines and people may already have the old address. Add a redirect in `content/site.js`:

```js
redirects: {
  "/resume/": "resume",                                  // nafim.dev/resume → your resume
  "/blog/old-post-name/": "/blog/new-post-name/",        // renamed post
  "/talk/": "https://youtube.com/watch?v=…",             // any outside link
},
```

Every redirect gets its own tiny page that forwards visitors and search engines instantly.
`resume`, `github` and `linkedin` are shortcuts to the links in `content/profile.js`. Short links
`nafim.dev/resume`, `/cv`, `/github` and `/linkedin` already work.

The site also handles these for you:
- `http://` and `www.nafim.dev` go to `https://nafim.dev` (GitHub Pages)
- a missing trailing slash (`/blog` → `/blog/`) is added (GitHub Pages)
- `…/index.html` is tidied to `…/`
- wrong capitals (`/BLOG/`) are fixed
- anything else shows the 404 page (with a real 404 status, so Google drops dead links)

### Write a blog post

1. Copy `content/blog/_TEMPLATE.md`.
2. Rename it to `YYYY-MM-DD-short-title.md`, e.g. `2026-11-02-my-first-month-at-smile-care.md`.
   The web address becomes `nafim.dev/blog/my-first-month-at-smile-care/`.
3. Fill in the top part (between the `---` lines), then write the post in normal Markdown.
4. Keep `draft: true` while you're writing. Delete that line (or set it to `false`) to publish.

Every published post automatically gets its own page, social preview, sitemap entry, RSS feed item and a place in `llms.txt`.

---

## 4. Images

Big photos slow the site down, which also hurts your Google ranking. Shrink them first (on your computer):

```bash
source ../penv/bin/activate
pip install -r requirements.txt                       # first time only
python tools/optimize_images.py public/my-photo.jpg   # writes public/my-photo.webp
```

Then use the `.webp` file in your content, e.g. `cover: /blog/my-photo.webp`.
Add the big original's name to `.gitignore` so it stays on your computer only.

**New headshot:** put it in `public/`, shrink it as above, and set `headshot: "/headshot.webp"` in `content/profile.js`.
The small picture in the rotating badge is separate (`badgeAvatar: "/avatar.webp"`), so it stays the cartoon avatar.
Don't delete `public/avatar.webp` unless you change or empty `badgeAvatar`.

**The share picture** (`public/og-image.jpg`, shown when someone shares your link on LinkedIn, WhatsApp, X…) uses your name, subtitle and headshot. Remake it after changing any of those:

```bash
python tools/optimize_images.py --check   # optional
python tools/make_og_image.py
```

---

## 5. Search engines and AI assistants

### What already happens automatically

On every publish, the build:

- **Prerenders every page to real HTML**, so Google, Bing and AI crawlers (ChatGPT, Claude, Perplexity) can read the text without running JavaScript.
- Gives every page its own **title, description, canonical address and social preview**.
- Adds **structured data** (schema.org) about you: your name, current job, school, papers, projects and blog posts. This is what Google and AI assistants use to build answers about you.
- Writes `sitemap.xml`, the blog RSS feed (`/blog/feed.xml`), `robots.txt` (welcomes search and AI crawlers), and **`llms.txt` / `llms-full.txt`**, plain-text summaries of you made for AI assistants.
- **Pings IndexNow** after each push, so Bing, Yandex, Naver and Seznam pick up changes within hours.

All of this comes from your `content/` files, so keeping them up to date is the best thing you can do for search.

### One-time setup: Google Search Console

1. Go to https://search.google.com/search-console and click **Add property**.
2. **Recommended:** choose **Domain**, type `nafim.dev`, and add the TXT record it shows at your domain registrar (where you bought nafim.dev). This verifies every page, forever.
   **Or:** choose **URL prefix** → `https://nafim.dev/` → **HTML tag**. Copy only the `content="…"` value and paste it into `content/site.js`:
   ```js
   googleVerification: "paste-the-code-here",
   ```
   Commit, wait for the green tick, then click **Verify**.
3. In Search Console, open **Sitemaps** and submit `sitemap.xml`.
4. Open **URL inspection**, paste `https://nafim.dev/`, and click **Request indexing**. Do the same for any new blog post.

### One-time setup: Bing Webmaster Tools (also powers DuckDuckGo, Yahoo and ChatGPT search)

1. Go to https://www.bing.com/webmasters and sign in.
2. Choose **Import from Google Search Console** (fastest), or add the site and use the meta-tag method: paste the code into `bingVerification` in `content/site.js`.
3. Submit `https://nafim.dev/sitemap.xml` under **Sitemaps**.
4. IndexNow is already connected. Bing shows its pings under **IndexNow**.

### Optional: Yandex

https://webmaster.yandex.com → add the site → meta tag → paste into `yandexVerification`.

### Check that it works

- **Rich Results Test:** https://search.google.com/test/rich-results?url=https://nafim.dev/
- **Schema validator:** https://validator.schema.org/ (paste `https://nafim.dev/`)
- **Social preview:** https://www.opengraph.xyz/ or LinkedIn's https://www.linkedin.com/post-inspector/
- **AI summary:** open https://nafim.dev/llms.txt
- Search `site:nafim.dev` on Google a few days after setup.

### Tips that actually help ranking

- Keep `description` in `content/site.js` accurate and 140–160 characters long.
- Write blog posts. Every post is another page that can show up in search.
- Link to nafim.dev from your GitHub profile, LinkedIn, Google Scholar, ORCID and paper author bios. Links from other sites matter a lot.
- Update `keywords` in `content/site.js` when your focus changes.

---

## 6. Writing rules for the content files

The `.js` files in `content/` are written in JavaScript, so a few characters matter:

- Text goes inside double quotes: `"like this"`. Apostrophes are fine inside them: `"I'm"`.
- To use a double quote inside text, write `\"`: `"The \"best\" model"`.
- Every item in a list ends with a **comma**: `"Python", "Django",`.
- Each `{ … }` block ends with `},`.
- `//` at the start of a line turns it into a note that the site ignores. That's how hidden items work.
- An empty value is `""` (text) or `[]` (list). Don't delete the line.

The most common mistake is a **missing comma** or a **missing quote**. If the build fails, check the line you just changed first.

Blog posts (`.md`) are plain Markdown: `## Heading`, `**bold**`, `*italic*`, `[link](https://…)`, `- list item`, `> quote`.

---

## 7. When something goes wrong

**Red ✗ in the Actions tab**
1. Click the failed run → click **build** → open the red step.
2. The error usually names the file and line, e.g. `content/projects.js:24 Unexpected token`.
3. Fix that line (usually a missing comma or quote), commit, and it runs again.
   The live site stays on the last working version until the fix goes through.

**My change isn't showing**
- Wait until the Actions run has a green tick, then hard-refresh (Ctrl + Shift + R).
- Blog post still hidden? Check that `draft: true` is removed and the file name doesn't start with `_`.

**I want to undo a change**
On GitHub, open the **Commits** list, click the commit, then `…` → **Revert**. Or edit the file back and commit again.

**"Your email address is visible to spam bots" (build failed)**
Your email is protected from spam bots: the published files never contain it in plain text, and
visitors only see it once the page loads in a real browser. If you type your email address
directly into a blog post or another content field, the build stops so it doesn't leak. Remove
it, or link to `https://nafim.dev/#contact` instead. To change your address, edit `email` in
`content/profile.js` as normal. The protection updates by itself.

**A warning about image size**
That's only a warning. Shrink the image with `tools/optimize_images.py` (see [section 4](#4-images)) when you have time.

**Search Console says "Couldn't fetch" for the sitemap**
Wait a day and try again. New sites often take a few days to be fetched.
