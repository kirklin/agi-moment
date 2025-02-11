"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { gsap } from "~/utils/gsap";

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from(footerRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top bottom",
        end: "bottom bottom",
        scrub: 1,
      },
    });

    // 添加扫描线动画
    const scanline = document.createElement("div");
    scanline.className = "absolute left-0 h-px w-full bg-cyan-500/30";
    footerRef.current?.appendChild(scanline);

    gsap.to(scanline, {
      top: "100%",
      duration: 2,
      ease: "none",
      repeat: -1,
      repeatDelay: 0,
    });
  }, { scope: footerRef });

  return (
    <footer
      ref={footerRef}
      className="relative w-full overflow-hidden border-t border-cyan-500/20 bg-black/50 py-12 backdrop-blur-lg"
    >
      {/* 背景装饰 */}
      <div className="absolute inset-0 opacity-5">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="absolute h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent"
            style={{ top: `${i * 10}%` }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl px-4">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-cyan-300" style={{ textShadow: "0 0 10px rgba(0, 255, 255, 0.5)" }}>
              AGI MOMENT
            </h3>
            <p className="mt-2 text-sm text-cyan-200/60">
              探索 AGI 的无限可能
            </p>
          </div>

          <div className="flex gap-8">
            <a
              href="https://github.com/kirklin"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative text-cyan-200/60 transition-all hover:text-cyan-300"
            >
              <span className="relative z-10">GitHub</span>
              <span className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-300 group-hover:w-full" />
            </a>
            <a
              href="mailto:contact@agimoment.com"
              className="group relative text-cyan-200/60 transition-all hover:text-cyan-300"
            >
              <span className="relative z-10">联系我们</span>
              <span className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-300 group-hover:w-full" />
            </a>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-cyan-200/40">
            ©
            {" "}
            {new Date().getFullYear()}
            {" "}
            AGI MOMENT. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>

      {/* 装饰性边框 */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
    </footer>
  );
}
