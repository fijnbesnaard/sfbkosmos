"use client";

import React, { useEffect, useState } from "react";
import { TocHeading } from "@/utils/toc";

interface TableOfContentsProps {
  headings: TocHeading[];
  language?: "nl" | "en";
}

export function TableOfContents({
  headings,
  language = "nl",
}: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // Basic Intersection Observer to highlight active heading
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "0px 0px -80% 0px", threshold: 0.1 },
    );

    headings.forEach((heading) => {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (!headings || headings.length === 0) return null;

  // Determine base indent so that e.g. h2 starts at pl-0 even if no h1 exists
  const minHeadingLevel = Math.min(...headings.map((h) => h.level));

  return (
    <nav className="toc-nav mb-8 p-6 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100 pb-2 border-b border-gray-200 dark:border-gray-800">
        {language === "en" ? "Table of Contents" : "Inhoud"}
      </h2>
      <ul className="space-y-2 text-sm list-none -ml-4 print:list-none! print:pl-1!">
        {headings.map((heading, index) => {
          const depth = heading.level - minHeadingLevel;
          return (
            <li
              key={`${heading.id}-${index}`}
              style={{ paddingLeft: `${depth * 1}rem` }}
            >
              <a
                href={`#${heading.id}`}
                className={`font-light text-base print:font-light! print:text-base! transition-colors duration-200 block border-l-2 pl-3 print:no-underline! ${
                  activeId === heading.id
                    ? "border-pink text-pink dark:text-pink font-medium print:text-dark! print:border-transparent!"
                    : "border-transparent text-dark dark:text-light hover:text-pink dark:hover:text-pink hover:border-pink dark:hover:border-pink print:text-dark! print:border-transparent!"
                }`}
              >
                {heading.title}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
