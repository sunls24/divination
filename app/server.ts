"use server";
import { streamText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { createStreamableValue } from "ai/rsc";

const model = process.env.OPENAI_MODEL ?? "gpt-3.5-turbo";
const openai = createOpenAI({ baseURL: process.env.OPENAI_BASE_URL });

export async function getAnswer(
  prompt: string,
  guaMark: string,
  guaName: string,
  guaChange: string,
) {
  const stream = createStreamableValue();
  try {
    const res = await fetch(
      `https://raw.githubusercontent.com/sunls2/zhouyi/main/docs/${guaMark}/index.md`,
    );
    const guaDetail = await res.text();

    const { textStream } = await streamText({
      temperature: 0.5,
      model: openai(model),
      messages: [
        {
          role: "system",
          content:
            "你是精通易经64卦, 擅长解读卦象的AI助手\n1.首先对卦象整体情况进行解读\n2.再重点结合要算的事情和变爻情况进行详细分析",
        },
        {
          role: "user",
          content: `我想要算的事情是:\`${prompt}\`\n请帮我解读此卦象:\`${guaName}\`\n${guaChange}`,
        },
        {
          role: "user",
          content: `此卦象的详细解释:\n\`\`\`\n${guaDetail}\n\`\`\``,
        },
      ],
    });
    (async () => {
      for await (const text of textStream) {
        stream.update(text);
      }
    })()
      .catch(console.error)
      .finally(stream.done);

    return { data: stream.value };
  } catch (err: any) {
    stream.done();
    return { error: err.message ?? err };
  }
}
