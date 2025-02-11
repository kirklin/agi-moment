import fs from "node:fs/promises";
import path from "node:path";

async function generateReadme() {
  const readme = `# AGI Moment

<p align="center">
  <img src="./src/assets/logo.png" alt="AGI Moment Logo" width="200" height="200">
</p>

<p align="center">
  <strong>想象AGI的无限可能 | Imagine the Infinite Possibilities of AGI</strong>
</p>

<p align="center">
  <a href="https://agimoment.com">访问网站 | Visit Website</a>
</p>

## 🌟 关于 | About

AGI Moment 是一场视觉盛宴，通过艺术与科技的完美融合，展现人类对AGI的无限想象。在这里，每一刻都是人类创意与人工智能碰撞的瞬间，让我们一同期待AGI带来的奇妙未来。

AGI Moment is a visual feast that showcases humanity's infinite imagination of AGI through the perfect fusion of art and technology. Here, every moment is an instant of collision between human creativity and artificial intelligence, inviting us to anticipate the magical future that AGI will bring.

## ✨ 特点 | Features

- 🎨 艺术与科技的完美融合 | Perfect fusion of art and technology
- 💫 沉浸式的视觉体验 | Immersive visual experience
- 🌈 激发无限想象力 | Inspiring infinite imagination
- 🚀 探索AGI的未来可能 | Exploring future possibilities of AGI
- 🎭 创意与智能的碰撞 | Collision of creativity and intelligence

## 🛠️ 技术栈 | Tech Stack

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Three.js](https://threejs.org/)
- [GSAP](https://greensock.com/gsap/)
- [UnoCSS](https://github.com/unocss/unocss)
- [TypeScript](https://www.typescriptlang.org/)

## 🤝 贡献 | Contributing

欢迎为这个创意项目做出贡献！如果你有任何想法或建议，请随时提出 issue 或提交 pull request。

We welcome contributions to this creative project! If you have any ideas or suggestions, feel free to open an issue or submit a pull request.

## 📝 许可证 | License

[MIT License](./LICENSE)

## 👨‍💻 作者 | Author

[Kirk Lin](https://github.com/kirklin)

---

<p align="center">
  用创意定义AGI的未来 | Defining the Future of AGI with Creativity
</p>
`;

  await fs.writeFile(path.join(process.cwd(), "README.md"), readme, "utf-8");
  console.log("✅ README.md 生成成功！");
}

async function main() {
  try {
    await generateReadme();
  } catch (error) {
    console.error("❌ 生成 README.md 时发生错误:", error);
    process.exit(1);
  }
}

main();
