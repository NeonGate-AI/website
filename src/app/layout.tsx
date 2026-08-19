import { VercelObservability } from "@ng/analytics/vercel/vercel-observability";
import { fontVariables } from "@ng/identity/fonts";
import type { Metadata, Viewport } from "next";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://neongate.com.br"),
  title: "Neongate AI — AI-voice software, engineered to act.",
  description:
    "Reliable AI-native products and agentic systems, engineered from first principles.",
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#0B0E17",
};

export default function RootLayout(props: LayoutProps<"/">) {
  const { children } = props;

  return (
    <html
      className={`${fontVariables} min-h-full bg-background scheme-dark`}
      lang="en"
    >
      <body className="min-h-full min-w-80 bg-background font-sans text-foreground antialiased [text-rendering:optimizeLegibility] selection:bg-violet/65 selection:text-white">
        {children}
        <VercelObservability />
      </body>
    </html>
  );
}
