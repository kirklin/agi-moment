import type { TypewriterEffectProps } from "../types";
import { memo, useEffect, useState } from "react";

const TypewriterEffect = memo(({ text, isLast }: TypewriterEffectProps) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 30);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, text]);

  return (
    <span>
      {displayText}
      {isLast && currentIndex < text.length && (
        <span className="animate-pulse">▋</span>
      )}
    </span>
  );
});

TypewriterEffect.displayName = "TypewriterEffect";

export default TypewriterEffect;
