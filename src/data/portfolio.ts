// All portfolio data in one place — easy to update

export const personal = {
  name: 'Tharun Kumar S',
  title: 'Full Stack Developer',
  subtitle: 'Software Engineer & Builder',
  email: 'stharunkumar069@gmail.com',
  github: 'https://github.com/ATKTharun1807',
  linkedin: 'https://linkedin.com/in/tharun-kumar-s',
  location: 'Coimbatore, Tamil Nadu, India',
  institution: 'Sri Shakthi Institute of Engineering and Technology',
  cgpa: '7.57',
  degree: 'B.E Computer Science & Engineering',
  gradYear: '2027',
  bio: [
    "I'm a Computer Science & Engineering student specialising in Full Stack Development — passionate about building things that are both powerful and seamless.",
    "From pixel-perfect front-end experiences to scalable backend systems, I enjoy the full stack — the intersection where great design meets solid engineering.",
    "My interests span across Web Development, Cyber Security, Blockchain, and Artificial Intelligence."
  ],
  stats: [
    { label: 'Years Learning', value: 2, suffix: '+' },
    { label: 'Projects Built', value: 5, suffix: '+' },
    { label: 'Technologies', value: 20, suffix: '+' },
    { label: 'CGPA', value: 7.57, suffix: '', decimal: true },
  ],
  typingTexts: [
    'Building web applications',
    'Crafting digital experiences',
    'Architecting scalable systems',
    'Exploring AI and ML',
    'Writing clean, efficient code',
  ],
  voiceScript: [
    "Hi! I'm Tharun Kumar, a Full Stack Developer passionate about building modern, responsive, and user-friendly web applications.",
    "I'm currently pursuing my B.E in Computer Science and Engineering at Sri Shakthi Institute of Engineering, specialising in Cyber Security.",
    "My technical skills span React, Python, Java, Node.js, PostgreSQL, Docker, and AWS — covering the full stack from pixel-perfect frontends to scalable backends.",
    "I've built projects like Alumni Connect — an ML-powered student networking platform — Safe Pipe, an AI-powered secret leak detection tool for CI/CD pipelines, and VoteChain, a blockchain-based voting system.",
    "I'm deeply interested in Web Development, Cyber Security, Blockchain, and Artificial Intelligence.",
    "Thank you for visiting my portfolio. Let's build something amazing together!"
  ]
};

export const skills = {
  frontend: [
    { name: 'HTML / CSS', level: 90 },
    { name: 'JavaScript', level: 80 },
    { name: 'React', level: 78 },
    { name: 'Tailwind CSS', level: 85 },
    { name: 'Bootstrap', level: 75 },
  ],
  backend: [
    { name: 'Python', level: 85 },
    { name: 'Java', level: 78 },
    { name: 'Flask', level: 75 },
    { name: 'Node.js', level: 70 },
    { name: 'REST APIs', level: 82 },
  ],
  database: [
    { name: 'PostgreSQL', level: 78 },
    { name: 'MongoDB', level: 72 },
    { name: 'MySQL', level: 70 },
    { name: 'SQL', level: 80 },
  ],
  tools: [
    { name: 'Git / GitHub', level: 85 },
    { name: 'Docker', level: 65 },
    { name: 'Wireshark', level: 70 },
    { name: 'Nmap', level: 65 },
    { name: 'Linux', level: 72 },
  ],
};

export const techIcons = [
  { label: 'React', color: '#61DAFB', symbol: '⚛' },
  { label: 'Python', color: '#4B8BBE', symbol: '🐍' },
  { label: 'Java', color: '#F89820', symbol: '☕' },
  { label: 'Docker', color: '#2496ED', symbol: '🐳' },
  { label: 'AWS', color: '#FF9900', symbol: '☁' },
  { label: 'AI/ML', color: '#A855F7', symbol: '🤖' },
  { label: 'Node.js', color: '#68A063', symbol: '⬡' },
  { label: 'Git', color: '#F05032', symbol: '⎇' },
];

export const projects = [
  {
    id: 'alumni-connect',
    title: 'Alumni Connect',
    tagline: 'Digital Alumni Association Platform',
    description: 'A secure web and mobile platform connecting students and alumni for networking, mentorship, and career growth. Integrates an ML-powered Resume Analyzer.',
    features: ['ML-powered Resume Analyzer', 'Student Networking Hub', 'Alumni Mentorship System', 'Job Opportunities Board'],
    tech: ['React', 'Tailwind CSS', 'PostgreSQL', 'Machine Learning'],
    color: '#6ee7f7',
    period: '02/2026 — Present',
    demo: '#',
    github: '#',
    emoji: '🎓',
    gradient: 'from-cyan-500/20 to-blue-600/20',
  },
  {
    id: 'safe-pipe',
    title: 'Safe Pipe',
    tagline: 'AI-Powered Secret Leak Detection for CI/CD',
    description: 'An automated platform that scans repositories and CI/CD pipelines for secret leaks, providing AI-powered risk analysis and real-time alerts.',
    features: ['Automated Secret Detection', 'AI-Powered Risk Analysis', 'Repository Scanning Engine', 'Real-time Security Dashboard'],
    tech: ['Python', 'Flask', 'OpenAI API', 'Docker', 'PostgreSQL'],
    color: '#b56aff',
    period: '06/2025 — 11/2025',
    demo: '#',
    github: '#',
    emoji: '🔐',
    gradient: 'from-purple-500/20 to-pink-600/20',
  },
  {
    id: 'vote-chain',
    title: 'VoteChain',
    tagline: 'Blockchain-Based Voting Platform',
    description: 'A transparent, tamper-proof voting system using blockchain and smart contracts for secure elections with real-time result tracking.',
    features: ['Blockchain Authentication', 'Smart Contract Voting (Solidity)', 'Immutable Vote Records', 'Real-Time Result Dashboard'],
    tech: ['Blockchain', 'Solidity', 'React', 'Node.js', 'MongoDB'],
    color: '#4ade80',
    period: '12/2025 — 02/2026',
    demo: '#',
    github: '#',
    emoji: '⛓️',
    gradient: 'from-green-500/20 to-teal-600/20',
  },
];

export const education = [
  {
    degree: 'B.E Computer Science & Engineering (Cyber Security)',
    institution: 'Sri Shakthi Institute of Engineering and Technology',
    location: 'Coimbatore',
    period: '2023 — 2027',
    grade: 'CGPA: 7.57',
    status: 'current',
    tags: ['Full Stack Dev', 'Cyber Security', 'AI/ML', 'Blockchain'],
  },
  {
    degree: 'HSC (Higher Secondary Certificate)',
    institution: 'R.J Matriculation Hr. Sec. School',
    location: '',
    period: '2023',
    grade: 'Percentage: 78.5%',
    status: 'completed',
    tags: [],
  },
];

export const certifications = [
  { name: 'Introduction to Blockchain', issuer: 'Simplilearn', icon: '⛓️' },
  { name: 'Python for Beginner', issuer: 'Simplilearn', icon: '🐍' },
  { name: 'Introduction to Blockchain', issuer: 'NPTEL — IIT', icon: '🔗' },
  { name: 'Python for Everybody', issuer: 'Coursera — Univ. of Michigan', icon: '📚' },
];
