import React from "react";
import { motion } from "framer-motion";
import { Calendar, Briefcase, Award } from "lucide-react";

const EXPERIENCES = [
  {
    id: "01",
    role: "Freelance Web Developer",
    company: "Upwork",
    period: "2025 – MARCH 2026",
    desc: "Worked as a Freelance Web Developer on Upwork, collaborating with clients to build modern, responsive, and user-friendly websites. Gained practical experience in client communication, project management, website development, and delivering digital solutions according to client requirements.",
    highlights: ["HTML & CSS", "JavaScript", "Responsive Design", "Client Management"]
  },
  {
    id: "02",
    role: "IT & Digital Media Manager",
    company: "Ideal Public School // Chandori Waraseoni",
    period: "2026 – PRESENT",
    desc: "Currently managing IT operations and digital media activities at Ideal Public School, Chandori Waraseoni. Responsible for maintaining the school's website, managing digital platforms, creating promotional graphics and videos, handling online presence, and supporting technology-related activities.",
    highlights: ["Website Management", "IT Operations", "Digital Marketing", "Graphic Designing", "SEO & Media Management"]
  },
  {
    id: "03",
    role: "Computer Teacher",
    company: "Genius School // Waraseoni",
    period: "MARCH 2026 – PRESENT",
    desc: "Working as a Computer Teacher, teaching students essential computer concepts and practical digital skills. Helping students understand computer fundamentals, software applications, programming basics, and modern technologies through interactive and practical learning methods.",
    highlights: ["Computer Science", "MS Office", "Programming Fundamentals", "Practical Learning", "Student Mentoring"]
  }
];

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative py-24 md:py-32 w-full bg-cyber-black overflow-hidden px-6 md:px-12 border-b border-cyber-border/20"
    >
      {/* Dynamic Grid Background overlay */}
      <div className="absolute inset-0 cyber-grid pointer-events-none opacity-20 z-0" />
      
      {/* Radial soft glow */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full glow-yellow-radial pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col text-left mb-16 md:mb-20">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 bg-[#FFD600]" />
            <span className="font-mono text-xs tracking-[0.3em] text-[#FFD600] uppercase">
              TEMPORAL CHRONOLOGY // 04
            </span>
          </div>
          <h2 className="font-display font-black text-3xl md:text-5xl tracking-tight text-white uppercase">
            EXPERIENCE TIMELINE
          </h2>
          <div className="w-16 h-1 bg-[#FFD600] mt-3" />
        </div>

        {/* Timeline Path Container */}
        <div className="relative w-full max-w-4xl mx-auto mt-12">
          
          {/* Vertical Central Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#FFD600] via-[#FFD600]/30 to-[#FFD600]/5 -translate-x-1/2" />

          {/* Timeline Cards */}
          <div className="flex flex-col gap-12">
            {EXPERIENCES.map((exp, index) => {
              const isEven = index % 2 === 0;
              return (
                <div 
                  key={exp.id || exp.role} 
                  className={`flex flex-col md:flex-row w-full relative ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  
                  {/* Glowing Node Dot on center timeline */}
                  <div className="absolute left-4 md:left-1/2 top-6 -translate-x-1/2 z-10">
                    <span className="relative flex h-5 w-5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFD600] opacity-50"></span>
                      <span className="relative inline-flex rounded-full h-5 w-5 bg-cyber-black border-2 border-[#FFD600] justify-center items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FFD600]" />
                      </span>
                    </span>
                  </div>

                  {/* Empty space placeholder for desktop alignment */}
                  <div className="hidden md:block w-1/2" />

                  {/* Actual Experience Card content */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full md:w-[45%] pl-12 md:pl-0"
                  >
                    <div className="glassmorphism p-6 md:p-8 rounded-lg text-left neon-glow-border-hover transition-all duration-300 relative group overflow-hidden">
                      {/* Sub-corner HUD decorations */}
                      <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[#FFD600]/10 group-hover:border-[#FFD600]/40 transition-colors pointer-events-none" />

                      {/* Period Date Tag & ID Badge */}
                      <div className="flex items-center justify-between text-xs font-mono text-[#FFD600] mb-3">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{exp.period}</span>
                        </div>
                        <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded bg-[#FFD600]/10 text-[#FFD600] border border-[#FFD600]/20">
                          {exp.id}
                        </span>
                      </div>

                      {/* Title & Organization */}
                      <h3 className="font-display font-bold text-lg md:text-xl text-white tracking-wide uppercase">
                        {exp.role}
                      </h3>
                      
                      <div className="flex items-center gap-1.5 text-xs text-gray-400 font-mono mt-1 mb-4 uppercase">
                        <Briefcase className="w-3.5 h-3.5" />
                        <span>{exp.company}</span>
                      </div>

                      {/* Main Paragraph Description */}
                      <p className="text-gray-400 text-xs md:text-sm font-light leading-relaxed mb-6">
                        {exp.desc}
                      </p>

                      {/* Core Highlights */}
                      <div className="flex flex-wrap gap-2 pt-4 border-t border-cyber-border/20">
                        {exp.highlights.map((hl) => (
                          <div 
                            key={hl}
                            className="flex items-center gap-1 text-[10px] font-mono text-[#FFD600] bg-[#FFD600]/5 px-2.5 py-1 rounded border border-[#FFD600]/10"
                          >
                            <Award className="w-3 h-3" />
                            <span>{hl}</span>
                          </div>
                        ))}
                      </div>

                    </div>
                  </motion.div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
