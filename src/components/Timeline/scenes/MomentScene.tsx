import type { MomentSceneProps } from "../types";
import { motion } from "framer-motion";
import { memo, useEffect, useState } from "react";
import { useIntersectionObserver } from "../../../utils/hooks/useIntersectionObserver";
import { useVisibilityTimer } from "../../../utils/hooks/useVisibilityTimer";

const MomentScene = memo(({ quote }: MomentSceneProps) => {
  const [showQuote, setShowQuote] = useState(false);
  const [showAuthor, setShowAuthor] = useState(false);
  const { ref: sceneRef, isVisible } = useIntersectionObserver({ threshold: 0.3 });

  // 重置状态
  useEffect(() => {
    setShowQuote(false);
    setShowAuthor(false);
  }, []);

  // 使用自定义Hook管理定时器
  useVisibilityTimer(() => {
    setShowQuote(true);
  }, 1000, isVisible);

  useVisibilityTimer(() => {
    setShowAuthor(true);
  }, 1000, isVisible);

  return (
    <div ref={sceneRef} className="moment-scene h-full">
      <div className="relative w-full h-full overflow-hidden">
        {/* 背景效果 */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80" />

        {/* 动态粒子背景 */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 2 }}
        >
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute size-1 rounded-full bg-cyan-500"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 5 + 5,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            />
          ))}
        </motion.div>

        {/* 中心光效 */}
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,255,0.1),transparent_70%)]"
          animate={{
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
          {/* 主要引言 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: showQuote ? 1 : 0, y: showQuote ? 0 : 20 }}
            transition={{ duration: 2 }}
            className="max-w-2xl text-center mb-8"
          >
            <p className="text-2xl text-white/90 italic font-light leading-relaxed">
              "
              {quote}
              "
            </p>
          </motion.div>

          {/* 作者署名 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: showAuthor ? 1 : 0 }}
            transition={{ duration: 1.5 }}
            className="mb-12"
          >
            <p className="text-lg text-cyan-400/80">— Kirk Lin</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
});

MomentScene.displayName = "MomentScene";

export default MomentScene;
