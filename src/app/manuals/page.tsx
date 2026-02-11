import Link from "next/link";
import { reader } from "@/lib/keystatic-reader";

export default async function ManualsPage() {
  const manuals = await reader.collections.manuals.all();

  return (
    <main className="max-w-4xl mx-auto p-8">
      <header className="mb-12 border-b pb-8">
        <h1 className="text-4xl font-bold mb-4">Manuals</h1>
        <p className="text-lg text-gray-600">
          Comprehensive documentation and reference guides
        </p>
      </header>

      <div className="space-y-6">
        {manuals.length === 0 ? (
          <p className="text-gray-500">No manuals available yet.</p>
        ) : (
          manuals.map((manual) => (
            <article
              key={manual.slug}
              className="border rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <Link href={`/manuals/${manual.slug}`}>
                <h2 className="text-2xl font-bold mb-2 hover:text-blue-600 transition-colors">
                  {manual.entry.title}
                </h2>
              </Link>
              {manual.entry.client && (
                <p className="text-sm text-gray-500 mb-2">
                  Client: {manual.entry.client}
                </p>
              )}
              {manual.entry.tags && manual.entry.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {manual.entry.tags.map((tag, index) => (
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
