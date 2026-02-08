import Markdoc from "@markdoc/markdoc";
import React from "react";

export function renderMarkdoc(content: any) {
  const ast = Markdoc.parse(content);
  const transformed = Markdoc.transform(ast);
  return Markdoc.renderers.react(transformed, React);
}
