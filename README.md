# S M Nafim Niloy — Portfolio

Personal portfolio website built with **React** and **Vite**. All content is managed from a single data file — no CMS or database required.

## Tech Stack

- React 19
- Vite 8
- Plain CSS (no UI framework)
- GitHub REST API (live repo data)

## Project Structure

```
src/
├── data.js              ← edit all content here
├── index.css            ← global styles & design tokens
├── App.jsx
└── components/
    ├── Header.jsx
    ├── Hero.jsx
    ├── Education.jsx
    ├── Research.jsx     ← publications with conference links & DOI
    ├── Projects.jsx
    ├── Skills.jsx
    ├── Repos.jsx        ← fetches live data from GitHub API
    ├── Volunteering.jsx
    ├── Contact.jsx
    └── Footer.jsx
```

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Updating Content

Everything lives in `src/data.js`. Key fields:

| Field | Description |
|---|---|
| `name`, `bio`, `subtitle` | Hero section text |
| `education[]` | Degree, institution, period |
| `research[]` | Research positions and thesis |
| `publications[].conferenceLink` | URL for the conference badge |
| `publications[].doi` | DOI number — pill appears automatically when filled |
| `projects[]` | Set `featured: true` for the top two cards |
| `skills{}` | Object of category → tag array |
| `repos[]` | Fallback data if GitHub API is unavailable |

## Adding a Publication

```js
{
  title: "Your Paper Title",
  conference: "CONF 2026",
  conferenceLink: "https://conference-url.com",
  doi: "10.1234/your.doi.here",      // leave "" to hide the DOI pill
  tags: ["Python", "NLP"],
}
```

## Build & Deploy

```bash
npm run build   # outputs to dist/
```

Deploy the `dist/` folder to any static host (Vercel, Netlify, GitHub Pages).

## Live Repo Data

The Repos section fetches live data from the GitHub API on page load (unauthenticated, 60 req/hour limit). If the API is unavailable, it falls back to the static `repos[]` array in `data.js`.
