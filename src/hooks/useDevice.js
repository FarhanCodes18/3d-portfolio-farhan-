import { useState, useEffect } from "react";

// Enhanced device detection with GPU tier awareness
export function useDevice() {
  const [isMobile, setIsMobile] = useState(() => {
    // SSR safe initialization
    if (typeof window === "undefined") return false;
    return window.innerWidth < 768;
  });
  const [isLowEnd, setIsLowEnd] = useState(() => {
    if (typeof window === "undefined") return false;
    // Detect low-end devices via hardware concurrency & memory
    const cores = navigator.hardwareConcurrency || 4;
    const memory = navigator.deviceMemory || 4; // GB, not available on all browsers
    return cores <= 2 || memory <= 2;
  });

  useEffect(() => {
    let rafId;
    const handleResize = () => {
      // Debounce via rAF to avoid jank
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setIsMobile(window.innerWidth < 768);
      });
    };

    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return { isMobile, isLowEnd };
}
