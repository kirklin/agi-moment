import type { DartmouthSceneProps } from "../types";
import { motion } from "framer-motion";
import { memo } from "react";
import { useIntersectionObserver } from "~/hooks/useIntersectionObserver";

const DartmouthScene = memo(({ quote }: DartmouthSceneProps) => {
  const { ref: sceneRef, isVisible } = useIntersectionObserver({ threshold: 0.3 });

  const proposalText = [
    "A PROPOSAL FOR THE",
    "DARTMOUTH SUMMER RESEARCH PROJECT",
    "ON ARTIFICIAL INTELLIGENCE",
    "",
    "We propose that every aspect of learning",
    "or any other feature of intelligence",
    "can be so precisely described that a machine",
    "can be made to simulate it.",
  ];

  return (
    <div ref={sceneRef} className="dartmouth-scene h-full flex items-center justify-center p-4">
      <motion.div
        className="relative w-full max-w-2xl bg-black border border-white/10 p-8 md:p-12 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden"
        initial={{ opacity: 0, y: 50, rotateX: 20 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50, rotateX: isVisible ? 0 : 20 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        {/* Scanline Effect */}
        <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] pointer-events-none opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent animate-scan pointer-events-none" />

        {/* Corner Accents */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-500/50" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-500/50" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-500/50" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-500/50" />

        {/* Content */}
        <div className="relative z-10 font-mono space-y-6">
          {/* Header */}
          <div className="text-center border-b border-white/10 pb-6 mb-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isVisible ? 1 : 0 }}
              transition={{ delay: 0.5 }}
              className="text-xs text-cyan-500/50 tracking-[0.2em] mb-2"
            >
              RECONSTRUCTED DOCUMENT_1956
            </motion.div>
            {proposalText.slice(0, 3).map((line, i) => (
              <motion.h3
                key={i}
                className="text-xl md:text-2xl font-bold text-white/90 tracking-wide"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 10 }}
                transition={{ delay: 0.8 + i * 0.2 }}
              >
                {line}
              </motion.h3>
            ))}
          </div>

          {/* Body */}
          <div className="space-y-2 text-lg md:text-xl leading-relaxed text-white/70">
            {proposalText.slice(4).map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: isVisible ? 1 : 0 }}
                transition={{ delay: 1.5 + i * 0.1 }}
              >
                {line.split(" ").map((word, j) => {
                  const isHighlight = ["learning", "intelligence", "simulate"].some(k => word.toLowerCase().includes(k));
                  return (
                    <span
                      key={j}
                      className={isHighlight ? "text-cyan-400 font-bold drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]" : ""}
                    >
                      {word}
                      {" "}
                    </span>
                  );
                })}
              </motion.p>
            ))}
          </div>

          {/* Footer */}
          <motion.div
            className="pt-8 flex justify-between items-end border-t border-white/10 mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ delay: 2.5 }}
          >
            <div className="text-xs text-white/30">
              LOC: DARTMOUTH COLLEGE
              <br />
              DATE: AUGUST 31, 1955
            </div>
            <div className="text-right">
              <div className="text-sm text-cyan-500/70 font-handwriting italic">J. McCarthy et al.</div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
});

DartmouthScene.displayName = "DartmouthScene";

export default DartmouthScene;
