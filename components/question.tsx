import React, { createRef } from "react";
import clsx from "clsx";
import todayJson from "@/lib/data/today.json";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

const todayData: string[] = todayJson;

function Question(props: { question: string; setQuestion: any }) {
  const inputRef = createRef<HTMLTextAreaElement>();

  function startClick() {
    const value = inputRef.current?.value;
    if (value === "") {
      return;
    }
    props.setQuestion(value);
  }

  function todayClick(index: number) {
    props.setQuestion(todayData[index]);
  }

  return (
    <div
      className={clsx(
        "ignore-animate flex w-full max-w-md flex-col gap-4",
        props.question || "pt-6",
      )}
    >
      {props.question === "" ? (
        <>
          <label>您想算点什么？</label>
          <Textarea
            ref={inputRef}
            placeholder="将使用 AI 为您解读"
            className="resize-none"
            rows={4}
          />
          <div className="flex flex-row-reverse">
            <Button size="sm" onClick={startClick}>
              开始
            </Button>
          </div>

          <label className="mt-16 underline underline-offset-4">
            🧐 让我猜猜您算什么东西？
          </label>
          <div className="flex flex-wrap gap-3">
            {todayData.map(function (value, index) {
              return (
                <span
                  key={index}
                  onClick={() => {
                    todayClick(index);
                  }}
                  className="rounded-md bg-secondary border p-2 text-sm text-muted-foreground shadow transition hover:scale-[1.03]"
                >
                  {value}
                </span>
              );
            })}
          </div>
        </>
      ) : null}

      {props.question && (
        <div className="flex truncate rounded-md border bg-secondary p-2 shadow">
          <Image
            width={24}
            height={24}
            className="mr-2"
            src="/img/yin-yang.png"
            alt="yinyang"
          />
          {props.question}
        </div>
      )}
    </div>
  );
}

export default Question;
