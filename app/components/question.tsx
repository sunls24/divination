import React, { createRef } from "react";
import clsx from "clsx";
import Button from "@/app/components/button";
import todayJson from "../data/today.json";

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
        "ignore-animate mx-auto flex w-full max-w-md flex-col gap-3",
        props.question || "pt-6",
      )}
    >
      {props.question === "" ? (
        <>
          <label className="text-stone-600">您想算点什么？</label>
          <textarea
            ref={inputRef}
            placeholder="将使用 AI 为您解读"
            className={clsx(
              "block w-full rounded-md border bg-stone-50 p-2 text-sm shadow",
              "focus:border-stone-600 focus:outline-none focus:ring-1 focus:ring-stone-500",
              "placeholder-stone-500 placeholder:italic",
              "h-24 resize-none",
              "text-stone-600",
            )}
          />
          <div className="flex flex-row-reverse">
            <Button onClick={startClick} value="开始" />
          </div>

          <label className="mt-16 text-stone-600 underline underline-offset-4">
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
                  className="h-fit w-fit flex-none rounded-md border bg-stone-100 p-2 text-sm text-stone-500 shadow transition hover:scale-105"
                >
                  {value}
                </span>
              );
            })}
          </div>
        </>
      ) : null}

      {props.question && (
        <div className="flex truncate rounded-md border bg-stone-100 p-2 text-stone-600 shadow">
          <img className="mr-2 h-6" src="img/yin-yang.png" alt="yinyang" />
          {props.question}
        </div>
      )}
    </div>
  );
}

export default Question;
