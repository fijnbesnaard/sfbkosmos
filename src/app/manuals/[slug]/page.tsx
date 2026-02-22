import { notFound } from "next/navigation";
import { reader } from "@/lib/keystatic-reader";
import { MarkdocRenderer } from "@/components/MarkdocRenderer";
import PrintPreview from "@/components/PrintPreview";
import { TableOfContents } from "@/components/TableOfContents";
import { extractHeadings } from "@/utils/toc";
import { CoverPage } from "@/components/CoverPage";

interface ManualPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const manuals = await reader.collections.manuals.all();
  return manuals.map((manual) => ({
    slug: manual.slug,
  }));
}

export default async function ManualPage({ params }: ManualPageProps) {
  const { slug } = await params;
  const manual = await reader.collections.manuals.read(slug);

  if (!manual) {
    notFound();
  }

  return (
    <main className="max-w-4xl mx-auto p-8">
      <PrintPreview title={manual.coverTitle || manual.title}>

        {/* Cover Page Injection */}
        {manual.enableCoverPage && (
          <CoverPage
            title={manual.title}
            coverTitle={manual.coverTitle}
            coverDate={manual.coverDate}
            coverPlace={manual.coverPlace}
            coverName={manual.coverName}
            coverEmail={manual.coverEmail}
            coverPhone={manual.coverPhone}
          >
            {/* TOC rendered as a child of CoverPage */}
            {manual.showToc && (
              <div className="print:-mt-8">
                <TableOfContents
                  headings={extractHeadings(
                    (await manual.content()).node,
                    manual.tocMinLevel || 2,
                    manual.tocMaxLevel || 3
                  )}
                  language={manual.language as "nl" | "en"}
                />
              </div>
            )}
          </CoverPage>
        )}

        {/* Standard Article Header (Hidden if Cover is active) */}
        {!manual.enableCoverPage && (
          <header className="mb-12 border-b pb-8">
            <h1 className="text-4xl font-bold mb-4">{manual.title}</h1>
            {manual.client && (
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
                Client: {manual.client}
              </p>
            )}
            {manual.tags && manual.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {manual.tags.map((tag, index) => (
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
          {!manual.enableCoverPage && manual.showToc && (
            <TableOfContents
              headings={extractHeadings(
                (await manual.content()).node,
                manual.tocMinLevel || 2,
                manual.tocMaxLevel || 3
              )}
              language={manual.language as "nl" | "en"}
            />
          )}
          <MarkdocRenderer content={await manual.content()} />
        </article>
      </PrintPreview>
    </main>
  );
}
