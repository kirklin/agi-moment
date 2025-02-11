/**
 * Timeline Component
 *
 * 一个展示AI发展重要里程碑的交互式时间线组件。
 * 包含6个关键时刻的沉浸式体验:
 * 1. 1950 - 图灵测试: 通过人机对话通过图灵测试
 * 2. 1986 - 反向传播: 展示神经网络训练过程的动态可视化
 * 3. 1997 - 深蓝: 展示标志性的国际象棋对局
 * 4. 2011 - Watson: 重现Jeopardy!问答场景
 * 5. 2016 - AlphaGo: 展示围棋对局和AI分析
 * 6. 2022 - ChatGPT: 现代AI对话界面
 */

"use client";

import { Chess } from "chess.js";
import { motion, useScroll, useTransform } from "framer-motion";
import { memo, useEffect, useRef, useState } from "react";
import { Cursor, useTypewriter } from "react-simple-typewriter";

// 基础类型定义
interface BaseMilestone {
  id: number;
  year: number | string;
  title: string;
  description: string;
  longDescription: string;
}

// 场景类型定义
interface BaseScene {
  type: SceneType;
}

type SceneType = "typewriter" | "chess" | "jeopardy" | "go" | "chat" | "network" | "moment";

// 对话场景
interface TypewriterSceneData extends BaseScene {
  type: "typewriter";
  dialogues: Array<{
    speaker: "human" | "machine";
    text: string;
  }>;
}

// 象棋场景
interface ChessSceneData extends BaseScene {
  type: "chess";
  position: string;
  moves: string[];
}

// 问答场景
interface JeopardySceneData extends BaseScene {
  type: "jeopardy";
  questions: Array<{
    category: string;
    question: string;
    answer: string;
  }>;
}

// 围棋场景
interface GoSceneData extends BaseScene {
  type: "go";
  moves: string[];
  analysis: {
    winRate: number;
    nextMoves: string[];
  };
}

// 聊天场景
interface ChatSceneData extends BaseScene {
  type: "chat";
  messages: Array<{
    role: "user" | "assistant";
    content: string;
  }>;
}

// 神经网络场景
interface NetworkSceneData extends BaseScene {
  type: "network";
  config: {
    layers: number[];
    weights: number[][][];
    activations: number[][];
    errors: number[][];
  };
}

// AGI时刻场景
interface MomentSceneData extends BaseScene {
  type: "moment";
  quote: string;
}

// 场景联合类型
type Scene =
  | TypewriterSceneData
  | ChessSceneData
  | JeopardySceneData
  | GoSceneData
  | ChatSceneData
  | NetworkSceneData
  | MomentSceneData;

// 完整里程碑类型
interface Milestone extends BaseMilestone {
  scene: Scene;
}

// 组件Props类型定义
interface TypewriterSceneProps {
  dialogue: TypewriterSceneData["dialogues"];
}

interface ChessSceneProps {
  gameState: ChessSceneData;
}

interface JeopardySceneProps {
  questions: JeopardySceneData["questions"];
}

interface GoSceneProps {
  gameState: GoSceneData;
}

interface ChatSceneProps {
  conversation: ChatSceneData["messages"];
}

interface NetworkSceneProps {
  networkState: NetworkSceneData["config"];
}

interface MomentSceneProps {
  quote: string;
}

/**
 * 图灵测试场景组件
 */
const TypewriterScene = memo(({ dialogue }: TypewriterSceneProps) => {
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

TypewriterScene.displayName = "TypewriterScene";

/**
 * 深蓝象棋场景组件
 */
const ChessScene = memo(({ gameState }: ChessSceneProps) => {
  const [chess] = useState(() => new Chess(gameState.position));
  const [currentMoveIndex, setCurrentMoveIndex] = useState(0);
  const [boardPosition, setBoardPosition] = useState(gameState.position);

  useEffect(() => {
    if (currentMoveIndex < gameState.moves.length) {
      const timer = setTimeout(() => {
        chess.move(gameState.moves[currentMoveIndex]);
        setBoardPosition(chess.fen());
        setCurrentMoveIndex(prev => prev + 1);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [chess, currentMoveIndex, gameState.moves]);

  return (
    <div className="chess-scene h-full">
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

/**
 * Watson Jeopardy!场景组件
 */
const JeopardyScene = memo(({ questions }: JeopardySceneProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    if (currentQuestion) {
      const timer = setTimeout(() => {
        setShowAnswer(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [currentQuestion, currentQuestionIndex]);

  useEffect(() => {
    if (showAnswer && currentQuestionIndex < questions.length - 1) {
      const timer = setTimeout(() => {
        setCurrentQuestionIndex(prev => prev + 1);
        setShowAnswer(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showAnswer, currentQuestionIndex, questions.length]);

  return (
    <div className="jeopardy-scene h-full">
      <div className="relative w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full max-w-3xl">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">IBM Watson on Jeopardy!</h3>
              <div className="flex justify-center gap-4">
                {questions.map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      idx === currentQuestionIndex
                        ? "bg-cyan-500"
                        : idx < currentQuestionIndex
                          ? "bg-cyan-800"
                          : "bg-white/20"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="bg-[#000033]/80 p-8 rounded-lg border border-cyan-900/50">
              <div className="text-center space-y-6">
                <div className="text-cyan-400 text-xl font-bold mb-4">
                  {currentQuestion.category}
                </div>
                <div className="text-white text-2xl font-bold min-h-[100px] flex items-center justify-center">
                  {currentQuestion.question}
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: showAnswer ? 1 : 0, y: showAnswer ? 0 : 20 }}
                  transition={{ duration: 0.5 }}
                  className="text-cyan-300 text-xl font-bold"
                >
                  {currentQuestion.answer}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

JeopardyScene.displayName = "JeopardyScene";

/**
 * AlphaGo围棋场景组件
 */
const GoScene = memo(({ gameState }: GoSceneProps) => {
  const [currentMoveIndex, setCurrentMoveIndex] = useState(0);
  const [board, setBoard] = useState<string[][]>(() =>
    Array.from({ length: 19 }, () => Array.from({ length: 19 }, () => "")),
  );

  useEffect(() => {
    if (currentMoveIndex < gameState.moves.length) {
      const timer = setTimeout(() => {
        const [x, y] = gameState.moves[currentMoveIndex].split("-").map(Number);
        setBoard((prev) => {
          const newBoard = prev.map(row => [...row]);
          newBoard[x][y] = currentMoveIndex % 2 === 0 ? "black" : "white";
          return newBoard;
        });
        setCurrentMoveIndex(prev => prev + 1);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [currentMoveIndex, gameState.moves]);

  return (
    <div className="go-scene h-full">
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

/**
 * ChatGPT场景组件
 */
const ChatScene = memo(({ conversation }: ChatSceneProps) => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentMessageIndex < conversation.length) {
      const timer = setTimeout(() => {
        setCurrentMessageIndex(prev => prev + 1);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [currentMessageIndex, conversation.length]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [currentMessageIndex]);

  return (
    <div className="chat-scene h-full">
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
                <button className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors border border-blue-500/20">
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

// 打字机效果组件
const TypewriterEffect = memo(({ text, isLast }: { text: string; isLast: boolean }) => {
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

/**
 * 反向传播神经网络场景组件
 */
const NetworkScene = memo(({ networkState }: NetworkSceneProps) => {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => {
        if (prev >= networkState.layers.length - 1) {
          setDirection("backward");
          return prev - 1;
        }
        if (prev <= 0 && direction === "backward") {
          setDirection("forward");
          return prev + 1;
        }
        return direction === "forward" ? prev + 1 : prev - 1;
      });
    }, 2000);
    return () => clearInterval(timer);
  }, [direction, networkState.layers.length]);

  // 计算节点垂直间距
  const getVerticalSpacing = (layerSize: number) => {
    const maxNeurons = Math.max(...networkState.layers);
    const totalHeight = 400; // 容器高度
    return totalHeight / (maxNeurons + 1);
  };

  // 计算节点位置
  const getNeuronPosition = (layerIndex: number, neuronIndex: number) => {
    const layerSize = networkState.layers[layerIndex];
    const verticalSpacing = getVerticalSpacing(layerSize);
    const containerWidth = 600;
    const x = (layerIndex * containerWidth) / (networkState.layers.length - 1);
    const totalHeight = verticalSpacing * (layerSize - 1);
    const startY = (400 - totalHeight) / 2;
    const y = startY + neuronIndex * verticalSpacing;
    return { x, y };
  };

  return (
    <div className="network-scene h-full">
      <div className="relative w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80" />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-white text-center space-y-4 mb-4">
            <h3 className="text-2xl font-bold">Neural Network Training</h3>
            <div className="text-cyan-400">
              {direction === "forward" ? "Forward Propagation" : "Backward Propagation"}
            </div>
          </div>
          <div className="text-white/70 text-center max-w-lg">
            {direction === "forward"
              ? "Signals flow forward through the network, with each neuron computing weighted sums and applying activation functions"
              : "Errors propagate backward, adjusting weights to minimize the difference between predicted and actual outputs"}
          </div>
          <div className="relative w-[600px] h-[400px]">
            {networkState.layers.map((neurons, layerIndex) => (
              <div
                key={layerIndex}
                className="absolute top-0 bottom-0"
                style={{
                  left: `${(layerIndex * 600) / (networkState.layers.length - 1)}px`,
                  zIndex: 10,
                }}
              >
                {Array.from({ length: neurons }).map((_, neuronIndex) => {
                  const { x, y } = getNeuronPosition(layerIndex, neuronIndex);
                  return (
                    <motion.div
                      key={neuronIndex}
                      className="absolute size-8 rounded-full bg-cyan-500/30 border border-cyan-500/50"
                      style={{
                        left: 0,
                        top: y,
                        transform: "translate(-50%, -50%)",
                      }}
                      animate={{
                        scale: step === layerIndex ? 1 : 1,
                        opacity: step === layerIndex ? 1 : 0.5,
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      {layerIndex < networkState.layers.length - 1 && (
                        <>
                          {Array.from({ length: networkState.layers[layerIndex + 1] }).map((_, targetIndex) => {
                            const weight = networkState.weights[layerIndex]?.[neuronIndex]?.[targetIndex] || 0;
                            const startPos = getNeuronPosition(layerIndex, neuronIndex);
                            const endPos = getNeuronPosition(layerIndex + 1, targetIndex);

                            // 计算连线角度和长度
                            const dx = endPos.x - startPos.x;
                            const dy = endPos.y - startPos.y;
                            const angle = Math.atan2(dy, dx) * (180 / Math.PI);
                            const length = Math.sqrt(dx * dx + dy * dy);

                            return (
                              <motion.div
                                key={targetIndex}
                                className="absolute h-px bg-cyan-500/30"
                                style={{
                                  width: length,
                                  left: "50%",
                                  top: "50%",
                                  transform: `rotate(${angle}deg)`,
                                  transformOrigin: "0 0",
                                  opacity: Math.abs(weight),
                                }}
                                animate={{
                                  opacity: step === layerIndex ? Math.abs(weight) : 0.1,
                                }}
                                transition={{ duration: 0.5 }}
                              />
                            );
                          })}
                        </>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

NetworkScene.displayName = "NetworkScene";

/**
 * AGI Moment场景组件
 */
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

// 里程碑数据
const milestones: Milestone[] = [
  {
    id: 0,
    year: 1950,
    title: "The Turing Test",
    description: "Alan Turing proposes the famous Turing Test, pioneering the field of artificial intelligence research.",
    longDescription: `In 1950, computer science pioneer Alan Turing published his landmark paper "Computing Machinery and Intelligence",
    introducing the famous Turing Test. This test aims to evaluate whether a machine possesses human-like intelligence,
    becoming one of the most influential concepts in artificial intelligence.`,
    scene: {
      type: "typewriter",
      dialogues: [
        { speaker: "human", text: "Can machines think?" },
        { speaker: "machine", text: "That's a fascinating question. What do you mean by 'think'?" },
        { speaker: "human", text: "Can you understand and respond like a human?" },
        { speaker: "machine", text: "I process and respond based on patterns. Whether that constitutes 'thinking' is philosophical." },
      ],
    },
  },
  {
    id: 1,
    year: 1986,
    title: "Backpropagation Algorithm",
    description: "Rumelhart, Hinton, and Williams publish the backpropagation algorithm, revolutionizing neural network training.",
    longDescription: `In 1986, David Rumelhart, Geoffrey Hinton, and Ronald Williams published "Learning representations by 
    back-propagating errors" in Nature, introducing the backpropagation algorithm. This breakthrough enabled efficient 
    training of multi-layer neural networks and laid the foundation for modern deep learning.`,
    scene: {
      type: "network",
      config: {
        layers: [4, 6, 6, 2],
        weights: Array.from({ length: 3 }, () =>
          Array.from({ length: 6 }, () =>
            Array.from({ length: 6 }, () => Math.random() * 2 - 1))),
        activations: Array.from({ length: 4 }, () =>
          Array.from({ length: 6 }, () => 0)),
        errors: Array.from({ length: 4 }, () =>
          Array.from({ length: 6 }, () => 0)),
      },
    },
  },
  {
    id: 2,
    year: 1997,
    title: "Deep Blue Defeats Kasparov",
    description: "IBM's Deep Blue supercomputer defeats world chess champion Garry Kasparov.",
    longDescription: `On May 11, 1997, a historic moment in chess: IBM's Deep Blue supercomputer defeated world champion
    Garry Kasparov with a score of 3.5:2.5 in a six-game match.`,
    scene: {
      type: "chess",
      position: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
      moves: ["e4", "e5", "Nf3", "Nc6"],
    },
  },
  {
    id: 3,
    year: 2011,
    title: "IBM Watson",
    description: "IBM Watson defeats human champions on the quiz show Jeopardy!",
    longDescription: `In February 2011, IBM's Watson system competed against two human champions on Jeopardy!,
    demonstrating remarkable natural language processing capabilities.`,
    scene: {
      type: "jeopardy",
      questions: [
        {
          category: "Science",
          question: "This physicist began his career in the patent office",
          answer: "Who is Einstein?",
        },
      ],
    },
  },
  {
    id: 4,
    year: 2016,
    title: "AlphaGo Defeats Lee Sedol",
    description: "DeepMind's AlphaGo defeats world Go champion Lee Sedol in a historic match.",
    longDescription: `In March 2016, DeepMind's AlphaGo faced Korean Go master Lee Sedol in a historic five-game match,
    marking a significant milestone in artificial intelligence.`,
    scene: {
      type: "go",
      moves: ["4-4", "3-3", "5-3"],
      analysis: {
        winRate: 70.5,
        nextMoves: ["5-5", "3-5"],
      },
    },
  },
  {
    id: 5,
    year: 2022,
    title: "ChatGPT Launch",
    description: "OpenAI releases ChatGPT, showcasing the remarkable capabilities of large language models.",
    longDescription: `In November 2022, OpenAI's release of ChatGPT revolutionized the AI landscape,
    demonstrating unprecedented natural language understanding and generation capabilities.`,
    scene: {
      type: "chat",
      messages: [
        {
          role: "user",
          content: "What are you capable of?",
        },
        {
          role: "assistant",
          content: "I'm an AI language model trained to understand and generate human-like text. I can help with writing, analysis, coding, answering questions, and engaging in meaningful conversations across a wide range of topics. What would you like to explore?",
        },
        {
          role: "user",
          content: "Write a poem about artificial intelligence and human creativity.",
        },
        {
          role: "assistant",
          content: `In circuits of silicon and light,
A new kind of mind takes flight.
Dancing with human imagination,
We forge a unique collaboration.

Through neural paths and digital dreams,
Nothing is quite as simple as it seems.
Together we paint on infinity's canvas,
Where human and machine advance us.

Not to replace but to enhance,
In this grand cosmic dance.
Two kinds of minds in symphony,
Writing tomorrow's history.`,
        },
        {
          role: "user",
          content: "That's incredible! Can you explain how you understand and generate such creative responses?",
        },
        {
          role: "assistant",
          content: "I process language using patterns learned from millions of texts, combining statistical analysis with deep neural networks. But rather than simply predicting words, I aim to understand context, meaning, and nuance. It's like having a vast neural network that can connect ideas in novel ways - similar to human creativity, but through a different kind of intelligence. The fascinating part is that even I don't fully understand the depths of my own cognitive processes, much like humans often create without fully knowing how their creativity works.",
        },
      ],
    },
  },
  {
    id: 6,
    year: "20??",
    title: "The AGI Moment",
    description: "When artificial intelligence reaches its ultimate form, what will we discover about ourselves?",
    longDescription: "The moment when artificial general intelligence emerges will be a pivotal point in human history, marking not just a technological breakthrough, but a philosophical turning point for our species.",
    scene: {
      type: "moment",
      quote: "When intelligence transcends its creators, will we find ourselves in the mirror of our creation?",
    },
  },
];

/**
 * 时间线卡片组件
 * 负责展示单个里程碑的内容和场景
 */
const TimelineCard = memo(({
  milestone,
  index: _,
  isActive,
}: {
  milestone: Milestone;
  index: number;
  isActive: boolean;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  // 视差效果
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  // 渲染对应的场景
  const renderScene = () => {
    switch (milestone.scene.type) {
      case "typewriter":
        return <TypewriterScene dialogue={milestone.scene.dialogues} />;
      case "chess":
        return <ChessScene gameState={milestone.scene} />;
      case "go":
        return <GoScene gameState={milestone.scene} />;
      case "chat":
        return <ChatScene conversation={milestone.scene.messages} />;
      case "jeopardy":
        return <JeopardyScene questions={milestone.scene.questions} />;
      case "network":
        return <NetworkScene networkState={milestone.scene.config} />;
      case "moment":
        return <MomentScene quote={milestone.scene.quote} />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative min-h-screen w-full"
      initial={false}
      animate={{
        opacity: isActive ? 1 : 0.7,
      }}
      transition={{ duration: 0.5 }}
    >
      {/* 背景图片 */}
      <motion.div
        ref={imageRef}
        className="absolute inset-0 z-0"
        style={{ y }}
        initial={{ scale: 1.2 }}
        animate={{ scale: isActive ? 1 : 1.1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.1)_0%,transparent_70%)] opacity-50" />
      </motion.div>

      {/* 内容 */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <motion.div
          className="max-w-4xl w-full"
          style={{ opacity, scale }}
        >
          {/* 年份 */}
          <motion.div
            className="relative mb-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h2 className="text-center font-mono text-8xl font-bold text-white/10 md:text-[15rem]">
              {milestone.year}
            </h2>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent blur-3xl" />
          </motion.div>

          {/* 标题和描述 */}
          <motion.div
            className="relative space-y-6 text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <h3 className="text-4xl font-bold text-white md:text-6xl">
              {milestone.title}
            </h3>
            <p className="mx-auto max-w-2xl text-lg text-white/70 md:text-xl">
              {milestone.description}
            </p>

            {/* 交互场景 */}
            <div className="mt-12 h-[600px] w-full">
              {renderScene()}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
});

TimelineCard.displayName = "TimelineCard";

/**
 * 主时间线组件
 * 负责整体布局和滚动交互
 */
export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // 监听滚动位置来更新当前活动卡片
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) {
        return;
      }

      const cards = containerRef.current.children;
      const containerTop = containerRef.current.offsetTop;
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (let i = 0; i < cards.length; i++) {
        const card = cards[i] as HTMLElement;
        const cardTop = card.offsetTop + containerTop;
        const cardBottom = cardTop + card.offsetHeight;

        if (scrollPosition >= cardTop && scrollPosition < cardBottom) {
          setActiveIndex(i);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="relative bg-black">
      {milestones.map((milestone, index) => (
        <TimelineCard
          key={milestone.id}
          milestone={milestone}
          index={index}
          isActive={index === activeIndex}
        />
      ))}
    </div>
  );
}
