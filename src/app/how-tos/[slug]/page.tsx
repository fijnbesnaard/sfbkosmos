import { notFound } from "next/navigation";
import { reader } from "@/lib/keystatic-reader";
import { MarkdocRenderer } from "@/components/MarkdocRenderer";

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
      <header className="mb-12 border-b pb-8">
        <h1 className="text-4xl font-bold mb-4">{howTo.title}</h1>
        {howTo.category && (
          <p className="text-lg text-gray-600 mb-2">
            Category: {howTo.category}
          </p>
        )}
        {howTo.tags && howTo.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {howTo.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      <article>
        <MarkdocRenderer content={await howTo.content()} />
      </article>
    </main>
  );
}
