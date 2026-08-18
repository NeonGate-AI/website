import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const isVercelDeployment = process.env.VERCEL === "1";

export function VercelObservability() {
  if (!isVercelDeployment) {
    return null;
  }

  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
