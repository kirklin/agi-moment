import type { GoSceneProps } from "../types";
import { motion } from "framer-motion";
import { memo, useState } from "react";
import { useIntersectionObserver } from "~/hooks/useIntersectionObserver";
import { useVisibilityTimer } from "~/hooks/useVisibilityTimer";

const GoScene = memo(({ gameState }: GoSceneProps) => {
  const [currentMoveIndex, setCurrentMoveIndex] = useState(0);
  const [board, setBoard] = useState<string[][]>(() =>
    Array.from({ length: 19 }, () => Array.from({ length: 19 }, () => "")),
  );
  const [showMove37, setShowMove37] = useState(false);
  const { ref: sceneRef, isVisible } = useIntersectionObserver({ threshold: 0.3 });

  // Coordinate mapping
  const parseCoordinate = (coord: string) => {
    if (!coord) {
      return null;
    }
    const colChar = coord.charAt(0).toUpperCase();
    const rowNum = Number.parseInt(coord.slice(1));

    // Skip 'I' in Go coordinates
    const colMap: Record<string, number> = {
      A: 0,
      B: 1,
      C: 2,
      D: 3,
      E: 4,
      F: 5,
      G: 6,
      H: 7,
      J: 8,
      K: 9,
      L: 10,
      M: 11,
      N: 12,
      O: 13,
      P: 14,
      Q: 15,
      R: 16,
      S: 17,
      T: 18,
    };

    const col = colMap[colChar];
    const row = 19 - rowNum; // Go coordinates start from bottom

    return { row, col };
  };

  // Play moves
  useVisibilityTimer(() => {
    if (currentMoveIndex < gameState.moves.length) {
      const move = gameState.moves[currentMoveIndex];
      const coords = parseCoordinate(move);

      if (coords) {
        setBoard((prev) => {
          const newBoard = prev.map(row => [...row]);
          newBoard[coords.row][coords.col] = currentMoveIndex % 2 === 0 ? "black" : "white";
          return newBoard;
        });

        // Check for Move 37 (Index 36)
        if (currentMoveIndex === 36) {
          setShowMove37(true);
        }
      }

      setCurrentMoveIndex(prev => prev + 1);
    }
  }, 800, isVisible && currentMoveIndex < gameState.moves.length, [currentMoveIndex, gameState.moves]);

  return (
    <div ref={sceneRef} className="go-scene h-full flex items-center justify-center">
      <div className="relative w-full max-w-5xl flex flex-col md:flex-row items-center gap-12 p-4">

        {/* Go Board */}
        <div className="relative w-[360px] h-[360px] md:w-[480px] md:h-[480px] bg-[#DCB35C] rounded shadow-2xl p-1">
          {/* Wood Texture Effect */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] opacity-20 pointer-events-none" />

          <div className="relative w-full h-full border border-black/30">
            {/* Grid */}
            <div className="absolute inset-4 grid grid-cols-18 grid-rows-18 border-t border-l border-black">
              {Array.from({ length: 324 }).map((_, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <div key={i} className="border-b border-r border-black" />
              ))}
            </div>

            {/* Star Points */}
            {[3, 9, 15].map(row =>
              [3, 9, 15].map(col => (
                <div
                  key={`star-${row}-${col}`}
                  className="absolute w-1.5 h-1.5 bg-black rounded-full transform -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: `calc(1rem + ${col * (100 - 8.5) / 18}%)`,
                    top: `calc(1rem + ${row * (100 - 8.5) / 18}%)`,
                  }}
                />
              )),
            )}

            {/* Stones */}
            <div className="absolute inset-4 grid grid-cols-19 grid-rows-19">
              {board.map((row, r) =>
                row.map((cell, c) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <div key={`${r}-${c}`} className="relative flex items-center justify-center">
                    {cell && (
                      <motion.div
                        className={`w-[90%] h-[90%] rounded-full shadow-md ${
                          cell === "black"
                            ? "bg-black bg-gradient-to-br from-gray-800 to-black"
                            : "bg-white bg-gradient-to-br from-white to-gray-200"
                        } ${
                          showMove37 && r === 5 && c === 16 // R13 corresponds to row 5 (19-13-1), col 16 (R)
                            ? "ring-4 ring-cyan-400 ring-opacity-80 shadow-[0_0_20px_rgba(34,211,238,0.8)] z-10"
                            : ""
                        }`}
                        initial={{ scale: 1.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      >
                        {/* Move 37 Label */}
                        {showMove37 && r === 5 && c === 16 && (
                          <motion.div
                            className="absolute -top-8 left-1/2 -translate-x-1/2 bg-cyan-500 text-white text-xs font-bold px-2 py-1 rounded whitespace-nowrap"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                          >
                            Move 37
                          </motion.div>
                        )}
                      </motion.div>
                    )}
                  </div>
                )),
              )}
            </div>
          </div>
        </div>

        {/* Info Panel */}
        <div className="flex-1 space-y-6 text-center md:text-left">
          <div>
            <h3 className="text-3xl font-bold text-white mb-2">AlphaGo vs Lee Sedol</h3>
            <div className="text-cyan-400 font-mono text-sm tracking-widest">GAME 2 • MARCH 10, 2016</div>
          </div>

          <div className="space-y-4">
            <p className="text-white/70 text-lg leading-relaxed">
              The moment AI showed true creativity. Move 37 (R13) was a "shoulder hit" on the 5th line—a move no human professional would play.
            </p>

            <motion.div
              className="bg-white/5 border border-white/10 rounded-lg p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: isVisible ? 1 : 0 }}
              transition={{ delay: 1 }}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-white/50 text-sm">WIN PROBABILITY</span>
                <span className="text-cyan-400 font-bold">RISING...</span>
              </div>
              <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-cyan-500"
                  initial={{ width: "45%" }}
                  animate={{ width: showMove37 ? "52%" : "45%" }}
                  transition={{ duration: 2 }}
                />
              </div>
            </motion.div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-black/30 p-3 rounded border border-white/5">
                <div className="text-white/40 mb-1">BLACK (ALPHAGO)</div>
                <div className="text-white font-mono">{currentMoveIndex > 0 ? gameState.moves[currentMoveIndex - 1] : "-"}</div>
              </div>
              <div className="bg-black/30 p-3 rounded border border-white/5">
                <div className="text-white/40 mb-1">MOVES PLAYED</div>
                <div className="text-white font-mono">
                  {currentMoveIndex}
                  {" "}
                  /
                  {" "}
                  {gameState.moves.length}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
});

GoScene.displayName = "GoScene";

export default GoScene;
