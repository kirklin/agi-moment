import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ICON_SIZES = [72, 96, 128, 144, 152, 192, 384, 512];
const SOURCE_LOGO = path.join(process.cwd(), "src/assets/logo.png");
const PUBLIC_DIR = path.join(process.cwd(), "public");

async function generateIcons() {
  // 确保目录存在
  const iconsDir = path.join(PUBLIC_DIR, "icons");
  await fs.mkdir(iconsDir, { recursive: true });

  // 为每个尺寸生成图标
  for (const size of ICON_SIZES) {
    await sharp(SOURCE_LOGO)
      .resize(size, size)
      .toFormat("png")
      .toFile(path.join(iconsDir, `icon-${size}x${size}.png`));
  }

  console.log("✅ Icons generated successfully");
}

async function generateSocialImages() {
  // 生成 Open Graph 图片
  await sharp(SOURCE_LOGO)
    .resize(1200, 630, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 1 } })
    .toFormat("png")
    .toFile(path.join(PUBLIC_DIR, "og-image.png"));

  // 生成 Twitter 图片
  await sharp(SOURCE_LOGO)
    .resize(1200, 600, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 1 } })
    .toFormat("png")
    .toFile(path.join(PUBLIC_DIR, "twitter-image.png"));

  console.log("✅ Social media images generated successfully");
}

async function generateScreenshots() {
  const screenshotsDir = path.join(PUBLIC_DIR, "screenshots");
  await fs.mkdir(screenshotsDir, { recursive: true });

  // 生成示例截图
  await sharp(SOURCE_LOGO)
    .resize(1280, 720, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 1 } })
    .toFormat("png")
    .toFile(path.join(screenshotsDir, "homepage.png"));

  console.log("✅ Screenshots generated successfully");
}

async function main() {
  try {
    await generateIcons();
    await generateSocialImages();
    await generateScreenshots();
    console.log("🎉 All images generated successfully!");
  } catch (error) {
    console.error("❌ Error generating images:", error);
    process.exit(1);
  }
}

main();
