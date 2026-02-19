"use client";

import { useState, useEffect } from "react";

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // Check local storage or system preference
    const savedTheme = localStorage.getItem("theme");
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    const initialTheme = savedTheme || systemTheme;

    setTheme(initialTheme);
    setMounted(true);

    if (initialTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={toggleTheme}
      className={`fixed top-4 right-4 z-50 w-9 h-5 rounded-full p-1 transition-colors duration-300 border-2 ${
        theme === "dark" ? "bg-dark border-light" : "bg-light border-dark"
      }`}
      aria-label="Toggle theme"
      title={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
    >
      <div
        className={`${
          theme === "dark" ? "bg-light" : "bg-dark"
        } w-3 h-3 rounded-full shadow-md transform transition-transform duration-300 -translate-y-0.5 ${
          theme === "dark" ? "translate-x-3.25" : "-translate-x-0.5"
        }`}
      />
    </button>
  );
}
