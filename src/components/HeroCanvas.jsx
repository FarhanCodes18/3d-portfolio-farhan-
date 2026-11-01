import React, { useRef, useMemo, useEffect, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import { useInView } from "framer-motion";
import { useDevice } from "../hooks/useDevice";
import * as THREE from "three";

// 3D Scene controller — mouse follow + scroll adjustments
// OPTIMIZED: removed per-frame geometry.array mutation (was uploading GPU buffers 60×/sec)
// OPTIMIZED: scroll progress is now a ref (no React state → no re-renders on scroll)
function CyberScene({ scrollRef }) {
  const groupRef = useRef();
  const coreRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const ring3Ref = useRef();
  const particlesRef = useRef();

  // Mouse state as ref — no re-renders
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Particles — static positions, drift via rotation only (no per-frame buffer upload)
  const particleCount = 100;
  const positions = useMemo(() => {
    const arr = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      arr[i]     = (Math.random() - 0.5) * 15;
      arr[i + 1] = (Math.random() - 0.5) * 15;
      arr[i + 2] = (Math.random() - 0.5) * 15;
    }
    return arr;
  }, []);

  // Torus geometries — pre-built with reduced segments for fewer draw calls
  const ring1Geo = useMemo(() => new THREE.TorusGeometry(2.5, 0.015, 8, 64), []);
  const ring2Geo = useMemo(() => new THREE.TorusGeometry(2.8, 0.01, 8, 64), []);
  const ring3Geo = useMemo(() => new THREE.TorusGeometry(3.2, 0.008, 6, 48), []);

  useFrame((state, delta) => {
    const scroll = scrollRef.current;
    mouse.current.x += (mouse.current.targetX - mouse.current.x) * 0.05;
    mouse.current.y += (mouse.current.targetY - mouse.current.y) * 0.05;

    if (groupRef.current) {
      groupRef.current.rotation.y = mouse.current.x * 0.4;
      groupRef.current.rotation.x = -mouse.current.y * 0.3;
      groupRef.current.position.y = -scroll * 3;
      groupRef.current.rotation.z = scroll * 1.5;
    }

    const time = state.clock.getElapsedTime();

    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.3;
      coreRef.current.rotation.x += delta * 0.12;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = time * 0.15;
      ring1Ref.current.rotation.y = time * 0.2;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = -time * 0.25;
      ring2Ref.current.rotation.z = time * 0.1;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x = -time * 0.1;
      ring3Ref.current.rotation.z = -time * 0.3;
    }

    // Particle rotation only — no per-frame position mutation
    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.05;
      particlesRef.current.rotation.x += delta * 0.018;
    }
  });

  return (
    <group ref={groupRef}>
      {/* 3D Grid Overlay Backdrop */}
      <gridHelper args={[20, 20, "#FFD600", "#1a1a1a"]} position={[0, -4, 0]} rotation={[0.2, 0, 0]} />

      {/* Central Morphing Mesh */}
      <mesh ref={coreRef} position={[0, 0, 0]}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <MeshDistortMaterial
          color="#FFD600"
          roughness={0.1}
          metalness={0.9}
          distort={0.4}
          speed={2}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* Wireframe Core Overlay */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1.52, 16, 16]} />
        <meshBasicMaterial color="#FFD600" wireframe transparent opacity={0.06} />
      </mesh>

      {/* Orbiting Tech Rings — geometry reused via useMemo */}
      <mesh ref={ring1Ref} geometry={ring1Geo}>
        <meshBasicMaterial color="#FFD600" transparent opacity={0.5} />
      </mesh>
      <mesh ref={ring2Ref} geometry={ring2Geo}>
        <meshBasicMaterial color="#FFD600" transparent opacity={0.3} />
      </mesh>
      <mesh ref={ring3Ref} geometry={ring3Geo}>
        <meshBasicMaterial color="#FFD600" transparent opacity={0.2} />
      </mesh>

      {/* Particle System — static positions, drift via rotation only */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#FFD600"
          size={0.025}
          sizeAttenuation={true}
          transparent={true}
          opacity={0.6}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Lights */}
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#FFD600" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ffffff" />
      <spotLight position={[0, 5, 5]} angle={0.3} penumbra={1} intensity={2} color="#FFD600" />
    </group>
  );
}

export default function HeroCanvas() {
  // OPTIMIZED: scroll progress as ref, not state — zero re-renders on scroll
  const scrollRef = useRef(0);
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { margin: "250px" });
  const { isMobile, isLowEnd } = useDevice();

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      scrollRef.current = height > 0 ? scrolled / height : 0;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Skip canvas on mobile or low-end devices
  if (isMobile || isLowEnd) return null;

  return (
    <div ref={containerRef} className="absolute inset-0 z-10 select-none pointer-events-none">
      {inView && (
        <Canvas
          camera={{ position: [0, 0, 5.5], fov: 60 }}
          gl={{
            antialias: false,
            alpha: true,
            powerPreference: "high-performance",
            // Reduce precision for performance
            precision: "mediump",
          }}
          dpr={[1, 1.2]}
          performance={{ min: 0.5 }}
          style={{ pointerEvents: "auto" }}
        >
          <CyberScene scrollRef={scrollRef} />
        </Canvas>
      )}
    </div>
  );
}
