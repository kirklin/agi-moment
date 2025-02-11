import fs from "node:fs/promises";
import path from "node:path";
import fetch from "node-fetch";

const SITE_URL = "https://agimoment.com";
const REPORT_PATH = path.join(process.cwd(), "reports", "seo-report.json");

interface PageMetrics {
  url: string;
  title: string;
  description: string;
  h1Count: number;
  imgCount: number;
  imgWithAlt: number;
  internalLinks: number;
  externalLinks: number;
  loadTime: number;
  wordCount: number;
}

async function fetchPageMetrics(url: string): Promise<PageMetrics> {
  const start = Date.now();
  const response = await fetch(url);
  const loadTime = Date.now() - start;
  const html = await response.text();

  // 使用简单的正则表达式来提取信息
  const title = (html.match(/<title>(.*?)<\/title>/i)?.[1] || "").trim();
  const description = (html.match(/<meta[^>]*name="description"[^>]*content="([^"]*)"[^>]*>/i)?.[1] || "").trim();
  const h1Count = (html.match(/<h1/gi) || []).length;
  const imgTags = html.match(/<img[^>]*>/gi) || [];
  const imgCount = imgTags.length;
  const imgWithAlt = imgTags.filter(img => img.includes("alt=")).length;
  const internalLinks = (html.match(new RegExp(`href=["'][^"']*${new URL(url).hostname}[^"']*["']`, "gi")) || []).length;
  const externalLinks = (html.match(/href=["']https?:\/\/[^"']*["']/gi) || []).length - internalLinks;
  const wordCount = html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim().split(" ").length;

  return {
    url,
    title,
    description,
    h1Count,
    imgCount,
    imgWithAlt,
    internalLinks,
    externalLinks,
    loadTime,
    wordCount,
  };
}

function generateSEOScore(metrics: PageMetrics): number {
  let score = 100;

  // 标题长度检查 (理想长度: 50-60字符)
  if (metrics.title.length < 30 || metrics.title.length > 60) {
    score -= 10;
  }

  // 描述长度检查 (理想长度: 150-160字符)
  if (metrics.description.length < 120 || metrics.description.length > 160) {
    score -= 10;
  }

  // H1标签检查 (应该只有一个)
  if (metrics.h1Count !== 1) {
    score -= 10;
  }

  // 图片Alt文本检查
  if (metrics.imgCount > 0 && metrics.imgWithAlt / metrics.imgCount < 0.8) {
    score -= 10;
  }

  // 内部链接检查 (至少应该有几个)
  if (metrics.internalLinks < 3) {
    score -= 5;
  }

  // 加载时间检查 (应该小于3秒)
  if (metrics.loadTime > 3000) {
    score -= 10;
  }

  // 内容长度检查 (至少300词)
  if (metrics.wordCount < 300) {
    score -= 10;
  }

  return Math.max(0, score);
}

async function generateReport() {
  const pages = [
    SITE_URL,
    `${SITE_URL}/about`,
    `${SITE_URL}/en`,
    `${SITE_URL}/zh`,
  ];

  const results = await Promise.all(pages.map(async (url) => {
    try {
      const metrics = await fetchPageMetrics(url);
      const score = generateSEOScore(metrics);
      return {
        ...metrics,
        score,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error(`Error analyzing ${url}:`, error);
      return null;
    }
  }));

  const report = {
    timestamp: new Date().toISOString(),
    siteUrl: SITE_URL,
    pages: results.filter(Boolean),
  };

  // 确保报告目录存在
  await fs.mkdir(path.dirname(REPORT_PATH), { recursive: true });

  // 保存报告
  await fs.writeFile(REPORT_PATH, JSON.stringify(report, null, 2));
  console.log(`✅ SEO报告已生成: ${REPORT_PATH}`);

  // 输出摘要
  console.log("\n📊 SEO评分摘要:");
  report.pages.forEach((page) => {
    if (page) {
      console.log(`\n${page.url}`);
      console.log(`评分: ${page.score}/100`);
      console.log(`标题长度: ${page.title.length} 字符`);
      console.log(`描述长度: ${page.description.length} 字符`);
      console.log(`加载时间: ${page.loadTime}ms`);
      console.log(`内容长度: ${page.wordCount} 词`);
    }
  });
}

async function main() {
  try {
    await generateReport();
  } catch (error) {
    console.error("❌ 生成SEO报告时发生错误:", error);
    process.exit(1);
  }
}

main();
