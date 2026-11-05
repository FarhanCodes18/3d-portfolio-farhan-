import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WHATSAPP_NUMBER = "917974271675"; // Farhan's WhatsApp phone number (with country code)
const DEFAULT_MESSAGE = encodeURIComponent(
  "Hi Farhan! I saw your futuristic 3D portfolio and would love to collaborate on a project with you."
);
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${DEFAULT_MESSAGE}`;

export default function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3 pointer-events-auto">
      {/* Tooltip badge on hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: 15, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0a0a0d]/90 border border-[#FFD600]/40 backdrop-blur-xl shadow-[0_0_20px_rgba(255,214,0,0.25)] select-none pointer-events-none"
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_#4ade80]" />
            <span className="font-mono text-xs font-bold text-white tracking-wider uppercase">
              Chat on <span className="text-[#FFD600]">WhatsApp</span>
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Direct WhatsApp Message"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.94 }}
        className="relative group w-14 h-14 rounded-full flex items-center justify-center cursor-pointer select-none overflow-visible"
        style={{
          background: "linear-gradient(135deg, rgba(37,211,102,0.9) 0%, rgba(18,140,126,0.95) 100%)",
          boxShadow: isHovered
            ? "0 0 35px rgba(255,214,0,0.5), 0 0 25px rgba(37,211,102,0.6)"
            : "0 0 20px rgba(37,211,102,0.35), 0 8px 25px rgba(0,0,0,0.6)",
          border: "1.5px solid rgba(255,214,0,0.6)",
        }}
      >
        {/* Pulsing Outer Ping Ring */}
        <span
          className="absolute inset-0 rounded-full animate-ping opacity-35 pointer-events-none"
          style={{ background: "#FFD600" }}
        />

        {/* Orbiting Golden Halo */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-1 rounded-full border border-dashed border-[#FFD600]/40 pointer-events-none"
        />

        {/* WhatsApp Vector Icon */}
        <svg
          viewBox="0 0 24 24"
          className="w-7 h-7 text-white fill-current relative z-10 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]"
          aria-hidden="true"
        >
          <path d="M12.031 2c-5.508 0-9.984 4.477-9.984 9.984 0 1.761.459 3.479 1.332 4.992L2 22l5.176-1.358c1.465.799 3.119 1.22 4.855 1.22 5.508 0 9.984-4.476 9.984-9.984 0-5.507-4.476-9.984-9.984-9.984zm0 18.25c-1.524 0-3.023-.404-4.336-1.168l-.311-.182-3.224.846.861-3.143-.2-.318c-.839-1.336-1.282-2.887-1.282-4.485 0-4.568 3.717-8.285 8.285-8.285 4.568 0 8.285 3.717 8.285 8.285 0 4.568-3.717 8.25-8.278 8.25zm4.542-6.195c-.249-.125-1.474-.727-1.703-.81-.229-.083-.395-.125-.561.125s-.644.81-.789.977c-.146.166-.291.187-.541.062s-1.056-.389-2.011-1.24c-.743-.663-1.245-1.482-1.391-1.732s-.016-.385.109-.509c.112-.112.249-.291.374-.437.125-.145.166-.249.25-.415.083-.166.042-.312-.021-.437s-.561-1.351-.769-1.85c-.202-.486-.408-.42-.561-.428l-.478-.008c-.166 0-.437.062-.665.312s-.873.852-.873 2.079c0 1.227.894 2.412 1.019 2.578.125.166 1.758 2.684 4.258 3.764.595.257 1.06.41 1.423.525.598.19 1.142.163 1.572.099.48-.072 1.474-.603 1.682-1.185.208-.582.208-1.081.146-1.185-.063-.104-.229-.166-.479-.291z" />
        </svg>

        {/* Small corner neon badge */}
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#FFD600] border-2 border-[#050507] shadow-[0_0_8px_#FFD600]" />
      </motion.a>
    </div>
  );
}
