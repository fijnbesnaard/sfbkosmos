import Markdoc from "@markdoc/markdoc";
import React from "react";
import { Fence } from "./markdoc/fence";
import { PageBreak } from "./markdoc/PageBreak";
import { ImageLayout } from "./markdoc/ImageLayout";

interface MarkdocRendererProps {
  content: any; // Keystatic returns an object with a 'node' property
}

const components = {
  Fence,
  PageBreak,
  ImageLayout,
};

export async function MarkdocRenderer({ content }: MarkdocRendererProps) {
  // Keystatic's markdoc field returns an object with a 'node' property
  // that contains the parsed Markdoc AST
  const ast = content.node || content;

  const transformedContent = Markdoc.transform(ast, {
    tags: {
      page_break: {
        render: "PageBreak",
      },
      // Alias for Typora compatibility
      hr: {
        render: "PageBreak",
        attributes: {
          class: { type: String },
        },
        transform(node, config) {
          const attributes = node.transformAttributes(config);
          // If it has our page-break class, render as PageBreak, else render as standard hr
          if (attributes.class === "page-break") {
            return new Markdoc.Tag("PageBreak", attributes);
          }
          return new Markdoc.Tag("hr", attributes);
        },
      },
      br: {
        render: "br",
        selfClosing: true,
      },
      image_grid: {
        render: "ImageLayout",
        selfClosing: true,
        attributes: {
          images: { type: Array },
          layout: { type: String, default: "grid" },
        },
      },
      full_width: {
        render: "ImageLayout",
        selfClosing: true,
        attributes: {
          image: { type: String },
          layout: { type: String, default: "full" },
        },
      },
      // Alias for Typora compatibility using standard div
      div: {
        render: "ImageLayout",
        attributes: {
          class: { type: String },
          images: { type: Array },
          image: { type: String },
        },
        transform(node, config) {
          const attributes = node.transformAttributes(config);
          const className = attributes.class || "";

          if (className.includes("image-grid")) {
            return new Markdoc.Tag(
              "ImageLayout",
              { ...attributes, layout: "grid" },
              node.transformChildren(config),
            );
          }
          if (className.includes("full-width")) {
            return new Markdoc.Tag(
              "ImageLayout",
              { ...attributes, layout: "full" },
              node.transformChildren(config),
            );
          }
          // Default div behavior: just render a div
          return new Markdoc.Tag(
            "div",
            attributes,
            node.transformChildren(config),
          );
        },
      },
    },
    nodes: {
      fence: {
        render: "Fence",
        attributes: {
          content: { type: String, required: true },
          language: { type: String },
        },
      },
    },
  });

  const reactNode = Markdoc.renderers.react(transformedContent, React, {
    components,
  });

  return <div className="prose lg:prose-xl mx-auto">{reactNode}</div>;
}
