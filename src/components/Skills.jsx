import React, { useState, useRef, useMemo, memo } from "react";
import { motion, useInView, useSpring, useMotionValue, useMotionTemplate } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useDevice } from "../hooks/useDevice";

// Complete 16-Technology Arsenal
const ARSENAL_SKILLS = [
  {
    name: "HTML5",
    category: "Frontend Core",
    tag: "Markup & Semantics",
    color: "#E34F26",
    rgb: "227, 79, 38",
    svg: (
      <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
        <path d="M12 2L3 5l2.4 14.4L12 22l6.6-2.6L21 5l-9-3zm0 2.2l6.8 2.3-1.9 11.5L12 19.8l-4.9-1.8L5.2 6.5 12 4.2zM8.5 8l.2 2.4h6.6l-.3 2.9H8.7l.2 2.4h6.1l-.6 4.3-2.4.9-2.4-.9-.2-2.1H7l.4 3.7 4.6 1.7 4.6-1.7 1.2-8.3.2-2.3H8.5z" />
      </svg>
    ),
  },
  {
    name: "CSS3",
    category: "Styling & Layout",
    tag: "Flex, Grid, Keyframes",
    color: "#264DE4",
    rgb: "38, 77, 228",
    svg: (
      <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
        <path d="M3 3l2.2 15.5L12 21l6.8-2.5L21 3H3zm15 3.5l-.3 2.5H7.7l-.2-2.5h10.5zm-1 6.5l-.3 3.5-4.7 1.6-4.7-1.6-.3-3.5h2.5l.1 1.7 2.4.8 2.4-.8.3-2.7H6.9l-.3-2.5h11.2l-.8 3.5z" />
      </svg>
    ),
  },
  {
    name: "JavaScript",
    category: "Core Engine",
    tag: "ES6+, Async, V8 Engine",
    color: "#F7DF1E",
    rgb: "247, 223, 30",
    svg: (
      <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
        <path d="M3 3h18v18H3V3zm12.8 14.5c1.4 0 2.3-.7 2.3-2.1v-5.2h-2.1v5.1c0 .6-.3.9-.9.9s-.9-.3-.9-.9v-2.1H12v2.2c0 1.4.9 2.1 2.3 2.1h1.5zm-5.7 0c1.4 0 2.3-.8 2.3-2.1v-1.1h-2.1v.9c0 .5-.3.8-.8.8s-.8-.3-.8-.8c0-.6.3-.9 1.1-1.3l1.1-.6c1.3-.7 1.8-1.4 1.8-2.4 0-1.4-1.1-2.1-2.4-2.1-1.4 0-2.3.8-2.3 2.1v.9h2.1v-.8c0-.5.3-.8.8-.8s.8.3.8.8c0 .5-.3.8-.9 1.1l-1.2.6c-1.3.7-1.8 1.4-1.8 2.4 0 1.5 1.1 2.4 2.3 2.4z" />
      </svg>
    ),
  },
  {
    name: "React.js",
    category: "Frontend UI",
    tag: "Hooks, Fiber, Context",
    color: "#00D8FF",
    rgb: "0, 216, 255",
    svg: (
      <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="2.2" />
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z" opacity="0.3" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(30 12 12)" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(90 12 12)" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(150 12 12)" fill="none" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    ),
  },
  {
    name: "Next.js",
    category: "Fullstack Architecture",
    tag: "SSR, ISR, App Router",
    color: "#FFFFFF",
    rgb: "255, 255, 255",
    svg: (
      <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.8 14.7L9.5 8.2V7h1.4l5.3 7.3v1.4h-.4zm-5.3-2.9L8.2 11V7H9.5v6.8h1z" />
      </svg>
    ),
  },
  {
    name: "Node.js",
    category: "Runtime Backend",
    tag: "Event Loop, Streams, Libuv",
    color: "#39FF14",
    rgb: "57, 255, 20",
    svg: (
      <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
        <path d="M12 2l9 5.2v10.4L12 22.8 3 17.6V7.2L12 2zm0 2.4L5.1 8.4v7.2L12 19.6l6.9-4V8.4L12 4.4zm0 4.1l4 2.3v4.6l-4 2.3-4-2.3v-4.6l4-2.3z" />
      </svg>
    ),
  },
  {
    name: "Express.js",
    category: "Server Framework",
    tag: "REST Endpoints, Middleware",
    color: "#CCCCCC",
    rgb: "204, 204, 204",
    svg: (
      <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm4 0h-2v-4h-1v-2h3v6zm3-8h-8V7h8v2z" />
      </svg>
    ),
  },
  {
    name: "MongoDB",
    category: "NoSQL Database",
    tag: "Aggregation, Mongoose, Clusters",
    color: "#10B981",
    rgb: "16, 185, 129",
    svg: (
      <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
        <path d="M12 2s-4 4.5-4 10.5c0 4.5 3 7.5 4 8.5 1-1 4-4 4-8.5C16 6.5 12 2 12 2zm0 17c-1.5-.9-2.5-2.8-2.5-5.5 0-3.2 1.8-6.1 2.5-7.5.7 1.4 2.5 4.3 2.5 7.5 0 2.7-1 4.6-2.5 5.5z" />
      </svg>
    ),
  },
  {
    name: "Supabase",
    category: "Postgres BaaS",
    tag: "PostgreSQL, Auth, Realtime, Storage",
    color: "#3ECF8E",
    rgb: "62, 207, 142",
    svg: (
      <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
        <path d="M21.362 9.354H12V.396a.396.396 0 0 0-.716-.233L.416 13.916a.396.396 0 0 0 .313.639H12v9.049a.396.396 0 0 0 .716.233l10.868-13.753a.396.396 0 0 0-.313-.639z" />
      </svg>
    ),
  },
  {
    name: "Firebase",
    category: "Cloud Services",
    tag: "Auth, Firestore, Cloud Functions",
    color: "#FFCA28",
    rgb: "255, 202, 40",
    svg: (
      <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
        <path d="M4.5 17.5l2.4-14.8c.1-.5.7-.7 1-.3l3.5 6.6-4.5 8.5H4.5zm8.1-13c-.3-.5-1.1-.5-1.4 0l-2 3.8 2.7 5.1 1.7-8.9h-1zm6.9 13L16 5.8c-.2-.5-.9-.6-1.2-.2L7 17.5h12.5zm-7.5 4.5l8-4.5-8-14-8 14 8 4.5z" />
      </svg>
    ),
  },
  {
    name: "Tailwind CSS",
    category: "Utility Design",
    tag: "JIT Compiler, Responsive UI",
    color: "#38BDF8",
    rgb: "56, 189, 248",
    svg: (
      <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
        <path d="M12 6c-3 0-4.8 1.5-5.4 4.5 1.2-1.5 2.7-2.1 4.5-1.8 1 .2 1.8 1 2.6 1.8 1.3 1.3 2.8 2.9 6.3 2.9 3 0 4.8-1.5 5.4-4.5-1.2 1.5-2.7 2.1-4.5 1.8-1-.2-1.8-1-2.6-1.8-1.3-1.3-2.8-2.9-6.3-2.9zm-6 6c-3 0-4.8 1.5-5.4 4.5 1.2-1.5 2.7-2.1 4.5-1.8 1 .2 1.8 1 2.6 1.8 1.3 1.3 2.8 2.9 6.3 2.9 3 0 4.8-1.5 5.4-4.5-1.2 1.5-2.7 2.1-4.5 1.8-1-.2-1.8-1-2.6-1.8-1.3-1.3-2.8-2.9-6.3-2.9z" />
      </svg>
    ),
  },
  {
    name: "GSAP",
    category: "Motion Engine",
    tag: "ScrollTrigger, Timeline, Physics",
    color: "#88CE02",
    rgb: "136, 206, 2",
    svg: (
      <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5c-2.5 0-4.5-2-4.5-4.5S8.5 7.5 11 7.5s4.5 2 4.5 4.5v1h-2v-1c0-1.4-1.1-2.5-2.5-2.5s-2.5 1.1-2.5 2.5 1.1 2.5 2.5 2.5h2v2h-2z" />
      </svg>
    ),
  },
  {
    name: "Framer Motion",
    category: "React Animation",
    tag: "Spring Physics, Layout Animate",
    color: "#FF007F",
    rgb: "255, 0, 127",
    svg: (
      <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
        <path d="M4 2h16v8h-8l8 8v6l-8-8-8 8V2zm8 8V2H4l8 8z" />
      </svg>
    ),
  },
  {
    name: "Three.js",
    category: "3D & WebGL",
    tag: "Shaders, R3F, Raymarching",
    color: "#FFD600",
    rgb: "255, 214, 0",
    svg: (
      <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
        <path d="M12 2l8.5 5v10L12 22l-8.5-5V7L12 2zm0 2.3L5.5 8.2v7.6L12 19.7l6.5-3.9V8.2L12 4.3zm0 4.1l4 2.3v4.6l-4 2.3-4-2.3v-4.6l4-2.3z" />
      </svg>
    ),
  },
  {
    name: "Socket.io",
    category: "Realtime Protocols",
    tag: "WebSockets, Rooms, Low-Latency",
    color: "#00E5FF",
    rgb: "0, 229, 255",
    svg: (
      <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 16.5l-4.5-5.5h3.5v-5h2v5h3.5L13 18.5z" />
      </svg>
    ),
  },
  {
    name: "AI APIs",
    category: "LLM & Automation",
    tag: "Gemini, OpenAI, LangChain, RAG",
    color: "#FFD600",
    rgb: "255, 214, 0",
    svg: (
      <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
        <path d="M12 2a2 2 0 012 2c0 .74-.4 1.38-1 1.72V7h3a3 3 0 013 3v2.28c.6.34 1 .98 1 1.72a2 2 0 11-4 0c0-.74.4-1.38 1-1.72V10a1 1 0 00-1-1h-3v2.28c.6.34 1 .98 1 1.72a2 2 0 11-4 0c0-.74.4-1.38 1-1.72V9H8a1 1 0 00-1 1v2.28c.6.34 1 .98 1 1.72a2 2 0 11-4 0c0-.74.4-1.38 1-1.72V10a3 3 0 013-3h3V5.72A2 2 0 0110 4a2 2 0 012-2zm-3 13a2 2 0 012 2v2a2 2 0 11-4 0v-2a2 2 0 012-2zm6 0a2 2 0 012 2v2a2 2 0 11-4 0v-2a2 2 0 012-2z" />
      </svg>
    ),
  },
  {
    name: "Git & GitHub",
    category: "Version Control",
    tag: "CI/CD, Workflows, Branching",
    color: "#F05032",
    rgb: "240, 80, 50",
    svg: (
      <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
      </svg>
    ),
  },
];

// Interactive 3D Background Particles for Arsenal
function ArsenalBgCanvas() {
  const particlesRef = useRef();
  const ringRef = useRef();
  const ring2Ref = useRef();

  const particleCount = 110;
  const positions = useMemo(() => {
    const arr = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      arr[i] = (Math.random() - 0.5) * 16;
      arr[i + 1] = (Math.random() - 0.5) * 12;
      arr[i + 2] = (Math.random() - 0.5) * 6 - 2;
    }
    return arr;
  }, []);

  const ringGeo = useMemo(() => new THREE.TorusGeometry(4.2, 0.007, 6, 64), []);
  const ring2Geo = useMemo(() => new THREE.TorusGeometry(1.8, 0.005, 6, 48), []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (particlesRef.current) {
      particlesRef.current.rotation.y = time * 0.04;
      particlesRef.current.rotation.x = time * 0.02;
    }
    if (ringRef.current) {
      ringRef.current.rotation.x = time * 0.07;
      ringRef.current.rotation.y = time * 0.09;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = -time * 0.12;
      ring2Ref.current.rotation.z = time * 0.08;
    }
  });

  return (
    <group>
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color="#FFD600"
          size={0.035}
          sizeAttenuation={true}
          transparent={true}
          opacity={0.35}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <mesh ref={ringRef} geometry={ringGeo} position={[0, -0.5, -2]}>
        <meshBasicMaterial color="#FFD600" transparent opacity={0.12} wireframe />
      </mesh>

      <mesh ref={ring2Ref} geometry={ring2Geo} position={[-2.5, 1, -2.5]}>
        <meshBasicMaterial color="#FFD600" transparent opacity={0.16} wireframe />
      </mesh>
    </group>
  );
}

// 3D Tilt Futuristic Skill Capsule
const SkillCapsuleCard = memo(function SkillCapsuleCard({ skill, index, isMobile }) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Springs for smooth physics tilt
  const x = useSpring(0, { stiffness: 150, damping: 15 });
  const y = useSpring(0, { stiffness: 150, damping: 15 });
  const rotateX = useSpring(0, { stiffness: 140, damping: 14 });
  const rotateY = useSpring(0, { stiffness: 140, damping: 14 });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    if (!cardRef.current || isMobile) return;
    const rect = cardRef.current.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;
    mouseX.set(clientX);
    mouseY.set(clientY);

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    x.set(((clientX - centerX) / centerX) * 8);
    y.set(((clientY - centerY) / centerY) * 8);
    rotateX.set(-((clientY - centerY) / centerY) * 12);
    rotateY.set(((clientX - centerX) / centerX) * 12);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
    rotateX.set(0);
    rotateY.set(0);
  };

  const spotlight = useMotionTemplate`radial-gradient(170px circle at ${mouseX}px ${mouseY}px, rgba(${skill.rgb}, 0.28), transparent 85%)`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.08 + Math.floor(index / 4) * 0.05 }}
      animate={!isMobile && !isHovered ? { y: [0, -5, 0] } : undefined}
      transition={{
        duration: 3.2 + (index % 4) * 0.4,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
        delay: index * 0.1,
      }}
      className="relative z-10 group"
      style={{ perspective: 1000 }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          x,
          y,
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          borderColor: isHovered ? skill.color : "rgba(255, 214, 0, 0.12)",
          boxShadow: isHovered
            ? `0 18px 45px rgba(0,0,0,0.8), 0 0 25px rgba(${skill.rgb}, 0.35), inset 0 0 15px rgba(${skill.rgb}, 0.1)`
            : "0 6px 25px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,214,0,0.06)",
        }}
        whileHover={{ scale: 1.04 }}
        className="relative p-6 rounded-2xl bg-[#09090d]/85 backdrop-blur-xl border overflow-hidden cursor-pointer select-none transition-all duration-300 flex flex-col justify-between min-h-[175px]"
      >
        {/* Dynamic Interactive Spotlight Glow following mouse cursor */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: spotlight }}
        />

        {/* Ambient Top Subtle Shimmer */}
        <div
          className="absolute inset-x-0 top-0 h-[1px] opacity-40 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `linear-gradient(90deg, transparent, ${skill.color}, transparent)`,
          }}
        />

        {/* Corner HUD Accent Notches */}
        <div
          className="absolute top-2 left-2 w-2 h-2 border-t border-l transition-colors duration-300"
          style={{ borderColor: isHovered ? skill.color : "rgba(255,214,0,0.2)" }}
        />
        <div
          className="absolute bottom-2 right-2 w-2 h-2 border-b border-r transition-colors duration-300"
          style={{ borderColor: isHovered ? skill.color : "rgba(255,214,0,0.2)" }}
        />

        {/* Top Header: Icon + Category Tag */}
        <div className="relative z-10 flex items-center justify-between mb-4">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
            style={{
              background: `rgba(${skill.rgb}, 0.12)`,
              border: `1px solid rgba(${skill.rgb}, 0.3)`,
              color: skill.color,
              boxShadow: isHovered ? `0 0 18px rgba(${skill.rgb}, 0.45)` : "none",
            }}
          >
            {skill.svg}
          </div>

          <span className="font-mono text-[9px] tracking-widest text-[#FFD600]/80 uppercase px-2 py-0.5 rounded bg-[#FFD600]/5 border border-[#FFD600]/20">
            0{index + 1}
          </span>
        </div>

        {/* Tech Details Body */}
        <div className="relative z-10 space-y-1">
          <h4
            className="font-display font-extrabold text-lg md:text-xl text-white tracking-wide uppercase transition-colors duration-300"
            style={{
              color: isHovered ? skill.color : "#ffffff",
              textShadow: isHovered ? `0 0 14px rgba(${skill.rgb}, 0.7)` : "none",
            }}
          >
            {skill.name}
          </h4>

          <div className="flex items-center gap-2">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{
                background: skill.color,
                boxShadow: isHovered ? `0 0 8px ${skill.color}` : "none",
              }}
            />
            <p className="font-mono text-[10px] text-gray-400 uppercase tracking-wider">
              {skill.category}
            </p>
          </div>

          <p className="font-sans text-[11px] text-gray-400/80 tracking-normal pt-1 line-clamp-1">
            {skill.tag}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
});

export default function Skills() {
  const sectionRef = useRef(null);
  const canvasContainerRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.1 });
  const canvasInView = useInView(canvasContainerRef, { margin: "200px" });
  const { isMobile, isLowEnd } = useDevice();

  return (
    <section
      ref={sectionRef}
      id="stack"
      className="relative py-28 md:py-36 w-full bg-cyber-black overflow-hidden px-6 md:px-12 border-b border-cyber-border/20 flex flex-col justify-center select-none"
    >
      {/* Invisible anchor tag for #skills to support both navigation links */}
      <div id="skills" className="absolute -top-24 left-0 pointer-events-none" />

      {/* 3D WebGL Particles and Rotating Hologram Rings */}
      <div
        ref={canvasContainerRef}
        className="absolute inset-0 z-0 pointer-events-none opacity-60 select-none"
      >
        {canvasInView && !isMobile && !isLowEnd && (
          <Canvas
            camera={{ position: [0, 0, 5], fov: 60 }}
            gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
            dpr={[1, 1.2]}
          >
            <ArsenalBgCanvas />
          </Canvas>
        )}
      </div>

      {/* Subtle Background Glowing Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20 z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 214, 0, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 214, 0, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Ambient Radial Fog Lights */}
      <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] rounded-full glow-yellow-radial pointer-events-none opacity-30 z-0" />
      <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] rounded-full glow-yellow-radial pointer-events-none opacity-30 z-0" />

      {/* Floating Geometric Wireframe Ring Accents */}
      <div className="absolute top-16 right-12 w-28 h-28 rounded-full border border-[#FFD600]/10 pointer-events-none animate-spin-slow hidden md:block" />
      <div className="absolute bottom-20 left-10 w-20 h-20 border border-[#FFD600]/10 rotate-45 pointer-events-none hidden md:block" />

      {/* Main Section Content */}
      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col items-center">
        
        {/* Section Header: MY TECH ARSENAL */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24 space-y-4">
          
          {/* Futuristic Badge Label */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-[#FFD600]/30 bg-[#FFD600]/5 backdrop-blur-md"
            style={{ boxShadow: "0 0 15px rgba(255,214,0,0.12)" }}
          >
            <span className="w-2 h-2 rounded-full bg-[#FFD600] animate-pulse shadow-[0_0_8px_#FFD600]" />
            <span className="font-mono text-xs font-bold tracking-[0.3em] text-[#FFD600] uppercase">
              CAPABILITIES: STACK_002
            </span>
          </motion.div>

          {/* Large Futuristic Heading: MY TECH ARSENAL */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="font-display font-black text-5xl sm:text-7xl md:text-8xl tracking-tight text-white uppercase leading-none"
          >
            MY TECH{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD600] via-[#FFE34D] to-[#FFD600] filter drop-shadow-[0_0_25px_rgba(255,214,0,0.4)]">
              ARSENAL
            </span>
          </motion.h2>

          {/* Animated Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-base sm:text-xl text-gray-300 font-sans font-light tracking-wide max-w-2xl mx-auto"
          >
            Technologies I use to craft{" "}
            <span className="text-[#FFD600] font-semibold">
              premium digital experiences
            </span>
          </motion.p>

          {/* Neon Gold Accent Horizontal Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-32 h-[2px] mx-auto rounded-full mt-4"
            style={{
              background: "linear-gradient(90deg, transparent, #FFD600, transparent)",
              boxShadow: "0 0 12px #FFD600",
            }}
          />
        </div>

        {/* 17-Skill Luxury Showcase Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 w-full">
          {ARSENAL_SKILLS.map((skill, index) => (
            <SkillCapsuleCard
              key={skill.name}
              skill={skill}
              index={index}
              isMobile={isMobile}
            />
          ))}
        </div>

        {/* Bottom Diagnostic Metrics Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-16 md:mt-20 w-full max-w-5xl rounded-2xl p-6 md:p-8 bg-[#0a0a0d]/70 border border-[#FFD600]/15 backdrop-blur-xl grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
          style={{
            boxShadow: "0 10px 40px rgba(0,0,0,0.6), inset 0 0 20px rgba(255,214,0,0.03)",
          }}
        >
          <div className="space-y-1 border-r border-[#FFD600]/10 last:border-none">
            <div className="font-display font-black text-2xl md:text-3xl text-[#FFD600] filter drop-shadow-[0_0_10px_rgba(255,214,0,0.4)]">
              17+
            </div>
            <div className="font-mono text-[10px] text-gray-400 uppercase tracking-widest">
              Core Tech Stack
            </div>
          </div>

          <div className="space-y-1 border-r border-[#FFD600]/10 last:border-none">
            <div className="font-display font-black text-2xl md:text-3xl text-white">
              60 FPS
            </div>
            <div className="font-mono text-[10px] text-gray-400 uppercase tracking-widest">
              WebGL &amp; 3D Physics
            </div>
          </div>

          <div className="space-y-1 border-r border-[#FFD600]/10 last:border-none">
            <div className="font-display font-black text-2xl md:text-3xl text-[#FFD600] filter drop-shadow-[0_0_10px_rgba(255,214,0,0.4)]">
              MERN + AI
            </div>
            <div className="font-mono text-[10px] text-gray-400 uppercase tracking-widest">
              Full-Stack Architecture
            </div>
          </div>

          <div className="space-y-1">
            <div className="font-display font-black text-2xl md:text-3xl text-green-400 filter drop-shadow-[0_0_10px_rgba(74,222,128,0.4)]">
              99.9%
            </div>
            <div className="font-mono text-[10px] text-gray-400 uppercase tracking-widest">
              Production Performance
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
