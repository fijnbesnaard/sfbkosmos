"use client";

import React, { useRef } from "react";

interface PrintPreviewProps {
  children: React.ReactNode;
  title?: string;
}

export default function PrintPreview({
  children,
  title = "Print Preview",
}: PrintPreviewProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  const handlePreview = async () => {
    if (!contentRef.current) return;

    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      alert("Please allow popups to view the print preview.");
      return;
    }

    // Capture content
    const content = contentRef.current.innerHTML;

    // Robust CSS Sanitization for Paged.js
    const sanitizeCSS = (css: string) => {
      let cleaned = css
        .replace(/::before/g, ":before")
        .replace(/::after/g, ":after");

      // Flatten all :where() selectors - Paged.js doesn't support them well
      // Iterative flattening for nested cases
      for (let i = 0; i < 3; i++) {
        cleaned = cleaned.replace(/:where\(([^()]+)\)/g, "$1");
      }

      // Instead of stripping the whole rule, just remove the problematic :not() part
      // that Tailwind Typography uses to exclude .not-prose elements.
      // This part often causes Paged.js to crash.
      cleaned = cleaned.replace(/:not\([^)]*not-prose[^)]*\)/g, "");

      // Safety for the specific mangled selector pattern reported
      cleaned = cleaned.replace(/\)\):before/g, ":before");
      cleaned = cleaned.replace(/\)\):after/g, ":after");

      return cleaned;
    };

    // Fetch and combine all styles
    let allStyles = "";

    // 1. Get External Styles
    const links = Array.from(
      document.querySelectorAll('link[rel="stylesheet"]'),
    ) as HTMLLinkElement[];
    for (const link of links) {
      try {
        const response = await fetch(link.href);
        const css = await response.text();
        allStyles += `\n/* From ${link.href} */\n` + sanitizeCSS(css);
      } catch (e) {
        console.warn(`Could not fetch stylesheet: ${link.href}`, e);
        // Fallback: keep the link but Paged.js might crash if it has bad selectors
        // Better to ignore it and hope for the best if we can't sanitize it
      }
    }

    // 2. Get Inline Styles
    const styles = Array.from(document.querySelectorAll("style"));
    for (const style of styles) {
      allStyles += `\n/* Inline Style */\n` + sanitizeCSS(style.innerHTML);
    }

    // Build the preview HTML
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en" dir="ltr" class="light" style="color-scheme: light !important;">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <base href="${window.location.origin}/">
          <title>${title} - Paged.js</title>

          <style>
            /* FORCE LIGHT MODE */
            :root {
              color-scheme: light !important;
              --background: white !important;
              --foreground: #17183b !important;
            }
            html, body {
              background: #f3f4f6 !important;
              color: #17183b !important;
              margin: 0;
              padding: 0;
            }

            ${allStyles}
          </style>
          <style>
            /* Paged.js UI & Layout */
            .pagedjs_pages {
              margin: 40px auto;
              width: var(--pagedjs-width) !important;
              display: flex;
              flex-direction: column;
              align-items: center;
              min-height: 100vh;
            }
            .pagedjs_page {
              background: white !important;
              box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
              margin-bottom: 30px;
            }
            .preview-controls {
               position: fixed;
               top: 20px;
               left: 20px;
               z-index: 99999;
               background: white;
               padding: 10px 20px;
               border-radius: 8px;
               box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
               display: flex;
               gap: 10px;
            }
            #loading-overlay {
               position: fixed;
               inset: 0;
               background: white;
               display: flex;
               flex-direction: column;
               align-items: center;
               justify-content: center;
               z-index: 100000;
               font-family: sans-serif;
            }
            .spinner {
              width: 40px;
              height: 40px;
              border: 4px solid #f3f3f3;
              border-top: 4px solid #000;
              border-radius: 50%;
              animation: spin 1s linear infinite;
              margin-bottom: 20px;
            }
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }

            button.print-btn {
              background: #000;
              color: white;
              border: none;
              padding: 8px 16px;
              border-radius: 4px;
              cursor: pointer;
              font-weight: 600;
              font-family: sans-serif;
            }
            button.print-btn:hover { background: #333; }

            @media print {
              .preview-controls, #loading-overlay { display: none !important; }
              body { background: white !important; }
              .pagedjs_pages { margin: 0; display: block; }
              .pagedjs_page { box-shadow: none; margin-bottom: 0; }
            }

            .print-container {
              background: white !important;
              color: #17183b !important;
              visibility: visible !important;
              display: block !important;
              opacity: 1 !important;
            }
          </style>
          <script>
            window.PagedConfig = {
              auto: true,
              after: () => {
                console.log("Paged.js: Fragmentation complete.");
                document.getElementById('loading-overlay').style.display = 'none';
              }
            };
          </script>
        </head>
        <body>
          <div id="loading-overlay">
            <div class="spinner"></div>
            <p>Preparing print layout...</p>
            <p style="font-size: 12px; color: #666;">This may take a few seconds.</p>
          </div>
          <div class="preview-controls no-print">
            <button class="print-btn" onclick="window.print()">Print PDF</button>
            <button class="print-btn" onclick="window.close()" style="background: #ef4444">Close</button>
          </div>
          <div class="print-container prose lg:prose-xl mx-auto p-8">
            <img src="/sfb.png" class="print-logo-running" alt="SFB Logo" />
            ${content}
          </div>
          <!-- Load Paged.js at the end to ensure DOM is ready -->
          <script src="https://unpkg.com/pagedjs/dist/paged.polyfill.js" defer></script>
        </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  return (
    <div className="relative">
      {/*
          Consolidated Print Button
          Styled to match Theme/Font switchers
          Positioned below the control cluster
      */}
      <button
        onClick={handlePreview}
        className="fixed top-16 rounded-lg right-4 z-50 px-2.5 py-0.5 bg-dark dark:bg-light hover:scale-105 transition-all duration-200 active:scale-95 group hover:cursor-pointer flex items-center justify-center w-full max-w-[36px] h-5"
        aria-label="Print Document"
        title="Print Document"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-light dark:text-dark"
        >
          <polyline points="6 9 6 2 18 2 18 9"></polyline>
          <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
          <rect x="6" y="14" width="12" height="8"></rect>
        </svg>

        {/* Tooltip */}
        <span className="absolute right-full mr-3 px-2 py-1 rounded bg-dark dark:bg-light text-light dark:text-dark text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Print PDF
        </span>
      </button>

      <div ref={contentRef} className="print-content">
        {children}
      </div>
    </div>
  );
}
