import Link from "next/link";
import { reader } from "@/lib/keystatic-reader";

export default async function HowTosPage() {
  const howTos = await reader.collections.how_tos.all();

  return (
    <main className="max-w-4xl mx-auto p-8">
      <header className="mb-12 border-b pb-8">
        <h1 className="text-4xl font-bold mb-4">How To&apos;s</h1>
        <p className="text-lg text-gray-600">
          Step-by-step guides and tutorials
        </p>
      </header>

      <div className="space-y-6">
        {howTos.length === 0 ? (
          <p className="text-gray-500">No how-to guides available yet.</p>
        ) : (
          howTos.map((howTo) => (
            <article
              key={howTo.slug}
              className="border rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <Link href={`/how-tos/${howTo.slug}`}>
                <h2 className="text-2xl font-bold mb-2 hover:text-blue-600 transition-colors">
                  {howTo.entry.title}
                </h2>
              </Link>
              {howTo.entry.category && (
                <p className="text-sm text-gray-500 mb-2">
                  Category: {howTo.entry.category}
                </p>
              )}
              {howTo.entry.tags && howTo.entry.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {howTo.entry.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </article>
          ))
        )}
      </div>
    </main>
  );
}
