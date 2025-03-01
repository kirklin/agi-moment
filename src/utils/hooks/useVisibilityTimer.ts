import { useEffect, useRef } from "react";

/**
 * 自定义Hook，用于管理基于可见性的定时器
 *
 * @param callback - 定时器触发时执行的回调函数
 * @param delay - 延迟时间（毫秒）
 * @param isVisible - 元素是否可见
 * @param dependencies - 依赖项数组，当依赖项变化时重置定时器
 *
 * @example
 * ```tsx
 * const { ref, isVisible } = useIntersectionObserver();
 *
 * // 当元素可见时，1秒后执行回调
 * useVisibilityTimer(() => {
 *   setShowAnimation(true);
 * }, 1000, isVisible);
 * ```
 */
export function useVisibilityTimer(
  callback: () => void,
  delay: number,
  isVisible: boolean,
  dependencies: any[] = [],
) {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const savedCallback = useRef(callback);

  // 保存最新的回调函数
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // 设置定时器
  useEffect(() => {
    // 清除现有的定时器
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    // 只有当元素可见时才设置定时器
    if (isVisible) {
      timerRef.current = setTimeout(() => {
        savedCallback.current();
      }, delay);
    }

    // 清理函数
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [delay, isVisible, ...dependencies]);
}
