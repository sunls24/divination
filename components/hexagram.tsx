import React from "react";
import clsx from "clsx";

export interface HexagramObj {
  change: boolean | null;
  yang: boolean;
  separate: boolean;
}

function Hexagram(props: { list: HexagramObj[] }) {
  return (
    <div className="flex h-52 w-56 flex-col-reverse gap-1.5 overflow-hidden rounded-md border bg-stone-100 py-3 shadow-inner sm:h-60 sm:w-72">
      {props.list.map((value, index) => {
        return (
          <div key={index} className="flex flex-col-reverse gap-1.5">
            {value.separate && <div className="h-0.5 sm:h-1" />}
            <Line change={value.change} yang={value.yang} />
          </div>
        );
      })}
    </div>
  );
}

function Line(props: { change: boolean | null; yang: boolean }) {
  let changeYang = props.change && props.yang;
  const color = props.change ? "bg-red-400" : "bg-stone-400";
  return (
    <div className="flex h-[24px] w-full animate-[transform-x_0.3s_ease-out] items-center justify-center sm:h-[29px]">
      {props.yang ? (
        <div className={clsx("h-full w-4/5 sm:w-[83%]", color)}></div>
      ) : (
        <div className="flex h-full w-4/5 justify-between sm:w-[83%]">
          <div className={clsx("h-full w-[46%]", color)}></div>
          <div className={clsx("h-full w-[46%]", color)}></div>
        </div>
      )}
      {props.change ? <Change changeYang={changeYang} /> : null}
    </div>
  );
}

function Change(props: { changeYang: boolean | null }) {
  return (
    <div className="h-0 w-0">
      <div className="relative -right-1 -top-3">
        {props.changeYang ? (
          <span className="text-sm text-stone-500">○</span>
        ) : (
          <span className="relative -right-0.5 text-sm text-stone-500">✕</span>
        )}
      </div>
    </div>
  );
}

export default Hexagram;
