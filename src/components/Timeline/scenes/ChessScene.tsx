import type { ChessSceneProps } from "../types";
import { Chess } from "chess.js";
import { memo, useEffect, useState } from "react";
import { useIntersectionObserver } from "~/hooks/useIntersectionObserver";
import { useVisibilityTimer } from "~/hooks/useVisibilityTimer";

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
  const { ref: sceneRef, isVisible } = useIntersectionObserver({ threshold: 0.3 });

  // 重置棋盘状态
  useEffect(() => {
    if (gameState.position !== boardPosition) {
      chess.load(gameState.position);
      // eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect
      setBoardPosition(gameState.position);
      // eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect
      setCurrentMoveIndex(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState.position]);

  // 使用自定义Hook管理定时器，执行棋步动画
  useVisibilityTimer(() => {
    if (currentMoveIndex < gameState.moves.length) {
      chess.move(gameState.moves[currentMoveIndex]);
      setBoardPosition(chess.fen());
      setCurrentMoveIndex(prev => prev + 1);
    }
  }, 1500, isVisible && currentMoveIndex < gameState.moves.length, [chess, currentMoveIndex, gameState.moves]);

  return (
    <div ref={sceneRef} className="chess-scene h-full flex items-center justify-center">
      <div className="relative w-full max-w-4xl flex flex-col md:flex-row items-center gap-8 p-4">

        {/* Chess Board */}
        <div className="relative w-[360px] h-[360px] md:w-[480px] md:h-[480px] bg-slate-900 rounded-lg shadow-[0_0_30px_rgba(0,0,0,0.5)] border border-slate-700 p-4">
          <div className="grid grid-cols-8 grid-rows-8 gap-0 w-full h-full border-2 border-slate-700">
            {boardPosition.split(" ")[0].split("/").flatMap((row, rowIndex) => {
              const squares = [];
              let colIndex = 0;

              for (const char of row) {
                if (!Number.isNaN(Number.parseInt(char))) {
                  const emptySquares = Number.parseInt(char);
                  for (let i = 0; i < emptySquares; i++) {
                    squares.push(
                      <div
                        // eslint-disable-next-line react/no-array-index-key
                        key={`${rowIndex}-${colIndex}`}
                        className={`${
                          (rowIndex + colIndex) % 2 === 0
                            ? "bg-slate-800"
                            : "bg-slate-900"
                        } flex items-center justify-center`}
                      />,
                    );
                    colIndex++;
                  }
                } else {
                  squares.push(
                    <div
                      // eslint-disable-next-line react/no-array-index-key
                      key={`${rowIndex}-${colIndex}`}
                      className={`relative ${
                        (rowIndex + colIndex) % 2 === 0
                          ? "bg-slate-800"
                          : "bg-slate-900"
                      } flex items-center justify-center`}
                    >
                      <div className={`text-3xl md:text-5xl ${
                        char === char.toUpperCase() ? "text-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]" : "text-slate-400"
                      }`}
                      >
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

          {/* Glow Effect */}
          <div className="absolute -inset-4 bg-cyan-500/10 blur-xl -z-10 rounded-full" />
        </div>

        {/* Game Info / Moves */}
        <div className="w-full md:w-64 space-y-6">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-white mb-1">Deep Blue</h3>
            <div className="text-xs text-cyan-500 font-mono tracking-widest">VS KASPAROV</div>
          </div>

          <div className="bg-slate-900/50 border border-white/10 rounded p-4 h-[300px] overflow-y-auto font-mono text-sm">
            <div className="grid grid-cols-2 gap-2 text-white/50 mb-2 border-b border-white/5 pb-2">
              <span>WHITE</span>
              <span>BLACK</span>
            </div>
            <div className="space-y-1">
              {gameState.moves.map((move, idx) => {
                if (idx % 2 === 0) {
                  return (
                    // eslint-disable-next-line react/no-array-index-key
                    <div key={idx} className="grid grid-cols-2 gap-2">
                      <span className={idx === currentMoveIndex - 1 ? "text-cyan-400 font-bold" : "text-white/70"}>
                        {Math.floor(idx / 2) + 1}
                        .
                        {move}
                      </span>
                      {gameState.moves[idx + 1] && (
                        <span className={idx + 1 === currentMoveIndex - 1 ? "text-cyan-400 font-bold" : "text-white/70"}>
                          {gameState.moves[idx + 1]}
                        </span>
                      )}
                    </div>
                  );
                }
                return null;
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
