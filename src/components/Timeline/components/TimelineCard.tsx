import type { TimelineCardProps } from "../types";
import { motion, useScroll, useTransform } from "framer-motion";
import { memo, useRef } from "react";
import AttentionScene from "../scenes/AttentionScene";
import ChatScene from "../scenes/ChatScene";
import ChessScene from "../scenes/ChessScene";
import DartmouthScene from "../scenes/DartmouthScene";
import GoScene from "../scenes/GoScene";
import JeopardyScene from "../scenes/JeopardyScene";
import MomentScene from "../scenes/MomentScene";
import NetworkScene from "../scenes/NetworkScene";
import TuringTestScene from "../scenes/TuringTestScene";

const TimelineCard = memo(({
  milestone,
  index: _index,
  isActive,
}: TimelineCardProps) => {
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
        return <TuringTestScene dialogue={milestone.scene.dialogues} />;
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
      case "dartmouth":
        return <DartmouthScene quote={milestone.scene.quote} />;
      case "attention":
        return <AttentionScene quote={milestone.scene.quote} />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative min-h-screen w-full overflow-hidden"
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

export default TimelineCard;
