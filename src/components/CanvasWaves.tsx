"use client";

import { useEffect, useRef } from "react";
import { SimplexNoise } from "~/lib/noise";

/**
 * CanvasWaves 组件
 *
 * 创建一个基于 Canvas 的交互式波浪动画背景
 * 使用 SimplexNoise 生成平滑的波浪运动，并对鼠标/触摸交互做出响应
 *
 * 特点:
 * - 响应式设计，自动适应容器大小
 * - 高 DPI 支持，在高分辨率屏幕上清晰显示
 * - 鼠标/触摸交互，波浪会对用户输入做出反应
 * - 使用固定种子确保每次刷新时波纹模式一致
 */
export default function CanvasWaves() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) {
      return;
    }

    const container = containerRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return;
    }

    // 使用固定种子以确保每次刷新波纹模式一致
    const FIXED_SEED = 0.42;

    /**
     * 鼠标状态对象
     * x, y: 当前位置
     * lx, ly: 上一帧位置
     * sx, sy: 平滑后的位置
     * v: 瞬时速度
     * vs: 平滑后的速度
     * a: 移动角度
     * set: 是否已初始化
     */
    const mouse = {
      x: -10,
      y: 0,
      lx: 0,
      ly: 0,
      sx: 0,
      sy: 0,
      v: 0,
      vs: 0,
      a: 0,
      set: false,
    };

    let lines: any[] = []; // 存储所有线条点的数组
    const noise = new SimplexNoise(FIXED_SEED); // 使用固定种子初始化噪声生成器
    let bounding = container.getBoundingClientRect();
    let animationFrame: number;

    /**
     * 设置 Canvas 尺寸
     * 根据容器大小和设备像素比调整 Canvas 尺寸，确保高 DPI 支持
     */
    const setSize = () => {
      bounding = container.getBoundingClientRect();

      // 设置高 DPI 支持
      const dpr = window.devicePixelRatio || 1;
      canvas.width = bounding.width * dpr;
      canvas.height = bounding.height * dpr;
      canvas.style.width = `${bounding.width}px`;
      canvas.style.height = `${bounding.height}px`;
      ctx.scale(dpr, dpr);
    };

    /**
     * 初始化线条网格
     * 根据屏幕大小创建适当密度的点阵，形成线条网格
     */
    const setLines = () => {
      const { width, height } = bounding;

      // 清除现有线条
      lines = [];

      // 根据屏幕大小调整线条密度
      const screenFactor = Math.min(1, width / 1920);
      const xGap = Math.max(10, 15 * screenFactor); // 水平点间距
      const yGap = Math.max(32, 40 * screenFactor); // 垂直点间距

      const oWidth = width + 200; // 扩展宽度，确保覆盖边缘
      const oHeight = height + 30; // 扩展高度，确保覆盖边缘

      const totalLines = Math.ceil(oWidth / xGap);
      const totalPoints = Math.ceil(oHeight / yGap);

      const xStart = (width - xGap * totalLines) / 2;
      const yStart = (height - yGap * totalPoints) / 2;

      // 创建线条网格
      for (let i = 0; i <= totalLines; i++) {
        const points: any[] = [];

        for (let j = 0; j <= totalPoints; j++) {
          // 每个点包含基础位置和动画状态
          const point = {
            x: xStart + xGap * i, // 基础 x 坐标
            y: yStart + yGap * j, // 基础 y 坐标
            wave: { x: 0, y: 0 }, // 波浪运动偏移
            cursor: { x: 0, y: 0, vx: 0, vy: 0 }, // 鼠标交互偏移和速度
            hover: false, // 鼠标悬停状态
          };

          points.push(point);
        }

        // 将点数组添加到线条集合
        lines.push(points);
      }
    };

    /**
     * 更新点的位置
     * 基于噪声和鼠标交互计算每个点的新位置
     * @param time - 当前时间戳，用于动画
     */
    const movePoints = (time: number) => {
      lines.forEach((points) => {
        points.forEach((p: any) => {
          // 基于噪声生成波浪运动
          const move = noise.perlin2(
            (p.x + time * 0.0125) * 0.002, // x 坐标随时间缓慢变化
            (p.y + time * 0.005) * 0.0015, // y 坐标随时间缓慢变化
          ) * 12;
          p.wave.x = Math.cos(move) * 32; // 水平波动
          p.wave.y = Math.sin(move) * 16; // 垂直波动

          // 计算鼠标效果
          const dx = p.x - mouse.sx;
          const dy = p.y - mouse.sy;
          const d = Math.hypot(dx, dy); // 点到鼠标的距离
          const l = Math.max(250, mouse.vs * 3); // 鼠标影响范围，随速度变化

          if (d < l) {
            // 点在鼠标影响范围内
            const s = 1 - d / l; // 影响强度，距离越近越强
            const f = Math.cos(d * 0.001) * s;

            // 根据鼠标移动方向和速度施加力
            p.cursor.vx += Math.cos(mouse.a) * f * l * mouse.vs * 0.0015;
            p.cursor.vy += Math.sin(mouse.a) * f * l * mouse.vs * 0.0015;

            // 标记鼠标悬停状态
            p.hover = true;
          } else {
            p.hover = false;
          }

          // 弹性恢复力 - 将点拉回原位
          p.cursor.vx += (0 - p.cursor.x) * 0.008; // 水平弹性系数
          p.cursor.vy += (0 - p.cursor.y) * 0.008; // 垂直弹性系数

          // 摩擦力 - 逐渐减缓运动
          p.cursor.vx *= 0.96; // 水平摩擦系数
          p.cursor.vy *= 0.96; // 垂直摩擦系数

          // 更新点的位置
          p.cursor.x += p.cursor.vx * 3; // 应用水平速度
          p.cursor.y += p.cursor.vy * 3; // 应用垂直速度

          // 限制点的最大偏移范围
          p.cursor.x = Math.min(200, Math.max(-200, p.cursor.x));
          p.cursor.y = Math.min(200, Math.max(-200, p.cursor.y));
        });
      });
    };

    /**
     * 计算点的最终位置
     * 结合基础位置、波浪运动和鼠标交互效果
     * @param point - 点对象
     * @param withCursorForce - 是否包含鼠标交互效果
     * @returns 点的最终坐标
     */
    const moved = (point: any, withCursorForce = true) => {
      const coords = {
        x: point.x + point.wave.x + (withCursorForce ? point.cursor.x : 0),
        y: point.y + point.wave.y + (withCursorForce ? point.cursor.y : 0),
      };

      // 四舍五入到 1 位小数，优化性能
      coords.x = Math.round(coords.x * 10) / 10;
      coords.y = Math.round(coords.y * 10) / 10;

      return coords;
    };

    /**
     * 绘制线条
     * 根据点的位置绘制平滑的线条
     */
    const drawLines = () => {
      // 清除画布
      ctx.clearRect(0, 0, bounding.width, bounding.height);

      // 创建渐变色
      const gradient = ctx.createLinearGradient(0, 0, bounding.width, bounding.height);
      gradient.addColorStop(0, "rgba(51, 65, 85, 0.5)"); // 起始颜色
      gradient.addColorStop(1, "rgba(71, 85, 105, 0.5)"); // 结束颜色

      // 绘制每条线
      lines.forEach((points) => {
        // 检查是否有任何点处于悬停状态
        const hasHover = points.some((p: any) => p.hover);

        ctx.beginPath();

        // 设置线条样式 - 悬停状态下线条更粗更明显
        ctx.strokeStyle = gradient;
        ctx.lineWidth = hasHover ? 1.4 : 1.2; // 悬停时线条更粗
        ctx.globalAlpha = hasHover ? 0.8 : 0.5; // 悬停时线条更不透明

        // 绘制线条路径
        const startPoint = moved(points[0], false);
        ctx.moveTo(startPoint.x, startPoint.y);

        points.forEach((point: any, pIndex: number) => {
          const isLast = pIndex === points.length - 1;
          const currentPoint = moved(point, !isLast);
          ctx.lineTo(currentPoint.x, currentPoint.y);
        });

        ctx.stroke();
      });
    };

    /**
     * 更新鼠标位置
     * @param x - 鼠标 x 坐标
     * @param y - 鼠标 y 坐标
     */
    const updateMousePosition = (x: number, y: number) => {
      mouse.x = x - bounding.left;
      mouse.y = y - bounding.top + window.scrollY;

      if (!mouse.set) {
        // 首次设置鼠标位置
        mouse.sx = mouse.x;
        mouse.sy = mouse.y;
        mouse.lx = mouse.x;
        mouse.ly = mouse.y;

        mouse.set = true;
      }
    };

    /**
     * 鼠标移动事件处理
     */
    const onMouseMove = (e: MouseEvent) => {
      updateMousePosition(e.pageX, e.pageY);
    };

    /**
     * 触摸移动事件处理
     */
    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();

      const touch = e.touches[0];
      updateMousePosition(touch.clientX, touch.clientY);
    };

    /**
     * 窗口大小变化事件处理
     */
    const onResize = () => {
      setSize();
      setLines();
    };

    /**
     * 动画循环
     * @param time - 当前时间戳
     */
    const tick = (time: number) => {
      // 平滑鼠标移动
      mouse.sx += (mouse.x - mouse.sx) * 0.1;
      mouse.sy += (mouse.y - mouse.sy) * 0.1;

      // 计算鼠标速度
      const dx = mouse.x - mouse.lx;
      const dy = mouse.y - mouse.ly;
      const d = Math.hypot(dx, dy);

      mouse.v = d; // 瞬时速度
      mouse.vs += (d - mouse.vs) * 0.1; // 平滑速度
      mouse.vs = Math.min(100, mouse.vs); // 限制最大速度

      // 更新鼠标最后位置
      mouse.lx = mouse.x;
      mouse.ly = mouse.y;

      // 计算鼠标移动角度
      mouse.a = Math.atan2(dy, dx);

      // 更新动画
      movePoints(time);
      drawLines();

      // 请求下一帧
      animationFrame = requestAnimationFrame(tick);
    };

    // 初始化
    setSize();
    setLines();

    // 绑定事件监听
    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouseMove);
    container.addEventListener("touchmove", onTouchMove);

    // 开始动画循环
    animationFrame = requestAnimationFrame(tick);

    // 组件卸载时清理
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("touchmove", onTouchMove);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="waves absolute inset-0 overflow-hidden"
    >
      <canvas ref={canvasRef} className="block w-full h-full"></canvas>
    </div>
  );
}
