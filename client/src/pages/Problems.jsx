import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faShuffle } from "@fortawesome/free-solid-svg-icons";

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
      <div className="flex justify-around gap-2">
        <div className="hidden md:flex p-3 text-xl font-medium">SortBy:</div>
        {/* Difficulty button */}
        <div className="dropdown dropdown-hover relative">
            <div tabIndex={0} role="button" className="btn btn-block btn-neutral btn-outline btn-accent mt-1">Difficulty</div>
            <ul tabIndex={0} className="dropdown-content px-3 absolute z-50 shadow bg-slate-800 rounded-box w-44  overflow-y-auto collapse-open hover:cursor-pointer">
                {
                    difficultyList.map((diff)=>
                        (
                            <ul className='collapse menu' key={diff}>
                            <li 
                                className={diff==="Easy"? 
                                "text-green-400"
                                : diff === "Medium"?
                                "text-yellow-300"
                                :"text-red-600"
                            } onClick={()=>handleDifficulty(diff)}><a>{diff}</a></li>
                            </ul>                        
                        )
                    )
                }
            {/* <li className="text-green-400" onClick={()=>handleDifficulty("Easy")}><a>Easy</a></li>
            <li className="text-yellow-300"><a>Medium</a></li>
            <li className="text-red-600"><a>Hard</a></li> */}
        </ul>
        </div>
        <div className="">
            <div className="px-6 md:px-9 btn btn-block btn-info btn-outline btn-accent mt-1">
                Tags
            </div>
        </div>
        <div className="">
            {/* <input type="text" placeholder="Search Problems" className="px-4 md:px-12 input input-bordered input-success w-full max-w-xs mt-1" /> */}
            <label className=" input input-bordered input-success flex items-center gap-2 mt-1">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg> */}
            <input type="text" className="grow" placeholder="Search Problems" />
            </label>

        </div>
        <div className="">
            <div className="p-3 rounded-3xl bg-green-600 dropdown dropdown-left dropdown-bottom  dropdown-hover">
            <FontAwesomeIcon className="text-2xl text-black" icon={faShuffle} />
            <div tabIndex={0} className="card compact dropdown-content z-[1] shadow bg-base-100 rounded-box w-48">
                <div tabIndex={0} className="card-body bg-gray-900 text-green-500">
                {/* <h2 className="card-title">You needed more info?</h2>  */}
                <p>Random Question selector!</p>
                </div>
            </div>
            </div>
        </div>
      </div>
      <div className="md:px-40 flex justify-center overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead className="text-xl font-normal">
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
