import React from "react";
import { useNavigate } from "react-router-dom";

function AttemptedProblemList({CurrentProblems,}) {
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
              <th>{itr+1}</th>
              <td className="text-white link link-hover" onClick={()=>{navigate(`/problem/${itm.Q_slug}`)}} >{itm.Q_title}</td>
              <td
                className={
                  itm.Q_difficulty === "Easy"
                    ? "text-green-400"
                    : itm.Q_difficulty === "Medium"
                    ? "text-yellow-300"
                    : "text-red-600"
                }
              >
                {itm.Q_difficulty}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AttemptedProblemList;