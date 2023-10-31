import React, { useEffect, useState } from "react";
import clsx from "clsx";

const rotationDuration = 5000;
const bezier = "cubic-bezier(0.645,0.045,0.355,1)";

function Coin(props: {
  frontList: boolean[];
  rotation: boolean;
  onTransitionEnd: any;
}) {
  const [lastFront, setLastFront] = useState(props.frontList);

  useEffect(function () {
    console.debug("Coin.useEffect, rotation:", props.rotation);
    if (!props.rotation) {
      return;
    }

    console.debug("Coin.useEffect.timeout.start", rotationDuration);
    let id = setTimeout(function () {
      console.debug("Coin.useEffect.timeout.end");
      setLastFront(props.frontList);
      props.onTransitionEnd();
    }, rotationDuration);
    return () => clearTimeout(id);
  });

  return (
    <div className="flex w-full max-w-md justify-around rounded-md border bg-stone-100 p-4 shadow sm:p-6">
      {props.frontList.map((value, index) => (
        <CoinItem
          key={index}
          front={value}
          lastFront={lastFront[index]}
          rotation={props.rotation}
        />
      ))}
    </div>
  );
}

function CoinItem(props: {
  front: boolean;
  lastFront: boolean;
  rotation: boolean;
  onTransitionEnd?: any;
}) {
  let animate = "";
  if (props.rotation) {
    // animate-[coin-front-front_5s_cubic-bezier(0.645,0.045,0.355,1)]
    // animate-[coin-front-back_5s_cubic-bezier(0.645,0.045,0.355,1)]
    // animate-[coin-back-front_5s_cubic-bezier(0.645,0.045,0.355,1)]
    // animate-[coin-back-back_5s_cubic-bezier(0.645,0.045,0.355,1)]
    animate = `animate-[coin-${getFront(props.lastFront)}-${getFront(
      props.front,
    )}_${rotationDuration / 1000}s_${bezier}]`;
  }
  return (
    <div
      style={{
        transform: `rotateY(${props.front ? 0 : 180}deg)`,
        transformStyle: "preserve-3d",
        transformOrigin: "50% 50% -0.5px",
      }}
      className={clsx("h-16 w-16 sm:h-20 sm:w-20", animate)}
    >
      <img
        draggable={false}
        className="absolute h-16 sm:h-20"
        src="img/head.png"
        alt="coin"
      />
      <img
        draggable={false}
        className="absolute h-16 sm:h-20"
        style={{ transform: "translateZ(-1px)" }}
        src="img/tail.png"
        alt="coin"
      />
    </div>
  );
}

function getFront(front: boolean): string {
  return front ? "front" : "back";
}

export default Coin;
