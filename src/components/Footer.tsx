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
  }, { scope: footerRef });

  return (
    <footer
      ref={footerRef}
      className="relative w-full bg-black/20 py-12 backdrop-blur-sm"
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-white/90">
              AGI MOMENT
            </h3>
            <p className="mt-2 text-sm text-white/60">
              探索 AGI 的无限可能
            </p>
          </div>

          <div className="flex gap-8">
            <a
              href="https://github.com/kirklin"
              target="_blank"
              rel="noopener noreferrer"
              className="relative text-white/60 transition-all duration-300 hover:text-cyan-300"
            >
              <span className="relative z-10">GitHub</span>
            </a>
            <a
              href="mailto:contact@agimoment.com"
              className="relative text-white/60 transition-all duration-300 hover:text-cyan-300"
            >
              <span className="relative z-10">联系我们</span>
            </a>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-white/40">
            ©
            {" "}
            {new Date().getFullYear()}
            {" "}
            AGI MOMENT. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
}
