import { NextResponse } from "next/server";
import { buildSearchIndex } from "@/lib/search-index";

export async function GET() {
  const items = await buildSearchIndex();
  return NextResponse.json(items);
}
