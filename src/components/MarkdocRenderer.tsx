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
      br: {
        render: "br",
        selfClosing: true,
      },
      image_grid: {
        render: "ImageLayout",
        attributes: {
          layout: { type: String, default: "grid" },
        },
      },
      full_width: {
        render: "ImageLayout",
        attributes: {
          layout: { type: String, default: "full" },
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
