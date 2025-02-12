import type { JeopardySceneProps } from "../types";
import { motion } from "framer-motion";
import { memo, useEffect, useState } from "react";

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

export default JeopardyScene;
