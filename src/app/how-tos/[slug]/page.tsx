import { notFound } from "next/navigation";
import { reader } from "@/lib/keystatic-reader";
import { MarkdocRenderer } from "@/components/MarkdocRenderer";
import PrintPreview from "@/components/PrintPreview";
import { TableOfContents } from "@/components/TableOfContents";
import { extractHeadings } from "@/utils/toc";
import { CoverPage } from "@/components/CoverPage";

interface HowToPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const howTos = await reader.collections.how_tos.all();
  return howTos.map((howTo) => ({
    slug: howTo.slug,
  }));
}

export default async function HowToPage({ params }: HowToPageProps) {
  const { slug } = await params;
  const howTo = await reader.collections.how_tos.read(slug);

  if (!howTo) {
    notFound();
  }

  return (
    <main className="max-w-4xl mx-auto p-8">
      <PrintPreview title={howTo.coverTitle || howTo.title}>

        {/* Cover Page Injection */}
        {howTo.enableCoverPage && (
          <>
            <CoverPage
              title={howTo.title}
              coverTitle={howTo.coverTitle}
              coverDate={howTo.coverDate}
              coverPlace={howTo.coverPlace}
              coverName={howTo.coverName}
              coverEmail={howTo.coverEmail}
              coverPhone={howTo.coverPhone}
            />
            {/* TOC on Cover Page rather than Inline */}
            {howTo.showToc && (
              <div className="page-break-after mb-24 print:mt-12">
                <TableOfContents
                  headings={extractHeadings(
                    (await howTo.content()).node,
                    howTo.tocMinLevel || 2,
                    howTo.tocMaxLevel || 3
                  )}
                />
              </div>
            )}
          </>
        )}

        {/* Standard Article Header (Hidden if Cover is active, or styled differently) */}
        {!howTo.enableCoverPage && (
          <header className="mb-12 border-b pb-8">
            <h1 className="text-4xl font-bold mb-4">{howTo.title}</h1>
            {howTo.category && (
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
                Category: {howTo.category}
              </p>
            )}
            {howTo.tags && howTo.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {howTo.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>
        )}

        <article className="prose dark:prose-invert lg:prose-xl">
          {/* TOC behaves normally if no Cover Page exists */}
          {!howTo.enableCoverPage && howTo.showToc && (
            <TableOfContents
              headings={extractHeadings(
                (await howTo.content()).node,
                howTo.tocMinLevel || 2,
                howTo.tocMaxLevel || 3
              )}
            />
          )}
          <MarkdocRenderer content={await howTo.content()} />
        </article>
      </PrintPreview>
    </main>
  );
}
