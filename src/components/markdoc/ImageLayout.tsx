import React from "react";

interface ImageLayoutProps {
  images?: string[];
  image?: string;
  layout?: "grid" | "full";
  children?: React.ReactNode;
}

export function ImageLayout({
  images = [],
  image,
  layout = "grid",
  children,
}: ImageLayoutProps) {
  // Normalize images to an array from props
  const displayImages = layout === "full" ? [image] : images;

  return (
    <div className={`image-layout-${layout}`}>
      {/* Render children if provided (for HTML-based syntax) */}
      {children}
      {/* Render images from props (for Keystatic-based syntax) */}
      {displayImages.map((src, i) => src && <img key={i} src={src} alt="" />)}
    </div>
  );
}
