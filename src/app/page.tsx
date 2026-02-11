import Link from "next/link";

export default function Home() {
  return (
    <main className="p-8">
      <h1 className="text-4xl font-bold">Welcome to SFB Kosmos</h1>
      <p className="mt-4">
        <Link href="/keystatic" className="text-blue-500 hover:underline">
          Go to CMS (Keystatic)
        </Link>
      </p>
    </main>
  );
}
