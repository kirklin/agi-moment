import type { GoSceneProps } from "../types";
import { memo, useEffect, useRef, useState } from "react";

const GoScene = memo(({ gameState }: GoSceneProps) => {
  const [currentMoveIndex, setCurrentMoveIndex] = useState(0);
  const [board, setBoard] = useState<string[][]>(() =>
    Array.from({ length: 19 }, () => Array.from({ length: 19 }, () => "")),
  );
  const [isVisible, setIsVisible] = useState(false);
  const sceneRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 设置Intersection Observer来检测组件是否在视口中
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // 当组件进入视口时，设置isVisible为true
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      {
        root: null, // 使用视口作为根
        rootMargin: "0px",
        threshold: 0.3, // 当30%的组件可见时触发
      },
    );

    if (sceneRef.current) {
      observer.observe(sceneRef.current);
    }

    return () => {
      if (sceneRef.current) {
        observer.unobserve(sceneRef.current);
      }
    };
  }, []);

  // 重置棋盘状态
  useEffect(() => {
    setCurrentMoveIndex(0);
    setBoard(Array.from({ length: 19 }, () => Array.from({ length: 19 }, () => "")));
  }, []);

  // 执行棋步动画
  useEffect(() => {
    // 清除现有的定时器
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    // 只有当组件可见且还有棋步可走时才执行动画
    if (isVisible && currentMoveIndex < gameState.moves.length) {
      timeoutRef.current = setTimeout(() => {
        const [x, y] = gameState.moves[currentMoveIndex].split("-").map(Number);
        setBoard((prev) => {
          const newBoard = prev.map(row => [...row]);
          newBoard[x][y] = currentMoveIndex % 2 === 0 ? "black" : "white";
          return newBoard;
        });
        setCurrentMoveIndex(prev => prev + 1);
      }, 1500);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [currentMoveIndex, gameState.moves, isVisible]);

  return (
    <div ref={sceneRef} className="go-scene h-full">
      <div className="relative w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80" />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-white text-center space-y-4 mb-8">
            <h3 className="text-2xl font-bold">AlphaGo vs Lee Sedol</h3>
            <div className="flex gap-2 justify-center">
              {gameState.moves.map((move, idx) => (
                <span
                  key={idx}
                  className={`px-3 py-1 rounded transition-all duration-300 ${
                    idx < currentMoveIndex
                      ? "bg-cyan-500/40 text-white"
                      : idx === currentMoveIndex
                        ? "bg-cyan-500/60 text-white ring-2 ring-cyan-500/50"
                        : "bg-white/10 text-white/50"
                  }`}
                >
                  {move}
                </span>
              ))}
            </div>
            {currentMoveIndex > 0 && (
              <div className="mt-4">
                <p className="text-lg">
                  Win Rate:
                  {gameState.analysis.winRate}
                  %
                </p>
                <div className="flex gap-2 justify-center mt-2">
                  <span className="text-sm text-cyan-400">Next Best Moves:</span>
                  {gameState.analysis.nextMoves.map((move, idx) => (
                    <span key={idx} className="px-2 py-1 bg-cyan-500/20 rounded text-sm">
                      {move}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="relative w-[400px] h-[400px] bg-gradient-to-br from-amber-900/20 to-amber-800/20 rounded-lg p-4">
            <div className="grid grid-cols-19 grid-rows-19 gap-0 w-full h-full">
              {board.map((row, i) =>
                row.map((cell, j) => (
                  <div
                    key={`${i}-${j}`}
                    className="relative border border-black/30"
                  >
                    {cell && (
                      <div
                        className={`absolute inset-[10%] rounded-full ${
                          cell === "black"
                            ? "bg-black shadow-lg"
                            : "bg-white shadow-lg"
                        } transition-all duration-300 transform ${
                          currentMoveIndex > 0
                          && gameState.moves[currentMoveIndex - 1] === `${i}-${j}`
                            ? "scale-110 ring-2 ring-cyan-500"
                            : "scale-100"
                        }`}
                      />
                    )}
                  </div>
                )),
              )}
            </div>
            {/* Star points */}
            {[3, 9, 15].map(i =>
              [3, 9, 15].map(j => (
                <div
                  key={`star-${i}-${j}`}
                  className="absolute w-2 h-2 bg-black/40 rounded-full transform -translate-x-1 -translate-y-1"
                  style={{
                    left: `${(j * 100) / 18}%`,
                    top: `${(i * 100) / 18}%`,
                  }}
                />
              )),
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

GoScene.displayName = "GoScene";

export default GoScene;
