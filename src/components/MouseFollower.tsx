"use client";

import { useEffect, useRef } from "react";
import { gsap } from "~/utils/gsap";

export default function MouseFollower() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorOuterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorOuter = cursorOuterRef.current;

    if (!cursor || !cursorOuter) {
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.2,
      });

      gsap.to(cursorOuter, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    const onMouseEnterLink = () => {
      gsap.to([cursor, cursorOuter], {
        scale: 1.5,
        duration: 0.3,
      });
    };

    const onMouseLeaveLink = () => {
      gsap.to([cursor, cursorOuter], {
        scale: 1,
        duration: 0.3,
      });
    };

    document.addEventListener("mousemove", onMouseMove);

    const links = document.querySelectorAll("a, button");
    links.forEach((link) => {
      link.addEventListener("mouseenter", onMouseEnterLink);
      link.addEventListener("mouseleave", onMouseLeaveLink);
    });

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      links.forEach((link) => {
        link.removeEventListener("mouseenter", onMouseEnterLink);
        link.removeEventListener("mouseleave", onMouseLeaveLink);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 z-50 h-2 w-2 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-cyan-500"
        style={{
          boxShadow: "0 0 20px rgba(0, 255, 255, 0.5)",
        }}
      />
      <div
        ref={cursorOuterRef}
        className="pointer-events-none fixed left-0 top-0 z-50 h-8 w-8 -translate-x-1/2 -translate-y-1/2 transform rounded-full border border-cyan-500/30"
        style={{
          boxShadow: "0 0 30px rgba(0, 255, 255, 0.2)",
        }}
      />
    </>
  );
}
