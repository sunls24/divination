import { get } from "@vercel/edge-config";

const SEPARATOR = ",";

export class ApiKeyPool {
  private keys = "";
  private keyList: string[] = [];
  private currentIndex: number = 0;

  public getNext(): string {
    if (this.keyList.length === 0) {
      return this.keys;
    }
    const key = this.keyList[this.currentIndex];
    this.currentIndex = (this.currentIndex + 1) % this.keyList.length;
    return key;
  }

  public async getNextEdge(custom?: string): Promise<string> {
    if (custom) {
      return custom;
    }
    await this.updateEdge();
    return this.getNext();
  }

  public update(keys: string): ApiKeyPool {
    if (keys === this.keys) {
      return this;
    }
    this.keys = keys;
    this.keyList = keys.split(SEPARATOR);
    this.currentIndex = Math.min(this.currentIndex, this.keyList.length - 1);
    return this;
  }

  private async updateEdge() {
    if (!process.env.EDGE_CONFIG) {
      return;
    }
    const keysEdge = await get("OPENAI_API_KEY");
    if (keysEdge) {
      this.update(keysEdge as string);
    }
  }
}

export const apiKeyPool = new ApiKeyPool();
