import { makeRouteHandler } from "@keystatic/next/route-handler";
import config from "../../../../../keystatic.config";

export const dynamic = "force-static";

/**
 * Note: In GitHub mode with `output: 'export'`, this route handler
 * won't function at runtime on a static host.
 * Keystatic will require a GitHub App to handle authentication on the live site.
 */
export function generateStaticParams() {
  return [{ params: [] }];
}

export const { GET, POST } = makeRouteHandler({
  config,
});
