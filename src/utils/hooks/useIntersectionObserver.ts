import { useEffect, useRef, useState } from "react";

interface IntersectionObserverOptions {
  threshold?: number;
  rootMargin?: string;
}

/**
 * 自定义Hook，用于检测元素是否在视口中
 *
 * @param options - Intersection Observer的配置选项
 * @returns 包含ref和isVisible状态的对象
 *
 * @example
 * ```tsx
 * const { ref, isVisible } = useIntersectionObserver({ threshold: 0.3 });
 *
 * useEffect(() => {
 *   if (isVisible) {
 *     // 元素在视口中，执行动画或其他操作
 *   } else {
 *     // 元素不在视口中，暂停动画或其他操作
 *   }
 * }, [isVisible]);
 *
 * return <div ref={ref}>内容</div>;
 * ```
 */
export function useIntersectionObserver({
  threshold = 0.3,
  rootMargin = "0px",
}: IntersectionObserverOptions = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // 当元素进入视口时，设置isVisible为true
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      {
        root: null, // 使用视口作为根
        rootMargin,
        threshold, // 当指定比例的元素可见时触发
      },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [rootMargin, threshold]);

  return { ref, isVisible };
}
