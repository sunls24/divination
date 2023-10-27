import React from "react";
import clsx from "clsx";
import { kv } from "@vercel/kv";
import { history, KV_DATA } from "@/app/utils/constant";

const tdStyle = "border py-2 px-3 sm:px-4 text-stone-600";

async function Page() {
  const data = await kv.lrange<history>(KV_DATA, 0, 100);
  return (
    <div className="mx-auto w-[88%] max-w-2xl py-6 sm:py-10">
      <table className="w-full table-fixed shadow">
        <thead>
          <tr className="bg-stone-100">
            <th className={clsx(tdStyle, "w-1/3")}>时间</th>
            <th className={tdStyle}>问题</th>
            <th className={tdStyle}>卦象</th>
          </tr>
        </thead>
        <tbody>
          {data.map((value, index) => {
            const sp = value.date.split(" ");
            return (
              <tr key={index} className="odd:bg-stone-50 even:bg-stone-100">
                <td className={clsx(tdStyle, "text-center")}>
                  {sp.length == 2 && (
                    <>
                      {sp[0]}
                      <span className="block text-sm">{sp[1]}</span>
                    </>
                  )}
                </td>
                <td className={tdStyle}>{value.prompt}</td>
                <td className={clsx(tdStyle, "text-center")}>
                  {value.gua}
                  <span className="block text-xs">{value.change}</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Page;
