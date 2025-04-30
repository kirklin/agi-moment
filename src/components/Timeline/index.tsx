"use client";

import { memo, useEffect, useRef, useState } from "react";
import TimelineCard from "./components/TimelineCard";
import { milestones } from "./data/milestones";

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
const Timeline = memo(() => {
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
    <div ref={containerRef} className="relative bg-black overflow-x-hidden">
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
});

Timeline.displayName = "Timeline";

export default Timeline;
