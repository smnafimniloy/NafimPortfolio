export const data = {
  name: "S M Nafim Niloy",
  subtitle: "CSE undergrad · Researcher · AI Engineer",
  bio: "Final-year Computer Science and Engineering undergraduate with research experience in graph neural networks, computer vision, medical imaging, and natural language processing, seeking opportunities to apply machine learning and software engineering skills in a professional setting. Experienced in end-to-end ML pipelines, full-stack development, and reproducible experimentation, with co-authored peer-reviewed publications.",
  headshot: " ",   // headshot.png set to "/headshot.jpg" once you place your photo in portfolio/public/
  location: "Dhaka, Bangladesh 🇧🇩",
  email: "admin@nafim.dev",
  papers: 2,
  projectCount: 10,
  repoCount: 30,
  github: "https://github.com/smnafimniloy",
  linkedin: "https://linkedin.com/in/nafimniloy",
  resume: "https://drive.google.com/file/d/1ei7MAoKtN7nivHENXBqIWHhKoPbZOqXD/view?usp=sharing",

  // Paste any YouTube URL here — watch, short (youtu.be), or embed format.
  // Leave empty ("") to hide the section entirely.
  videoResume: "https://youtu.be/eGxdpx3H4SU",  // e.g. "https://www.youtube.com/watch?v=dQw4w9WgXcQ"

  education: [
    {
      institution: "American International University-Bangladesh",
      degree: "Bachelor of Science in Computer Science and Engineering",
      location: "Dhaka, Bangladesh",
      // period: "Aug 2023 – Present",
    },
    {
      institution: "Dhaka College",
      degree: "Higher Secondary Certificate",
      location: "Dhaka, Bangladesh",
      // period: "Jun 2018 – Feb 2020",
      // grade: "GPA: 5.0 / 5.0",
    },
  ],

  research: [
    {
      role: "Undergraduate Thesis",
      institution: "American International University-Bangladesh",
      // period: "Nov 2025 – Present",
      title: "Do Heterogeneous Graph Neural Networks Improve Cross-Cohort Glioma Grading? A TCGA-CGGA Benchmark with Graph Ablation and Explainability",
      description:
        "Benchmarking heterogeneous graph neural networks against tabular baselines for cross-cohort glioma grading across TCGA and CGGA genomic datasets, with graph ablation and explainability analysis.",
      tags: ["GNN", "Graph Neural Networks", "PyTorch", "Python"],
    },
    {
      role: "NLP Research",
      institution: "American International University-Bangladesh",
      // period: "Apr 2026 – Present",
      title: "BanglaLLM — Custom Transformer Language Model",
      description:
        "Developing a custom transformer-based language model for Bangla text generation trained on a Bangla corpus with a custom-built tokenizer.",
      tags: ["NLP", "Transformers", "LLM", "Bangla"],
    },
  ],

  publications: [
    {
      title:
        "Explainable Machine Learning of Texture Signatures in Pancreatic Cancer via Leakage-Safe Radiomics and Rule Mining",
      conference: "ICEFronT",
      conferenceLink: "https://icefront.mbstu.ac.bd/",
      doi: "",
      status: "Accepted",   // e.g. Published · Accepted · Under Review · Submitted · In Preparation . Presented
      tags: ["Python", "Radiomics", "Medical Imaging"],
    },
    {
      title:
        "Commuting Pattern and Challenges Among Students in Dhaka City: An Analysis for Sustainable Urban Mobility",
      conference: "ICMAE 2025",
      conferenceLink: "https://conference.iium.edu.my/icmae/2024/",
      doi: "",
      status: "Presented",   // e.g. Published · Accepted · Under Review · Submitted · In Preparation . Presented
      tags: ["Python", "scikit-learn", "Data Analysis"],
    },
  ],

  projects: [
    {
      id: 1,
      title: "BanglaLLM",
      description:
        "Trained a 100M parameter LLM specifically for Bangla with a custom tokenizer with 16,000 vocabulary.",
      tags: ["Python", "Streamlit", "Hugging Face"],
      github: "https://github.com/smnafimniloy/banglallmDemo",
      demo: "https://demobanglallm.streamlit.app/",
      featured: true,
      icon: "🤖",
      category: "AI / NLP",
    },
    {
      id: 2,
      title: "EduTutor BD",
      description:
        "End-to-end RAG-based AI tutor for SSC students using Bengali textbooks with progress tracking.",
      tags: ["FastAPI", "OCR", "PHP", "LangChain"],
      github: "https://github.com/smnafimniloy/edu-tutorBD",
      demo: "#",
      featured: false,
      icon: "📚",
      category: "AI / NLP",
    },
    {
      id: 3,
      title: "Animal Image Classification",
      description:
        "Fine-tuned ResNet50 to classify 10 animal species. Achieved 96.59% validation accuracy via transfer learning and data augmentation.",
      tags: ["Python", "PyTorch", "Flask", "Streamlit"],
      github: "https://github.com/smnafimniloy/animal_image_classification_ResNet50",
      demo: "https://animalimageclassificationresnet50-gyvtphv5nivq8wbtedsgcu.streamlit.app/",
      featured: true,
      icon: "🐾",
      category: "AI / NLP",
    },
    {
      id: 4,
      title: "Smart Cafe",
      description:
        "Web app with MVC architecture, role-based access for Admin, Manager, and Customer with full CRUD for menus and inventory.",
      tags: ["PHP", "MySQL", "JavaScript"],
      github: "https://github.com/smnafimniloy/SmartCafe",
      featured: false,
      icon: "☕",
      category: "Web",
    },
    {
      id: 5,
      title: "EDA — Titanic Dataset",
      description:
        "Complete exploratory data analysis covering data cleaning, transformation, statistical computation, and visualization.",
      tags: ["Python", "pandas", "Matplotlib"],
      github: "https://github.com/smnafimniloy/TitanicProjectDataScience",
      featured: false,
      icon: "📊",
      category: "AI / NLP",
    },
    {
      id: 6,
      title: "Yum Yard",
      description:
        "Desktop food cart ordering app with role-based access for Admin, Cart Owner, and Customer built on .NET.",
      tags: ["C#", "MySQL", ".NET"],
      github: "https://github.com/smnafimniloy/YumYard_",
      featured: false,
      icon: "🍔",
      category: "Web",
    },
    // {
    //   id: 7,
    //   title: "QuickGrabbs",
    //   description:
    //     "Online food ordering Java GUI application with comprehensive and modular OOP implementation.",
    //   tags: ["Java"],
    //   github: "https://github.com/smnafimniloy",
    //   featured: false,
    //   icon: "🛍️",
    //   category: "Web",
    // },
  ],

  skills: {
    Languages: ["Java", "Python", "C/C++", "C#", "JavaScript", "PHP", "R", "HTML/CSS"],
    Frameworks: ["React", "Django", "FastAPI"],
    "ML / AI": ["GNN", "NLP", "Computer Vision", "RAG", "LLMs", "GAN"],
    Databases: ["PostgreSQL", "MySQL", "ChromaDB"],
    Tools: ["Git", "Linux", "VS Code", "Visual Studio", "PyCharm", "Jupyter Notebook"],
    Libraries: ["PyTorch", "TensorFlow", "scikit-learn", "Transformers", "pandas", "NumPy"],
  },

  repos: [
    {
      name: "banglallmDemo",
      description: "Custom transformer-based language model for Bangla text generation with a 16K vocabulary tokenizer.",
      language: "Python",
      stars: 0,
      forks: 0,
      updated: "2 days ago",
      github: "https://github.com/smnafimniloy/banglallmDemo",
    },
    {
      name: "edu-tutorBD",
      description: "End-to-end RAG-based AI tutor for SSC students using Bengali textbooks with progress tracking.",
      language: "Python",
      stars: 0,
      forks: 0,
      updated: "11 days ago",
      github: "https://github.com/smnafimniloy/edu-tutorBD",
    },
    {
      name: "animal_image_classification_ResNet50",
      description: "Animal classification with ResNet50 — 96.59% accuracy on custom dataset.",
      language: "Jupyter Notebook",
      stars: 0,
      forks: 0,
      updated: "10 months ago",
      github: "https://github.com/smnafimniloy/animal_image_classification_ResNet50",
    },
    {
      name: "SmartCafe",
      description: "Web application with MVC architecture and role-based access for Admin, Manager, and Customer.",
      language: "HTML",
      stars: 0,
      forks: 0,
      updated: "8 months ago",
      github: "https://github.com/smnafimniloy/SmartCafe",
    },
    {
      name: "TitanicProjectDataScience",
      description: "Complete exploratory data analysis of the Titanic dataset — cleaning, transformation, and visualization.",
      language: "Jupyter Notebook",
      stars: 0,
      forks: 0,
      updated: "7 months ago",
      github: "https://github.com/smnafimniloy/TitanicProjectDataScience",
    },
    {
      name: "QuickGrabbs",
      description: "A Java food ordering application with comprehensive and modular OOP implementation.",
      language: "Java",
      stars: 0,
      forks: 0,
      updated: "1 year ago",
      github: "https://github.com/smnafimniloy/QuickGrabbs",
    },
  ],

  volunteering: [
    {
      role: "Event Lead",
      event: "ACC CS FEST 2024",
      // period: "Apr 2024",
      points: [
        "Contributed to the successful execution of a four-day tech festival involving over 5,000 active campus participants.",
        "Supported smooth operation of a 12-segment competition including core programming contests, robo-soccer tasks, and project showcases.",
        "Coordinated participant registration, managed venue logs, and facilitated judge communications.",
      ],
    },
    {
      role: "Technical Support Volunteer",
      event: "D1 FIFA Royale 2023",
      // period: "Jun 2023",
      points: [
        "Provided on-ground technical support for the LAN grand finals of a national esports tournament at ICCB, Dhaka.",
        "Managed configuration diagnostics, hardware optimization checks, and peripheral device setups for tournament rigs.",
      ],
    },
  ],
};
