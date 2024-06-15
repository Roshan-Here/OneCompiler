import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import Footer from "../components/Footer";
import ListProblemSamples from "../utils/ListProblemSample";
import ProblemTable from "../components/ProblemTable";
import Pagination from "../components/Pagination";

function Profile() {
  const [enableupdate, setenableupdate] = useState(false);
  const [postperpage] = useState(9);
  const [currentpage, setcurrentpage] = useState(1);

  const Indexoflastpage = currentpage * postperpage;
  const IndexoFirstpage = Indexoflastpage - postperpage;

  const paginate = (pageNumber) => setcurrentpage(pageNumber);

  const currentproblems = ListProblemSamples.slice(
    IndexoFirstpage,
    Indexoflastpage
  );

  return (
    <div className="w-full bg-gray-900 bg-auto min-h-screen overflow-hidden">
      <Toaster />
      <div className="flex justify-center">
        {/* Profile pic & usernme part */}
        <div className="flex-col">
          <div className="avatar mt-7">
            <div className="w-40 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
          </div>
          <div className="flex justify-center text-2xl font-bold">
            @Username
          </div>
          <div className="mt-2 flex justify-center text-2xl font-semibold">
                  <button className="btn btn-sm border-t-green-600 btn-accent" onClick={()=>setenableupdate(true)}> 
                    Update
                  </button>
                </div>
        </div>
      </div>
      <div className="flex mt-6">
        <div className="card ml-12 mr-12 md:ml-44 md:mr-44 w-full bg-slate-500 text-primary-content">
          <div className={`${enableupdate ? "hidden" : ""} card-body`}>
            {/* // change hidden onupdate */}
            <h1 className="flex justify-center text-2xl">Full Name</h1>
            <p className="flex justify-center text-xl">
              i'm a professional Developer
            </p>
          </div>
          <div className={`${!enableupdate?"hidden":""} card-body`}>
            {/* unhiden on onupdate */}
            <div className="flex flex-col justify-center">
              <div className="flex justify-center text-2xl font-semibold">
                Update
              </div>
              <form  className="mt-3" >
                <label
                  className="input input-bordered flex items-center gap-2"
                  htmlFor="fullname"
                >
                  <input
                    className="grow text-slate-200"
                    type="text"
                    placeholder="Full Name"
                    name="fullname"
                    id=""
                  />
                </label>
                <label
                  className="mt-1 input input-bordered flex items-center gap-2"
                  htmlFor="About"
                >
                  <input
                    className="grow text-slate-200"
                    type="text-area"
                    placeholder="About"
                    name="fullname"
                    id=""
                  />
                </label>
                <div className="mt-3 flex text-2xl font-semibold">
                  <button className="btn  border-t-green-600 btn-success">
                    Update
                  </button>
                </div>
              </form>
              <div className="flex text-2xl font-semibold">
                  <button onClick={()=>setenableupdate(false)} className="btn btn-link text-red-500">
                    Cancel
                  </button>
                </div>
            </div>
          </div>
        </div>
      </div>
      {/* solution table part */}
      <div className={`mt-3 ${currentproblems.length===0?"hidden":""} flex flex-col justify-center`}> 
        {/* // hide with respect to length */}
        <div className="ml-12 mr-12 md:ml-44 md:mr-44 card bg-gray-950 shadow xl">
          <div className="py-3 flex justify-center">
            <h1 className="text-3xl font-bold">Solved Questions</h1>
          </div>
          <ProblemTable CurrentProblems={currentproblems} />
          <Pagination
            postPerPage={postperpage}
            totalPages={ListProblemSamples.length}
            paginate={paginate}
            currentPage={currentpage}
          />
          <div className="card-body"></div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
