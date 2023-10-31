import React from "react";

export const ChatGPT = React.memo(function ChatGPT({
  className = "w-6 h-6",
  strokeWidth = 3,
}: {
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      >
        <path d="M18.38 27.94v-14.4l11.19-6.46c6.2-3.58 17.3 5.25 12.64 13.33"></path>
        <path d="m18.38 20.94l12.47-7.2l11.19 6.46c6.2 3.58 4.1 17.61-5.23 17.61"></path>
        <path d="m24.44 17.44l12.47 7.2v12.93c0 7.16-13.2 12.36-17.86 4.28"></path>
        <path d="M30.5 21.2v14.14L19.31 41.8c-6.2 3.58-17.3-5.25-12.64-13.33"></path>
        <path d="m30.5 27.94l-12.47 7.2l-11.19-6.46c-6.21-3.59-4.11-17.61 5.22-17.61"></path>
        <path d="m24.44 31.44l-12.47-7.2V11.31c0-7.16 13.2-12.36 17.86-4.28"></path>
      </g>
    </svg>
  );
});
