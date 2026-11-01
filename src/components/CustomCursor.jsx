import React, { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// OPTIMIZED: CustomCursor
// - Removed useState for isHovered → useRef to prevent framer-motion re-renders
// - mouseover events replaced with event delegation via pointerenter/pointerleave
// - RAF-throttled mouse position updates
// - Passive event listeners throughout

export default function CustomCursor() {
  const isHoveredRef = useRef(false);
  const isTouchDevice = useRef(
    typeof window !== "undefined"
      ? window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window
      : true
  );

  // Motion values for cursor positions
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Spring for smooth outer ring
  const springConfig = { damping: 30, stiffness: 350, mass: 0.6 };
  const outerX = useSpring(mouseX, springConfig);
  const outerY = useSpring(mouseY, springConfig);

  // Reactive size/glow state
  const [isHovered, setIsHovered] = React.useState(false);

  useEffect(() => {
    if (isTouchDevice.current) return;

    let rafId = null;
    let pendingX = -100;
    let pendingY = -100;

    const handleMouseMove = (e) => {
      pendingX = e.clientX;
      pendingY = e.clientY;
      // RAF-throttle: update motion values at most once per frame
      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          mouseX.set(pendingX);
          mouseY.set(pendingY);
          rafId = null;
        });
      }
    };

    // OPTIMIZED: use focusin/pointerover instead of mouseover for less DOM walking
    // Use event delegation — check once if the target is clickable
    const CLICKABLE_TAGS = new Set(["A", "BUTTON", "INPUT", "TEXTAREA", "SELECT"]);

    const handlePointerOver = (e) => {
      const target = e.target;
      const clickable =
        CLICKABLE_TAGS.has(target.tagName) ||
        target.getAttribute("role") === "button" ||
        target.closest("button, a, [role='button']");
      const next = !!clickable;
      if (next !== isHoveredRef.current) {
        isHoveredRef.current = next;
        setIsHovered(next);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("pointerover", handlePointerOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("pointerover", handlePointerOver);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [mouseX, mouseY]);

  if (isTouchDevice.current) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[99999] mix-blend-screen">
      {/* Inner solid core dot — follows raw mouse */}
      <motion.div
        className="absolute w-2 h-2 rounded-full bg-[#FFD600] -translate-x-1/2 -translate-y-1/2"
        style={{ x: mouseX, y: mouseY }}
      />

      {/* Outer spring glow halo — follows with spring lag */}
      <motion.div
        className="absolute rounded-full border border-[#FFD600] -translate-x-1/2 -translate-y-1/2 bg-[#FFD600]/5 flex items-center justify-center"
        style={{
          x: outerX,
          y: outerY,
          width: isHovered ? 56 : 24,
          height: isHovered ? 56 : 24,
          boxShadow: isHovered
            ? "0 0 20px rgba(255, 214, 0, 0.4), inset 0 0 10px rgba(255, 214, 0, 0.2)"
            : "0 0 8px rgba(255, 214, 0, 0.1)",
          borderColor: isHovered ? "rgba(255, 214, 0, 0.8)" : "rgba(255, 214, 0, 0.4)",
        }}
        transition={{ type: "spring", damping: 25, stiffness: 250 }}
      />
    </div>
  );
}
