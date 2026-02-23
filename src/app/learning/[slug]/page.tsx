import { notFound } from "next/navigation";
import { reader } from "@/lib/keystatic-reader";
import { MarkdocRenderer } from "@/components/MarkdocRenderer";

interface LearningPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const items = await reader.collections.learning.all();
  return items.map((item) => ({ slug: item.slug }));
}

export default async function LearningPage({ params }: LearningPageProps) {
  const { slug } = await params;
  const item = await reader.collections.learning.read(slug);

  if (!item) notFound();

  return (
    <main className="max-w-4xl mx-auto p-8">
      <header className="mb-12 border-b border-dark/10 dark:border-light/10 pb-8">
        <h1 className="text-4xl font-heading font-bold uppercase text-dark dark:text-light mb-3">
          {item.title}
        </h1>
        {item.department && (
          <p className="text-sm text-dark/50 dark:text-light/50 mb-4">
            Department: {item.department}
          </p>
        )}
        {item.progress != null && (
          <div className="mb-4 max-w-sm">
            <div className="flex justify-between text-xs text-dark/50 dark:text-light/50 mb-1.5">
              <span>Progress</span>
              <span>{item.progress}%</span>
            </div>
            <div className="h-1.5 bg-dark/10 dark:bg-light/10 rounded-full">
              <div
                className="h-full bg-blue rounded-full transition-all"
                style={{ width: `${item.progress}%` }}
              />
            </div>
          </div>
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
