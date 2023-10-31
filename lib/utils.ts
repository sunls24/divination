import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getLocaleTime(): string {
  return fmtLocaleTime(new Date());
}

export function fmtLocaleTime(time: Date): string {
  return time.toLocaleString("zh-CN", {
    timeZone: "Asia/Shanghai",
    hourCycle: "h23",
  });
}
