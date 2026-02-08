import { makePage } from "@keystatic/next/ui/app";
import config from "../../../../keystatic.config";

export const dynamic = "force-static";
export function generateStaticParams() {
  return [{ conf: [] }];
}

export default makePage(config);
