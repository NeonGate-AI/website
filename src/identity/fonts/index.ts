import localFont from "next/font/local";

const satoshi = localFont({
  display: "swap",
  fallback: ["Inter", "Arial", "sans-serif"],
  src: [
    {
      path: "./Satoshi-Regular.woff2",
      style: "normal",
      weight: "400",
    },
    {
      path: "./Satoshi-Medium.woff2",
      style: "normal",
      weight: "500",
    },
  ],
  variable: "--font-satoshi",
});

export const fontVariables = satoshi.variable;
