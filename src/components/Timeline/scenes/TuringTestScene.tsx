import type { TuringTestSceneProps } from "../types";
import { memo, useEffect, useRef, useState } from "react";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import { useIntersectionObserver } from "~/hooks/useIntersectionObserver";

const TuringTestScene = memo(({ dialogue }: TuringTestSceneProps) => {
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);
  const { ref: sceneRef, isVisible } = useIntersectionObserver({ threshold: 0.3 });
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const currentMessage = dialogue[currentDialogueIndex];

  // 重置对话索引
  useEffect(() => {
    setCurrentDialogueIndex(0);
  }, []);

  const [text] = useTypewriter({
    words: [currentMessage.text],
    loop: 1,
    typeSpeed: 50,
    deleteSpeed: 0,
    delaySpeed: 3000,
    onLoopDone: () => {
      if (currentDialogueIndex < dialogue.length - 1 && isVisible) {
        // 清除现有的定时器
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        // 设置新的定时器
        timeoutRef.current = setTimeout(() => {
          setCurrentDialogueIndex(prev => prev + 1);
        }, 1000);
      }
    },
  });

  // 清理定时器
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div ref={sceneRef} className="p-8 space-y-4">
      {dialogue.slice(0, currentDialogueIndex).map((msg, idx) => (
        <div key={idx} className={msg.speaker === "human" ? "text-right" : "text-left"}>
          <span className="inline-block bg-white/10 px-4 py-2 rounded">
            {msg.text}
          </span>
        </div>
      ))}
      {currentMessage && (
        <div className={currentMessage.speaker === "human" ? "text-right" : "text-left"}>
          <span className="inline-block bg-white/10 px-4 py-2 rounded">
            {isVisible ? text : currentMessage.text}
            {isVisible && <Cursor cursorStyle="_" />}
          </span>
        </div>
      )}
    </div>
  );
});

TuringTestScene.displayName = "TuringTestScene";

export default TuringTestScene;
