import React, { lazy, Suspense } from "react";
import { ReactLenis } from "lenis/react";
import { motion } from "framer-motion";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import WhatsAppButton from "./components/WhatsAppButton";

// Lazy-load below-the-fold sections for optimal code-splitting and ultra-fast initial render
const About = lazy(() => import("./components/About"));
const Stats = lazy(() => import("./components/Stats"));
const Skills = lazy(() => import("./components/Skills"));
const Projects = lazy(() => import("./components/Projects"));
const Experience = lazy(() => import("./components/Experience"));
const AIGenAI = lazy(() => import("./components/AIGenAI"));
const Testimonials = lazy(() => import("./components/Testimonials"));
const Contact = lazy(() => import("./components/Contact"));
const Footer = lazy(() => import("./components/Footer"));

// Minimalist futuristic skeleton fallback
function SectionSkeleton() {
  return (
    <div className="w-full py-28 flex items-center justify-center" aria-hidden="true">
      <div className="w-8 h-8 rounded-full border-2 border-[#FFD600]/30 border-t-[#FFD600] animate-spin shadow-[0_0_12px_rgba(255,214,0,0.3)]" />
    </div>
  );
}

function App() {
  return (
    <ReactLenis root>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="bg-cyber-black text-gray-200 min-h-screen relative select-none font-sans overflow-x-hidden selection:bg-[#FFD600] selection:text-black"
      >
        {/* Custom Glowing Cursor Follower (desktop fine-pointer) */}
        <CustomCursor />

        {/* Sticky HUD Navbar */}
        <Navbar />

        {/* Floating Quick WhatsApp Action Button */}
        <WhatsAppButton />

        {/* Modular Sections Container */}
        <main className="w-full flex flex-col">
          {/* Hero Section — Eager loaded above the fold */}
          <Hero />

          {/* Below-the-fold Sections */}
          <Suspense fallback={<SectionSkeleton />}>
            <About />
          </Suspense>
          <Suspense fallback={<SectionSkeleton />}>
            <Stats />
          </Suspense>
          <Suspense fallback={<SectionSkeleton />}>
            <Skills />
          </Suspense>
          <Suspense fallback={<SectionSkeleton />}>
            <Projects />
          </Suspense>
          <Suspense fallback={<SectionSkeleton />}>
            <Experience />
          </Suspense>
          <Suspense fallback={<SectionSkeleton />}>
            <AIGenAI />
          </Suspense>
          <Suspense fallback={<SectionSkeleton />}>
            <Testimonials />
          </Suspense>
          <Suspense fallback={<SectionSkeleton />}>
            <Contact />
          </Suspense>
        </main>

        {/* System Status Footer */}
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </motion.div>
    </ReactLenis>
  );
}

export default App;
