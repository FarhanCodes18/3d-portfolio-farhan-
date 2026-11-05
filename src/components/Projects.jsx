import React, { useRef, useState, memo } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";

const PROJECTS = [
  {
    title: "IDEAL PUBLIC SCHOOL",
    category: "ACADEMIC PORTAL & INSTITUTIONAL CMS",
    desc: "Comprehensive modern web platform engineered for Ideal Public School. Delivers high-speed digital admissions, dynamic event calendars, student notice feeds, faculty directory, and an interactive campus gallery with responsive glassmorphic UI.",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "REST APIs"],
    year: "2026",
    image: "/project_collab.png",
    live: "https://idealpublicschool.info",
    github: "https://github.com",
    badge: "LIVE PRODUCTION"
  },
  {
    title: "GURUDEV INTL. PUBLIC SCHOOL",
    category: "EDUCATIONAL ECOSYSTEM & MANAGEMENT",
    desc: "Next-generation institutional portal designed for Gurudev International Public School. Features seamless student enrollment workflows, automated announcements, curriculum showcases, and a modern responsive interface built for parents and educators.",
    tech: ["React.js", "Tailwind CSS", "Node.js", "Express.js", "Framer Motion", "Cloudinary"],
    year: "2026",
    image: "/project_nexus.png",
    live: "https://gurudevinternationlpublicschool.info",
    github: "https://github.com",
    badge: "LIVE PRODUCTION"
  },
  {
    title: "CLOUDNOVAA",
    category: "DIGITAL INNOVATION AGENCY & CLOUD PLATFORM",
    desc: "Flagship digital venture founded by Farhan. High-performance agency platform delivering cutting-edge software engineering, custom cloud architectures, AI automation pipelines, and award-winning 3D web applications for global clients.",
    tech: ["Next.js", "React.js", "Three.js", "Tailwind CSS", "Node.js", "AWS Cloud", "AI APIs"],
    year: "2026",
    image: "/project_ai.png",
    live: "https://cloudnovaa.in",
    github: "https://github.com",
    badge: "FOUNDER PLATFORM"
  },
  {
    title: "FARHAN QURESHI — 3D CYBER PORTFOLIO",
    category: "IMMERSIVE 3D WEBGL PORTFOLIO",
    desc: "Official personal portfolio showcasing advanced 3D WebGL scenes, reactive Three.js / React Three Fiber environments, real-time shaders, physics-based motion, and luxury cyberpunk aesthetics operating smoothly at 60 FPS.",
    tech: ["React Three Fiber", "Three.js", "GSAP", "Tailwind CSS", "Lenis", "Framer Motion"],
    year: "2026",
    image: "/project_vista.png",
    live: "https://farhanqureshi.in",
    github: "https://github.com",
    badge: "OFFICIAL SITE"
  }
];

// OPTIMIZED: React.memo prevents re-renders of individual cards when siblings change
const ProjectCard = memo(function ProjectCard({ project, index }) {
  const imageContainerRef = useRef(null);
  const [isImageHovered, setIsImageHovered] = useState(false);

  // Motion values for "VISIT" magnet circle follow
  const viewX = useMotionValue(0);
  const viewY = useMotionValue(0);

  const springConfig = { damping: 28, stiffness: 280 };
  const smoothX = useSpring(viewX, springConfig);
  const smoothY = useSpring(viewY, springConfig);

  const handleImageMouseMove = (e) => {
    if (!imageContainerRef.current) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    viewX.set(e.clientX - rect.left - 30);
    viewY.set(e.clientY - rect.top - 30);
  };

  const handleImageMouseEnter = (e) => {
    setIsImageHovered(true);
    if (imageContainerRef.current) {
      const rect = imageContainerRef.current.getBoundingClientRect();
      viewX.set(e.clientX - rect.left - 30);
      viewY.set(e.clientY - rect.top - 30);
    }
  };

  const handleImageMouseLeave = () => {
    setIsImageHovered(false);
  };

  const numStr = String(index + 1).padStart(2, "0");

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      className="w-full flex flex-col gap-4 border-b border-white/5 py-12 md:py-16 select-none last:border-b-0"
    >
      {/* Top Header Row of Project Card */}
      <div className="flex justify-between items-center font-mono text-sm tracking-widest text-gray-500 mb-2">
        <div className="flex items-center gap-3">
          <span className="text-[#FFD600] font-black text-base">{numStr}</span>
          <span className="h-3 w-[1px] bg-white/20" />
          <span className="text-[10px] uppercase tracking-[0.2em] text-green-400 font-bold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse shadow-[0_0_6px_#4ade80]" />
            {project.badge || "LIVE"}
          </span>
        </div>
        <span className="text-gray-400 font-bold">{project.year || "2026"}</span>
      </div>

      {/* Main Card Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left Side: Large Project Image Frame */}
        <div className="lg:col-span-7 w-full">
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open live demo of ${project.title}`}
            ref={imageContainerRef}
            onMouseMove={handleImageMouseMove}
            onMouseEnter={handleImageMouseEnter}
            onMouseLeave={handleImageMouseLeave}
            className="block relative aspect-[16/10] w-full bg-[#0a0a0c] border border-white/10 rounded-xl overflow-hidden group cursor-pointer shadow-[0_20px_50px_rgba(0,0,0,0.85)] hover:border-[#FFD600]/40 transition-colors duration-500"
          >
            {/* Dark gradient overlay and grain mask */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 z-10 transition-opacity duration-300 group-hover:opacity-70" />
            
            {/* Project Image */}
            <img
              src={project.image}
              alt={project.title}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover filter brightness-[0.75] contrast-[1.05] grayscale-[15%] group-hover:scale-105 group-hover:brightness-[0.9] group-hover:grayscale-0 transition-all duration-700 ease-out"
              draggable="false"
            />

            {/* Glowing inner border overlay */}
            <div className="absolute inset-0 border border-white/5 rounded-xl pointer-events-none z-20" />

            {/* "VISIT" floating magnet circle button */}
            <AnimatePresence>
              {isImageHovered && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  style={{
                    x: smoothX,
                    y: smoothY,
                  }}
                  className="absolute w-16 h-16 bg-[#FFD600] rounded-full flex flex-col items-center justify-center text-[10px] font-mono font-black text-black z-30 shadow-[0_0_25px_rgba(255,214,0,0.6)] pointer-events-none"
                >
                  <span>LIVE</span>
                  <span className="text-[9px] -mt-0.5">DEMO ↗</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Top Right Live Tag */}
            <div className="absolute top-5 right-5 z-20 flex items-center gap-2 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-[#FFD600]/30 font-mono text-[10px] font-bold text-[#FFD600] tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFD600] animate-ping" />
              <span>LIVE SITE</span>
            </div>

            {/* Bottom Action Buttons inside Image frame */}
            <div className="absolute bottom-6 left-6 z-20 flex items-center gap-3">
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[#FFD600] text-black border border-[#FFD600] rounded-lg font-display text-xs font-black tracking-widest uppercase hover:bg-white hover:border-white transition-all duration-300 shadow-[0_0_15px_rgba(255,214,0,0.35)]"
              >
                <span>Live Demo</span>
                <span className="text-sm font-bold">↗</span>
              </a>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-black/70 backdrop-blur-md border border-white/20 text-white rounded-lg font-display text-xs font-bold tracking-widest uppercase hover:bg-white hover:text-black hover:border-white transition-all duration-300 shadow-lg"
              >
                <span>GitHub</span>
                <span className="text-xs">↗</span>
              </a>
            </div>
          </a>
        </div>

        {/* Right Side: Editorial Project Details */}
        <div className="lg:col-span-5 flex flex-col justify-center text-left py-2">
          {/* Category Yellow Text */}
          <span className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#FFD600] mb-3 inline-block">
            {project.category}
          </span>

          {/* Huge Editorial Title */}
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-block"
          >
            <h3 className="font-display font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-white tracking-tight uppercase mb-4 select-text group-hover:text-[#FFD600] transition-colors duration-300">
              {project.title}
            </h3>
          </a>

          {/* Project URL Preview */}
          <div className="mb-4">
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-mono text-gray-400 hover:text-[#FFD600] transition-colors duration-200"
            >
              <span className="text-[#FFD600]">🔗</span>
              <span className="underline decoration-[#FFD600]/40 underline-offset-4 font-semibold tracking-wide">
                {project.live.replace("https://", "")}
              </span>
              <span className="text-[10px] text-green-400">● Active</span>
            </a>
          </div>

          {/* Clean Muted Paragraph Description */}
          <p className="text-gray-400 text-sm md:text-base font-light leading-relaxed mb-6 select-text">
            {project.desc}
          </p>

          {/* Tech Stack outline badges */}
          <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5 mb-6">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-3 py-1.5 border border-white/10 rounded font-mono text-[9px] uppercase tracking-wider text-gray-400 hover:border-[#FFD600] hover:text-[#FFD600] transition-colors cursor-default select-none bg-white/[0.02]"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Explicit Primary Direct Action CTA */}
          <div className="flex items-center gap-3">
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#FFD600] to-[#FFE34D] text-black rounded-xl font-display text-xs font-black tracking-widest uppercase hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(255,214,0,0.35)]"
            >
              <span>Launch Live Site</span>
              <span className="text-sm font-bold">↗</span>
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative py-28 md:py-36 w-full bg-cyber-black overflow-hidden border-b border-cyber-border/20"
    >
      {/* Subtle Grain Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none z-0" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          opacity: 0.025,
        }} 
      />

      {/* Cyber Grid overlay */}
      <div className="absolute inset-0 cyber-grid pointer-events-none opacity-10 z-0" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col text-left mb-16 md:mb-20">
          <div className="flex items-center gap-2 mb-2 font-mono text-xs tracking-[0.3em] text-[#FFD600] uppercase">
            <span className="w-1.5 h-1.5 bg-[#FFD600] rounded-full animate-pulse" />
            <span>04 — WORKS SHOWCASE</span>
          </div>
          <h2 className="font-display font-black text-5xl md:text-7xl tracking-tight text-white uppercase select-none leading-none">
            SELECTED PROJECTS
          </h2>
          <p className="text-gray-400 font-light mt-3 max-w-xl text-sm md:text-base">
            Production web platforms, digital ecosystems, and high-performance applications shipped by Farhan.
          </p>
          <div className="w-20 h-0.5 bg-[#FFD600] mt-5 shadow-[0_0_8px_#FFD600]" />
        </div>

        {/* Vertical Editorial Cards List */}
        <div className="flex flex-col">
          {PROJECTS.map((proj, idx) => (
            <ProjectCard key={proj.title} project={proj} index={idx} />
          ))}
        </div>

      </div>
    </section>
  );
}
