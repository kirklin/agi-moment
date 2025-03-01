import type { GoSceneProps } from "../types";
import { motion } from "framer-motion";
import { memo, useEffect, useState } from "react";
import { useIntersectionObserver } from "../../../utils/hooks/useIntersectionObserver";
import { useVisibilityTimer } from "../../../utils/hooks/useVisibilityTimer";

// 预定义更多的棋子位置，模拟真实对局的一部分
const PREDEFINED_MOVES = [
  "3-3",
  "15-15",
  "15-3",
  "3-15", // 星位点
  "9-3",
  "9-15",
  "3-9",
  "15-9", // 边星
  "5-4",
  "14-4",
  "4-14",
  "14-14", // 小目
  "8-8",
  "10-10",
  "8-10",
  "10-8", // 中腹
  "7-5",
  "11-5",
  "5-11",
  "11-11", // 布局
  "6-7",
  "12-7",
  "7-12",
  "12-12", // 布局
  "9-9", // 天元
  "10-4",
  "4-10",
  "13-7",
  "7-13", // 攻击
  "8-6",
  "6-8",
  "12-8",
  "8-12", // 防守
  "9-7",
  "7-9",
  "11-9",
  "9-11", // 连接
  "5-5",
  "13-13",
  "5-13",
  "13-5", // 小目
];

// 第37步 - AlphaGo的著名一手
const MOVE_37 = "5-9";

const GoScene = memo(({ gameState }: GoSceneProps) => {
  const [currentMoveIndex, setCurrentMoveIndex] = useState(0);
  const [board, setBoard] = useState<string[][]>(() =>
    Array.from({ length: 19 }, () => Array.from({ length: 19 }, () => "")),
  );
  const [showInfo, setShowInfo] = useState(false);
  const [showMove37, setShowMove37] = useState(false);
  const [showMoveLabel, setShowMoveLabel] = useState(false);
  const { ref: sceneRef, isVisible } = useIntersectionObserver({ threshold: 0.3 });

  // 使用所有预定义的移动
  const allMoves = [...PREDEFINED_MOVES];
  // 在适当的位置插入第37步
  allMoves.splice(37, 0, MOVE_37);

  // 重置棋盘状态
  useEffect(() => {
    setCurrentMoveIndex(0);
    setBoard(Array.from({ length: 19 }, () => Array.from({ length: 19 }, () => "")));
    setShowInfo(false);
    setShowMove37(false);
    setShowMoveLabel(false);
  }, []);

  // 显示信息面板
  useVisibilityTimer(() => {
    setShowInfo(true);
  }, 500, isVisible);

  // 执行移动动画
  useVisibilityTimer(() => {
    if (currentMoveIndex < allMoves.length) {
      const move = allMoves[currentMoveIndex];
      const [x, y] = move.split("-").map(Number);

      setBoard((prev) => {
        const newBoard = prev.map(row => [...row]);
        newBoard[x][y] = currentMoveIndex % 2 === 0 ? "black" : "white";
        return newBoard;
      });

      // 检查是否是第37步
      if (move === MOVE_37) {
        setTimeout(() => {
          setShowMove37(true);
          setTimeout(() => setShowMoveLabel(true), 500);
        }, 300);
      }

      setCurrentMoveIndex(prev => prev + 1);
    }
  }, 300, isVisible && currentMoveIndex < allMoves.length, [currentMoveIndex]);

  // 计算最后一步的坐标
  const getLastMoveCoordinates = () => {
    if (currentMoveIndex > 0) {
      return allMoves[currentMoveIndex - 1].split("-").map(Number);
    }
    return null;
  };

  const lastMove = getLastMoveCoordinates();

  // 计算第37步的坐标
  const getMove37Coordinates = () => {
    return MOVE_37.split("-").map(Number);
  };

  const move37Coordinates = getMove37Coordinates();

  return (
    <div ref={sceneRef} className="go-scene h-full w-full">
      <div className="relative w-full h-full overflow-hidden flex items-center justify-center">
        {/* 背景效果 */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80" />

        {/* 动态粒子背景 */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 2 }}
        >
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute size-1 rounded-full bg-blue-500"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0, 0.7, 0],
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

        {/* 径向渐变效果 */}
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,100,255,0.08),transparent_70%)]"
          animate={{
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="flex w-full h-full max-h-full">
          {/* 左侧：棋盘 */}
          <div className="flex-1 flex items-center justify-center">
            <motion.div
              className="relative w-[280px] h-[280px] bg-gradient-to-br from-amber-800/30 to-amber-700/30 rounded-lg p-2 shadow-xl border border-amber-700/30"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              {/* 棋盘网格线 */}
              <div className="grid grid-cols-19 grid-rows-19 gap-0 w-full h-full bg-[#E8C28D]">
                {board.map((row, i) =>
                  row.map((cell, j) => (
                    <div
                      key={`${i}-${j}`}
                      className="relative border border-black/50"
                    >
                      {cell && (
                        <motion.div
                          className={`absolute inset-[10%] rounded-full ${
                            cell === "black"
                              ? "bg-black shadow-lg"
                              : "bg-white shadow-lg"
                          } ${
                            showMove37 && i === move37Coordinates[0] && j === move37Coordinates[1]
                              ? "ring-2 ring-cyan-400"
                              : ""
                          }`}
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{
                            scale: 1,
                            opacity: 1,
                            boxShadow: lastMove && lastMove[0] === i && lastMove[1] === j
                              ? ["0px 0px 0px rgba(6, 182, 212, 0.5)", "0px 0px 10px rgba(6, 182, 212, 0.7)", "0px 0px 5px rgba(6, 182, 212, 0.5)"]
                              : undefined,
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 20,
                            boxShadow: { repeat: Infinity, duration: 1.5 },
                          }}
                        />
                      )}

                      {/* 第37步标记 */}
                      {showMoveLabel && i === move37Coordinates[0] && j === move37Coordinates[1] && (
                        <motion.div
                          className="absolute -top-5 -left-1 bg-cyan-500 text-white text-[8px] px-1 rounded-sm z-10 whitespace-nowrap"
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          Move 37
                        </motion.div>
                      )}
                    </div>
                  )),
                )}
              </div>

              {/* 星位点 */}
              {[3, 9, 15].map(i =>
                [3, 9, 15].map(j => (
                  <div
                    key={`star-${i}-${j}`}
                    className="absolute w-1.5 h-1.5 bg-black rounded-full transform -translate-x-[0.75px] -translate-y-[0.75px]"
                    style={{
                      left: `${(j * 100) / 18}%`,
                      top: `${(i * 100) / 18}%`,
                    }}
                  />
                )),
              )}

              {/* 棋盘坐标 - 简化版 */}
              <div className="absolute -left-4 top-0 bottom-0 flex flex-col justify-between py-1 text-[6px] text-amber-900/70">
                {[0, 9, 18].map(i => (
                  <div key={i}>{19 - i}</div>
                ))}
              </div>
              <div className="absolute left-0 right-0 -bottom-4 flex justify-between px-1 text-[6px] text-amber-900/70">
                {["A", "J", "T"].map((letter, i) => (
                  <div key={i}>{letter}</div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* 右侧：信息 */}
          <div className="flex-1 flex flex-col justify-center pr-4 max-w-[50%]">
            <motion.div
              className="text-white space-y-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
                AlphaGo vs Lee Sedol
              </h3>
              <p className="text-white/70 text-sm">
                March 2016: AI defeated the 18-time world champion.
              </p>

              {currentMoveIndex > 0 && (
                <motion.div
                  className="mt-2 bg-black/30 p-2 rounded-lg border border-blue-500/20 backdrop-blur-sm"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-white/80 text-xs">Win Rate:</span>
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-[80px] bg-blue-950/50 rounded-full overflow-hidden border border-blue-800/50">
                        <motion.div
                          className="h-full bg-gradient-to-r from-blue-600 to-cyan-400"
                          initial={{ width: "0%" }}
                          animate={{ width: `${gameState.analysis.winRate}%` }}
                          transition={{ duration: 1 }}
                        />
                      </div>
                      <motion.span
                        className="text-blue-400 font-bold text-xs"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        {gameState.analysis.winRate}
                        %
                      </motion.span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* 移动指示器 */}
              <div className="flex gap-1 flex-wrap mt-2">
                <span className="text-xs text-white/70 mr-1">Moves:</span>
                <motion.span
                  className="text-xs text-cyan-400"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {currentMoveIndex}
                  /
                  {allMoves.length}
                </motion.span>

                {/* 进度条 */}
                <div className="w-full h-1 bg-blue-950/50 rounded-full overflow-hidden mt-1">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-600 to-cyan-400"
                    initial={{ width: "0%" }}
                    animate={{ width: `${(currentMoveIndex / allMoves.length) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              {/* 信息面板 */}
              {showInfo && (
                <motion.div
                  className="mt-2 bg-black/40 backdrop-blur-sm rounded-lg p-2 border border-blue-500/20 text-xs"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <h4 className="text-blue-400 font-bold mb-1">Move 37</h4>
                  <p className="text-white/80 text-xs mb-2">
                    AlphaGo's unexpected move demonstrated AI's ability to develop novel strategies beyond human intuition.
                  </p>
                  <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                    <span className="text-white/60">Games:</span>
                    <span className="text-white">AlphaGo 4-1</span>
                    <span className="text-white/60">Computing:</span>
                    <span className="text-white">1920 CPUs, 280 GPUs</span>
                  </div>

                  {/* 关键时刻指示器 */}
                  {showMove37 && (
                    <motion.div
                      className="mt-2 bg-cyan-500/20 p-1 rounded border border-cyan-500/30 text-[10px]"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="text-cyan-400 font-bold">Key Moment:</span>
                      <span className="text-white ml-1">Move 37 played!</span>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
});

GoScene.displayName = "GoScene";

export default GoScene;
