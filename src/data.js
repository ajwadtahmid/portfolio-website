export const PROJECTS = [
  {
    name: "Fabflix",
    tag: "Full-Stack · Cloud",
    desc: "Scalable movie-browsing web app on AWS with Apache Tomcat, Docker, and Kubernetes. Secure auth, Google reCAPTCHA, fuzzy search, and a load-balanced architecture with HTTPS via Let's Encrypt.",
    tech: ["Java", "AWS", "Docker", "Kubernetes", "MySQL", "JavaScript"],
    gh: "https://github.com/uci-jherold2-2025spring-cs122b/2025-spring-cs-122b-ajwad-122b",
  },
  {
    name: "Apex Companion",
    tag: "Cross-Platform · Mobile",
    desc: "Flutter app for Apex Legends with real-time map rotation alerts, player stat tracking, RP progression graphs, and multi-profile support. Ships on Android, iOS, Windows, and Linux.",
    tech: [
      "Flutter / Dart",
      "Riverpod",
      "Node.js",
      "Express",
      "GitHub Actions",
    ],
    gh: "https://github.com/ajwadtahmid/Unofficial-Apex-Companion",
  },
  {
    name: "SpydrNotes",
    tag: "Web App · Productivity",
    desc: "Collaborative note-taking app with real-time sync, markdown support, tag-based organisation, and full-text search. Features offline-first architecture via Service Workers.",
    tech: ["React", "Node.js", "Socket.io", "PostgreSQL", "IndexedDB"],
    gh: "https://github.com/ajwadtahmid/SpydrNotes",
  },
  {
    name: "Search Engine",
    tag: "Information Retrieval",
    desc: "Full-featured search engine with TF-IDF scoring, HTML tag analysis, bigram index, cosine similarity, and PageRank. Includes tokenization, lemmatization, and a GUI with built-in spell check.",
    tech: ["Python", "NLP", "TF-IDF", "Inverted Index", "PageRank"],
    gh: "https://github.com/ajwadtahmid/CompSci121",
  },
  {
    name: "Sentiment AI",
    tag: "Machine Learning · NLP",
    desc: "Fine-tuned BERT-based sentiment classifier achieving 93% accuracy on multi-domain reviews. REST API wrapper with batch inference, confidence scoring, and a React dashboard for live analysis.",
    tech: ["Python", "PyTorch", "HuggingFace", "FastAPI", "React"],
    gh: "https://github.com/ajwadtahmid/sentiment-ai",
  },
  {
    name: "VAE Recommender",
    tag: "Deep Learning · RecSys",
    desc: "Variational Autoencoder recommendation system trained on collaborative filtering data. Outperforms matrix factorisation baselines by 11% NDCG on the MovieLens 1M dataset.",
    tech: ["Python", "PyTorch", "VAE", "Collaborative Filtering", "NumPy"],
    gh: "https://github.com/ajwadtahmid/vae-recommender",
  },
];

export const SKILLS = [
  {
    cat: "Languages",
    items: [
      "Python",
      "C",
      "C++",
      "Java",
      "JavaScript",
      "TypeScript",
      "HTML",
      "CSS",
      "Dart",
      "Kotlin",
    ],
  },
  {
    cat: "Frameworks",
    items: [
      "React",
      "React Native",
      "Node.js",
      "Flask",
      "Express",
      "Flutter",
      "PyTorch",
      "HuggingFace",
      "Socket.io",
    ],
  },
  {
    cat: "Infrastructure",
    items: [
      "AWS",
      "Docker",
      "Kubernetes",
      "Linux",
      "MySQL",
      "PostgreSQL",
      "Apache Tomcat",
      "Maven",
    ],
  },
  {
    cat: "Tools & Practices",
    items: ["Git", "GitHub Actions", "Android Studio"],
  },
];

export const ROLES = [
  "Product Engineer.",
  "Full-Stack Developer.",
  "Cloud Architect.",
  "AI/ML Developer.",
];

export const RESUME_URL =
  "https://drive.google.com/file/d/1KMFSPUUP1jbwa9RSZxjZNKlxFUOfN_5X/view?usp=drive_link";

export const EXPERIENCE = [
  {
    type: "freelance",
    org: "Self-Employed",
    role: "Freelance Developer",
    location: "Remote",
    period: "Apr 2026 – Present",
    description:
      "Building personal projects and open-source tools while actively seeking clients.",
  },
  {
    type: "education",
    org: "University of California, Irvine",
    role: "B.S. Computer Science",
    location: "Irvine, CA",
    period: "Sept 2023 – June 2025",
    gpa: "3.78",
  },
  {
    type: "work",
    org: "NHK Laboratories Inc.",
    role: "Regulatory Affairs Associate",
    location: "Santa Fe Springs, CA",
    period: "Feb 2020 – Sept 2023",
    highlights: [
      "100+ Complaints Resolved",
      "30+ Audits Directed",
      "70+ SOPs Authored & Maintained",
    ],
  },
];

export const CONTACT_EMAIL = "contact@ajwadtahmid.com";

export const ABOUT_PILLS = [
  { icon: "graduation", text: "B.S. Computer Science — UCI, 2025" },
  { icon: "location", text: "Southern California · Open to Relocation" },
];

export const STATS = [
  { end: 1000, suf: "+", label: "GitHub Commits" },
  { end: 10, suf: "+", label: "Projects Shipped" },
  { end: 20, suf: "+", label: "Technologies" },
  { end: 3, suf: "+", label: "Years Building Software" },
];
