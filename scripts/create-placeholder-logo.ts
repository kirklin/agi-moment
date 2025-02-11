import { Buffer } from "node:buffer";
import path from "node:path";
import sharp from "sharp";

const LOGO_PATH = path.join(process.cwd(), "src/assets/logo.png");

// 创建一个512x512的黑色背景图片，上面有白色的"AGI"文字
const svgImage = `
<svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="black"/>
  <text x="50%" y="50%" font-family="Arial" font-size="120" fill="white" text-anchor="middle" dominant-baseline="middle">
    AGI
  </text>
  <text x="50%" y="65%" font-family="Arial" font-size="48" fill="white" text-anchor="middle" dominant-baseline="middle">
    MOMENT
  </text>
</svg>
`;

async function createPlaceholderLogo() {
  try {
    await sharp(Buffer.from(svgImage))
      .png()
      .toFile(LOGO_PATH);

    console.log("✅ Placeholder logo created successfully!");
  } catch (error) {
    console.error("❌ Error creating placeholder logo:", error);
    process.exit(1);
  }
}

createPlaceholderLogo();
