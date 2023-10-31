import React from "react";
import clsx from "clsx";

export const emeraldColor: ButtonColor = {
  bg: "bg-emerald-500",
  hover: "bg-emerald-600", // hover:bg-emerald -600
  ring: "ring-emerald-300",
};

export const redColor: ButtonColor = {
  bg: "bg-red-500",
  hover: "bg-red-600", // hover:bg-amber-600
  ring: "ring-red-300",
};

export const skyColor: ButtonColor = {
  bg: "bg-sky-500",
  hover: "bg-sky-600", // hover:bg-sky-600
  ring: "ring-sky-300",
};

interface ButtonColor {
  bg: string;
  hover: string;
  ring: string;
}

const stoneColor: ButtonColor = {
  bg: "bg-stone-500",
  hover: "bg-stone-600", // hover:bg-stone-600
  ring: "ring-stone-400",
};

interface ButtonProps {
  onClick: any;
  value: string;
  disable?: boolean;
  buttonColor?: ButtonColor;
  className?: string;
}

function Button({
  onClick,
  value,
  className,
  disable = false,
  buttonColor = stoneColor,
}: ButtonProps) {
  return (
    <button
      className={clsx(
        buttonColor.bg,
        buttonColor.ring,
        `hover:${buttonColor.hover}`,
        "rounded-md px-3 py-1 text-white shadow-md transition",
        "disabled:opacity-65 disabled:cursor-progress",
        "enabled:hover:-translate-y-0.5 enabled:hover:shadow-lg",
        "enabled:active:scale-95",
        "enabled:focus:ring",
        className,
      )}
      onClick={onClick}
      disabled={disable}
    >
      {value}
    </button>
  );
}

export default Button;
