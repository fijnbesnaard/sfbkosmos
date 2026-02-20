import Link from "next/link";
import { reader } from "@/lib/keystatic-reader";

export default async function QuotesPage() {
  const quotes = await reader.collections.quotes.all();

  return (
    <main className="max-w-4xl mx-auto p-8">
      <header className="mb-12 border-b pb-8">
        <h1 className="text-4xl font-bold mb-4">Quotes</h1>
        <p className="text-lg text-gray-600">
          Inspirational quotes and client feedback
        </p>
      </header>

      <div className="space-y-6">
        {quotes.length === 0 ? (
          <p className="text-gray-500">No quotes available yet.</p>
        ) : (
          quotes.map((item) => (
            <article
              key={item.slug}
              className="border rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <Link href={`/quotes/${item.slug}`}>
                <h2 className="text-2xl font-bold mb-2 hover:text-blue-600 transition-colors">
                  {item.entry.title}
                </h2>
              </Link>
              {item.entry.amount && (
                <p className="text-sm text-gray-500 mb-2">
                  Amount: {item.entry.amount}
                </p>
              )}
              {item.entry.tags && item.entry.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {item.entry.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs rounded"
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
