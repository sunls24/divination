import React from "react";
import clsx from "clsx";

const tdStyle = "border py-2 px-3 sm:px-4";

async function Page() {
  if (!process.env.TODO) {
    return (
      <div className="mx-auto mt-10 max-w-[90%]">
        <b>TODO ...</b>
      </div>
    );
  }
  const data: any[] = []; // todo
  return (
    <div className="mx-auto w-[88%] max-w-2xl py-6 sm:py-10">
      <table className="w-full table-fixed shadow">
        <thead>
          <tr className="bg-secondary">
            <th className={clsx(tdStyle, "w-1/3")}>时间</th>
            <th className={tdStyle}>问题</th>
            <th className={tdStyle}>卦象</th>
          </tr>
        </thead>
        <tbody>
          {data.map((value, index) => {
            const sp = value.date.split(" ");
            return (
              <tr key={index} className="odd:bg-background even:bg-secondary">
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
