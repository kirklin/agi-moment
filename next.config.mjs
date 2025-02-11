/** @type {import('next').NextConfig} */
const nextConfig = {
  // 启用图片优化
  images: {
    domains: ["agimoment.com"],
    formats: ["image/avif", "image/webp"],
  },

  // i18n配置
  i18n: {
    locales: ["en", "zh"],
    defaultLocale: "zh",
    localeDetection: true,
  },

  // 压缩配置
  compress: true,

  // 性能优化
  swcMinify: true,
  reactStrictMode: true,
  poweredByHeader: false,

  // 资源优化
  optimizeFonts: true,
  optimizeImages: true,

  // 安全配置
  headers: async () => [
    {
      source: "/:path*",
      headers: [
        {
          key: "X-DNS-Prefetch-Control",
          value: "on",
        },
        {
          key: "X-XSS-Protection",
          value: "1; mode=block",
        },
        {
          key: "X-Frame-Options",
          value: "SAMEORIGIN",
        },
        {
          key: "X-Content-Type-Options",
          value: "nosniff",
        },
        {
          key: "Referrer-Policy",
          value: "strict-origin-when-cross-origin",
        },
      ],
    },
  ],

  // 重定向配置
  redirects: async () => [
    {
      source: "/home",
      destination: "/",
      permanent: true,
    },
    {
      source: "/about-us",
      destination: "/about",
      permanent: true,
    },
  ],
};

export default nextConfig;
