import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowsRotate,
  faMagnifyingGlass,
  faShuffle,
} from "@fortawesome/free-solid-svg-icons";
import TopicList from "./../utils/TopicLists";
import ListProblemSamples from "./../utils/ListProblemSample";
import Footer from "../components/Footer";
import Pagination from "./../components/Pagination";

function Problems() {
  const difficultyList = ["Easy", "Medium", "Hard"];
  const [difficulty, setdifficulty] = useState("");
  const [tagexpanded, settagexpanded] = useState(false);
  const [filtereditems, setfiltereditems] = useState([]);
  const [currentpage, setcurrentpage] = useState(1);
  const [postperpage] = useState(9);
  const [searchtag, setsearchtag] = useState("");
  const TagVisibleItems = 12;

  // console.log(filtereditems);
  // console.log(filtereditems.length);

  // get current problem Pagination part

  const Indexoflastpage = currentpage * postperpage;
  const IndexoFirstpage = Indexoflastpage - postperpage;
  const currentproblems = ListProblemSamples.slice(
    IndexoFirstpage,
    Indexoflastpage
  );

  const paginate = (pageNumber) => setcurrentpage(pageNumber);

  const handleDifficulty = (value) => {
    setdifficulty(value);
    handleTopicFilter(value);
  };

  const handleResetTags = () => {
    setdifficulty("");
    setfiltereditems([]);
  };

  const handleTopicFilter = (topic) => {
    const isDifficult = difficultyList.includes(topic);
    let updated_items = filtereditems ? [...filtereditems] : [];

    if (isDifficult) {
      updated_items = updated_items.filter(
        (item) => !difficultyList.includes(item)
      );
    }

    if (updated_items.includes(topic)) {
      updated_items = setfiltereditems(
        updated_items.filter((item) => item !== topic)
      );
    } else {
      updated_items.push(topic);
    }
    setfiltereditems(updated_items);
  };

  return (
    <div className="w-full bg-gray-900 bg-auto min-h-screen overflow-hidden">
      <div className="flex justify-center text-4xl font-bold text-gray-200 overflow-hidden">
        <div className="p-5 underline">Problem List</div>
      </div>
      <div className="flex flex-grow justify-around gap-2">
        {/* filters part */}
        <div className="hidden md:flex p-3 text-xl font-medium">SortBy:</div>
        <div className="dropdown dropdown-hover relative">
          {/* Difficulty button */}
          <div
            tabIndex={0}
            role="button"
            className="btn btn-block btn-neutral btn-outline btn-accent mt-1"
          >
            Difficulty
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content px-3 absolute z-50 shadow bg-slate-800 rounded-box w-44  overflow-y-auto collapse-open hover:cursor-pointer"
          >
            {difficultyList.map((diff) => (
              <ul className="collapse menu" key={diff}>
                <li
                  className={
                    diff === "Easy"
                      ? "text-green-400"
                      : diff === "Medium"
                      ? "text-yellow-300"
                      : "text-red-600"
                  }
                  onClick={() => handleDifficulty(diff)}
                >
                  <a>{diff}</a>
                </li>
              </ul>
            ))}
            {/* <li className="text-green-400" onClick={()=>handleDifficulty("Easy")}><a>Easy</a></li>
            <li className="text-yellow-300"><a>Medium</a></li>
            <li className="text-red-600"><a>Hard</a></li> */}
          </ul>
        </div>
        <div className="">
          {/* Tag selctor button */}
          <div className="open:dropdown dropdown-bottom" open>
            <div
              tabIndex={0}
              role="button"
              className="px-6 md:px-9 btn btn-block btn-neutral btn-outline btn-accent mt-1"
            >
              Tags
            </div>
            <div
              tabIndex={0}
              className="card mt-1 compact dropdown-content z-[1] shadow bg-slate-500 w-96 h-12"
            >
              <div
                tabIndex={0}
                className="card-body bg-slate-800 text-green-500 rounded-xl"
              >
                <label className=" input input-bordered input-success flex items-center gap-2 mt-1">
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                  <input
                    type="text"
                    placeholder="Filter Topics"
                    onChange={(e) => setsearchtag(e.target.value)}
                    value={searchtag}
                    className="grow text-slate-200"
                  />
                </label>
                <div className="flex">
                  <p className="text-slate-300 text-lg font-bold">Topics</p>
                  <button
                    className="btn btn-sm text-slate-300 text-lg font-bold"
                    onClick={handleResetTags}
                  >
                    <FontAwesomeIcon icon={faArrowsRotate} />
                  </button>
                </div>
                <div
                  className={
                    !tagexpanded
                      ? "grid grid-cols-4 gap-2 h-44"
                      : "grid grid-cols-4 gap-2 h-56 overflow-y-scroll"
                  }
                >
                  {[...TopicList]
                    .slice(0, tagexpanded ? TopicList.length : TagVisibleItems)
                    .filter((items) => {
                      return searchtag.toLowerCase() === ""
                        ? items
                        : items.f_name.toLowerCase().includes(searchtag);
                    })
                    .map((tags) => (
                      <input
                        key={tags.tag_name}
                        type="checkbox"
                        aria-label={tags.f_name}
                        checked={filtereditems?.includes(tags.f_name)}
                        onChange={() => handleTopicFilter(tags.f_name)}
                        className="btn btn-md text-xs"
                      />
                    ))}
                </div>
                {!tagexpanded && (
                  <button onClick={() => settagexpanded(true)}>Expand</button>
                )}
                {tagexpanded && (
                  <button onClick={() => settagexpanded(false)}>
                    Collapse
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="">
          {/* top search bar */}
          <label className=" input input-bordered input-success flex items-center gap-2 mt-1">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            <input
              type="text"
              className="text-slate-300 grow"
              placeholder="Search Problems"
            />
          </label>
        </div>
        <div className="hidden md:flex">
          {/* Random question select button */}
          <div className="p-3 rounded-3xl bg-green-600 dropdown dropdown-left dropdown-bottom  dropdown-hover">
            <FontAwesomeIcon className="text-2xl text-black" icon={faShuffle} />
            <div
              tabIndex={0}
              className="card compact dropdown-content z-[1] shadow bg-base-100 rounded-box w-48"
            >
              <div
                tabIndex={0}
                className="card-body bg-gray-900 text-green-500"
              >
                <p>Random Question selector!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {filtereditems?.length === 0 ? (
        ""
      ) : (
        <div className="p-6">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-10 px-12 gap-2">
            {filtereditems?.map((itm) => (
              <button
                key={itm}
                className={
                  itm === "Easy"
                    ? "text-green-400 btn btn-xs"
                    : itm === "Medium"
                    ? "text-yellow-300 btn btn-xs"
                    : itm === "Hard"
                    ? "text-red-600 btn btn-xs"
                    : "btn-neutral btn btn-xs font-bold"
                }
              >
                {itm}
              </button>
            ))}
            <button
              className="btn btn-xs text-slate-300 text-lg font-bold"
              onClick={handleResetTags}
            >
              <FontAwesomeIcon
                className="text-green-500"
                icon={faArrowsRotate}
              />
            </button>
          </div>
        </div>
      )}
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
            {currentproblems
              .filter((item) =>
                item.difficulty.includes(difficulty)
                  ? item
                  : item.difficulty.includes(difficulty)
              )
              .map((itm) => (
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
      <Pagination
      postPerPage = {postperpage}
      totalPages = {ListProblemSamples.length}
      paginate = {paginate}
      currentPage = {currentpage}
      />
      <Footer />
    </div>
  );
}

export default Problems;
