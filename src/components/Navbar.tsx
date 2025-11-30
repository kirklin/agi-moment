"use client";

import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "~/lib/gsap";

// Navigation items configuration
const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "https://github.com/kirklin", label: "GitHub", external: true },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Monitor scrolling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Entrance animation
  useGSAP(() => {
    gsap.from(navRef.current, {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });

    // Navigation item glow effect
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
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-transparent backdrop-blur-[2px]" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between p-5">
        {/* Logo */}
        <Link
          href="/"
          className="nav-glow group relative flex items-center text-xl font-bold text-white/90 transition-all duration-300 hover:text-cyan-300"
        >
          <div className="relative w-[30px] h-[30px] sm:w-[36px] sm:h-[36px] md:w-[40px] md:h-[40px]">
            <Image
              src="/logo.svg"
              alt="AGI MOMENT Logo"
              fill
              sizes="(max-width: 640px) 30px, (max-width: 768px) 36px, 40px"
              className="object-contain"
              priority
            />
          </div>
          <span className="ml-2 relative z-10 text-sm sm:text-base md:text-xl">AGI MOMENT</span>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navItems.map(item => (
            item.external
              ? (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative overflow-hidden text-white/70 transition-all duration-300 hover:text-cyan-300"
                  >
                    <span className="relative z-10">{item.label}</span>
                  </a>
                )
              : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group relative overflow-hidden text-white/70 transition-all duration-300 hover:text-cyan-300"
                  >
                    <span className="relative z-10">{item.label}</span>
                  </Link>
                )
          ))}
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="relative z-50 md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <div className="flex h-8 w-8 items-center justify-center">
            <div className="relative flex h-2 w-6 transform items-center justify-center transition-all duration-300">
              <span
                className={`absolute h-0.5 w-full transform bg-white transition-all duration-300 ${
                  isOpen ? "translate-y-0 rotate-45" : "-translate-y-1"
                }`}
              />
              <span
                className={`absolute h-0.5 w-full transform bg-white transition-all duration-300 ${
                  isOpen ? "translate-y-0 -rotate-45" : "translate-y-1"
                }`}
              />
            </div>
          </div>
        </button>

        {/* Mobile menu */}
        <motion.div
          className="fixed bottom-0 left-0 right-0 top-0 z-40 flex items-center justify-center bg-black/95 backdrop-blur-lg md:hidden"
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? "0%" : "100%" }}
          transition={{ type: "spring", damping: 30 }}
        >
          <div className="flex flex-col items-center gap-8">
            {navItems.map(item => (
              item.external
                ? (
                    <a
                      key={item.href}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-2xl text-white/70 transition-colors duration-300 hover:text-cyan-300"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </a>
                  )
                : (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-2xl text-white/70 transition-colors duration-300 hover:text-cyan-300"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )
            ))}
          </div>
        </motion.div>
      </div>
    </nav>
  );
}
