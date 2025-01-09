"use server";
import { streamText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { createStreamableValue } from "ai/rsc";
import { ERROR_PREFIX } from "@/lib/constant";

const model = process.env.OPENAI_MODEL ?? "gpt-3.5-turbo";
const openai = createOpenAI({ baseURL: process.env.OPENAI_BASE_URL });

const STREAM_INTERVAL = 60;
const MAX_SIZE = 6;

export async function getAnswer(
  prompt: string,
  guaMark: string,
  guaName: string,
  guaChange: string,
) {
  console.log(prompt, guaName, guaChange);
  const stream = createStreamableValue();
  try {
    // const res = await fetch(
    //   `https://raw.githubusercontent.com/sunls2/zhouyi/main/docs/${guaMark}/index.md`,
    // );
    // const guaDetail = await res.text();

    const { fullStream } = streamText({
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
        // {
        //   role: "user",
        //   content: `此卦象的详细解释:\n\`\`\`\n${guaDetail}\n\`\`\``,
        // },
      ],
      maxRetries: 0,
    });

    let buffer = "";
    let done = false;
    const intervalId = setInterval(() => {
      if (done && buffer.length === 0) {
        clearInterval(intervalId);
        stream.done();
        return;
      }
      if (buffer.length <= MAX_SIZE) {
        stream.update(buffer);
        buffer = "";
      } else {
        const chunk = buffer.slice(0, MAX_SIZE);
        buffer = buffer.slice(MAX_SIZE);
        stream.update(chunk);
      }
    }, STREAM_INTERVAL);

    (async () => {
      for await (const part of fullStream) {
        switch (part.type) {
          case "text-delta":
            buffer += part.textDelta;
            break;
          case "error":
            const err = part.error as any;
            stream.update(ERROR_PREFIX + (err.message ?? err.toString()));
            break;
        }
      }
    })()
      .catch(console.error)
      .finally(() => {
        done = true;
      });

    return { data: stream.value };
  } catch (err: any) {
    stream.done();
    return { error: err.message ?? err };
  }
}
