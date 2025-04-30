/**
 * SimplexNoise 类实现
 *
 * 基于 Stefan Gustavson 的算法，使用 Simplex 网格生成平滑的噪声
 * Simplex 噪声是 Perlin 噪声的改进版本，具有更少的方向性伪影和更好的性能
 *
 * 主要特点:
 * - 使用固定种子确保噪声的可重复性
 * - 提供 2D 噪声生成功能
 * - 输出范围约为 [-1, 1]
 */
export class SimplexNoise {
  private grad3: number[][]; // 梯度向量数组
  private p: number[]; // 随机排列数组
  private perm: number[]; // 扩展的排列数组，避免边界检查
  private simplex: number[][]; // Simplex 网格查找表

  /**
   * 创建一个新的 SimplexNoise 实例
   * @param seed - 噪声生成的随机种子，默认为随机值
   */
  constructor(seed = Math.random()) {
    // 定义 12 个梯度向量，用于计算噪声值
    this.grad3 = [
      [1, 1, 0],
      [-1, 1, 0],
      [1, -1, 0],
      [-1, -1, 0],
      [1, 0, 1],
      [-1, 0, 1],
      [1, 0, -1],
      [-1, 0, -1],
      [0, 1, 1],
      [0, -1, 1],
      [0, 1, -1],
      [0, -1, -1],
    ];

    // 使用种子初始化随机排列数组
    this.p = [];
    for (let i = 0; i < 256; i++) {
      this.p[i] = Math.floor(seed * 256);
    }

    // 随机打乱数组，消除潜在的偏差
    this.p.sort(() => 0.5 - Math.random());

    // 扩展排列数组以避免在计算中进行边界检查
    this.perm = [];
    for (let i = 0; i < 512; i++) {
      this.perm[i] = this.p[i & 255];
    }

    // 预计算的 2D Simplex 网格查找表
    // 用于从正方形索引坐标映射到 Simplex 网格中的索引坐标
    this.simplex = [
      [0, 1, 2, 3],
      [0, 1, 3, 2],
      [0, 0, 0, 0],
      [0, 2, 3, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [1, 2, 3, 0],
      [0, 2, 1, 3],
      [0, 0, 0, 0],
      [0, 3, 1, 2],
      [0, 3, 2, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [1, 3, 2, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [1, 2, 0, 3],
      [0, 0, 0, 0],
      [1, 3, 0, 2],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [2, 3, 0, 1],
      [2, 3, 1, 0],
      [1, 0, 2, 3],
      [1, 0, 3, 2],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [2, 0, 3, 1],
      [0, 0, 0, 0],
      [2, 1, 3, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [2, 0, 1, 3],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [3, 0, 1, 2],
      [3, 0, 2, 1],
      [0, 0, 0, 0],
      [3, 1, 2, 0],
      [2, 1, 0, 3],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [3, 1, 0, 2],
      [0, 0, 0, 0],
      [3, 2, 0, 1],
      [3, 2, 1, 0],
    ];
  }

  /**
   * 计算梯度向量与距离向量的点积
   * @param g - 梯度向量
   * @param x - x 坐标
   * @param y - y 坐标
   * @returns 点积结果
   */
  private dot(g: number[], x: number, y: number): number {
    return g[0] * x + g[1] * y;
  }

  /**
   * 生成 2D Simplex 噪声
   *
   * 算法步骤:
   * 1. 将输入坐标从笛卡尔空间倾斜到 Simplex 空间
   * 2. 确定包含输入点的 Simplex 单元
   * 3. 计算相对于三个 Simplex 顶点的贡献
   * 4. 返回缩放后的噪声值
   *
   * @param xin - x 坐标
   * @param yin - y 坐标
   * @returns 范围约为 [-1, 1] 的噪声值
   */
  public noise2D(xin: number, yin: number): number {
    // 噪声贡献
    let n0 = 0;
    let n1 = 0;
    let n2 = 0;

    // 从正方形到三角形的倾斜因子
    const F2 = 0.5 * (Math.sqrt(3) - 1);
    // 将输入空间倾斜到三角形网格
    const s = (xin + yin) * F2;
    const i = Math.floor(xin + s);
    const j = Math.floor(yin + s);

    // 从三角形到正方形的倾斜因子
    const G2 = (3 - Math.sqrt(3)) / 6;
    const t = (i + j) * G2;
    // 取消倾斜，计算相对于单元原点的坐标
    const X0 = i - t;
    const Y0 = j - t;
    // 相对于原点的 x,y 距离
    const x0 = xin - X0;
    const y0 = yin - Y0;

    // 对于 2D 情况，Simplex 形状是一个等边三角形
    // 确定我们在哪个 Simplex 中
    let i1, j1;
    if (x0 > y0) { // 右下三角形
      i1 = 1;
      j1 = 0;
    } else { // 左上三角形
      i1 = 0;
      j1 = 1;
    }

    // 计算相对于三个顶点的偏移量
    const x1 = x0 - i1 + G2;
    const y1 = y0 - j1 + G2;
    const x2 = x0 - 1 + 2 * G2;
    const y2 = y0 - 1 + 2 * G2;

    // 计算哈希坐标用于梯度选择
    const ii = i & 255;
    const jj = j & 255;

    // 计算第一个顶点的噪声贡献
    let t0 = 0.5 - x0 * x0 - y0 * y0;
    if (t0 < 0) {
      n0 = 0;
    } else {
      t0 *= t0;
      const gi0 = this.perm[ii + this.perm[jj]] % 12;
      n0 = t0 * t0 * this.dot(this.grad3[gi0], x0, y0);
    }

    // 计算第二个顶点的噪声贡献
    let t1 = 0.5 - x1 * x1 - y1 * y1;
    if (t1 < 0) {
      n1 = 0;
    } else {
      t1 *= t1;
      const gi1 = this.perm[ii + i1 + this.perm[jj + j1]] % 12;
      n1 = t1 * t1 * this.dot(this.grad3[gi1], x1, y1);
    }

    // 计算第三个顶点的噪声贡献
    let t2 = 0.5 - x2 * x2 - y2 * y2;
    if (t2 < 0) {
      n2 = 0;
    } else {
      t2 *= t2;
      const gi2 = this.perm[ii + 1 + this.perm[jj + 1]] % 12;
      n2 = t2 * t2 * this.dot(this.grad3[gi2], x2, y2);
    }

    // 将三个贡献加起来并缩放
    return 70 * (n0 + n1 + n2);
  }

  /**
   * perlin2 方法 - 为兼容性提供的别名
   * 实际调用的是 noise2D 方法
   *
   * @param x - x 坐标
   * @param y - y 坐标
   * @returns 噪声值
   */
  public perlin2(x: number, y: number): number {
    return this.noise2D(x, y);
  }
}
