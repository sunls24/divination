import React from "react";

export interface ResultObj {
  guaMark: string;
  guaResult: string;
  guaChange: string;
}

function Result(props: ResultObj) {
  return (
    <div className="flex flex-col items-start justify-center gap-2 sm:gap-3">
      {props.guaResult.split("_")[0]}
      <a
        className="group flex items-center gap-1 font-medium text-primary/80 underline underline-offset-4 transition-colors hover:text-primary/100"
        href={`https://zhouyi.sunls.de/${props.guaMark}/`}
        target="_blank"
      >
        <div className="mt-1 h-[90%] w-1.5 rounded bg-blue-400/80 transition-colors group-hover:bg-blue-400/100" />
        <span>{props.guaResult.split("_").slice(1).join("_")}</span>
      </a>
      <span className="text-sm italic text-muted-foreground">
        {props.guaChange}
      </span>
    </div>
  );
}

export default Result;
