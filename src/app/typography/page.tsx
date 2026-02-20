import React from "react";
import PrintPreview from "@/components/PrintPreview";

export default function TypographyExample() {
  return (
    <main className="max-w-2xl mx-auto p-8">
      <PrintPreview title="Golden Standard Typography">
        <header className="mb-12 border-b pb-8 prose dark:prose-invert lg:prose-xl">
          <h1>Golden Standard Typography</h1>
          <p className="text-lg font-normal text-gray-600 dark:text-gray-400">
            A demonstration of the Modular Scale, Custom Fonts, and Print
            Optimization.
          </p>
        </header>

        <article className="prose dark:prose-invert lg:prose-xl mx-auto">
          <h2>Introduction</h2>
          <p>
            This page demonstrates the{" "}
            <strong>Golden Standard Typography</strong> system. It uses a
            modular scale of 1.250 (Major Third), custom fonts (Compacta for
            headings, Inter for body), and is optimized for print via Paged.js
            rules.
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
          <p>
            Try clicking the "Print Document" button below. Notice the
            following:
          </p>
          <ul>
            <li>
              <strong>Running Headers:</strong> Document title and site name
              visible on every page.
            </li>
            <li>
              <strong>Page Numbering:</strong> "Page X of Y" in the bottom right
              corner.
            </li>
            <li>
              <strong>Page Margins:</strong> Set to 20mm on A4 paper.
            </li>
            <li>
              <strong>Text Alignment:</strong> Justified with hyphenation
              enabled.
            </li>
            <li>
              <strong>Orphans & Widows:</strong> Minimum 3 lines to prevent
              dangling text.
            </li>
            <li>
              <strong>Breaks:</strong> Headings avoid breaking at the bottom of
              a page.
            </li>
          </ul>

          <figure>
            <img
              src="https://placehold.co/600x400/17183b/e8e9f3?text=Paged.js+Optimization"
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
            generates high-quality PDFs with professional page layouts
            automatically.
          </p>
        </article>
      </PrintPreview>
    </main>
  );
}
