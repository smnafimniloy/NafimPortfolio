// ─── SITE SETTINGS ────────────────────────────────────────────
// Turn sections on/off, change their order, and manage search-engine settings.
// Sections are numbered automatically in the order you list them.

export const site = {
  url: "https://nafim.dev",
  title: "S M Nafim Niloy",
  // Shown in Google results under your name (keep it 140–160 characters).
  description:
    "S M Nafim Niloy is a CSE undergraduate and ML researcher in Dhaka working on graph neural networks, medical imaging, computer vision and Bengali NLP.",

  // Order of sections on the home page. Set `show: false` to hide one.
  // `nav: true` adds it to the top menu.
  sections: [
    { id: "video-resume", label: "Introduction", show: false, nav: false },
    { id: "experience",   label: "Experience",   show: true,  nav: true },
    { id: "education",    label: "Education",    show: true,  nav: true },
    { id: "research",     label: "Research",     show: true,  nav: true },
    { id: "projects",     label: "Projects",     show: true,  nav: true },
    { id: "repos",        label: "Code",         show: true,  nav: false },
    { id: "skills",       label: "Skills",       show: true,  nav: true },
    { id: "volunteering", label: "Community",    show: false, nav: false },
    { id: "contact",      label: "Contact",      show: true,  nav: true },
  ],

  // Show the Blog link in the menu.
  showBlog: true,

  // ─── Search engines & AI ────────────────────────────────────
  seo: {
    // Words people might search for. Used in the page metadata and for AI assistants.
    keywords: [
      "S M Nafim Niloy", "Nafim Niloy", "Nafim", "ML researcher Bangladesh",
      "graph neural networks", "GNN", "medical imaging", "computer vision",
      "Bengali NLP", "BanglaLLM", "AIUB", "student research assistant",
    ],
    // Picture shown when your link is shared (1200×630). Made by tools/make_og_image.py.
    image: "/og-image.jpg",
    twitter: "@i_nt3rn",

    // Search Console verification. Paste ONLY the code from the meta tag each one gives you.
    // Google:  search.google.com/search-console → Add property → "HTML tag" method
    // Bing:    bing.com/webmasters  (or import from Google)
    // Yandex:  webmaster.yandex.com
    // Leave "" if you verified another way (e.g. DNS) or don't use that engine.
    googleVerification: "",
    bingVerification: "",
    yandexVerification: "",

    // IndexNow tells Bing, Yandex, Naver, Seznam etc. about changes after every deploy.
    // This key is public by design; it must match public/<key>.txt. Don't change it unless you regenerate both.
    indexNowKey: "ef367f4369a5c05cc5c9865041b868f0",
  },
};
