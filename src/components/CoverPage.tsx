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
    <div className="cover-page m-0 p-0 page-break-after">
      <div className="pt-8 print:pt-16 mb-8">
        <h1 className="text-5xl md:text-6xl lg:text-7xl print:!text-3xl font-bold mb-8 text-dark dark:text-light uppercase tracking-tight print:!leading-[1.1] leading-tight max-w-4xl">
          {displayTitle}
        </h1>

        <div className="text-sm text-dark dark:text-light font-normal print:font-light! space-y-1">
          <p>
            {coverDate && (
              <span className="mr-2">
                {new Date(coverDate).toLocaleDateString("nl-NL", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
                ,
              </span>
            )}
            <span>{displayPlace}</span>
          </p>

          <div className="space-y-1">
            <p className="font-normal print:font-light!">
              {displayName}
              <br />
              <a
                href={`mailto:${displayEmail}`}
                className="hover:underline text-pink print:!text-dark print:!no-underline print:font-light!"
              >
                {displayEmail}
              </a>
              <br />
              {displayPhone}
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
