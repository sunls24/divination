import { OpenAI } from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { NextResponse } from "next/server";
import { kv } from "@vercel/kv";
import { History, KV_DATA } from "@/lib/constant";
import { getLocaleTime } from "@/lib/utils";
import { apiKeyPool } from "@/lib/pool";

export const runtime = "edge";

apiKeyPool.update(process.env.OPENAI_API_KEY ?? "");
const openai = new OpenAI({ apiKey: "" });

export async function POST(req: Request) {
  try {
    let { prompt } = await req.json();
    const splitList = prompt.split("+");
    if (splitList.length <= 3) {
      return NextResponse.json("prompt error", { status: 400 });
    }
    prompt = splitList.slice(3).join("+");

    const guaMark = splitList[0];
    const guaName = splitList[1];
    const guaChange = splitList[2];

    if (process.env.KV_REST_API_URL) {
      kv.lpush<History>(KV_DATA, {
        prompt: prompt,
        gua: guaMark,
        change: guaChange,
        date: getLocaleTime(),
      });
    }

    const res = await fetch(
      `https://raw.githubusercontent.com/sunls23/yijing64/d69ba05f1b7318402c044f28fb354afef79e9f1a/docs/other/${guaMark}/index.md`,
    );
    const guaDetail = await res.text();

    openai.apiKey = await apiKeyPool.getNextEdge();
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-16k",
      stream: true,
      temperature: 0.5,
      messages: [
        { role: "system", content: "你是精通周易64卦, 擅长解读卦象的AI助手" },
        {
          role: "user",
          content: `我想要算的事情是:\`${prompt}\`\n请帮我解读此卦象:\`${guaName}\`\n${guaChange}`,
        },
        {
          role: "system",
          content: `此卦象的详细解释:\n\`\`\`\n${guaDetail}\n\`\`\``,
        },
        {
          role: "system",
          content:
            "1.首先对卦象整体情况进行解读\n2.再重点结合要算的事情和变爻情况进行详细解读",
        },
      ],
    });
    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
  } catch (err) {
    if (err instanceof OpenAI.APIError) {
      return new NextResponse(err.message, { status: err.status });
    } else {
      return new NextResponse(String(err), { status: 500 });
    }
  }
}
