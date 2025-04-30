"use client";

import { motion } from "framer-motion";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "~/lib/gsap";
import CanvasWaves from "./CanvasWaves";

// Constants
const GLITCH_INTERVAL = 3000;
const GLITCH_DURATION = 500;

// Generate random characters for text glitch effect
function generateRandomChar() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return chars[Math.floor(Math.random() * chars.length)];
}

export default function Hero() {
  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  // State
  const [glitchText, setGlitchText] = useState("AGI MOMENT");
  const [isClient, setIsClient] = useState(false);

  // Initialization
  useLayoutEffect(() => {
    setIsClient(true);
  }, []);

  // Optimized mouse movement handler
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const { clientX, clientY } = e;

    if (cursorRef.current) {
      gsap.to(cursorRef.current, {
        x: clientX,
        y: clientY,
        duration: 0.2,
        ease: "power2.out",
      });
    }
  }, []);

  // Mouse effect
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  // Text glitch effect
  useEffect(() => {
    if (!isClient) {
      return;
    }

    const originalText = "AGI MOMENT";
    const triggerGlitch = () => {
      let counter = 0;
      const interval = setInterval(() => {
        const newText = originalText
          .split("")
          .map(char =>
            Math.random() > 0.8 ? generateRandomChar() : char,
          )
          .join("");
        setGlitchText(newText);
        counter++;
        if (counter > 5) {
          clearInterval(interval);
          setGlitchText(originalText);
        }
      }, GLITCH_DURATION / 5);
    };

    const glitchInterval = setInterval(() => {
      triggerGlitch();
    }, GLITCH_INTERVAL);

    return () => {
      clearInterval(glitchInterval);
    };
  }, [isClient]);

  if (!isClient) {
    return (
      <div ref={containerRef} className="relative min-h-screen w-full overflow-hidden bg-black">
        <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4">
          <h1 ref={titleRef} className="mb-6 text-center text-6xl font-bold tracking-wider text-white/90 md:text-8xl">
            AGI MOMENT
          </h1>
          <p ref={subtitleRef} className="text-center text-lg text-white/70 md:text-xl">
            Exploring the Future of Artificial General Intelligence
          </p>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* 波浪背景效果 - 使用Canvas实现 */}
      <CanvasWaves />

      {/* 背景渐变效果 */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-30">
          <motion.div
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,255,0.1),transparent_70%)]"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.4, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,0,255,0.1),transparent_70%)]"
            animate={{
              scale: [1.1, 1, 1.1],
              opacity: [0.3, 0.4, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </div>

      {/* 主要内容 */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4">
        <motion.h1
          ref={titleRef}
          className="mb-6 text-center text-6xl font-bold tracking-wider text-white/90 md:text-8xl"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {glitchText}
        </motion.h1>
        <motion.p
          ref={subtitleRef}
          className="text-center text-lg text-white/70 md:text-xl"
          initial={{ y: 25, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        >
          Exploring the Future of Artificial General Intelligence
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{
            y: [0, 8, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm text-white/50">Scroll</span>
            <motion.div
              className="h-10 w-[1px] bg-white/30"
              animate={{
                scaleY: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.div>
      </div>

      {/* Custom cursor effect */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 z-50 size-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 blur-3xl"
      />
    </div>
  );
}
