"use client";

import React from "react";

export default function TypographyExample() {
  return (
    <main className="max-w-2xl mx-auto p-8">
      <header className="mb-12 border-b pb-8 prose lg:prose-xl">
        <h1>Golden Standard Typography</h1>
        <p className="text-lg font-normal text-gray-600">
          A demonstration of the Modular Scale, Custom Fonts, and Print
          Optimization.
        </p>
      </header>

      <article className="prose lg:prose-xl mx-auto">
        <h2>Introduction</h2>
        <p>
          This page demonstrates the <strong>Golden Standard Typography</strong>{" "}
          system. It uses a modular scale of 1.250 (Major Third), custom fonts
          (Compacta for headings, Inter for body), and is optimized for print
          via Paged.js rules.
        </p>

        <h3>The Modular Scale</h3>
        <p>
          The typography scales fluidly. For example, this paragraph uses the
          base font size, while the headings scale up according to the ratio.
        </p>

        <h3>Code Example</h3>
        <p>
          Here is an example of inline code: <code>npm run dev</code>. Notice
          there are no backticks.
        </p>
        <pre>
          <code>{`// Example Code Block
function helloWorld() {
  console.log("Hello, Typography!");
}`}</code>
        </pre>

        <h3>Print Optimization</h3>
        <p>Try printing this page (Cmd+P or Ctrl+P). Notice the following:</p>
        <ul>
          <li>
            <strong>Page Margins:</strong> Set to 20mm on A4 paper.
          </li>
          <li>
            <strong>Text Alignment:</strong> Justified with hyphenation enabled.
          </li>
          <li>
            <strong>Orphans & Widows:</strong> Minimum 3 lines to prevent
            dangling text.
          </li>
          <li>
            <strong>Breaks:</strong> Headings avoid breaking at the bottom of a
            page.
          </li>
        </ul>

        <figure>
          <img
            src="https://placehold.co/600x400/EEE/31343C"
            alt="Placeholder Image"
            className="w-full rounded-lg shadow-md"
          />
          <figcaption>
            Figure 1: An image that will avoid breaking inside usage on print.
          </figcaption>
        </figure>

        <h3>Conclusion</h3>
        <p>
          This system ensures that content looks beautiful on screens and
          generates high-quality PDFs without additional configuration.
        </p>
      </article>

      <footer className="mt-12 pt-8 border-t text-sm text-gray-500 text-center print:hidden">
        <p>Try printing this page to see the Paged.js rules in action.</p>
        <button
          onClick={() => {
            // Open a new window for the print preview
            const printWindow = window.open("", "_blank");
            if (!printWindow) {
              alert("Please allow popups to view the print preview.");
              return;
            }

            // Gather styles
            const externalStyles = Array.from(
              document.querySelectorAll('link[rel="stylesheet"]'),
            )
              .map((el) => el.outerHTML)
              .join("\n");

            const inlineStyles = Array.from(document.querySelectorAll("style"))
              .map((el) => el.outerHTML)
              .join("\n");

            // Get content
            const content = document.querySelector("main")?.innerHTML || "";

            // Write to the new window
            const htmlContent = `
              <!DOCTYPE html>
              <html>
                <head>
                  <title>Print Preview - Paged.js</title>
                  ${externalStyles}
                  <style>
                    /* Aggressively sanitize inline styles to remove Paged.js-incompatible selectors */
                    ${
                      inlineStyles
                        .replace(
                          /:where\(code\):not\(:where\(\[class~="not-prose"\] \*\)\)::before/g,
                          "code::before",
                        )
                        .replace(
                          /:where\(code\):not\(:where\(\[class~="not-prose"\] \*\)\)::after/g,
                          "code::after",
                        )
                        .replace(
                          /\[class~="not-prose"\] \*\)\):before/g,
                          "",
                        ) /* Fallback for partial match */
                    }
                  </style>
                  <!-- Inject global overrides directly -->
                  <style>
                     :root {
                        --text-base: 1rem; --text-md: 1.25rem; --text-lg: 1.563rem; --text-xl: 1.953rem;
                        --text-2xl: 2.441rem; --text-3xl: 3.052rem; --text-4xl: 3.815rem; --text-5xl: 4.768rem;
                        --leading-tight: 1.1; --leading-normal: 1.5; --leading-relaxed: 1.625;
                     }
                     /* Force remove backticks */
                     code::before, code::after { content: none !important; }

                    /* Ensure Paged.js UI is visible */
                    body { margin: 0; background: #EEE; }
                    .pagedjs_pages {
                      margin: 0 auto;
                      width: var(--pagedjs-width);
                      display: flex;
                      flex-direction: column;
                      align-items: center;
                    }
                    .pagedjs_page {
                      background: white;
                      box-shadow: 0 0 10px rgba(0,0,0,0.2);
                      margin-bottom: 20px;
                    }
                  </style>
                  <script src="https://unpkg.com/pagedjs/dist/paged.polyfill.js"></script>
                </head>
                <body>
                  <div class="prose lg:prose-xl mx-auto p-8 bg-white">
                    ${content}
                  </div>
                  <script>
                    window.PagedConfig = { auto: true };
                  </script>
                </body>
              </html>
            `;

            printWindow.document.write(htmlContent);
            printWindow.document.close();
          }}
          className="mt-4 px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
        >
          Preview Paged.js Layout (New Window)
        </button>
      </footer>
    </main>
  );
}
