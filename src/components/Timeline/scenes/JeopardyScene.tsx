import type { JeopardySceneProps } from "../types";
import { motion } from "framer-motion";
import { memo, useEffect, useState } from "react";
import { useIntersectionObserver } from "~/hooks/useIntersectionObserver";
import { useVisibilityTimer } from "~/hooks/useVisibilityTimer";

const JeopardyScene = memo(({ questions: _questions }: JeopardySceneProps) => {
  const [stage, setStage] = useState<"intro" | "question" | "thinking" | "answer">("intro");
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [showConfidence, setShowConfidence] = useState(false);
  const { ref: sceneRef, isVisible } = useIntersectionObserver({ threshold: 0.3 });

  const historicalQuestions = [
    {
      category: "U.S. CITIES",
      question: "Its largest airport is named for a World War II hero; its second largest, for a World War II battle",
      answer: "What is Chicago?",
      watsonAnswer: "What is Chicago?",
      watsonConfidence: 0.92,
      isCorrect: true,
    },
    {
      category: "LITERARY CHARACTER APB",
      question: "Wanted for general evil-ness; last seen at the Tower of Barad-Dur; it's a giant eye, folks. Kinda hard to miss",
      answer: "Who is Sauron?",
      watsonAnswer: "Who is Sauron?",
      watsonConfidence: 0.97,
      isCorrect: true,
    },
    {
      category: "OLYMPIC ODDITIES",
      question: "It was the anatomical oddity of U.S. gymnast George Eyser, who won a gold medal on the parallel bars in 1904",
      answer: "What is a wooden leg?",
      watsonAnswer: "What is a missing leg?",
      watsonConfidence: 0.70,
      isCorrect: false,
    },
  ];

  const currentQuestion = historicalQuestions[activeQuestion];

  // 重置状态
  useEffect(() => {
    setStage("intro");
    setActiveQuestion(0);
    setShowConfidence(false);
  }, []);

  // 使用自定义Hook管理场景动画
  useVisibilityTimer(() => {
    if (stage === "intro") {
      setStage("question");
    }
  }, 2000, isVisible && stage === "intro", [stage]);

  useVisibilityTimer(() => {
    if (stage === "question") {
      setStage("thinking");
    }
  }, 3000, isVisible && stage === "question", [stage]);

  useVisibilityTimer(() => {
    if (stage === "thinking") {
      setStage("answer");
      setShowConfidence(true);
    }
  }, 2500, isVisible && stage === "thinking", [stage]);

  useVisibilityTimer(() => {
    if (stage === "answer" && activeQuestion < historicalQuestions.length - 1) {
      setActiveQuestion(prev => prev + 1);
      setStage("question");
      setShowConfidence(false);
    }
  }, 4000, isVisible && stage === "answer", [stage, activeQuestion]);

  return (
    <div ref={sceneRef} className="jeopardy-scene h-full">
      <div className="relative w-full h-full">
        {/* 背景效果 */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,100,255,0.05),transparent_70%)]" />

        <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
          {/* 游戏标题 */}
          <motion.div
            className="mb-6 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-3xl font-bold text-blue-400 mb-1">JEOPARDY!</h2>
            <div className="text-white/70 text-sm">February 2011 - IBM Watson vs. Human Champions</div>
          </motion.div>

          {/* 游戏界面 */}
          <div className="w-full max-w-2xl bg-blue-900/30 border border-blue-800/50 rounded-lg overflow-hidden backdrop-blur-sm">
            {/* 玩家信息 */}
            <div className="bg-blue-950/70 p-3 flex justify-between items-center border-b border-blue-800/50">
              <div className="text-white/80 text-sm">
                <span className="font-bold text-yellow-400">Ken Jennings</span>
                <span className="ml-2">$2,000</span>
              </div>
              <div className="text-white/80 text-sm">
                <span className="font-bold text-cyan-400">Watson</span>
                <span className="ml-2">$4,800</span>
              </div>
              <div className="text-white/80 text-sm">
                <span className="font-bold text-yellow-400">Brad Rutter</span>
                <span className="ml-2">$1,200</span>
              </div>
            </div>

            {/* 问题区域 */}
            <div className="p-6 min-h-[300px] flex flex-col items-center justify-center">
              {stage === "intro" && (
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                >
                  <p className="text-white/90 text-xl">
                    In 2011, IBM's Watson competed against champions Ken Jennings and Brad Rutter
                  </p>
                </motion.div>
              )}

              {stage === "question" && (
                <motion.div
                  className="text-center space-y-4"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="text-blue-300 font-bold text-xl mb-4 border-b border-blue-500/30 pb-2">
                    {currentQuestion.category}
                    {" "}
                    - $800
                  </div>
                  <p className="text-white text-2xl font-medium leading-relaxed">
                    {currentQuestion.question}
                  </p>
                </motion.div>
              )}

              {stage === "thinking" && (
                <motion.div
                  className="text-center space-y-6 w-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="text-blue-300 font-bold text-xl mb-4 border-b border-blue-500/30 pb-2">
                    {currentQuestion.category}
                    {" "}
                    - $800
                  </div>
                  <p className="text-white/80 text-xl">
                    Watson is processing...
                  </p>

                  {/* 思考可视化 */}
                  <div className="w-full h-8 bg-blue-950/50 rounded-full overflow-hidden border border-blue-800/50">
                    <motion.div
                      className="h-full bg-gradient-to-r from-blue-600 to-cyan-400"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 2 }}
                    />
                  </div>

                  {/* 候选答案 */}
                  <div className="grid grid-cols-3 gap-2 mt-4">
                    {["Chicago", "Toronto", "New York"].map((city, i) => (
                      <motion.div
                        key={i}
                        className={`text-sm p-2 rounded border ${i === 0 ? "border-cyan-500 bg-cyan-900/30" : "border-blue-800/30 bg-blue-950/30"}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.2 }}
                      >
                        <div className="text-white/90">
                          What is
                          {city}
                          ?
                        </div>
                        <div className={`text-xs ${i === 0 ? "text-cyan-400" : "text-blue-400"}`}>
                          {i === 0 ? "92%" : i === 1 ? "7%" : "1%"}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {stage === "answer" && (
                <motion.div
                  className="text-center space-y-6 w-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="text-blue-300 font-bold text-xl mb-4 border-b border-blue-500/30 pb-2">
                    {currentQuestion.category}
                    {" "}
                    - $800
                  </div>

                  <div className="space-y-4">
                    <p className="text-white text-xl">
                      {currentQuestion.question}
                    </p>

                    <motion.div
                      className={`text-2xl font-bold ${currentQuestion.isCorrect ? "text-green-400" : "text-red-400"}`}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, type: "spring" }}
                    >
                      {currentQuestion.watsonAnswer}
                    </motion.div>

                    {showConfidence && (
                      <motion.div
                        className="mt-2 text-sm text-blue-300"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                      >
                        Watson's confidence:
                        {" "}
                        {(currentQuestion.watsonConfidence * 100).toFixed(0)}
                        %
                      </motion.div>
                    )}

                    {!currentQuestion.isCorrect && (
                      <motion.div
                        className="mt-2 text-sm text-yellow-400"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 1 }}
                      >
                        Correct answer:
                        {" "}
                        {currentQuestion.answer}
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}
            </div>

            {/* 底部信息 */}
            <div className="bg-blue-950/70 p-3 border-t border-blue-800/50 text-center">
              <p className="text-white/60 text-xs">
                Watson processed natural language questions and formulated answers using 200 million pages of content, including encyclopedias and news articles, but was not connected to the internet.
              </p>
            </div>
          </div>

          {/* 历史背景 */}
          <motion.div
            className="mt-6 max-w-lg text-center text-white/70 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <p>
              Watson defeated champions Ken Jennings and Brad Rutter, winning $1 million in the three-day match.
              This victory demonstrated AI's ability to understand natural language, context, and ambiguity—a
              significant milestone in artificial intelligence.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
});

JeopardyScene.displayName = "JeopardyScene";

export default JeopardyScene;
