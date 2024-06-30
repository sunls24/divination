import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { RotateCw } from "lucide-react";

function ResultAI({
  completion,
  isLoading,
  onCompletion,
  error,
}: {
  completion: string;
  isLoading: boolean;
  onCompletion: () => void;
  error: string;
}) {
  const scrollRef = useRef<HTMLElement>(null);
  const [autoScroll, setAutoScroll] = useState(false);

  useEffect(() => {
    setAutoScroll(isLoading);
  }, [isLoading]);

  useEffect(() => {
    if (!autoScroll) {
      return;
    }
    scrollTo();
  });

  function scrollTo() {
    requestAnimationFrame(() => {
      if (
        !scrollRef.current ||
        scrollRef.current.scrollHeight ===
          scrollRef.current.clientHeight + scrollRef.current.scrollTop
      ) {
        return;
      }
      scrollRef.current.scrollTo(0, scrollRef.current.scrollHeight);
    });
  }

  function onScroll(e: HTMLElement) {
    if (!isLoading) {
      return;
    }
    const hitBottom = e.scrollTop + e.clientHeight >= e.scrollHeight - 15;
    if (hitBottom === autoScroll) {
      return;
    }
    setAutoScroll(hitBottom);
  }

  return (
    <div className="h-0 w-full flex-1 sm:max-w-md md:max-w-2xl">
      {isLoading && (
        <div className="h-0">
          <div className="relative -top-8 flex w-fit items-center text-muted-foreground sm:left-2">
            <RotateCw size={16} className="animate-spin" />
            <span className="ml-1 text-sm">AI 分析中...</span>
          </div>
        </div>
      )}
      <article
        ref={scrollRef}
        onScroll={(e) => onScroll(e.currentTarget)}
        className="max-h-full overflow-auto whitespace-break-spaces rounded-md border p-3 shadow dark:border-0 dark:bg-secondary/90 dark:shadow-none sm:p-5"
      >
        {error ? (
          <span className="text-destructive">
            ಠ_ಠ 请求出错了！
            <br />
            {error}
          </span>
        ) : (
          completion
        )}
        <br />
        {!isLoading && (
          <Button onClick={onCompletion} size="sm" className="mt-2">
            <RotateCw size={18} className="mr-1" />
            重新生成
          </Button>
        )}
      </article>
    </div>
  );
}

export default ResultAI;
