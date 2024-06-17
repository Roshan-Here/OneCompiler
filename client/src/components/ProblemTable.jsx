import React from "react";

function ProblemTable({CurrentProblems,}) {
  return (
    <div className="md:px-40 flex flex-grow justify-center overflow-y-visible">
      <table className="table">
        {/* head */}
        <thead className="text-xl font-normal text-slate-200">
          <tr>
            <th>No</th>
            <th>Title</th>
            <th>Difficulty</th>
          </tr>
        </thead>
        <tbody className="">
          {/* row 1 */}
          {CurrentProblems?.map((itm) => (
            <tr key={itm.id}>
              <th>{itm.id}</th>
              <td>{itm.Title}</td>
              <td
                className={
                  itm.difficulty === "Easy"
                    ? "text-green-400"
                    : itm.difficulty === "Medium"
                    ? "text-yellow-300"
                    : "text-red-600"
                }
              >
                {itm.difficulty}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProblemTable;
