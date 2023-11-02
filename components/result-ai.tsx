import React, { useEffect, useRef } from "react";
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
  error: Error | undefined;
}) {
  const resultRef = useRef<any>(null);

  useEffect(() => {
    resultRef.current.scrollTop = resultRef.current.scrollHeight;
  }, [completion, isLoading]);

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
        ref={resultRef}
        className="max-h-full overflow-auto whitespace-break-spaces rounded-md border p-3 shadow dark:border-0 dark:bg-secondary/90 dark:shadow-none sm:p-5"
      >
        {error ? (
          <span className="text-destructive">
            ಠ_ಠ 请求出错了！
            <br />
            {error.message}
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
