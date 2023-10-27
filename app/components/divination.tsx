"use client";
import React, { useEffect, useRef, useState } from "react";
import Coin from "@/app/components/coin";
import Button, { emeraldColor, redColor } from "@/app/components/button";
import Hexagram from "@/app/components/hexagram";
import { HexagramObj } from "@/app/components/hexagram";
import { bool } from "aimless.js";
import Result, { ResultObj } from "@/app/components/result";
import Question from "@/app/components/question";
import ResultAI from "@/app/components/result-ai";
import { animateChildren } from "@/app/utils/animate";

function Divination(props: { guaIndexData: any; guaListData: any }) {
  const [frontList, setFrontList] = useState([true, true, true]);
  const [rotation, setRotation] = useState(false);

  const [hexagramList, setHexagramList] = useState<HexagramObj[]>([]);

  const [resultObj, setResultObj] = useState<ResultObj | null>(null);
  const [question, setQuestion] = useState("");

  const [resultAi, setResultAi] = useState(false);

  const flexRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!flexRef.current) {
      return;
    }
    const observer = animateChildren(flexRef.current);
    return observer.disconnect;
  }, []);

  function onTransitionEnd() {
    console.debug("Divination.onTransitionEnd");
    setRotation(false);
    let frontCount = frontList.reduce((acc, val) => (val ? acc + 1 : acc), 0);
    setHexagramList((list) => {
      const newList = [
        ...list,
        {
          change: frontCount == 0 || frontCount == 3 || null,
          yang: frontCount >= 2,
          separate: list.length == 3,
        },
      ];
      setResult(newList);
      return newList;
    });
  }

  function startClick() {
    if (rotation) {
      return;
    }
    console.debug("Divination.startClick");
    if (hexagramList.length >= 6) {
      setHexagramList([]);
    }
    setFrontList([bool(), bool(), bool()]);
    setRotation(true);
  }

  function restartClick() {
    setResultObj(null);
    setHexagramList([]);
    setQuestion("");
    setResultAi(false);
  }

  function aiClick() {
    setResultAi(true);
  }

  function setResult(list: HexagramObj[]) {
    if (list.length != 6) {
      return;
    }
    const guaDict1 = ["坤", "震", "坎", "兑", "艮", "离", "巽", "乾"];
    const guaDict2 = ["地", "雷", "水", "泽", "山", "火", "风", "天"];

    const changeYang = ["初九", "九二", "九三", "九四", "九五", "上九"];
    const changeYin = ["初六", "六二", "六三", "六四", "六五", "上六"];

    const changeList: String[] = [];
    list.forEach((value, index) => {
      if (!value.change) {
        return;
      }
      changeList.push(value.yang ? changeYang[index] : changeYin[index]);
    });

    // 卦的结果： 第X卦 X卦 XX卦 X上X下
    // 计算卦的索引，111对应乾卦，000对应坤卦，索引转为10进制。
    const upIndex =
      (list[5].yang ? 4 : 0) + (list[4].yang ? 2 : 0) + (list[3].yang ? 1 : 0);
    const downIndex =
      (list[2].yang ? 4 : 0) + (list[1].yang ? 2 : 0) + (list[0].yang ? 1 : 0);

    const guaIndex = props.guaIndexData[upIndex][downIndex] - 1;
    const guaName1 = props.guaListData[guaIndex];

    let guaName2;
    if (upIndex === downIndex) {
      // 上下卦相同，格式为X为X
      guaName2 = guaDict1[upIndex] + "为" + guaDict2[upIndex];
    } else {
      guaName2 = guaDict2[upIndex] + guaDict2[downIndex] + guaName1;
    }

    const guaDesc = guaDict1[upIndex] + "上" + guaDict1[downIndex] + "下";

    setResultObj({
      // 26.山天大畜
      guaMark: `${(guaIndex + 1).toString().padStart(2, "0")}.${guaName2}`,
      // 周易第26卦_大畜卦(山天大畜)_艮上乾下
      guaResult: `周易第${
        guaIndex + 1
      }卦_${guaName1}卦(${guaName2}_${guaDesc})`,
      guaChange:
        changeList.length === 0 ? "无变爻" : `变爻：${changeList.toString()}`,
    });
  }

  const showResult = resultObj !== null;
  const inputQuestion = question === "";
  return (
    <div
      ref={flexRef}
      className="mx-auto flex w-[90%] flex-col flex-nowrap items-center gap-5 sm:gap-8"
    >
      <Question question={question} setQuestion={setQuestion} />

      {!resultAi && !inputQuestion && (
        <Coin
          onTransitionEnd={onTransitionEnd}
          frontList={frontList}
          rotation={rotation}
        />
      )}

      {!inputQuestion && !showResult && (
        <div>
          <Button value={"卜筮"} onClick={startClick} disable={rotation} />
          <span className="absolute pl-1 pt-2 italic text-stone-500">{`(${hexagramList.length}/6)`}</span>
        </div>
      )}

      {!inputQuestion && hexagramList.length != 0 && (
        <Hexagram list={hexagramList} />
      )}

      {showResult && (
        <>
          <Result {...resultObj} />
          <div className="flex gap-4">
            <Button
              value="↻ 重来"
              onClick={restartClick}
              disable={rotation}
              buttonColor={redColor}
            />
            {resultAi ? null : (
              <Button
                value="🤖 AI 解读"
                onClick={aiClick}
                disable={rotation}
                buttonColor={emeraldColor}
              />
            )}
          </div>
        </>
      )}

      {resultAi && (
        <ResultAI
          question={question}
          gua={`${resultObj!.guaMark}+${resultObj!.guaResult}+${
            resultObj!.guaChange
          }`}
        />
      )}
    </div>
  );
}

export default Divination;
