import OpenAI from "openai";
import { ApiKeyPool } from "@/lib/pool";

const apiKeyPool = new ApiKeyPool().update(process.env.OPENAI_API_KEY ?? "");

export async function getOpenAI(key?: string): Promise<OpenAI> {
  return new OpenAI({ apiKey: await apiKeyPool.getNextEdge(key) });
}
