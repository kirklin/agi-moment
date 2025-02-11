import { Feed } from "feed";

export async function GET() {
  const feed = new Feed({
    title: "AGI Moment",
    description: "探索人工通用智能的未来 | Exploring the Future of AGI",
    id: "https://agimoment.com/",
    link: "https://agimoment.com/",
    language: "zh-CN",
    image: "https://agimoment.com/logo.png",
    favicon: "https://agimoment.com/favicon.ico",
    copyright: `All rights reserved ${new Date().getFullYear()}, AGI Moment`,
    author: {
      name: "Kirk Lin",
      email: "contact@agimoment.com",
      link: "https://github.com/kirklin",
    },
  });

  // 添加主要页面作为条目
  feed.addItem({
    title: "AGI Moment - 探索人工通用智能的未来",
    id: "https://agimoment.com/",
    link: "https://agimoment.com/",
    description: "AGI Moment是一个专注于探索人工通用智能(AGI)前沿的平台。我们深入研究AGI技术发展、应用场景和未来影响，助力读者了解和把握AGI革命带来的机遇。",
    date: new Date(),
    image: "https://agimoment.com/og-image.png",
  });

  feed.addItem({
    title: "About AGI Moment",
    id: "https://agimoment.com/about",
    link: "https://agimoment.com/about",
    description: "了解更多关于AGI Moment的信息，我们的使命和愿景。",
    date: new Date(),
  });

  // 设置响应头
  return new Response(feed.rss2(), {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
