// ─── PROFILE ──────────────────────────────────────────────────
// Your name, intro text, contact details and links.
// Shown in the hero, header, contact section and footer.

export const profile = {
  name: "S M Nafim Niloy",
  subtitle: "Researcher · AI Engineer",
  bio: "Computer Science and Engineering undergraduate with research experience in graph neural networks, computer vision, medical imaging, and natural language processing, seeking opportunities to apply machine learning and software engineering skills in a professional setting. Experienced in end-to-end ML pipelines, full-stack development, and reproducible experimentation.",

  // Small line above your name. Leave "" to hide it.
  availability: "Open to research & job opportunities",

  // Photo: put the file in public/ and write "/headshot.webp". Leave "" to hide it.
  // Tip: run `python tools/optimize_images.py` first to shrink big photos.
  headshot: "/headshot.webp",

  location: "Dhaka, Bangladesh",
  email: "admin@nafim.dev",

  github: "https://github.com/smnafimniloy",
  linkedin: "https://linkedin.com/in/nafimniloy",
  resume: "https://drive.google.com/file/d/1ei7MAoKtN7nivHENXBqIWHhKoPbZOqXD/view?usp=sharing",

  // Paste any YouTube link (watch, youtu.be or shorts). Turn the section on in site.js.
  videoResume: "https://youtu.be/eGxdpx3H4SU",

  // Numbers in the hero card.
  // papers: null = count automatically (journal Accepted/Published + conference Presented/Published).
  // repos is replaced by the live count from GitHub on every build.
  stats: {
    papers: null,
    projects: 15,
    repos: 40,
  },

  // Words that loop in the scrolling strip under the hero.
  interests: [
    "Graph Neural Networks",
    "Medical Imaging",
    "Bengali NLP",
    "Computer Vision",
    "Large Language Models",
    "Retrieval-Augmented Generation",
    "Explainable AI",
  ],

  // Text in the contact section.
  contactHeading: "Let's talk research",
  contactText:
    "I'm always open to discussing research ideas, collaborating on projects, or just having a chat about NLP and machine learning.",
};
