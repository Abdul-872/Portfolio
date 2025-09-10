const projectsData = [
  {
    id: "ai-code-reviewer",
    title: "AI Code Reviewer",
    short: "AI-powered code review tool with automated suggestions and best practices",
    description:
      "An intelligent code review application that uses AI to analyze code quality, suggest improvements, and enforce coding standards. Features real-time analysis, integration with popular IDEs, and customizable rule sets for different programming languages.",
    tech: ["React", "Node.js", "OpenAI API", "MongoDB", "Express"],
    github: "https://github.com/Abdul-872/Ai-code-Review.git",
    live: "https://ai-code-reviewer-swart-psi.vercel.app",
    tags: ["fullstack", "frontend", "backend"],
    features: [
      "Real-time code analysis and suggestions",
      "Support for multiple programming languages",
      "Integration with VS Code and other IDEs",
      "Customizable coding standards and rules",
      "Team collaboration and code sharing",
      "Performance metrics and improvement tracking",
    ],
    challenges:
      "Integrating AI models for accurate code analysis, handling large codebases efficiently, and creating intuitive user interfaces for complex technical feedback.",
  },
  {
    id: "ats-score-checker",
    title: "ATS Score Checker",
    short: "Resume optimization tool that analyzes ATS compatibility and provides improvement suggestions",
    description:
      "A comprehensive resume analysis tool that helps job seekers optimize their resumes for Applicant Tracking Systems (ATS). Features keyword analysis, formatting suggestions, and industry-specific recommendations to improve resume visibility.",
    tech: ["React", "Puterjs", "GEMINI API", "Tailwind"],
    github: "https://github.com/Abdul-872/ATS-Resume-Analyze.git",
    live: "https://ats-resume-analyze.vercel.app",
    tags: ["fullstack", "frontend", "backend"],
    features: [
      "ATS compatibility scoring and analysis",
      "Keyword optimization suggestions",
      "Industry-specific resume templates",
      "Real-time formatting feedback",
      "Job description matching analysis",
      "Export optimized resume in multiple formats",
    ],
    challenges:
      "Implementing accurate NLP algorithms for resume parsing, creating comprehensive ATS scoring metrics, and building user-friendly interfaces for complex optimization feedback.",
  },
  {
    id: "todo-fetch-api",
    title: "TODO App with Fetch API",
    short: "Modern todo application with RESTful API integration and real-time updates",
    description:
      "A feature-rich todo application built with vanilla JavaScript and modern web APIs. Includes task management, categories, due dates, and real-time synchronization with a RESTful backend API using the Fetch API for seamless data operations.",
    tech: ["JavaScript", "HTML5", "CSS3", "Fetch API", "Local Storage"],
    github: "https://github.com/Abdul-872/todo-fetch-api",
    live: "https://todo-fetch-api.vercel.app",
    tags: ["frontend"],
    features: [
      "Create, edit, and delete tasks with categories",
      "Due date tracking and notifications",
      "Local storage for offline functionality",
      "RESTful API integration with Fetch",
      "Responsive design for all devices",
      "Dark/Light theme support",
    ],
    challenges:
      "Implementing efficient state management without frameworks, handling offline/online synchronization, and creating smooth user interactions with vanilla JavaScript.",
  },
  {
    id: "personal-portfolio",
    title: "Personal Portfolio",
    short: "Modern, responsive portfolio showcasing projects and skills with interactive animations",
    description:
      "A professional portfolio website featuring modern design principles, smooth animations, and interactive elements. Built with performance and accessibility in mind, showcasing projects, skills, and professional experience with an elegant user interface.",
    tech: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "Animations"],
    github: "https://github.com/Abdul-872/personal-portfolio",
    live: "https://abdulahad-portfolio.vercel.app",
    tags: ["frontend"],
    features: [
      "Interactive project showcase with filtering",
      "Smooth scroll navigation and animations",
      "Dark/Light theme with system preference",
      "Contact form with client-side validation",
      "SEO optimized with proper meta tags",
      "Fully accessible and keyboard navigable",
    ],
    challenges:
      "Creating engaging animations while maintaining performance, implementing accessible interactions, and ensuring cross-browser compatibility with modern web standards.",
  },
  {
    id: "chat-application",
    title: "Chat Application",
    short: "Real-time messaging app with Socket.io, user authentication, and group chat features",
    description:
      "A modern real-time chat application featuring instant messaging, group chats, user authentication, and file sharing. Built with Socket.io for real-time communication, React for the frontend, and Node.js for the backend with comprehensive user management.",
    tech: ["React", "Socket.io", "Node.js", "Express", "MongoDB"],
    github: "https://github.com/Abdul-872/chat-application",
    live: "https://chat-app-demo.vercel.app",
    tags: ["fullstack", "frontend", "backend"],
    features: [
      "Real-time messaging with Socket.io",
      "User authentication and profiles",
      "Group chat creation and management",
      "File and image sharing capabilities",
      "Message history and search functionality",
      "Online status and typing indicators",
    ],
    challenges:
      "Implementing efficient real-time communication, managing complex user states across multiple chat rooms, and ensuring message delivery reliability in various network conditions.",
  },
]

// Export for use in main.js
if (typeof module !== "undefined" && module.exports) {
  module.exports = projectsData
} else {
  window.projectsData = projectsData
}
