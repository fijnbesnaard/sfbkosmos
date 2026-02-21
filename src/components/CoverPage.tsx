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
}

export function CoverPage({
  title,
  coverTitle,
  coverDate,
  coverPlace,
  coverName,
  coverEmail,
  coverPhone,
}: CoverPageProps) {
  const displayTitle = coverTitle || title;

  return (
    <div className="cover-page mb-16 page-break-after flex flex-col justify-between min-h-[80vh] print:min-h-[250mm]">
      {/* Top Section: Title & Date */}
      <div className="pt-24 print:pt-40">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-gray-900 dark:text-gray-100 uppercase tracking-tight leading-tight max-w-4xl">
          {displayTitle}
        </h1>
        {coverDate && (
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 font-medium">
            {new Date(coverDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        )}
      </div>

      {/* Bottom Section: Author Details */}
      <div className="pb-12 print:pb-24 grid grid-cols-1 md:grid-cols-2 gap-8 text-lg md:text-xl text-gray-800 dark:text-gray-200 mt-24">
        <div>
          {coverName && <p className="font-semibold mb-1">{coverName}</p>}
          {coverPlace && <p className="text-gray-600 dark:text-gray-400">{coverPlace}</p>}
        </div>
        <div className="md:text-right">
          {coverEmail && (
            <p className="mb-1">
              <a href={`mailto:${coverEmail}`} className="hover:underline text-blue-600 dark:text-blue-400">
                {coverEmail}
              </a>
            </p>
          )}
          {coverPhone && (
            <p>
              <a href={`tel:${coverPhone.replace(/\s+/g, '')}`} className="hover:underline text-blue-600 dark:text-blue-400">
                {coverPhone}
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
