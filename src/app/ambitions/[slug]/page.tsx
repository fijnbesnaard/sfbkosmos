import { notFound } from "next/navigation";
import { reader } from "@/lib/keystatic-reader";
import { MarkdocRenderer } from "@/components/MarkdocRenderer";

interface AmbitionPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const items = await reader.collections.ambitions.all();
  return items.map((item) => ({ slug: item.slug }));
}

export default async function AmbitionPage({ params }: AmbitionPageProps) {
  const { slug } = await params;
  const item = await reader.collections.ambitions.read(slug);

  if (!item) notFound();

  return (
    <main className="max-w-4xl mx-auto p-8">
      <header className="mb-12 border-b border-dark/10 dark:border-light/10 pb-8">
        <h1 className="text-4xl font-heading font-bold uppercase text-dark dark:text-light mb-3">
          {item.title}
        </h1>
        {item.status && (
          <p className="text-sm text-dark/50 dark:text-light/50 mb-3 capitalize">
            Status: {item.status}
          </p>
        )}
        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {item.tags.map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-dark/5 dark:bg-light/5 text-dark/70 dark:text-light/70 text-sm rounded-lg"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>
      <article className="prose dark:prose-invert lg:prose-xl">
        <MarkdocRenderer content={await item.content()} />
      </article>
    </main>
  );
}
