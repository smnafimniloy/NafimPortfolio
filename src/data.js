export const data = {
  name: "S M Nafim Niloy",
  subtitle: "CS undergrad · Researcher",
  bio: "Final-year Computer Science undergraduate with hands-on research in heterogeneous graph neural networks, medical imaging, and Bengali NLP. Experienced in end-to-end ML pipelines, cross-cohort evaluation, and reproducible experimentation.",
  location: "Basundhara R/A, Dhaka",
  email: "smnafimniloy@gmail.com",
  papers: 2,
  projectCount: "7+",
  repoCount: 24,
  github: "https://github.com/smnafimniloy",
  linkedin: "https://linkedin.com/in/nafimniloy",
  resume: "#",

  education: [
    {
      institution: "American International University-Bangladesh",
      degree: "Bachelor of Science in Computer Science and Engineering",
      location: "Dhaka, Bangladesh",
      // period: "Aug 2023 – Present",
    },
    {
      institution: "Dhaka College",
      degree: "Higher Secondary Certificate (Science)",
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
      title: "Cross-Cohort Generalization of Heterogeneous Graph Neural Networks for Glioma Grading Using TCGA and CGGA Genomic Cohorts",
      description:
        "Investigating cross-cohort generalization of heterogeneous GNNs for glioma grading using TCGA and CGGA genomic cohorts.",
      tags: ["GNN", "Graph Neural Networks", "Medical Imaging", "PyTorch", "Python"],
    },
    {
      role: "NLP Research",
      institution: "American International University-Bangladesh",
      // period: "Apr 2026 – Present",
      title: "BanglaLLM — Custom Transformer Language Model",
      description:
        "Developing a custom transformer-based language model for Bangla text generation trained on a Bangla corpus with a custom-built tokenizer (16K vocabulary).",
      tags: ["NLP", "Transformers", "LLM", "Bangla", "Hugging Face"],
    },
  ],

  publications: [
    {
      title:
        "Explainable Machine Learning of Texture Signatures in Pancreatic Cancer via Leakage-Safe Radiomics and Rule Mining",
      conference: "ICEFronT",
      conferenceLink: "https://icefront.mbstu.ac.bd/",   
      doi: "",               
      tags: ["Python", "Radiomics", "Medical Imaging"],
    },
    {
      title:
        "Commuting Pattern and Challenges Among Students in Dhaka City: An Analysis for Sustainable Urban Mobility",
      conference: "ICMAE 2025",
      conferenceLink: "https://conference.iium.edu.my/icmae/2024/",   
      doi: "",              
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
      github: "https://github.com/smnafimniloy",
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
      github: "https://github.com/smnafimniloy",
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
      github: "https://github.com/smnafimniloy",
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
      github: "https://github.com/smnafimniloy",
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
      github: "https://github.com/smnafimniloy",
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
      github: "https://github.com/smnafimniloy",
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
    Tools: ["Git", "VS Code", "Visual Studio", "PyCharm", "Jupyter Notebook"],
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
