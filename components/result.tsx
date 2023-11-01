import React from "react";
import { Link } from "lucide-react";

export interface ResultObj {
  guaMark: string;
  guaResult: string;
  guaChange: string;
}

function Result(props: ResultObj) {
  return (
    <div className="flex flex-col items-center">
      <a
        className="flex items-center gap-1 font-medium text-primary/80 underline underline-offset-4 transition-colors hover:text-primary/100"
        href={`https://yijing.sunls.live/${props.guaMark}/`}
        target="_blank"
      >
        <Link size={18} />
        {props.guaResult}
      </a>
      <span className="text-sm italic text-muted-foreground">
        {props.guaChange}
      </span>
    </div>
  );
}

export default Result;
