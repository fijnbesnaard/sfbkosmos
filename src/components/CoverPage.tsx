"use client";

import React from "react";

export interface CoverPageProps {
  title: string;
  coverTitle?: string | null;
  coverDate?: string | null;
  coverPlace?: string | null;
  coverName?: string | null;
  coverEmail?: string | null;
  coverPhone?: string | null;
  children?: React.ReactNode;
}

export function CoverPage({
  title,
  coverTitle,
  coverDate,
  coverPlace,
  coverName,
  coverEmail,
  coverPhone,
  children,
}: CoverPageProps) {
  // Use robust OR fallback for empty Keystatic string fields
  const displayTitle = coverTitle || title;
  const displayPlace = coverPlace || "Amsterdam";
  const displayName = coverName || "Niels Hartog";
  const displayEmail = coverEmail || "niels@fijnbesnaard.nl";
  const displayPhone = coverPhone || "06 4546 2919";

  return (
    <div className="cover-page">
      <div className="pt-16 print:pt-24 mb-16">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-12 text-gray-900 dark:text-gray-100 uppercase tracking-tight leading-tight max-w-4xl">
          {displayTitle}
        </h1>

        <div className="text-xl md:text-2xl text-gray-800 dark:text-gray-200 font-medium space-y-2">
          <p>
            {coverDate && (
              <span className="mr-2">
                {new Date(coverDate).toLocaleDateString("nl-NL", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })},
              </span>
            )}
            <span>{displayPlace}</span>
          </p>

          <div className="pt-6 space-y-1">
            <p className="font-semibold">{displayName}</p>
            <p className="text-gray-600 dark:text-gray-400 text-lg md:text-xl">
              <a href={`mailto:${displayEmail}`} className="hover:underline print:text-gray-800">
                {displayEmail}
              </a>
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-lg md:text-xl">
              <a href={`tel:${displayPhone.replace(/\s+/g, "")}`} className="hover:underline print:text-gray-800">
                {displayPhone}
              </a>
            </p>
          </div>
        </div>
      </div>

      {children && (
        <div className="mt-16 pt-8 border-t-2 border-gray-100 dark:border-gray-800 print:border-transparent">
          {children}
        </div>
      )}
    </div>
  );
}
