import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// 支持的语言列表
const locales = ["en", "zh"];

export function middleware(request: NextRequest) {
  // 获取请求中的语言设置
  const pathname = request.nextUrl.pathname;
  const pathnameIsMissingLocale = locales.every(
    locale => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  );

  // 如果URL中没有语言代码
  if (pathnameIsMissingLocale) {
    // 获取用户偏好语言
    const locale = request.headers.get("accept-language")?.split(",")[0].split("-")[0] || "zh";

    // 如果不是支持的语言，默认使用中文
    const finalLocale = locales.includes(locale) ? locale : "zh";

    // 重定向到带有语言代码的URL
    return NextResponse.redirect(
      new URL(`/${finalLocale}${pathname}`, request.url),
    );
  }
}

// 配置匹配规则
export const config = {
  matcher: [
    // 跳过所有内部路径(_next)和API路由
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
