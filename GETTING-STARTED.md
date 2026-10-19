# Getting started from a fresh clone

Two situations are covered here:

- **[A. Run this site on a new computer](#a-run-it-on-a-new-computer)**: you (or a collaborator) want to work on nafim.dev.
- **[B. Turn it into your own portfolio](#b-make-it-your-own-portfolio)**: you cloned or forked it to build your own site.

Once it's running, [HOW-TO-EDIT.md](HOW-TO-EDIT.md) explains day-to-day editing.

---

## What you need

| Tool | Version | Needed for |
|---|---|---|
| [Git](https://git-scm.com/downloads) | any | getting the code, publishing |
| [Node.js](https://nodejs.org/) | **22 or newer** | running and building the site |
| [Python](https://www.python.org/downloads/) | 3.10+ | *optional*: image tools only |

Check what you have:

```bash
git --version
node --version     # must print v22.x or higher
```

---

## A. Run it on a new computer

```bash
git clone https://github.com/smnafimniloy/NafimPortfolio.git
cd NafimPortfolio
npm install
npm run dev
```

Open **http://localhost:5173**. The page reloads whenever you save a file.

That's it. No `.env` file, API keys or tokens are needed. On start, the site fetches the latest GitHub repos; if that fails (offline, rate limit), it uses the list in `content/github.js`.

Before publishing, run the same checks GitHub runs:

```bash
npm run check      # code lint + DESIGN.md lint + full production build
npm run preview    # optional: view the production build at http://localhost:4173
```

Publish by committing and pushing to `main`. GitHub Actions builds and deploys automatically.

### Optional: image tools (Python)

Only needed to shrink photos or remake the share image.

```bash
python3 -m venv .venv
source .venv/bin/activate          # Windows: .venv\Scripts\activate
pip install -r requirements.txt

python tools/optimize_images.py public/photo.jpg   # → public/photo.webp
python tools/make_og_image.py                      # → public/og-image.jpg (run npm install first)
```

---

## B. Make it your own portfolio

### 1. Get your own copy

Click **Fork** on GitHub, or create a new empty repository and push a clone to it:

```bash
git clone https://github.com/smnafimniloy/NafimPortfolio.git my-portfolio
cd my-portfolio
git remote set-url origin https://github.com/<you>/<your-repo>.git
npm install
npm run dev
```

> **License:** the code is MIT-licensed ([LICENSE](LICENSE)), so you can use, change and publish it freely.
> Keep the copyright notice in `LICENSE`. Nafim's personal content (everything in `content/` and the
> images in `public/`) is *not* included, so replace all of it before publishing.

### 2. Replace the content

Everything personal lives in `content/` and `public/`. Work through this checklist:

**`content/site.js`** (do this first)
- [ ] `url`: your address, e.g. `"https://janedoe.dev"` or `"https://<you>.github.io"`. The header logo, sitemap, `robots.txt`, `CNAME` and every link are generated from it.
- [ ] `title`, `description`
- [ ] `seo.keywords`, `seo.twitter` (or `""`)
- [ ] `seo.googleVerification` / `bingVerification` / `yandexVerification` → `""` (fill in your own later)
- [ ] `seo.indexNowKey`: **make a new one**. Never reuse someone else's:
  ```bash
  node -e "console.log(crypto.randomUUID().replaceAll('-', ''))"
  ```
- [ ] `sections`: hide the ones you don't need (`show: false`)

**`content/profile.js`**: name, subtitle, bio, availability line, email, GitHub/LinkedIn/resume links, location, stats, interests, contact text.

**`content/github.js`**: your GitHub `username`, which repos to `hide`, and replace `fallbackRepos` with a few of yours.

**The other content files**: rewrite or empty each list. An empty list `[]` hides that section's cards:
`experience.js`, `education.js`, `research.js`, `publications.js`, `projects.js`, `skills.js`, `volunteering.js`.

**`content/blog/`**: delete the existing posts (keep `_TEMPLATE.md`). With no posts, the blog shows "No posts yet". Set `showBlog: false` in `site.js` to remove it completely.

**`public/`**
- [ ] Delete `avatar.webp`, `blog/*` and the icon files (`favicon.ico`, `icon-*.png`, `apple-touch-icon.png`)
- [ ] Make your own icons from your avatar or logo: `python tools/make_favicons.py public/your-avatar.png`
- [ ] Add your photo (optional), then set `headshot` and `badgeAvatar` in `profile.js` (or `""` to hide them)
- [ ] Remake the share image: `python tools/make_og_image.py`

**`.gitignore`**: remove the two lines under *Original, full-size images* (they name files from this site) and add your own originals if needed.

**Look & feel (optional):** colours, fonts and spacing are defined in `DESIGN.md` and mirrored in `src/styles/tokens.css`. Change both, then run `npm run lint:design`.

Run `npm run check`. It must pass before you publish.

### 3. Publish on GitHub Pages

1. Push to your repository's `main` branch.
2. On GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Pick your address:
   - **Free GitHub address:** name the repository `<you>.github.io` and set `url: "https://<you>.github.io"` in `content/site.js`.
     *(A repository with any other name is served under `/<repo-name>/`, which this site doesn't support. Use a custom domain or the `<you>.github.io` name.)*
   - **Custom domain** (e.g. `janedoe.dev`): in **Settings → Pages → Custom domain**, enter it, then add the DNS records GitHub shows at your domain registrar. Tick **Enforce HTTPS** once it's available.
4. Open the **Actions** tab. When the run shows a green tick, your site is live.

Nothing else needs configuring: the workflow uses GitHub's built-in token, and no secrets are required.

### 4. Get found on Google and Bing

Follow [HOW-TO-EDIT.md → Search engines and AI assistants](HOW-TO-EDIT.md#5-search-engines-and-ai-assistants) to verify your site in Google Search Console and Bing Webmaster Tools and submit `sitemap.xml`.

### Things that are automatic

On every push, GitHub Actions:
- lints the code and `DESIGN.md`, warns about oversized images
- fetches your latest GitHub repos
- prerenders every page to HTML with titles, descriptions, social previews and structured data
- writes `sitemap.xml`, `robots.txt`, the RSS feed, `llms.txt` / `llms-full.txt`, `404.html` and `CNAME`
- refuses to publish if your email address would appear in plain text (anti-spam)
- deploys to GitHub Pages and pings IndexNow

It also rebuilds every day at 03:00 UTC so the repo list stays fresh.

---

## Troubleshooting a fresh clone

| Problem | Fix |
|---|---|
| `npm install` fails or the build complains about the Node version | Install Node.js 22+ (`node --version`). |
| `GitHub: could not fetch… Using fallbackRepos` | Fine. You're offline or rate-limited; the fallback list is used. |
| Port 5173 already in use | Vite picks the next free port. Use the URL it prints. |
| `make_og_image.py`: font file not found | Run `npm install` first. The fonts come from `node_modules/@fontsource`. |
| Build stops with "Your email address is visible to spam bots" | You printed the email somewhere directly. See [HOW-TO-EDIT.md §7](HOW-TO-EDIT.md#7-when-something-goes-wrong). |
| The site is live but shows a 404 | Check that **Settings → Pages → Source** is *GitHub Actions* and the latest Actions run is green. |
| Styles or links are broken on `https://<you>.github.io/<repo>/` | Project sub-paths aren't supported. Use `<you>.github.io` as the repo name or a custom domain. |
