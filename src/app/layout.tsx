import type { Metadata } from "next";
import {
  compacta,
  inter,
  cinzel,
  atkinson,
  atkinsonMono,
  cormorant,
  lato,
  archivo,
} from "./fonts";
import "./globals.css";

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
    <html
      lang="en"
      className={`${compacta.variable} ${inter.variable} ${cinzel.variable} ${atkinson.variable} ${atkinsonMono.variable} ${cormorant.variable} ${lato.variable} ${archivo.variable}`}
    >
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
