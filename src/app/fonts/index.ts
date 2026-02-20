import localFont from "next/font/local";

export const compacta = localFont({
  src: [
    {
      path: "./CompactaPlain.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./CompactaBT-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-compacta",
});

export const inter = localFont({
  src: [
    {
      path: "./Inter18pt-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./Inter18pt-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./Inter18pt-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./Inter18pt-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./Inter18pt-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-inter",
});

export const bricolage = localFont({
  src: [
    {
      path: "./BricolageGrotesque24pt-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./BricolageGrotesque24pt-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-bricolage",
});
