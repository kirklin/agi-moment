import type { AttentionSceneProps } from "../types";
import { motion } from "framer-motion";
import { memo, useEffect, useRef, useState } from "react";
import { useIntersectionObserver } from "~/hooks/useIntersectionObserver";

const AttentionScene = memo(({ quote }: AttentionSceneProps) => {
  const { ref: sceneRef, isVisible } = useIntersectionObserver({ threshold: 0.3 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [wordPositions, setWordPositions] = useState<Record<number, { x: number; y: number; width: number; height: number }>>({});

  const sentence = [
    { text: "The", id: 0 },
    { text: "animal", id: 1 },
    { text: "didn't", id: 2 },
    { text: "cross", id: 3 },
    { text: "the", id: 4 },
    { text: "street", id: 5 },
    { text: "because", id: 6 },
    { text: "it", id: 7, focus: true },
    { text: "was", id: 8 },
    { text: "too", id: 9 },
    { text: "tired", id: 10 },
  ];

  // Attention weights for "it" (index 7)
  const attentionWeights: Record<number, number> = {
    0: 0.01, // The
    1: 0.8, // animal
    2: 0.05, // didn't
    3: 0.05, // cross
    4: 0.01, // the
    5: 0.1, // street
    6: 0.05, // because
    7: 0, // it (Self - no line needed)
    8: 0.05, // was
    9: 0.05, // too
    10: 0.6, // tired
  };

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Update positions on resize and mount
  useEffect(() => {
    const updatePositions = () => {
      if (!containerRef.current) {
        return;
      }

      const containerRect = containerRef.current.getBoundingClientRect();
      const newPositions: Record<number, { x: number; y: number; width: number; height: number }> = {};

      sentence.forEach((word) => {
        const el = document.getElementById(`word-${word.id}`);
        if (el) {
          const rect = el.getBoundingClientRect();
          newPositions[word.id] = {
            x: rect.left - containerRect.left + rect.width / 2,
            y: rect.top - containerRect.top + rect.height / 2,
            width: rect.width,
            height: rect.height,
          };
        }
      });
      setWordPositions(newPositions);
    };

    updatePositions();
    window.addEventListener("resize", updatePositions);
    // Small delay to ensure layout is stable
    const timeout = setTimeout(updatePositions, 100);

    return () => {
      window.removeEventListener("resize", updatePositions);
      clearTimeout(timeout);
    };
  }, [isVisible]);

  return (
    <div ref={sceneRef} className="attention-scene h-full flex flex-col items-center justify-center">
      <div className="relative w-full max-w-5xl h-[400px] flex items-center justify-center">
        {/* Visualization Container */}
        <div ref={containerRef} className="relative flex flex-wrap justify-center gap-x-4 gap-y-12 px-8 w-full">

          {/* SVG Layer for Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible z-0">
            {isVisible && wordPositions[7] && sentence.map((word) => {
              if (word.id === 7) {
                return null;
              } // Don't draw line to self
              const targetPos = wordPositions[word.id];
              const sourcePos = wordPositions[7];

              if (!targetPos || !sourcePos) {
                return null;
              }

              // Calculate control point for curve
              // Curve upwards if target is far, flatter if close
              const midX = (sourcePos.x + targetPos.x) / 2;
              const midY = Math.min(sourcePos.y, targetPos.y) - 50 - Math.abs(sourcePos.x - targetPos.x) * 0.1;

              return (
                <motion.path
                  key={word.id}
                  d={`M ${sourcePos.x} ${sourcePos.y - 20} Q ${midX} ${midY}, ${targetPos.x} ${targetPos.y - 20}`}
                  stroke="cyan"
                  strokeWidth={attentionWeights[word.id] * 4}
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{
                    pathLength: 1,
                    opacity: attentionWeights[word.id] * 0.6,
                  }}
                  transition={{ duration: 1.5, delay: 0.5 + word.id * 0.1 }}
                />
              );
            })}
          </svg>

          {/* Words */}
          {sentence.map((word, i) => (
            <div key={i} className="relative group z-10">
              <motion.div
                id={`word-${word.id}`}
                className={`relative px-4 py-2 rounded-lg cursor-default transition-all duration-300 ${
                  word.id === 7
                    ? "bg-cyan-500/20 border border-cyan-500 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                    : "bg-white/5 border border-white/10 text-white/70"
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                whileHover={{ scale: 1.1 }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <span className="text-xl md:text-3xl font-mono">{word.text}</span>

                {/* Tooltip for attention score */}
                {word.id !== 7 && (
                  <motion.div
                    className="absolute -top-10 left-1/2 -translate-x-1/2 text-sm text-cyan-400 font-mono bg-black/80 px-2 py-1 rounded border border-cyan-500/30"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {(attentionWeights[word.id] * 100).toFixed(0)}
                    %
                  </motion.div>
                )}
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* Explanation */}
      <motion.div
        className="mt-8 max-w-2xl text-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <p className="text-lg text-white/60">
          The
          {" "}
          <span className="text-cyan-400">Self-Attention</span>
          {" "}
          mechanism resolves that
          <span className="mx-2 inline-block px-2 py-0.5 rounded bg-cyan-900/50 border border-cyan-500/30 text-cyan-300">"it"</span>
          refers to the
          <span className="mx-2 inline-block px-2 py-0.5 rounded bg-white/10 border border-white/20">"animal"</span>
          because it is
          <span className="mx-2 inline-block px-2 py-0.5 rounded bg-white/10 border border-white/20">"tired"</span>
          .
        </p>
      </motion.div>
    </div>
  );
});

AttentionScene.displayName = "AttentionScene";

export default AttentionScene;
