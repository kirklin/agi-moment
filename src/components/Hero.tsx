"use client";

import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "~/utils/gsap";

// Constants
const NODES_COUNT = 20;
const GLITCH_INTERVAL = 3000;
const GLITCH_DURATION = 500;

// Theme
const theme = {
  colors: {
    primary: "rgba(0, 255, 255, 0.9)",
    secondary: "rgba(255, 0, 255, 0.9)",
    background: "#000000",
  },
};

// 生成随机字符用于文字故障效果
function generateRandomChar() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return chars[Math.floor(Math.random() * chars.length)];
}

// 优化的节点生成函数
function generateNodes(count: number) {
  return Array.from({ length: count }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    radius: Math.random() * 2 + 1,
    velocity: {
      x: (Math.random() - 0.5) * 0.1,
      y: (Math.random() - 0.5) * 0.1,
    },
  }));
}

// 优化的连接生成函数
function generateConnections(nodes: any[]) {
  return nodes.reduce((connections: any[], node, i) => {
    nodes.slice(i + 1).forEach((otherNode, j) => {
      if (Math.random() > 0.7) {
        connections.push({
          from: i,
          to: j + i + 1,
          opacity: Math.random() * 0.2 + 0.1,
        });
      }
    });
    return connections;
  }, []);
}

export default function Hero() {
  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const animationsRef = useRef<gsap.core.Tween[]>([]);

  // State
  const [glitchText, setGlitchText] = useState("AGI MOMENT");
  const [isClient, setIsClient] = useState(false);
  const [nodes, setNodes] = useState<any[]>([]);
  const [connections, setConnections] = useState<any[]>([]);

  // 初始化
  useLayoutEffect(() => {
    setIsClient(true);
    const initialNodes = generateNodes(NODES_COUNT);
    const initialConnections = generateConnections(initialNodes);
    setNodes(initialNodes);
    setConnections(initialConnections);
  }, []);

  // 优化的鼠标移动处理函数
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

  // 鼠标效果
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  // GSAP 动画
  useGSAP(() => {
    if (!isClient || nodes.length === 0) {
      return;
    }

    // 清理之前的动画
    animationsRef.current.forEach(animation => animation.kill());
    animationsRef.current = [];

    // 节点动画
    nodes.forEach((_, i) => {
      const animation = gsap.to(`#node-${i}`, {
        y: "random(-10, 10)",
        x: "random(-10, 10)",
        duration: "random(4, 8)",
        repeat: -1,
        yoyo: true,
        ease: "none",
      });
      animationsRef.current.push(animation);
    });
  }, { scope: containerRef, dependencies: [isClient, nodes] });

  // 文字故障效果
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
      {/* 背景效果 */}
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

      {/* 神经网络可视化 */}
      <div className="absolute inset-0 parallax-slow">
        <svg className="h-full w-full opacity-20">
          {connections.map((conn, i) => (
            <motion.line
              key={`conn-${i}`}
              x1={`${nodes[conn.from].x}%`}
              y1={`${nodes[conn.from].y}%`}
              x2={`${nodes[conn.to].x}%`}
              y2={`${nodes[conn.to].y}%`}
              stroke="url(#gradient-line)"
              strokeWidth="0.3"
              initial={{ opacity: 0 }}
              animate={{ opacity: conn.opacity }}
              transition={{ duration: 1 }}
            />
          ))}
          {nodes.map((node, i) => (
            <motion.circle
              key={`node-${i}`}
              id={`node-${i}`}
              cx={`${node.x}%`}
              cy={`${node.y}%`}
              r={node.radius}
              fill="url(#gradient-dot)"
              className="animate-pulse"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.02 }}
            />
          ))}
          <defs>
            <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={theme.colors.primary} />
              <stop offset="100%" stopColor={theme.colors.secondary} />
            </linearGradient>
            <radialGradient id="gradient-dot" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={theme.colors.primary} />
              <stop offset="100%" stopColor={theme.colors.secondary} />
            </radialGradient>
          </defs>
        </svg>
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

        {/* 滚动提示 */}
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

      {/* 自定义光标效果 */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 z-50 size-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 blur-3xl"
      />
    </div>
  );
}
