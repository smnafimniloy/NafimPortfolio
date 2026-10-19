// ─── PROJECTS ─────────────────────────────────────────────────
// featured: true  → shown large at the top (two looks best).
// demo: link to a live demo, or "" to hide the button.
// icon: a Phosphor icon name. Browse them at https://phosphoricons.com
//       Supported here: Robot, BookOpen, PawPrint, Coffee, ChartBar, ChartLine, Hamburger,
//       ShoppingBag, Brain, Code, Database, Globe, Flask, Graph, Image, Leaf, Terminal.

export const projects = [
  {
    title: "BanglaLLM",
    description:
      "A demo version of a 7B model. Developed and trained a 100M-parameter decoder-only language model for Bangla using a custom 16K-vocabulary tokenizer, with training and inference implemented in Python and Transformers.",
    tags: ["Python", "Transformers", "Streamlit", "Hugging Face"],
    github: "https://github.com/smnafimniloy/banglallmDemo",
    demo: "https://demobanglallm.streamlit.app/",
    featured: true,
    icon: "Robot",
    category: "AI / NLP",
  },
  {
    title: "Animal Image Classification with ResNet50",
    description:
      "Built and fine-tuned a ResNet50 model to classify images of 10 animal species, reaching 96.59% validation accuracy through transfer learning, data augmentation, and hyper-parameter tuning. A Streamlit app lets you upload an image and get a prediction instantly.",
    tags: ["Python", "PyTorch", "Flask", "Streamlit", "Git"],
    github: "https://github.com/smnafimniloy/animal_image_classification_ResNet50",
    demo: "https://animalimageclassificationresnet50-gyvtphv5nivq8wbtedsgcu.streamlit.app/",
    featured: true,
    icon: "PawPrint",
    category: "AI / Vision",
  },
  {
    title: "EduTutor BD",
    description:
      "End-to-end RAG-based AI tutoring system for SSC students using OCR-processed Bengali textbooks, LangChain, and FastAPI, with retrieval-grounded answers and student progress tracking.",
    tags: ["FastAPI", "OCR", "PHP", "LangChain"],
    github: "https://github.com/smnafimniloy/edu-tutorBD",
    demo: "",
    featured: false,
    icon: "BookOpen",
    category: "AI / NLP",
  },
  {
    title: "Stock Prediction Portal",
    description:
      "Full-stack stock prediction platform built with Django, React, and Bootstrap, integrating machine learning models for historical market-data analysis, trend prediction, and interactive visualization.",
    tags: ["Python", "Django", "React", "Bootstrap"],
    github: "https://github.com/smnafimniloy/stock-prediction-portal",
    demo: "",
    featured: false,
    icon: "ChartLine",
    category: "Full-stack / ML",
  },
  {
    title: "Smart Cafe",
    description:
      "Web application built from scratch in PHP and MySQL following an MVC architecture, with role-based dashboards for Admin, Manager, and Customer and full CRUD for menus, inventory, and customer preferences.",
    tags: ["PHP", "MySQL", "JavaScript"],
    github: "https://github.com/smnafimniloy/SmartCafe",
    demo: "",
    featured: false,
    icon: "Coffee",
    category: "Web",
  },

  // Older projects. Remove the // to show one again.
  // {
  //   title: "EDA — Titanic Dataset",
  //   description:
  //     "Complete exploratory data analysis covering data cleaning, transformation, statistical computation, and visualization.",
  //   tags: ["Python", "pandas", "Matplotlib"],
  //   github: "https://github.com/smnafimniloy/TitanicProjectDataScience",
  //   demo: "",
  //   featured: false,
  //   icon: "ChartBar",
  //   category: "Data",
  // },
  // {
  //   title: "Yum Yard",
  //   description:
  //     "Desktop food cart ordering app with role-based access for Admin, Cart Owner, and Customer built on .NET.",
  //   tags: ["C#", "MySQL", ".NET"],
  //   github: "https://github.com/smnafimniloy/YumYard_",
  //   demo: "",
  //   featured: false,
  //   icon: "Hamburger",
  //   category: "Desktop",
  // },
];
