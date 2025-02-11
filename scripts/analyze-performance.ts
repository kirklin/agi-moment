import type { Flags, Result } from "lighthouse";
import type { Browser, HTTPResponse } from "puppeteer";
import fs from "node:fs/promises";
import path from "node:path";
import lighthouse from "lighthouse";
import puppeteer from "puppeteer";

const SITE_URL = "https://agimoment.com";
const REPORT_PATH = path.join(process.cwd(), "reports", "performance-report.json");

interface PerformanceMetrics {
  url: string;
  timestamp: string;
  lighthouse: {
    performance: number;
    accessibility: number;
    bestPractices: number;
    seo: number;
    pwa: number;
  };
  vitals: {
    fcp: number; // First Contentful Paint
    lcp: number; // Largest Contentful Paint
    cls: number; // Cumulative Layout Shift
    fid: number; // First Input Delay
    ttfb: number; // Time to First Byte
  };
  resources: {
    total: number;
    js: number;
    css: number;
    images: number;
    fonts: number;
    other: number;
  };
  size: {
    total: number;
    js: number;
    css: number;
    images: number;
    fonts: number;
    other: number;
  };
}

async function runLighthouse(url: string, browser: Browser): Promise<PerformanceMetrics["lighthouse"]> {
  const port = new URL((browser as any).wsEndpoint()).port;
  const options: Flags = {
    logLevel: "info" as const,
    output: "json",
    port: Number.parseInt(port),
  };

  const runnerResult = await lighthouse(url, options);
  const lhr = runnerResult?.lhr as Result;

  if (!lhr || !lhr.categories) {
    throw new Error("Lighthouse audit failed");
  }

  return {
    performance: (lhr.categories.performance?.score ?? 0) * 100,
    accessibility: (lhr.categories.accessibility?.score ?? 0) * 100,
    bestPractices: (lhr.categories["best-practices"]?.score ?? 0) * 100,
    seo: (lhr.categories.seo?.score ?? 0) * 100,
    pwa: (lhr.categories.pwa?.score ?? 0) * 100,
  };
}

async function collectMetrics(url: string): Promise<PerformanceMetrics> {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    const page = await browser.newPage();
    await page.setCacheEnabled(false);

    // 收集网络请求数据
    const resources = {
      total: 0,
      js: 0,
      css: 0,
      images: 0,
      fonts: 0,
      other: 0,
    };

    const size = {
      total: 0,
      js: 0,
      css: 0,
      images: 0,
      fonts: 0,
      other: 0,
    };

    page.on("response", async (response: HTTPResponse) => {
      const headers = response.headers();
      const contentType = headers["content-type"] || "";
      const contentLength = Number.parseInt(headers["content-length"] || "0");

      resources.total++;
      size.total += contentLength;

      if (contentType.includes("javascript")) {
        resources.js++;
        size.js += contentLength;
      } else if (contentType.includes("css")) {
        resources.css++;
        size.css += contentLength;
      } else if (contentType.includes("image")) {
        resources.images++;
        size.images += contentLength;
      } else if (contentType.includes("font")) {
        resources.fonts++;
        size.fonts += contentLength;
      } else {
        resources.other++;
        size.other += contentLength;
      }
    });

    // 收集性能指标
    const client = await page.target().createCDPSession();
    await client.send("Performance.enable");

    const navigationStart = Date.now();
    await page.goto(url, { waitUntil: "networkidle0" });

    const performanceMetrics = await client.send("Performance.getMetrics");

    const getMetric = (name: string) => {
      const metric = performanceMetrics.metrics.find((m: { name: string; value: number }) => m.name === name);
      return metric ? metric.value : 0;
    };

    const vitals = {
      fcp: getMetric("FirstContentfulPaint"),
      lcp: getMetric("LargestContentfulPaint"),
      cls: getMetric("CumulativeLayoutShift"),
      fid: getMetric("FirstInputDelay") || 0,
      ttfb: getMetric("TimeToFirstByte") || Date.now() - navigationStart,
    };

    // 运行Lighthouse审计
    const lighthouse = await runLighthouse(url, browser);

    return {
      url,
      timestamp: new Date().toISOString(),
      lighthouse,
      vitals,
      resources,
      size,
    };
  } finally {
    await browser.close();
  }
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
      return await collectMetrics(url);
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
  console.log(`✅ 性能报告已生成: ${REPORT_PATH}`);

  // 输出摘要
  console.log("\n📊 性能评分摘要:");
  report.pages.forEach((page) => {
    if (page) {
      console.log(`\n${page.url}`);
      console.log("Lighthouse 评分:");
      console.log(`- 性能: ${page.lighthouse.performance.toFixed(1)}`);
      console.log(`- 可访问性: ${page.lighthouse.accessibility.toFixed(1)}`);
      console.log(`- 最佳实践: ${page.lighthouse.bestPractices.toFixed(1)}`);
      console.log(`- SEO: ${page.lighthouse.seo.toFixed(1)}`);
      console.log(`- PWA: ${page.lighthouse.pwa.toFixed(1)}`);

      console.log("\nWeb Vitals:");
      console.log(`- FCP: ${page.vitals.fcp.toFixed(1)}ms`);
      console.log(`- LCP: ${page.vitals.lcp.toFixed(1)}ms`);
      console.log(`- CLS: ${page.vitals.cls.toFixed(3)}`);
      console.log(`- FID: ${page.vitals.fid.toFixed(1)}ms`);
      console.log(`- TTFB: ${page.vitals.ttfb.toFixed(1)}ms`);

      console.log("\n资源统计:");
      console.log(`- 总请求数: ${page.resources.total}`);
      console.log(`- 总大小: ${(page.size.total / 1024 / 1024).toFixed(2)}MB`);
    }
  });
}

async function main() {
  try {
    await generateReport();
  } catch (error) {
    console.error("❌ 生成性能报告时发生错误:", error);
    process.exit(1);
  }
}

main();
