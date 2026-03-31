/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "motion/react";
import {
  ArrowRight, ArrowUpRight, Check, Download, Mail, Github, ExternalLink,
  PenTool, Code2, Wind, Zap, Terminal, Database, Cloud, Layers, Cpu,
  ShieldCheck, BarChart3, Globe, Palette, Layout, Image,
  Twitter, Linkedin, Instagram, Heart, Menu, X, Send
} from "lucide-react";
import FluidMagnetic from "./components/FluidMagnetic";
import emailjs from '@emailjs/browser';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent">("idle");
  const formRef = useRef<HTMLFormElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Magnetic effect for the "Hello" bubble
  const bubbleRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!bubbleRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = bubbleRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;

    // Only apply if mouse is relatively close (optional, but good for feel)
    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
    if (distance < 150) {
      mouseX.set(distanceX * 0.5);
      mouseY.set(distanceY * 0.5);
    } else {
      mouseX.set(0);
      mouseY.set(0);
    }
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const marqueeSkills = [
    "SWE",
    "BACKEND DEVELOPMENT",
    "AI APPLICATIONS",
    "RAG PIPELINES",
    "LLM's",
    "PROBLEM SOLVING",
    "AWS",
    "DOCKER",
    "GIT",
    "PYTHON",
    "JAVASCRIPT",
    "DBMS",
    "TAILWIND",
    "FIGMA",
    "LINUX",
    "SERVERS",
    "DEPLOYMENT",
  ];

  const skills = [
    { title: "Python", icon: Terminal, category: "Language", level: "Advanced", color: "from-indigo-500/20 to-purple-500/20" },
    { title: "C++", icon: Cpu, category: "Language", level: "Expert", color: "from-indigo-500/20 to-purple-500/20" },
    { title: "JavaScript", icon: Code2, category: "Language", level: "Intermediate", color: "from-indigo-500/20 to-purple-500/20" },
    { title: "CSS", icon: Wind, category: "Styling", level: "Intermediate", color: "from-indigo-500/20 to-purple-500/20" },
    { title: "HTML", icon: Layout, category: "Frontend", level: "Intermediate", color: "from-indigo-500/20 to-purple-500/20" },
    { title: "Linux", icon: Terminal, category: "OS", level: "Advanced", color: "from-indigo-500/20 to-purple-500/20" },
    { title: "MySQL", icon: Database, category: "Database", level: "Intermediate", color: "from-indigo-500/20 to-purple-500/20" },
    { title: "AWS", icon: Cloud, category: "Cloud", level: "Intermediate", color: "from-indigo-500/20 to-purple-500/20" },
    { title: "Docker", icon: Layers, category: "DevOps", level: "Advanced", color: "from-indigo-500/20 to-purple-500/20" },
    { title: "DSA", icon: Cpu, category: "Core Skill", level: "Expert", color: "from-indigo-500/20 to-purple-500/20" },
    { title: "LLMs", icon: Zap, category: "AI/ML", level: "Expert", color: "from-indigo-500/20 to-purple-500/20" },
    { title: "APIs", icon: Globe, category: "Backend", level: "Intermediate", color: "from-indigo-500/20 to-purple-500/20" },
  ];

  const projects = [
    {
      title: "Civic Connect",
      description: " built Smart City Reporter — a civic platform where anyone can report an issue or upvote existing ones with zero login required. Proof of resolution is provided by civil workers — creating full transparency between citizens and the government.",
      image: "/civic.png",
      githubUrl: "#",
      demoUrl: "http://civicconnect.xo.je",
      tags: ["FastAPI", "Jinja2", "SQLite", "Docker", "CI/CD"]
    },
    {
      title: "Hybrid RAG Bot",
      description: "This project is an advanced, multi-format (PDF, CSV, XML) Question-Answering (QA) chatbot that runs 100% locally on your machine.It features an Ultimate Hybrid RAG Pipeline that uses a Smart Router to intelligently decide between Tesseract (fast OCR) and a multimodal vision model (LLaVA) to analyze text, scanned documents, charts, and images.",
      image: "/rag.png",
      githubUrl: "https://github.com/Yadnesh26/Hybrid-RAG-Bot",
      tags: ["RAG", "LLM", "LangChain", "Ollama", "Tesseract"]
    },
    {
      title: "Glide View",
      description: "GlideView, an Android application prototype designed to address the common issue of motion sickness while reading on mobile devices in transit. This project explores using a device's gyroscope to create a more stable and comfortable viewing experience.",
      image: "/glideview.png",
      githubUrl: "https://github.com/Yadnesh26/GlideView-Android-AppStabilizer",
      tags: ["Android", "Kotlin", "Gyroscope", "Jetpack Compose"]
    },
    {
      title: "Task Board",
      description: "Full-featured task management and productivity application built from the ground up — with performance, responsiveness, and user experience at its core.",
      image: "/taskboard.png",
      githubUrl: "https://github.com/Yadnesh26/Taskboard-",
      demoUrl: "https://68861f93e970603e4f3f3007--taskboard-managing-site.netlify.app/",
      tags: ["React", "Tailwind", "git"]
    },
    {
      title: "AI Interview Copilot",
      description: "AI assistant that helps HR teams and interviewers generate structured, role-specific pre-interview reports from resumes, LinkedIn profiles, and project portfolios!",
      image: "/interview.png",
      githubUrl: "https://github.com/Yadnesh26/Taskboard-",
      tags: ["LLMs", "Data Extraction", "Data Processing"]
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Update scroll progress
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      setScrollProgress((currentScroll / totalScroll) * 100);

      const sections = ["home", "about", "skills", "projects", "contact"];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setFormStatus("sending");

    emailjs.sendForm(
      'service_zejw9in',
      'template_6q0nsbm',
      formRef.current,
      'jKiwYWLXPgwhFpWlt'
    ).then(() => {
      setFormStatus("sent");
      setTimeout(() => setFormStatus("idle"), 5000);
      if (formRef.current) formRef.current.reset();
    }).catch((error) => {
      console.error('Email sending failed:', error);
      setFormStatus("idle");
      alert('Failed to send message. Please try again later.');
    });
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black font-sans selection:bg-purple-500/30">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-[60] h-1 origin-left bg-gradient-to-r from-purple-500 via-blue-500 to-red-500"
        style={{ scaleX: scrollProgress / 100 }}
      />

      {/* Atmospheric Background Glows */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[20%] h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-[120px]" />
        <div className="absolute top-[10%] right-[10%] h-[400px] w-[400px] rounded-full bg-purple-600/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[10%] h-[600px] w-[600px] rounded-full bg-red-600/10 blur-[150px]" />
      </div>

      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-50 px-6 py-6 backdrop-blur-md md:px-12">
        <div className="mx-auto flex max-w-7xl w-full items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold tracking-tighter"
          >
            Portfolio <span className="ml-1 h-1 w-8 bg-white/20 inline-block align-middle"></span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden items-start gap-12 md:flex">
            {[
              { label: "DSA", desc: "See my compitative programming profile", href: "https://leetcode.com/u/yadnesh26/", id: "dsa" },
              { label: "My Projects", desc: "See all of nice project I have done.", href: "#projects", id: "projects" },
              { label: "About Me", desc: "Learn about my self what i do", href: "#about", id: "about" },
              { label: "Contact me", desc: "decoderop@gmail.com", href: "#contact", id: "contact" },
            ].map((item, i) => (
              <motion.a
                key={item.label}
                href={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (i + 1) }}
                className={`group cursor-pointer transition-colors ${activeSection === item.id ? "text-white" : "text-white/60"}`}
              >
                <div className="flex items-center gap-1 text-sm font-medium group-hover:text-white">
                  {item.label} <ArrowUpRight className={`h-3 w-3 transition-opacity ${activeSection === item.id ? "opacity-100" : "opacity-50 group-hover:opacity-100"}`} />
                </div>
                <p className={`mt-1 text-[10px] leading-tight transition-colors ${activeSection === item.id ? "text-white/60" : "text-white/40 group-hover:text-white/60"}`}>
                  {item.desc}
                </p>
              </motion.a>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="relative z-50 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          {/* Mobile Menu Overlay */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-black/95 backdrop-blur-xl md:hidden"
              >
                {[
                  { label: "Home", href: "#home" },
                  { label: "About", href: "#about" },
                  { label: "Skills", href: "#skills" },
                  { label: "Projects", href: "#projects" },
                  { label: "Contact", href: "#contact" },
                ].map((item, i) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    onClick={() => setIsMenuOpen(false)}
                    className="font-display text-4xl font-bold tracking-tighter text-white/60 transition-colors hover:text-white"
                  >
                    {item.label}
                  </motion.a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative w-full min-h-[100vh] flex flex-col items-center justify-center overflow-hidden pt-20 pb-24">
        <div className="absolute inset-0 z-0 w-full h-full bg-black/90">
          <FluidMagnetic />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black pointer-events-none z-10" />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 mx-auto max-w-7xl px-6 md:px-12 flex flex-col items-center text-center w-full">
          {/* Hero Social Icons (Top Right) */}
          <div className="absolute right-6 top-24 z-30 hidden flex-col gap-4 md:flex">

            {[
              { icon: Github, label: "GitHub", href: "https://github.com/Yadnesh26" },
              { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/yadnesh-sonawane-9a235921a/" },
            ].map((social, i) => (
              <a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group/social flex items-center"
              >
                {/* Individual Group Wrapper */}
                <div className="flex items-center gap-0 overflow-hidden 
                  rounded-full bg-white/5 px-3 py-3 text-white/60 
                  transition-all duration-300 
                  group-hover/social:bg-white/10 group-hover/social:text-white border border-white/10"
                >

                  {/* Icon */}
                  <social.icon className="h-5 w-5 shrink-0" />

                  {/* Expanding Text */}
                  <span className="max-w-0 overflow-hidden whitespace-nowrap text-xs font-bold 
          transition-all duration-300 
          group-hover/social:max-w-[100px] group-hover/social:ml-2"
                  >
                    {social.label}
                  </span>

                </div>
              </a>

            ))}
          </div>
          <div className="flex w-full flex-col items-center justify-center -mt-12">
            <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col items-center justify-center"
              >

                <h1 className="mt-4 whitespace-nowrap font-display text-4xl tracking-tighter sm:text-6xl md:text-8xl">
                  <span className="font-light text-white/40">Hi!</span>
                  <span className="ml-3 font-bold text-white drop-shadow-[0_0_25px_rgba(0,0,0,1)]">
                    I'm <span className="bg-gradient-to-r from-orange-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent">Yadnesh</span>
                  </span>
                </h1>
                <div className="mt-6 flex items-center justify-center gap-4">
                  <div className="h-4 w-4 rotate-45 bg-white/40" />
                  <div className="h-[1px] w-12 sm:w-24 bg-white/20" />
                  <p className="text-xl font-medium tracking-wide text-white/80 md:text-2xl">
                    Software Engineer
                  </p>
                  <div className="h-[1px] w-12 sm:w-24 bg-white/20" />
                  <div className="h-4 w-4 rotate-45 bg-white/40" />
                </div>

                <p id="hero-about" className="mt-8 max-w-md text-sm leading-relaxed text-white/60 md:text-base">
                  Hello! I'm specializing in <span className="font-semibold text-white">AI engineering, backend development, Docker, AWS</span>, competitive programmer,
                  designing RAG applicaitons, LINUX and Bash.
                </p>

                <ul className="mt-10 space-y-4">
                  {[
                    "Solving real world problems",
                    "Building scalable and maintainable systems",
                    "Keep learning and growing",
                  ].map((text, i) => (
                    <motion.li
                      key={text}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                      className="flex items-center justify-center gap-3 text-sm text-white/80"
                    >
                      <Check className="h-4 w-4 text-purple-400" />
                      {text}
                    </motion.li>
                  ))}
                </ul>

                <div className="mt-12 flex flex-wrap items-center justify-center gap-6">
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(168, 85, 247, 0.4)" }}
                    whileTap={{ scale: 0.95 }}
                    className="rounded-full bg-gradient-to-r from-red-500 to-purple-600 px-4 py-3 text-sm font-bold tracking-wide text-white shadow-lg shadow-purple-500/20 transition-shadow"
                  >
                    My Resume
                  </motion.button>

                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Marquee Skills Bar */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden border-t border-white/5 bg-black/50 py-3 backdrop-blur-sm">
          <div className="flex w-[200%] animate-marquee">
            {[...marqueeSkills, ...marqueeSkills].map((skill, i) => (
              <div key={i} className="flex items-center gap-6 px-6">
                <span className="text-xs font-bold tracking-[0.2em] text-white/20 md:text-sm">
                  {skill}
                </span>
                <div className="h-1 w-1 rotate-45 bg-white/10" />
              </div>
            ))}
          </div>
          {/* Gradient Overlay for the Marquee */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-transparent to-red-600/10 pointer-events-none" />
        </div>
      </section>

      {/* About Me Section */}
      <section id="about" className="relative w-full px-6 py-24 md:px-12">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative max-w-4xl mx-auto overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 p-8 md:p-16 backdrop-blur-xl transition-all duration-500 hover:border-purple-500/30"
          >
            {/* Subtle Gradient Glow */}
            <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-purple-500/10 blur-[100px] transition-all duration-500 group-hover:bg-purple-500/20" />

            <div className="relative z-10">
              <div className="mb-12 flex items-center gap-4">
                <div className="h-px w-8 bg-purple-500" />
                <h2 className="font-display text-2xl font-bold tracking-widest text-white uppercase">About Me</h2>
              </div>

              <div className="space-y-8 text-lg md:text-xl leading-relaxed text-white/60">
                <p>
                  I am a passionate <span className="text-white font-medium">Computer Engineering</span> student focused on Backend Development and AI Engineering, building scalable and intelligent digital systems. My approach combines strong problem-solving skills with practical implementation to develop efficient APIs and data-driven solutions.

                </p>
                <p>
                  With hands-on experience in FastAPI, RAG pipelines, and cloud deployment on AWS EC2, I bridge the gap between data, systems, and real-world applications—ensuring every solution is robust, optimized, and production-ready.
                </p>
              </div>

            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="relative w-full px-6 py-24 md:px-12">
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="mb-16 flex flex-col items-center justify-between gap-6 md:flex-row md:items-end">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-4xl font-bold tracking-tight text-white md:text-6xl">
                Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">Arsenal</span>
              </h2>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {skills.map((skill, i) => (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -5 }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:border-purple-500/50 hover:bg-white/10"
              >
                {/* Background Gradient Glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />

                <div className="relative z-10">
                  <div className="flex items-start justify-between">
                    <div className="rounded-xl bg-white/5 p-3 text-white/80 transition-colors group-hover:bg-purple-500/20 group-hover:text-purple-300">
                      <skill.icon className="h-6 w-6" />
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-white/20 group-hover:text-purple-400/60">
                        {skill.level}
                      </span>
                      <div className="mt-1 h-1 w-12 overflow-hidden rounded-full bg-white/5">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: skill.level === "Expert" ? "100%" : skill.level === "Advanced" ? "75%" : "50%" }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                          className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-8">
                    <h3 className="text-xl font-bold text-white group-hover:text-purple-200">
                      {skill.title}
                    </h3>
                    <p className="mt-1 text-xs font-medium text-white/40 uppercase tracking-wider">
                      {skill.category}
                    </p>
                  </div>
                </div>

                {/* Decorative Corner Element */}
                <div className="absolute -right-4 -bottom-4 h-12 w-12 rotate-45 bg-white/5 transition-colors group-hover:bg-purple-500/20" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative w-full px-6 py-24 md:px-12">
        <div className="relative z-10 mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="font-display text-4xl font-bold tracking-tight text-white md:text-6xl">
              Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">projects</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl transition-all duration-500 hover:border-purple-500/40"
              >
                {/* Project Image Container */}
                <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/5">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  {/* Overlay Glow */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>

                {/* Project Info */}
                <div className="mt-6 px-2 pb-4">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-bold uppercase tracking-widest text-purple-400/60 border border-purple-500/20 rounded-full px-2 py-0.5 bg-purple-500/5">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-2xl font-bold text-white transition-colors group-hover:text-purple-400">
                    {project.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/40">
                    {project.description}
                  </p>

                  <div className="mt-6 flex items-center gap-3">
                    {project.githubUrl && (
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="group/github flex items-center gap-0 overflow-hidden rounded-full bg-white/5 px-3 py-2 text-white/60 transition-all hover:bg-white/10 hover:text-white"
                      >
                        <Github className="h-5 w-5" />
                        <span className="max-w-0 overflow-hidden whitespace-nowrap text-xs font-bold transition-all duration-300 group-hover/github:max-w-[100px] group-hover/github:ml-2">
                          GitHub
                        </span>
                      </motion.a>
                    )}

                    {project.demoUrl && (
                      <motion.a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="group/demo flex items-center gap-0 overflow-hidden rounded-full bg-white/5 px-3 py-2 text-white/60 transition-all hover:bg-white/10 hover:text-white"
                      >
                        <ExternalLink className="h-5 w-5" />
                        <span className="max-w-0 overflow-hidden whitespace-nowrap text-xs font-bold transition-all duration-300 group-hover/demo:max-w-[100px] group-hover/demo:ml-2">
                          Live Demo
                        </span>
                      </motion.a>
                    )}
                  </div>
                </div>

                {/* Subtle Glow Background */}
                <div className="absolute -bottom-24 -right-24 h-48 w-48 rounded-full bg-purple-500/10 blur-[80px] transition-all duration-500 group-hover:bg-purple-500/20" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Contact Section */}
      <section id="contact" className="relative w-full bg-black px-6 py-32 md:px-12">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-full max-w-7xl bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            {/* Left Side: Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-5xl font-bold tracking-tighter text-white md:text-7xl">
                Let's <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">connect.</span>
              </h2>

              <div className="mt-12 space-y-8">
                {[
                  { icon: Mail, label: "Email", value: "decoderop@gmail.com", href: "mailto:[decoderop@gmail.com]" },
                  { icon: Globe, label: "Location", value: "Pune, India", href: "#" },
                  { icon: Zap, label: "Availability", value: "Open for new projects", href: "#" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-6">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-purple-400">
                      <item.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-white/20">{item.label}</p>
                      <a href={item.href} className="mt-1 text-lg font-medium text-white transition-colors hover:text-purple-400">
                        {item.value}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right Side: Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl md:p-12"
            >
              <form ref={formRef} className="space-y-6" onSubmit={handleFormSubmit}>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/40">Name</label>
                    <input
                      required
                      name="from_name"
                      type="text"
                      placeholder="John Doe"
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-4 text-white placeholder:text-white/20 focus:border-purple-500/50 focus:outline-none focus:ring-1 focus:ring-purple-500/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/40">Email</label>
                    <input
                      required
                      name="from_email"
                      type="email"
                      placeholder="john@example.com"
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-4 text-white placeholder:text-white/20 focus:border-purple-500/50 focus:outline-none focus:ring-1 focus:ring-purple-500/50"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/40">Subject</label>
                  <input
                    required
                    name="subject"
                    type="text"
                    placeholder="Project Inquiry"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-4 text-white placeholder:text-white/20 focus:border-purple-500/50 focus:outline-none focus:ring-1 focus:ring-purple-500/50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/40">Message</label>
                  <textarea
                    required
                    name="message"
                    rows={4}
                    placeholder="Tell me about your project..."
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-4 text-white placeholder:text-white/20 focus:border-purple-500/50 focus:outline-none focus:ring-1 focus:ring-purple-500/50"
                  />
                </div>
                <motion.button
                  disabled={formStatus !== "idle"}
                  whileHover={formStatus === "idle" ? { scale: 1.02, boxShadow: "0 0 20px rgba(168, 85, 247, 0.2)" } : {}}
                  whileTap={formStatus === "idle" ? { scale: 0.98 } : {}}
                  className={`flex w-full items-center justify-center gap-2 rounded-xl py-4 font-bold transition-all ${formStatus === "sent" ? "bg-green-500 text-white" : "bg-white text-black hover:bg-purple-50"
                    }`}
                >
                  {formStatus === "idle" && (
                    <>
                      <span>Send Message</span>
                      <ArrowRight className="h-5 w-5" />
                    </>
                  )}
                  {formStatus === "sending" && (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="h-5 w-5 border-2 border-black/20 border-t-black rounded-full"
                      />
                      <span>Sending...</span>
                    </>
                  )}
                  {formStatus === "sent" && (
                    <>
                      <Check className="h-5 w-5" />
                      <span>Message Sent!</span>
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="relative w-full border-t border-white/5 bg-black px-6 pt-24 pb-12 md:px-12">
        {/* Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-full max-w-3xl bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-64 w-full max-w-4xl bg-purple-500/5 blur-[120px] pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            {/* Left Side: CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-xl"
            >
              <h2 className="font-display text-5xl font-bold tracking-tighter text-white md:text-7xl">
                Let's do <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">something</span> remarkable.
              </h2>
              <p className="mt-8 text-lg text-white/40">
                Currently open for new opportunities and interesting collaborations.
                Whether you have a question or just want to say hi, my inbox is always open.
              </p>

              <div className="mt-12 flex flex-wrap gap-6">
                <motion.a
                  href="mailto:hello@example.com"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group flex items-center gap-3 rounded-full bg-white px-8 py-4 text-black transition-all hover:bg-purple-50"
                >
                  <span className="font-bold">Get in Touch</span>
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </motion.a>

                <div className="flex items-center gap-4">
                  {[
                    { icon: Github, href: "#", label: "GitHub" },
                    { icon: Linkedin, href: "#", label: "LinkedIn" },
                    { icon: Code2, href: "#", label: "LeetCode" },
                  ].map((social, i) => (
                    <motion.a
                      key={i}
                      href={social.href}
                      aria-label={social.label}
                      whileHover={{ y: -5, scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 transition-all hover:border-purple-500/40 hover:bg-white/10 hover:text-white"
                    >
                      <social.icon className="h-5 w-5" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Side: Links Grid */}
            <div className="grid grid-cols-2 gap-8">
              <div className="flex flex-col gap-6">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/20">Navigation</span>
                <ul className="flex flex-col gap-4">
                  {["Home", "Projects", "Skills", "About", "Contact"].map((link) => (
                    <li key={link}>
                      <a href={`#${link.toLowerCase()}`} className="text-sm text-white/40 transition-colors hover:text-white">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-6">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/20">Location</span>
                <div className="flex flex-col gap-2">
                  <span className="text-sm text-white/40">Pune, India</span>
                  <span className="text-sm text-white/20">Available Worldwide</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-24 flex flex-col items-center justify-between gap-8 border-t border-white/5 pt-12 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500" />
              <span className="text-xl font-bold tracking-tighter text-white">PORTFOLIO</span>
            </div>

            <p className="flex items-center gap-2 text-sm text-white/20">
              Made by <span className="text-white/40">Yadnesh</span>
            </p>

            <p className="text-sm text-white/20">
              © 2026 All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
