"use client";

import React, { useEffect, useState } from "react";
import { TocHeading } from "@/utils/toc";

interface TableOfContentsProps {
  headings: TocHeading[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
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
      { rootMargin: "0px 0px -80% 0px", threshold: 0.1 }
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
        Table of Contents
      </h2>
      <ul className="space-y-2 text-sm">
        {headings.map((heading, index) => {
          const depth = heading.level - minHeadingLevel;
          return (
            <li
              key={`${heading.id}-${index}`}
              style={{ paddingLeft: `${depth * 1}rem` }}
            >
              <a
                href={`#${heading.id}`}
                className={`transition-colors duration-200 block border-l-2 pl-3 ${
                  activeId === heading.id
                    ? "border-blue-500 text-blue-600 dark:text-blue-400 font-medium"
                    : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:border-gray-300 dark:hover:border-gray-600"
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
