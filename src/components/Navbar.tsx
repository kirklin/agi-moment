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

    // 添加微妙的光晕效果
    const glowElements = gsap.utils.toArray<HTMLElement>(".nav-glow");
    glowElements.forEach((element) => {
      gsap.to(element, {
        filter: "brightness(1.2)",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    });
  }, { scope: navRef });

  return (
    <nav
      ref={navRef}
      className="fixed left-0 right-0 top-0 z-50 backdrop-blur-sm"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between p-5">
        <Link
          href="/"
          className="nav-glow relative text-xl font-bold text-white/90 transition-all duration-300 hover:text-cyan-300"
        >
          <span className="relative z-10">AGI MOMENT</span>
        </Link>

        <div className="flex items-center gap-8">
          <Link
            href="/about"
            className="relative overflow-hidden text-white/70 transition-all duration-300 hover:text-cyan-300"
          >
            <span className="relative z-10">关于</span>
          </Link>
          <a
            href="https://github.com/kirklin"
            target="_blank"
            rel="noopener noreferrer"
            className="relative overflow-hidden text-white/70 transition-all duration-300 hover:text-cyan-300"
          >
            <span className="relative z-10">GitHub</span>
          </a>
        </div>
      </div>
    </nav>
  );
}
