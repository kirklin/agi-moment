import type { NetworkSceneProps } from "../types";
import { motion } from "framer-motion";
import { memo, useEffect, useRef, useState } from "react";

const NetworkScene = memo(({ networkState }: NetworkSceneProps) => {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");
  const [isVisible, setIsVisible] = useState(false);
  const sceneRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

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

  // 重置动画状态
  useEffect(() => {
    setStep(0);
    setDirection("forward");
  }, []);

  // 根据可见性控制动画
  useEffect(() => {
    // 清除现有的定时器
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // 如果组件可见，则启动动画
    if (isVisible) {
      intervalRef.current = setInterval(() => {
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
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isVisible, direction, networkState.layers.length]);

  // 计算节点垂直间距
  const getVerticalSpacing = () => {
    const maxNeurons = Math.max(...networkState.layers);
    const totalHeight = 400; // 容器高度
    return totalHeight / (maxNeurons + 1);
  };

  // 计算节点位置
  const getNeuronPosition = (layerIndex: number, neuronIndex: number) => {
    const layerSize = networkState.layers[layerIndex];
    const verticalSpacing = getVerticalSpacing();
    const containerWidth = 600;
    const x = (layerIndex * containerWidth) / (networkState.layers.length - 1);
    const totalHeight = verticalSpacing * (layerSize - 1);
    const startY = (400 - totalHeight) / 2;
    const y = startY + neuronIndex * verticalSpacing;
    return { x, y };
  };

  return (
    <div ref={sceneRef} className="network-scene h-full">
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
                {Array.from({ length: neurons }).map((_unused1, neuronIndex) => {
                  const { x: _unused2, y } = getNeuronPosition(layerIndex, neuronIndex);
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
                          {Array.from({ length: networkState.layers[layerIndex + 1] }).map((_unused3, targetIndex) => {
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

export default NetworkScene;
