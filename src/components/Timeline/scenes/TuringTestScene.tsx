import type { TuringTestSceneProps } from "../types";
import { memo, useState } from "react";
import { Cursor, useTypewriter } from "react-simple-typewriter";

const TuringTestScene = memo(({ dialogue }: TuringTestSceneProps) => {
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);
  const currentMessage = dialogue[currentDialogueIndex];

  const [text] = useTypewriter({
    words: [currentMessage.text],
    loop: 1,
    typeSpeed: 50,
    deleteSpeed: 0,
    delaySpeed: 3000,
    onLoopDone: () => {
      if (currentDialogueIndex < dialogue.length - 1) {
        setTimeout(() => setCurrentDialogueIndex(prev => prev + 1), 1000);
      }
    },
  });

  return (
    <div className="p-8 space-y-4">
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
            {text}
            <Cursor cursorStyle="_" />
          </span>
        </div>
      )}
    </div>
  );
});

TuringTestScene.displayName = "TuringTestScene";

export default TuringTestScene;
