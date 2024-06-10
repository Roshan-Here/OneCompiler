import React, { useState } from "react";

function Problems() {
    const difficultyList = ["Easy","Medium","Hard"]
    const [difficulty, setdifficulty] = useState("NonOrder")
    console.log(difficulty)

    const handleDifficulty=(value)=>{
        setdifficulty(value)
    }
  return (
    <div className="w-full bg-gray-900 bg-auto h-auto overflow-hidden">
      <div className="flex justify-center text-4xl font-bold text-gray-200 overflow-hidden">
        <div className="p-5 underline">Problem List</div>
      </div>
      <div className="flex justify-around">
        <div className="p-3">sort by</div>
        {/* Difficulty button */}
        <div className="dropdown dropdown-bottom dropdown-end relative">
            <div tabIndex={0} role="button" className="btn btn-block btn-neutral btn-outline btn-accent mt-1">Difficulty</div>
            <ul tabIndex={0} className="dropdown-content px-8 absolute z-50 shadow bg-slate-800 rounded-box w-44 max-h-48 overflow-y-auto collapse-open hover:cursor-pointer">
                {
                    difficultyList.map((diff)=>
                        (
                            <li 
                                key={diff}
                                className={diff==="Easy"? 
                                "text-green-400"
                                : diff === "Medium"?
                                "text-yellow-300"
                                :"text-red-600"
                            } onClick={()=>handleDifficulty(diff)}><a>{diff}</a></li>                        
                        )
                    )
                }
            {/* <li className="text-green-400" onClick={()=>handleDifficulty("Easy")}><a>Easy</a></li>
            <li className="text-yellow-300"><a>Medium</a></li>
            <li className="text-red-600"><a>Hard</a></li> */}
        </ul>
        </div>
        <div className="p-3">Tags</div>
        <div className="p-3">Search Bar</div>
        <div className="p-3">Random</div>
      </div>
      <div className="md:px-40 flex justify-center overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>No</th>
              <th>Title</th>
              <th>Difficulty</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <th>1</th>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
            </tr>
            {/* row 2 */}
            <tr>
              <th>2</th>
              <td>Hart Hagerty</td>
              <td>Desktop Support Technician</td>
            </tr>
            {/* row 3 */}
            <tr>
              <th>3</th>
              <td>Brice Swyre</td>
              <td>Tax Accountant</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Problems;
