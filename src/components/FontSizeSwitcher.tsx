"use client";

import { useEffect, useState } from "react";

export default function FontSizeSwitcher() {
  const [isLarge, setIsLarge] = useState(false);

  // Load preference on mount
  useEffect(() => {
    const saved = localStorage.getItem("font-size-large");
    if (saved === "true") {
      setIsLarge(true);
      document.documentElement.classList.add("font-large");
    }
  }, []);

  const toggleFontSize = () => {
    const newState = !isLarge;
    setIsLarge(newState);
    if (newState) {
      document.documentElement.classList.add("font-large");
      localStorage.setItem("font-size-large", "true");
    } else {
      document.documentElement.classList.remove("font-large");
      localStorage.setItem("font-size-large", "false");
    }
  };

  return (
    <button
      onClick={toggleFontSize}
      className="fixed top-10 rounded-lg right-4 z-50 px-2.5 py-0.5 bg-dark dark:bg-light hover:scale-105 transition-all duration-200 active:scale-95 group hover:cursor-pointer"
      aria-label="Toggle font size"
      title={isLarge ? "Decrease font size" : "Increase font size"}
    >
      <div className="flex items-center justify-center w-4 h-4">
        <span className="font-bold text-xs select-none text-light dark:text-dark transition-colors">
          {isLarge ? "A-" : "A+"}
        </span>
      </div>

      {/* Tooltip for better UX */}
      <span className="absolute top-0 right-full mr-3 px-2 py-1 rounded bg-dark dark:bg-light text-light dark:text-dark text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        {isLarge ? "Normal Size" : "Larger Size"}
      </span>
    </button>
  );
}
