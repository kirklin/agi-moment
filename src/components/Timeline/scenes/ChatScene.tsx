import type { ChatSceneProps } from "../types";
import { motion } from "framer-motion";
import { memo, useEffect, useRef, useState } from "react";
import { useIntersectionObserver } from "~/hooks/useIntersectionObserver";
import { useVisibilityTimer } from "~/hooks/useVisibilityTimer";
import TypewriterEffect from "../components/TypewriterEffect";

const ChatScene = memo(({ conversation }: ChatSceneProps) => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { ref: sceneRef, isVisible } = useIntersectionObserver({ threshold: 0.3 });

  // 使用自定义Hook管理定时器，当组件可见且还有消息可显示时显示下一条消息
  useVisibilityTimer(() => {
    if (currentMessageIndex < conversation.length) {
      setCurrentMessageIndex(prev => prev + 1);
    }
  }, 2000, isVisible, [currentMessageIndex, conversation.length]);

  // 滚动到最新消息
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [currentMessageIndex]);

  return (
    <div ref={sceneRef} className="chat-scene h-full">
      <div className="relative w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80" />

        {/* 动态背景效果 */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.05)_0%,transparent_70%)] animate-pulse" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.03)_0%,transparent_50%)] animate-pulse delay-75" />

        <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
          <div className="w-full max-w-3xl bg-black/40 rounded-lg backdrop-blur-sm border border-white/10 overflow-hidden">
            {/* Chat header */}
            <div className="p-4 border-b border-white/10 flex items-center gap-3">
              <div className="size-3 rounded-full bg-green-500 animate-pulse" />
              <span className="text-white font-medium">ChatGPT</span>
              <span className="text-white/40 text-sm ml-auto">November 30, 2022</span>
            </div>

            {/* Chat messages */}
            <div
              ref={containerRef}
              className="p-4 h-[400px] overflow-y-auto space-y-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10"
            >
              {conversation.slice(0, currentMessageIndex).map((message, idx) => (
                <motion.div
                  // eslint-disable-next-line react/no-array-index-key
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] p-4 rounded-lg ${
                      message.role === "user"
                        ? "bg-blue-500/20 text-white border border-blue-500/20"
                        : "bg-green-500/20 text-white border border-green-500/20"
                    }`}
                  >
                    <div className="text-sm opacity-60 mb-1 flex items-center gap-2">
                      {message.role === "user"
                        ? (
                            <>
                              <span>Human</span>
                              <span className="size-2 rounded-full bg-blue-400" />
                            </>
                          )
                        : (
                            <>
                              <span>Assistant</span>
                              <span className="size-2 rounded-full bg-green-400" />
                            </>
                          )}
                    </div>
                    <div className="prose prose-invert">
                      <TypewriterEffect text={message.content} isLast={idx === currentMessageIndex - 1} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Chat input */}
            <div className="p-4 border-t border-white/10">
              <div className="flex gap-2">
                <div className="flex-1 bg-white/5 rounded-lg p-3 text-white/40 border border-white/5">
                  Ask me anything...
                </div>
                <button type="button" className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors border border-blue-500/20">
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

ChatScene.displayName = "ChatScene";

export default ChatScene;
