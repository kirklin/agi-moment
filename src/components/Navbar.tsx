"use client";

import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { useRef } from "react";
import { gsap } from "~/utils/gsap";

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from(navRef.current, {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });

    // 添加霓虹灯效果动画
    const neonElements = gsap.utils.toArray<HTMLElement>(".neon-text");
    neonElements.forEach((element) => {
      gsap.to(element, {
        textShadow: "0 0 10px rgba(0, 255, 255, 0.8), 0 0 20px rgba(0, 255, 255, 0.5)",
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    });
  }, { scope: navRef });

  return (
    <nav
      ref={navRef}
      className="fixed left-0 right-0 top-0 z-50 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between p-5">
        <Link
          href="/"
          className="neon-text group relative text-xl font-bold text-cyan-300 transition-all hover:text-cyan-200"
          style={{
            textShadow: "0 0 10px rgba(0, 255, 255, 0.5)",
          }}
        >
          <span className="relative z-10">AGI MOMENT</span>
          <span className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-300 group-hover:w-full" />
        </Link>

        <div className="flex items-center gap-8">
          <Link
            href="/about"
            className="group relative text-gray-300 transition-all hover:text-cyan-300"
          >
            <span className="relative z-10">关于</span>
            <span className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-300 group-hover:w-full" />
          </Link>
          <a
            href="https://github.com/kirklin"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative text-gray-300 transition-all hover:text-cyan-300"
          >
            <span className="relative z-10">GitHub</span>
            <span className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-300 group-hover:w-full" />
          </a>
        </div>
      </div>

      {/* 装饰性的网格线 */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
    </nav>
  );
}
