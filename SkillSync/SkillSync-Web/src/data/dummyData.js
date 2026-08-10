// SkillSync Initial Seed & Storage Utility
const STORAGE_KEY = 'skillsync_data_v1';
const CURRENT_USER_KEY = 'skillsync_current_user_v1';

export const INITIAL_DATA = {
  users: [
    {
      userId: 1,
      name: "Alex Vance",
      email: "alex@skillsync.io",
      password: "password123",
      mentor: true,
      title: "Senior Full Stack Engineer @ Google",
      bio: "Passionate about building scalable distributed systems and mentoring upcoming engineers in React & Java.",
      skills: [
        { name: "Java", proficiency: "Expert" },
        { name: "React", proficiency: "Expert" },
        { name: "Spring Boot", proficiency: "Intermediate" },
        { name: "System Design", proficiency: "Expert" }
      ],
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250"
    },
    {
      userId: 2,
      name: "Sophia Chen",
      email: "sophia@skillsync.io",
      password: "password123",
      mentor: true,
      title: "AI Research Scientist @ Meta",
      bio: "Focusing on Deep Learning, PyTorch, and NLP models. Always eager to collaborate on open-source ML projects.",
      skills: [
        { name: "Python", proficiency: "Expert" },
        { name: "PyTorch", proficiency: "Expert" },
        { name: "Machine Learning", proficiency: "Expert" },
        { name: "Algorithms", proficiency: "Intermediate" }
      ],
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=250"
    },
    {
      userId: 3,
      name: "Marcus Johnson",
      email: "marcus@skillsync.io",
      password: "password123",
      mentor: false,
      title: "Software Developer @ Amazon",
      bio: "Cloud architecture enthusiast, AWS certified practitioner, and backend microservices builder.",
      skills: [
        { name: "AWS", proficiency: "Expert" },
        { name: "Java", proficiency: "Intermediate" },
        { name: "Docker", proficiency: "Intermediate" },
        { name: "SQL", proficiency: "Expert" }
      ],
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250"
    },
    {
      userId: 4,
      name: "Elena Rostova",
      email: "elena@skillsync.io",
      password: "password123",
      mentor: false,
      title: "Frontend Architect @ Microsoft",
      bio: "Crafting beautiful UI designs, accessible web components, and ultra-fast web experiences.",
      skills: [
        { name: "React", proficiency: "Expert" },
        { name: "TypeScript", proficiency: "Expert" },
        { name: "CSS/Sass", proficiency: "Expert" },
        { name: "UI/UX", proficiency: "Intermediate" }
      ],
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=250"
    }
  ],
  clubs: [
    {
      clubId: 101,
      clubName: "Google Tech Guild",
      companyName: "Google",
      description: "A hub for engineers preparing for Google interviews, discussing internal technology stacks, Go, Android, and Cloud.",
      logo: "https://pngimg.com/uploads/google/google_PNG19635.png",
      creator: { userId: 1, name: "Alex Vance" },
      members: [
        { userId: 1, name: "Alex Vance" },
        { userId: 2, name: "Sophia Chen" },
        { userId: 3, name: "Marcus Johnson" }
      ],
      discussionPosts: [
        {
          id: 1,
          title: "Tips for Google System Design Round in 2026",
          content: "Focus heavily on rate limiters, distributed caching, and consistency trade-offs (CAP theorem). Practice drawing clean diagrams!",
          authorName: "Alex Vance",
          createdAt: "2 hours ago"
        },
        {
          id: 2,
          title: "Go vs Java microservices benchmarks",
          content: "We conducted latency tests across gRPC services. Go had faster initial startup but Java 21 virtual threads outperformed in concurrency!",
          authorName: "Marcus Johnson",
          createdAt: "1 day ago"
        }
      ],
      resources: [
        {
          id: 1,
          title: "Google Technical Interview Handbook PDF",
          url: "https://github.com/yangshun/tech-interview-handbook",
          category: "Guide",
          postedBy: "Alex Vance"
        },
        {
          id: 2,
          title: "Distributed Systems Reading List",
          url: "https://github.com/aphyr/riemann",
          category: "Documentation",
          postedBy: "Sophia Chen"
        }
      ],
      interviewExperiences: [
        {
          id: 1,
          company: "Google",
          role: "L5 Senior Software Engineer",
          experience: "4 technical rounds + 1 Googliness round. Coding questions focused on Graph BFS/DFS and Segment Trees. System design was real-time collaborative document editor.",
          rating: "4.8",
          sharedBy: "Alex Vance",
          date: "Aug 2026"
        }
      ]
    },
    {
      clubId: 102,
      clubName: "Amazon Cloud Masters",
      companyName: "Amazon",
      description: "Dedicated to Amazon Leadership Principles, AWS Serverless architectures, DynamoDB optimizations, and SDE prep.",
      logo: "https://pngimg.com/uploads/amazon/amazon_PNG27.png",
      creator: { userId: 3, name: "Marcus Johnson" },
      members: [
        { userId: 3, name: "Marcus Johnson" },
        { userId: 1, name: "Alex Vance" }
      ],
      discussionPosts: [
        {
          id: 1,
          title: "How to answer 'Bias for Action' in behavioral round",
          content: "Use the STAR method! Clearly outline a situation where quick decision-making prevented customer impact.",
          authorName: "Marcus Johnson",
          createdAt: "3 days ago"
        }
      ],
      resources: [
        {
          id: 1,
          title: "AWS Well-Architected Framework",
          url: "https://aws.amazon.com/architecture/well-architected/",
          category: "Architecture",
          postedBy: "Marcus Johnson"
        }
      ],
      interviewExperiences: [
        {
          id: 1,
          company: "Amazon",
          role: "Software Development Engineer II",
          experience: "Bar Raiser round was intense on Customer Obsession. Technical questions included Object Oriented Design for an elevator system.",
          rating: "4.5",
          sharedBy: "Marcus Johnson",
          date: "Jul 2026"
        }
      ]
    },
    {
      clubId: 103,
      clubName: "Meta AI & Web Collective",
      companyName: "Meta",
      description: "Exploring PyTorch, React 19, Graph API, and modern Web Performance at scale.",
      logo: "https://pngimg.com/uploads/meta/meta_PNG12.png",
      creator: { userId: 2, name: "Sophia Chen" },
      members: [
        { userId: 2, name: "Sophia Chen" },
        { userId: 4, name: "Elena Rostova" }
      ],
      discussionPosts: [
        {
          id: 1,
          title: "React Server Components best practices",
          content: "Make sure you decouple client state from server fetching boundaries for optimum TTFB.",
          authorName: "Elena Rostova",
          createdAt: "Yesterday"
        }
      ],
      resources: [
        {
          id: 1,
          title: "PyTorch 2.x Performance Tuning Guide",
          url: "https://pytorch.org/docs/stable/index.html",
          category: "ML Guide",
          postedBy: "Sophia Chen"
        }
      ],
      interviewExperiences: [
        {
          id: 1,
          company: "Meta",
          role: "E5 Machine Learning Engineer",
          experience: "Deep dive into Transformer architectures, KV-caching memory footprint calculation, and live coding on LC Hard DP problem.",
          rating: "4.9",
          sharedBy: "Sophia Chen",
          date: "Jun 2026"
        }
      ]
    }
  ],
  projects: [
    {
      projectId: 201,
      projectName: "SkillSync Core Engine",
      description: "Building an asynchronous skill graph recommendation microservice using Java & Spring Boot.",
      skillsRequired: ["Java", "Spring Boot", "Graph DB"],
      owner: { userId: 1, name: "Alex Vance" },
      members: [
        { userId: 1, name: "Alex Vance" },
        { userId: 3, name: "Marcus Johnson" }
      ],
      discussions: [
        { id: 1, sender: "Alex Vance", content: "Hey team, welcome to the project! Let's prioritize the graph node indexing service.", timestamp: "10:30 AM" },
        { id: 2, sender: "Marcus Johnson", content: "Sounds great! I'll set up the Dockerized Neo4j container today.", timestamp: "10:45 AM" }
      ],
      resources: [
        { id: 1, title: "Graph Matching Algorithm Specs", link: "https://github.com", type: "Doc" }
      ],
      tasks: [
        { id: 1, title: "Set up Java Spring Boot scaffold", assignedTo: "Alex Vance", completed: true },
        { id: 2, title: "Implement Skill Graph Node Data Structure", assignedTo: "Alex Vance", completed: true },
        { id: 3, title: "Configure Neo4j & Docker Compose", assignedTo: "Marcus Johnson", completed: false },
        { id: 4, title: "Build REST API for Mentor Recommendations", assignedTo: "Unassigned", completed: false }
      ]
    },
    {
      projectId: 202,
      projectName: "AI Resume & Portfolio Synthesizer",
      description: "An automated tool using PyTorch and LLM APIs to match user skill profiles with corporate job descriptions.",
      skillsRequired: ["Python", "PyTorch", "React"],
      owner: { userId: 2, name: "Sophia Chen" },
      members: [
        { userId: 2, name: "Sophia Chen" },
        { userId: 4, name: "Elena Rostova" }
      ],
      discussions: [
        { id: 1, sender: "Sophia Chen", content: "Initial embeddings pipeline is online!", timestamp: "Yesterday" }
      ],
      resources: [
        { id: 1, title: "Embedding Vector Model Benchmark", link: "https://huggingface.co", type: "Notebook" }
      ],
      tasks: [
        { id: 1, title: "Tokenize input resume PDF files", assignedTo: "Sophia Chen", completed: true },
        { id: 2, title: "Design React Dashboard UI for Results", assignedTo: "Elena Rostova", completed: false }
      ]
    }
  ],
  notifications: [
    { id: 1, message: "Marcus Johnson joined Amazon Cloud Masters club.", type: "club", time: "10 mins ago", read: false },
    { id: 2, message: "New interview experience posted in Google Tech Guild.", type: "interview", time: "1 hour ago", read: false },
    { id: 3, message: "Task 'Implement Skill Graph Node Data Structure' marked completed.", type: "task", time: "3 hours ago", read: true }
  ]
};

export const getStoredData = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DATA));
    return INITIAL_DATA;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return INITIAL_DATA;
  }
};

export const saveStoredData = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const getCurrentUser = () => {
  const storedUser = localStorage.getItem(CURRENT_USER_KEY);
  if (!storedUser) {
    const defaultUser = INITIAL_DATA.users[0]; // Alex Vance default
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(defaultUser));
    return defaultUser;
  }
  try {
    return JSON.parse(storedUser);
  } catch (e) {
    return INITIAL_DATA.users[0];
  }
};

export const setCurrentUser = (user) => {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
};
