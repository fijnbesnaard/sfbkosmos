import type { Metadata } from "next";
import "./globals.css";
import { compacta, inter } from "./fonts";

export const metadata: Metadata = {
  title: "SFB Kosmos",
  description: "SFB Kosmos Site",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${compacta.variable} ${inter.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
