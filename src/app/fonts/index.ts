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

export const atkinson = localFont({
  src: [
    {
      path: "./AtkinsonHyperlegibleNext-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./AtkinsonHyperlegibleNext-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./AtkinsonHyperlegibleNext-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./AtkinsonHyperlegibleNext-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-atkinson",
});

export const atkinsonMono = localFont({
  src: [
    {
      path: "./AtkinsonHyperlegibleMono-Regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-atkinson-mono",
});

export const cinzel = localFont({
  src: [
    {
      path: "./CinzelDecorative-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./CinzelDecorative-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./CinzelDecorative-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-cinzel",
});

export const cormorant = localFont({
  src: [
    {
      path: "./Cormorant-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./Cormorant-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./Cormorant-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./Cormorant-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./Cormorant-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-cormorant",
});

export const lato = localFont({
  src: [
    {
      path: "./Lato-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./Lato-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./Lato-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-lato",
});

export const archivo = localFont({
  src: [
    {
      path: "./ArchivoBlack-Regular.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-archivo",
});
