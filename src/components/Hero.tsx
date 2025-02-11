"use client";

import { useGSAP } from "@gsap/react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "~/utils/gsap";

// 生成随机字符用于文字故障效果
function generateRandomChar() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return chars[Math.floor(Math.random() * chars.length)];
}

// 生成神经网络节点，每个节点包含随机位置和大小
function generateNodes(count: number) {
  return Array.from({ length: count }, () => ({
    x: Math.random() * 100, // 随机x坐标(百分比)
    y: Math.random() * 100, // 随机y坐标(百分比)
    connections: [], // 存储连接关系
    radius: Math.random() * 3 + 2, // 随机节点大小
  }));
}

// 生成节点之间的连接，使用70%的概率创建连接
function generateConnections(nodes: any[]) {
  const connections: any[] = [];
  nodes.forEach((node, i) => {
    for (let j = i + 1; j < nodes.length; j++) {
      if (Math.random() > 0.7) {
        connections.push({
          from: i,
          to: j,
          opacity: Math.random() * 0.3 + 0.1, // 随机连接线透明度
        });
      }
    }
  });
  return connections;
}

export default function Hero() {
  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const animationsRef = useRef<gsap.core.Tween[]>([]);

  // State
  const [glitchText, setGlitchText] = useState("AGI MOMENT");
  const [isClient, setIsClient] = useState(false);
  const [nodes, setNodes] = useState<any[]>([]);
  const [connections, setConnections] = useState<any[]>([]);

  // 初始化：在客户端加载完成后生成节点和连接
  useLayoutEffect(() => {
    setIsClient(true);
    const initialNodes = generateNodes(30);
    const initialConnections = generateConnections(initialNodes);
    setNodes(initialNodes);
    setConnections(initialConnections);
  }, []);

  // 组件卸载时清理所有GSAP动画
  useEffect(() => {
    return () => {
      animationsRef.current.forEach(animation => animation.kill());
      animationsRef.current = [];
    };
  }, []);

  // 文字故障效果：每3秒触发一次，持续约0.5秒
  useEffect(() => {
    if (!isClient) {
      return;
    }

    let interval: NodeJS.Timeout;
    const originalText = "AGI MOMENT";
    let isGlitching = false;

    const triggerGlitch = () => {
      if (isGlitching) {
        return;
      }
      isGlitching = true;
      let counter = 0;
      interval = setInterval(() => {
        const newText = originalText
          .split("")
          .map(char =>
            Math.random() > 0.8 ? generateRandomChar() : char,
          )
          .join("");
        setGlitchText(newText);
        counter++;
        if (counter > 10) {
          clearInterval(interval);
          setGlitchText(originalText);
          isGlitching = false;
        }
      }, 50);
    };

    const glitchInterval = setInterval(triggerGlitch, 3000);
    return () => {
      clearInterval(interval);
      clearInterval(glitchInterval);
    };
  }, [isClient]);

  // GSAP动画效果
  useGSAP(() => {
    if (!isClient || nodes.length === 0) {
      return;
    }

    // 清理之前的动画实例
    animationsRef.current.forEach(animation => animation.kill());
    animationsRef.current = [];

    const tl = gsap.timeline();

    // 标题和副标题的入场动画
    tl.from(titleRef.current, {
      y: 100,
      opacity: 0,
      duration: 1.5,
      ease: "power4.out",
    })
      .from(
        subtitleRef.current,
        {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.5",
      );

    // 节点的持续浮动动画
    nodes.forEach((_, i) => {
      const animation = gsap.to(`#node-${i}`, {
        y: "random(-20, 20)",
        x: "random(-20, 20)",
        duration: "random(3, 6)",
        repeat: -1,
        yoyo: true,
        ease: "none",
      });
      animationsRef.current.push(animation);
    });

    // 鼠标移动时的视差效果
    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 20;
      const y = (clientY / innerHeight - 0.5) * 20;

      // 普通视差层
      gsap.to(".parallax", {
        x: -x,
        y: -y,
        duration: 1,
        ease: "power2.out",
      });

      // 慢速视差层
      gsap.to(".parallax-slow", {
        x: -x * 0.5,
        y: -y * 0.5,
        duration: 1,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, { scope: containerRef, dependencies: [isClient, nodes] });

  // 服务器端渲染时的基础内容
  if (!isClient) {
    return (
      <div ref={containerRef} className="relative min-h-screen w-full overflow-hidden bg-black">
        <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4">
          <h1
            ref={titleRef}
            className="mb-6 text-center text-6xl font-bold tracking-wider text-white/90 md:text-8xl"
          >
            AGI MOMENT
          </h1>
          <p
            ref={subtitleRef}
            className="text-center text-lg text-white/70 md:text-xl"
          >
            Exploring the Future of Artificial General Intelligence
          </p>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* 渐变背景效果 */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,255,0.03),transparent_70%)]" />
          <div
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,0,255,0.03),transparent_70%)]"
            style={{ transform: "scale(1.2)" }}
          />
        </div>
      </div>

      {/* 神经网络可视化 */}
      {nodes.length > 0 && (
        <div className="absolute inset-0 parallax-slow">
          <svg className="h-full w-full opacity-15">
            {/* 节点之间的连接线 */}
            {connections.map((conn, i) => (
              <line
                key={`conn-${i}`}
                x1={`${nodes[conn.from].x}%`}
                y1={`${nodes[conn.from].y}%`}
                x2={`${nodes[conn.to].x}%`}
                y2={`${nodes[conn.to].y}%`}
                stroke="url(#gradient-line)"
                strokeWidth="0.3"
                opacity={conn.opacity}
              />
            ))}
            {/* 神经网络节点 */}
            {nodes.map((node, i) => (
              <circle
                key={`node-${i}`}
                id={`node-${i}`}
                cx={`${node.x}%`}
                cy={`${node.y}%`}
                r={node.radius * 0.8}
                fill="url(#gradient-dot)"
                className="animate-pulse"
              />
            ))}
            {/* 渐变定义 */}
            <defs>
              <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(0, 255, 255, 0.2)" />
                <stop offset="100%" stopColor="rgba(255, 0, 255, 0.2)" />
              </linearGradient>
              <radialGradient id="gradient-dot">
                <stop offset="0%" stopColor="rgba(255, 255, 255, 0.6)" />
                <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      )}

      {/* 模糊玻璃效果 */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 backdrop-blur-[120px] backdrop-filter" />
      </div>

      {/* 主要内容区域 */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4">
        <h1
          ref={titleRef}
          className="glitch-text mb-6 text-center text-6xl font-bold tracking-wider text-white/90 md:text-8xl"
        >
          {glitchText}
        </h1>
        <p
          ref={subtitleRef}
          className="text-center text-lg text-white/70 md:text-xl"
        >
          Exploring the Future of Artificial General Intelligence
        </p>
      </div>

      {/* 光束装饰效果 */}
      <div className="absolute inset-0 overflow-hidden opacity-5">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={`beam-${i}`}
            className="absolute h-[200vh] w-px bg-gradient-to-b from-transparent via-white to-transparent"
            style={{
              left: `${Math.random() * 100}%`,
              top: "-50%",
              transform: `rotate(${Math.random() * 20 - 10}deg)`,
              animation: `beam ${Math.random() * 5 + 5}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
