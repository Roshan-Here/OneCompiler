import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function ProblemFilterList({ FilteredItems, HandleResetTags }) {
  return (
    <>
      {FilteredItems?.length === 0 ? (
        ""
      ) : (
        <div className="p-6">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-10 px-12 gap-2">
            {FilteredItems?.map((itm) => (
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
              onClick={HandleResetTags}
            >
              <FontAwesomeIcon
                className="text-green-500"
                icon={faArrowsRotate}
              />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ProblemFilterList;
