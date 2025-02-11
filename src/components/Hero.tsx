"use client";

import { useGSAP } from "@gsap/react";
import { useEffect, useRef, useState } from "react";
import { gsap } from "~/utils/gsap";

function generateRandomChar() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return chars[Math.floor(Math.random() * chars.length)];
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const [glitchText, setGlitchText] = useState("AGI MOMENT");
  const [isClient, setIsClient] = useState(false);

  // 在客户端加载完成后设置标志
  useEffect(() => {
    setIsClient(true);
  }, []);

  // 故障文字效果
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

  useGSAP(() => {
    if (!isClient) {
      return;
    }

    const tl = gsap.timeline();

    // 标题动画
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

    // 高级粒子效果
    const particles = gsap.utils.toArray<HTMLElement>(".particle");
    particles.forEach((particle) => {
      const randomX = Math.random() * 200 - 100;
      const randomY = Math.random() * 200 - 100;

      gsap.set(particle, {
        x: randomX,
        y: randomY,
        scale: Math.random() * 1.5 + 0.5,
      });

      gsap.to(particle, {
        x: `random(${-randomX}, ${randomX})`,
        y: `random(${-randomY}, ${randomY})`,
        rotation: "random(-720, 720)",
        duration: "random(3, 6)",
        repeat: -1,
        yoyo: true,
        ease: "none",
      });
    });

    // 网格动画
    const gridLines = gsap.utils.toArray<HTMLElement>(".grid-line");
    gridLines.forEach((line, index) => {
      gsap.from(line, {
        scaleX: 0,
        duration: 1,
        delay: index * 0.1,
        ease: "power2.out",
      });
    });

    // 鼠标移动视差效果
    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 20;
      const y = (clientY / innerHeight - 0.5) * 20;

      gsap.to(".parallax", {
        x: -x,
        y: -y,
        duration: 1,
        ease: "power2.out",
      });

      gsap.to(".parallax-slow", {
        x: -x * 0.5,
        y: -y * 0.5,
        duration: 1,
        ease: "power2.out",
      });

      gsap.to(".parallax-fast", {
        x: -x * 2,
        y: -y * 2,
        duration: 1,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, { scope: containerRef, dependencies: [isClient] });

  // 生成静态位置的粒子数据
  const particlesData = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    color: `rgba(${Math.random() * 255}, ${Math.random() * 255}, 255, 0.3)`,
  }));

  return (
    <div ref={containerRef} className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* 动态背景 */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,255,0.1),transparent_50%)]" />
          <div
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,0,255,0.1),transparent_50%)]"
            style={{ transform: "scale(1.2)" }}
          />
        </div>
      </div>

      {/* 能量网格 */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0%,rgba(0,255,255,0.1)_50%,transparent_100%)] animate-[pulse_4s_ease-in-out_infinite]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(255,0,255,0.1)_50%,transparent_100%)] animate-[pulse_4s_ease-in-out_infinite]" />
      </div>

      {/* 背景网格 */}
      <div className="absolute inset-0 opacity-20">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`grid-${i}`}
            className="grid-line absolute h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent"
            style={{ top: `${(i + 1) * 5}%` }}
          />
        ))}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`grid-v-${i}`}
            className="grid-line absolute h-full w-px bg-gradient-to-b from-transparent via-purple-500 to-transparent"
            style={{ left: `${(i + 1) * 5}%` }}
          />
        ))}
      </div>

      {/* 浮动几何体 */}
      {isClient && (
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={`geometric-${i}`}
              className="absolute opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                transform: `rotate(${Math.random() * 360}deg) scale(${Math.random() * 0.5 + 0.5})`,
                animation: `float ${Math.random() * 10 + 10}s ease-in-out infinite`,
              }}
            >
              <div
                className="h-20 w-20 border border-cyan-500/30 backdrop-blur-sm"
                style={{
                  clipPath: i % 2 === 0
                    ? "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)"
                    : "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
                }}
              />
            </div>
          ))}
        </div>
      )}

      {/* 光束效果 */}
      {isClient && (
        <div className="absolute inset-0 overflow-hidden opacity-10">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={`beam-${i}`}
              className="absolute h-[200vh] w-px bg-gradient-to-b from-transparent via-cyan-500 to-transparent"
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
      )}

      {/* 背景粒子 */}
      <div className="parallax-slow">
        {isClient && particlesData.map(particle => (
          <div
            key={`particle-${particle.id}`}
            className="particle absolute h-1 w-1 rounded-full"
            style={{
              left: particle.left,
              top: particle.top,
              background: particle.color,
              filter: "blur(1px)",
            }}
          />
        ))}
      </div>

      {/* 数字雨效果 */}
      {isClient && (
        <div className="parallax absolute inset-0 overflow-hidden opacity-20">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={`rain-${i}`}
              className="absolute top-0 text-xs font-light text-cyan-500"
              style={{
                left: `${(i + 1) * 5}%`,
                animation: `digitalRain ${Math.random() * 5 + 5}s linear infinite`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            >
              {Array.from({ length: 20 }).map((_, j) => (
                <div
                  key={j}
                  style={{
                    opacity: 1 - j * 0.1,
                    transform: `translateY(${j * 20}px)`,
                  }}
                >
                  {Math.random() > 0.5 ? "1" : "0"}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 text-center">
        {/* 故障效果标题 */}
        <div className="parallax relative">
          <h1
            ref={titleRef}
            className="glitch-text relative text-6xl font-bold md:text-8xl"
            style={{
              textShadow: "2px 2px 20px rgba(0, 255, 255, 0.5), -2px -2px 20px rgba(255, 0, 255, 0.5)",
            }}
          >
            <span className="relative z-10 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              {glitchText}
            </span>
            <span className="absolute left-0 top-0 z-0 translate-x-[-5px] translate-y-[-5px] bg-gradient-to-r from-red-500 to-purple-500 bg-clip-text opacity-50 blur-sm">
              {glitchText}
            </span>
            <span className="absolute left-0 top-0 z-0 translate-x-[5px] translate-y-[5px] bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text opacity-50 blur-sm">
              {glitchText}
            </span>
          </h1>
        </div>

        {/* 副标题 */}
        <div className="parallax-slow">
          <p
            ref={subtitleRef}
            className="mt-8 max-w-2xl text-lg font-light leading-relaxed text-cyan-200/80 md:text-xl"
            style={{
              textShadow: "0 0 10px rgba(0, 255, 255, 0.5)",
            }}
          >
            2025，人工智能已经开启了新纪元。
            <br />
            在这里，我们将见证人类智慧与机器意识的完美融合，
            <br />
            共同探索超越人类极限的无尽可能。
          </p>
        </div>

        {/* 交互按钮 */}
        <div className="parallax-fast mt-12">
          <button
            className="group relative overflow-hidden rounded-lg bg-transparent px-8 py-3 transition-all hover:scale-105"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-sm" />
            <span className="absolute inset-0 opacity-50">
              <span className="absolute inset-x-0 top-0 h-px animate-[glow_1.5s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
              <span className="absolute inset-x-0 bottom-0 h-px animate-[glow_1.5s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
              <span className="absolute inset-y-0 left-0 w-px animate-[glow_1.5s_ease-in-out_infinite] bg-gradient-to-b from-transparent via-cyan-500 to-transparent" />
              <span className="absolute inset-y-0 right-0 w-px animate-[glow_1.5s_ease-in-out_infinite] bg-gradient-to-b from-transparent via-purple-500 to-transparent" />
            </span>
            <span className="relative z-10 text-lg font-light text-cyan-300 transition-colors group-hover:text-cyan-200">
              ENTER THE FUTURE
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
