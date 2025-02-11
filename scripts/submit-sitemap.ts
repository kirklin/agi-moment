import fetch from "node-fetch";

const SITE_URL = "https://agimoment.com";
const SITEMAP_URL = `${SITE_URL}/sitemap.xml`;

interface SearchEngine {
  name: string;
  submitUrl: string;
  getSubmitUrl: (sitemapUrl: string, apiKey?: string) => string;
}

const searchEngines: SearchEngine[] = [
  {
    name: "Google",
    submitUrl: "https://www.google.com/ping",
    getSubmitUrl: (sitemapUrl: string) => `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`,
  },
  {
    name: "Bing",
    submitUrl: "https://www.bing.com/ping",
    getSubmitUrl: (sitemapUrl: string) => `https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`,
  },
  {
    name: "Baidu",
    submitUrl: "http://data.zz.baidu.com/urls",
    getSubmitUrl: (sitemapUrl: string, apiKey?: string) =>
      `http://data.zz.baidu.com/urls?site=${encodeURIComponent(SITE_URL)}&token=${apiKey}`,
  },
];

async function submitSitemap() {
  console.log("开始提交 Sitemap...");

  for (const engine of searchEngines) {
    try {
      const apiKey = process.env[`${engine.name.toUpperCase()}_API_KEY`];
      const submitUrl = engine.getSubmitUrl(SITEMAP_URL, apiKey);

      const response = await fetch(submitUrl, {
        method: engine.name === "Baidu" ? "POST" : "GET",
        headers: {
          "Content-Type": engine.name === "Baidu" ? "text/plain" : "application/xml",
        },
        body: engine.name === "Baidu" ? SITEMAP_URL : undefined,
      });

      if (response.ok) {
        console.log(`✅ 成功提交到 ${engine.name}`);
      } else {
        console.error(`❌ 提交到 ${engine.name} 失败: ${response.statusText}`);
      }
    } catch (error) {
      console.error(`❌ 提交到 ${engine.name} 时发生错误:`, error);
    }
  }
}

async function main() {
  try {
    await submitSitemap();
    console.log("🎉 Sitemap 提交完成！");
  } catch (error) {
    console.error("❌ Sitemap 提交过程中发生错误:", error);
    process.exit(1);
  }
}

main();
