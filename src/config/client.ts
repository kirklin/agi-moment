/**
 * the client config is only used in Vercel deployment
 */

declare global {
  // eslint-disable-next-line ts/no-namespace
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_ANALYTICS_VERCEL?: string;
      NEXT_PUBLIC_VERCEL_DEBUG?: string;

      NEXT_PUBLIC_DEVELOPER_DEBUG: string;
    }
  }
}

export function getClientConfig() {
  return {
  // Vercel Analytics
    ANALYTICS_VERCEL: process.env.NEXT_PUBLIC_ANALYTICS_VERCEL === "1",
    VERCEL_DEBUG: process.env.NEXT_PUBLIC_VERCEL_DEBUG === "1",

    // developer debug mode
    DEBUG_MODE: process.env.NEXT_PUBLIC_DEVELOPER_DEBUG === "1",
  };
}
