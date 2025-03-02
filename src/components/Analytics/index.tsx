import dynamic from "next/dynamic";

import { getClientConfig } from "~/config/client";

const Vercel = dynamic(() => import("./Vercel"), { ssr: false });
const GoogleAnalytics = dynamic(() => import("./GoogleAnalytics"), { ssr: false });

const { ANALYTICS_VERCEL } = getClientConfig();

function Analytics() {
  return (
    <>
      {ANALYTICS_VERCEL && <Vercel />}
      <GoogleAnalytics />
    </>
  );
}

export default Analytics;
