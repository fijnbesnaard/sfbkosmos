import { makeRouteHandler } from "@keystatic/next/route-handler";
import config from "../../../../../keystatic.config";

export const dynamic = "force-static";

export function generateStaticParams() {
  return [{ params: [] }];
}

export const { GET, POST } = makeRouteHandler({
  config,
});
