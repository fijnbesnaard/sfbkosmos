import React from "react";

interface ImageLayoutProps {
  children: React.ReactNode;
  layout?: "grid" | "full";
}

export function ImageLayout({ children, layout = "grid" }: ImageLayoutProps) {
  return <div className={`image-layout-${layout}`}>{children}</div>;
}
