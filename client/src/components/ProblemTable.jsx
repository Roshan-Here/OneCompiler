import React from "react";
import { useNavigate } from "react-router-dom";

function ProblemTable({CurrentProblems,}) {
  const navigate = useNavigate()
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
          {CurrentProblems?.map((itm,itr) => (
            <tr key={itr}>
              <th>{itm.id}</th>
              <td className="text-white link link-hover" onClick={()=>{navigate(`/problem/${itm.slug}`)}} >{itm.Title}</td>
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
