export function getCNDate(): string {
  return new Date().toLocaleString("zh-CN", { timeZone: "Asia/Shanghai" });
}
