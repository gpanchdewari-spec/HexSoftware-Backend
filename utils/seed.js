import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import connectDB from "../config/db.js";
import Admin from "../models/Admin.js";
import Service from "../models/Service.js";
import Project from "../models/Project.js";
import Job from "../models/Job.js";
import Internship from "../models/Internship.js";
import Testimonial from "../models/Testimonial.js";
import Certificate from "../models/Certificate.js";
dotenv.config();
await connectDB();
await Promise.all([
  Admin.deleteMany(),
  Service.deleteMany(),
  Project.deleteMany(),
  Job.deleteMany(),
  Internship.deleteMany(),
  Testimonial.deleteMany(),
  Certificate.deleteMany(),
]);
await Admin.create({
  email: "admin@hexsoftwares.com",
  password: await bcrypt.hash("Admin@123", 10),
});
const servicesData = [
  {
    title: "Web Development",
    description:
      "High-performance websites and product experiences built for speed, scalability, and business growth.",

    features: [
      "Responsive website development",
      "Custom web application development",
      "REST API integration",
      "Authentication and authorization",
      "Admin dashboard development",
      "Database integration",
      "Performance optimization",
      "Deployment and launch support",
    ],

    technologies: [
      "React.js",
      "JavaScript",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "Axios",
      "JWT",
    ],
  },

  {
    title: "Mobile App Development",
    description:
      "Modern mobile products with polished UX, reliable backend integration, and scalable architecture.",

    features: [
      "Custom mobile application development",
      "Responsive mobile interfaces",
      "User authentication",
      "REST API integration",
      "Push notification integration",
      "Cloud database integration",
      "Payment gateway integration",
      "Application testing and deployment",
    ],

    technologies: [
      "React Native",
      "JavaScript",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "Axios",
      "JWT",
      "Cloudinary",
    ],
  },

  {
    title: "Custom Software Development",
    description:
      "Business software designed around real workflows, operations, and unique organizational requirements.",

    features: [
      "Custom business applications",
      "Workflow automation",
      "Role-based access control",
      "Admin management systems",
      "REST API development",
      "Third-party API integration",
      "Reporting and analytics",
      "Database design and management",
    ],

    technologies: [
      "React.js",
      "JavaScript",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "Axios",
      "JWT",
    ],
  },

  {
    title: "UI/UX Design",
    description:
      "Human-centered interfaces with clear design systems, intuitive navigation, and engaging user experiences.",

    features: [
      "User experience research",
      "User flow planning",
      "Wireframe design",
      "Website UI design",
      "Mobile application UI design",
      "Dashboard UI design",
      "Interactive prototypes",
      "Responsive design systems",
    ],

    technologies: [
      "Figma",
      "Adobe XD",
      "Adobe Photoshop",
      "Adobe Illustrator",
      "HTML",
      "CSS",
      "Tailwind CSS",
    ],
  },

  {
    title: "Artificial Intelligence Solutions",
    description:
      "Practical AI features that improve products, automate operations, and create smarter digital experiences.",

    features: [
      "Generative AI integration",
      "AI chatbot development",
      "Business process automation",
      "Natural language processing",
      "Recommendation systems",
      "Intelligent search",
      "Document analysis",
      "AI-powered data insights",
    ],

    technologies: [
      "Python",
      "OpenAI API",
      "Machine Learning",
      "TensorFlow",
      "Node.js",
      "Express.js",
      "MongoDB",
      "REST APIs",
    ],
  },

  {
    title: "Cloud Solutions",
    description:
      "Cloud-ready systems built to scale with demand while maintaining reliability, performance, and availability.",

    features: [
      "Cloud application deployment",
      "Cloud infrastructure setup",
      "Backend API deployment",
      "Database deployment",
      "Cloud storage integration",
      "Environment configuration",
      "Scalable architecture",
      "Application monitoring",
    ],

    technologies: [
      "AWS",
      "MongoDB Atlas",
      "Cloudinary",
      "Docker",
      "Node.js",
      "Express.js",
      "Render",
      "Vercel",
    ],
  },

  {
    title: "Digital Marketing",
    description:
      "Data-led digital campaigns and strategies designed for measurable growth, visibility, and customer engagement.",

    features: [
      "Search engine optimization",
      "Social media marketing",
      "Content marketing",
      "Keyword research",
      "Competitor analysis",
      "Website SEO audits",
      "Campaign management",
      "Performance reporting",
    ],

    technologies: [
      "Google Analytics",
      "Google Search Console",
      "Google Ads",
      "Meta Business Suite",
      "SEO Tools",
      "Canva",
    ],
  },

  {
    title: "IT Consulting",
    description:
      "Technical guidance for software architecture, technology selection, scalability, and digital strategy.",

    features: [
      "Technology consultation",
      "Software architecture planning",
      "Technology stack selection",
      "Application modernization",
      "Digital transformation planning",
      "Database architecture",
      "Cloud strategy",
      "Development roadmap",
    ],

    technologies: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "AWS",
      "Docker",
      "Git",
      "GitHub",
    ],
  },
];

const services = servicesData.map((service) => ({
  title: service.title,
  description: service.description,
  features: service.features,
  technologies: service.technologies,
}));

await Service.insertMany(services);

console.log("Services seeded successfully");
const cats = [
  "Web",
  "Mobile",
  "AI",
  "Software",
  "UI/UX",
  "Web",
  "AI",
  "Software",
];
await Project.insertMany(
  cats.map((category, i) => ({
    title: [
      "Nexora Commerce",
      "PulseCare Mobile",
      "Vision AI Desk",
      "FlowOps ERP",
      "Orbit Design System",
      "Campus Connect",
      "Insight Copilot",
      "Ledger Cloud",
    ][i],
    category,
    description:
      "A focused digital product created to simplify complex user journeys and support scalable business growth.",
    stack: ["React", "Node.js", "Express.js", "MongoDB"],
    results: [
      "38% faster customer journey",
      "2.1× repeat engagement",
      "62% less manual review",
      "31% faster operations",
      "45% faster design delivery",
      "28% higher engagement",
      "9 hrs saved weekly",
      "40% faster reporting",
    ][i],
  })),
);
await Job.insertMany(
  [
    "MERN Stack Developer",
    "Frontend Developer",
    "Backend Developer",
    "UI/UX Designer",
    "QA Engineer",
    "Business Development Executive",
  ].map((title, i) => ({
    title,
    location: i % 2 ? "Remote" : "Lucknow",
    jobType: "Full-time",
    experience: i < 2 ? "0-2 years" : "2+ years",
    skills: ["Communication", "Problem solving", "Git"],
    description:
      "Join a collaborative team building reliable digital products.",
    status: "open",
  })),
);
const domains = [
  "Web Development",
  "MERN Stack",
  "React Development",
  "Node.js Development",
  "Python",
  "Java",
  "UI/UX",
  "Artificial Intelligence",
  "Machine Learning",
  "Digital Marketing",
];
await Internship.insertMany(
  domains.map((domain, i) => ({
    title: `${domain} Internship`,
    domain,
    duration: i % 3 === 0 ? "1 Month" : i % 3 === 1 ? "3 Months" : "6 Months",
    mode: i % 2 ? "Remote" : "Hybrid",
    description:
      "Work on guided, practical assignments and portfolio-ready deliverables.",
    skills: ["Learning mindset", "Communication"],
    status: "open",
  })),
);
await Testimonial.insertMany(
  [
    "Aarav Mehta",
    "Neha Kapoor",
    "Rohan Verma",
    "Ishita Sen",
    "Kabir Malhotra",
    "Sara Khan",
    "Dev Patel",
    "Ananya Rao",
  ].map((name, i) => ({
    name,
    position: i % 2 ? "Product Lead" : "Founder",
    company: [
      "Northstar Labs",
      "GreenCart",
      "Finly",
      "EduGrid",
      "CloudNova",
      "Careloop",
      "MetricOne",
      "StudioMint",
    ][i],
    message:
      "The team combined clear communication with strong execution and delivered a polished product experience.",
    rating: 5,
  })),
);
await Certificate.insertMany(
  Array.from({ length: 10 }, (_, i) => ({
    certificateId: `HX2026${String(i + 1).padStart(4, "0")}`,
    studentName: [
      "Aditi Sharma",
      "Rahul Singh",
      "Meera Joshi",
      "Arjun Kumar",
      "Naina Gupta",
      "Kunal Das",
      "Riya Jain",
      "Vivaan Shah",
      "Sana Ali",
      "Aditya Roy",
    ][i],
    domain: domains[i],
    duration: "3 Months",
    issueDate: new Date("2026-06-30"),
    status: "verified",
  })),
);
console.log("Seed complete. Admin: admin@hexsoftwares.com / Admin@123");
process.exit(0);
