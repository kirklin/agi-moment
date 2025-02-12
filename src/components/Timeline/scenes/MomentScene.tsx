import type { MomentSceneProps } from "../types";
import { motion } from "framer-motion";
import { memo, useEffect, useState } from "react";

const MomentScene = memo(({ quote }: MomentSceneProps) => {
  const [showQuote, setShowQuote] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowQuote(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="moment-scene h-full">
      <div className="relative w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: showQuote ? 1 : 0 }}
            transition={{ duration: 2 }}
            className="max-w-2xl text-center"
          >
            <p className="text-2xl text-white/80 italic font-light leading-relaxed">
              {quote}
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
});

MomentScene.displayName = "MomentScene";

export default MomentScene;
