import { codeToHtml } from "shiki";
import { CodeBlock } from "../CodeBlock";

interface FenceProps {
  content: string;
  language?: string;
}

export async function Fence({ content, language = "text" }: FenceProps) {
  const html = await codeToHtml(content, {
    lang: language,
    theme: "synthwave-84", // SynthWave '84 theme with vibrant neon colors
  });

  return <CodeBlock html={html} code={content} language={language} />;
}
