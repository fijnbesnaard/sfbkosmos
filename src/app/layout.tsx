import type { Metadata } from "next";
import "./globals.css";
import { compacta, inter } from "./fonts";

export const metadata: Metadata = {
  title: "SFB Kosmos",
  description: "SFB Kosmos Site",
};

import ThemeSwitcher from "@/components/ThemeSwitcher";
import FontSizeSwitcher from "@/components/FontSizeSwitcher";
import Navigation from "@/components/Navigation";
import SearchBar from "@/components/SearchBar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${compacta.variable} ${inter.variable}`}>
      <body className="antialiased bg-light text-dark dark:bg-dark dark:text-light transition-colors duration-300">
        <Navigation />
        <ThemeSwitcher />
        <FontSizeSwitcher />
        <SearchBar />
        {children}
      </body>
    </html>
  );
}
