import type { ChessSceneProps } from "../types";
import { Chess } from "chess.js";
import { memo, useEffect, useRef, useState } from "react";

// 辅助函数：获取棋子符号
function getPieceSymbol(piece: string) {
  const symbols: Record<string, string> = {
    k: "♔",
    q: "♕",
    r: "♖",
    b: "♗",
    n: "♘",
    p: "♙",
    K: "♚",
    Q: "♛",
    R: "♜",
    B: "♝",
    N: "♞",
    P: "♟",
  };
  return symbols[piece] || "";
}

const ChessScene = memo(({ gameState }: ChessSceneProps) => {
  const [chess] = useState(() => new Chess(gameState.position));
  const [currentMoveIndex, setCurrentMoveIndex] = useState(0);
  const [boardPosition, setBoardPosition] = useState(gameState.position);
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
    chess.load(gameState.position);
    setBoardPosition(gameState.position);
    setCurrentMoveIndex(0);
  }, [chess, gameState.position]);

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
        chess.move(gameState.moves[currentMoveIndex]);
        setBoardPosition(chess.fen());
        setCurrentMoveIndex(prev => prev + 1);
      }, 1500);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [chess, currentMoveIndex, gameState.moves, isVisible]);

  return (
    <div ref={sceneRef} className="chess-scene h-full">
      <div className="relative w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80" />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-white text-center space-y-4 mb-8">
            <h3 className="text-2xl font-bold">Deep Blue vs Kasparov</h3>
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
          </div>
          <div className="relative w-[400px] h-[400px] bg-gradient-to-br from-amber-900/20 to-amber-800/20 rounded-lg p-4">
            <div className="grid grid-cols-8 grid-rows-8 gap-0 w-full h-full">
              {boardPosition.split(" ")[0].split("/").flatMap((row, rowIndex) => {
                const squares = [];
                let colIndex = 0;

                for (const char of row) {
                  if (!Number.isNaN(Number.parseInt(char))) {
                    const emptySquares = Number.parseInt(char);
                    for (let i = 0; i < emptySquares; i++) {
                      squares.push(
                        <div
                          key={`${rowIndex}-${colIndex}`}
                          className={`${
                            (rowIndex + colIndex) % 2 === 0
                              ? "bg-amber-200/20"
                              : "bg-amber-900/40"
                          }`}
                        />,
                      );
                      colIndex++;
                    }
                  } else {
                    squares.push(
                      <div
                        key={`${rowIndex}-${colIndex}`}
                        className={`relative ${
                          (rowIndex + colIndex) % 2 === 0
                            ? "bg-amber-200/20"
                            : "bg-amber-900/40"
                        }`}
                      >
                        <div className="absolute inset-0 flex items-center justify-center text-2xl">
                          {getPieceSymbol(char)}
                        </div>
                      </div>,
                    );
                    colIndex++;
                  }
                }
                return squares;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

ChessScene.displayName = "ChessScene";

export default ChessScene;
