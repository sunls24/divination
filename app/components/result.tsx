import React from "react";

export interface ResultObj {
  guaMark: string;
  guaResult: string;
  guaChange: string;
}

function Result(props: ResultObj) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="relative right-1 top-0.5 h-5 w-5 text-sky-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
          />
        </svg>
        <a
          className="font-medium text-sky-500 transition hover:text-sky-600 hover:underline hover:underline-offset-4"
          href={`https://yijing.sunls.live/${props.guaMark}/`}
          target="_blank"
        >
          {props.guaResult}
        </a>
      </div>
      <span className="text-sm italic text-stone-500">{props.guaChange}</span>
    </div>
  );
}

export default Result;
