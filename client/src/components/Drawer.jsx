import React from "react";
import BlankProfilePNG from "../components/Statiacimages/Meee.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin, faTelegram } from "@fortawesome/free-brands-svg-icons";
import { useNavigate } from "react-router-dom";

function Drawer({ OpenDrawer, IsOpen }) {
  //   console.log(IsOpen);
  const navigate = useNavigate();
  return (
    <>
      <div className={`${!IsOpen ? "hidden" : "relative z-10"}`}>
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <div className="pointer-events-auto relative w-screen max-w-md">
                <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                  <button
                    onClick={OpenDrawer}
                    className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                  >
                    <span className="absolute -inset-2.5"></span>
                    <span className="sr-only">Close panel</span>
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <div className="flex h-full flex-col overflow-y-scroll bg-slate-700 py-6 shadow-xl">
                  <div className="flex justify-center">
                    {/* Profile pic & usernme part */}
                    <div className="flex-col">
                      <div className="avatar mt-7">
                        <div className="relative w-40 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                          <img src={BlankProfilePNG} />
                          {/* hide button on enable update */}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col ml-4 mt-3">
                    <p className="font-bold">
                      Hi,
                      <span> I'm Muhammed Roshan </span>
                      <a
                        href="https://www.linkedin.com/in/Muhammed-Roshan-Ps/"
                        target="_blank"
                      >
                        <FontAwesomeIcon
                          className="text-3xl text-cyan-400"
                          icon={faLinkedin}
                        />
                      </a>
                    </p>
                    <p className="font-bold">& I build functional websites.</p>
                  </div>
                  <div className="flex ml-4 mt-3">
                    <p className="text-3xl">
                      So, Why{" "}
                      <span className="text-lg font-bold text-blue-600">
                        {" "}
                        One
                      </span>
                      <span className="text-lg font-semibold text-cyan-300">
                        Compiler ?
                      </span>
                    </p>
                  </div>
                  <div className="flex flex-col ml-5 mt-3">
                    <p>
                    While searching for a job, it became necessary to learn and crash DSA during interview rounds.
                    </p>
                    <p>
                    And the problem area in OneCompiler is similar to Leetcode, likely scrapping all the non-premium problems.{" "}
                      <span className="link link-accent">
                        <a
                          href="https://github.com/Roshan-Here/leetcode-scrapper"
                          target="_blank"
                        >
                          its on this Respository
                        </a>
                      </span>
                    </p>
                    <p className="mt-3">
                      Here we provide{" "}
                      <span
                        className="link link-warning"
                        onClick={() => navigate("/pasteit")}
                      >
                        Pasteit
                      </span>
                      ,{" "}
                      <span
                        className="link link-secondary"
                        onClick={() => navigate("/compiler")}
                      >
                        Open Compiler
                      </span>
                      ,{" "}
                      <span
                        className="link link-error"
                        onClick={() => navigate("/problems")}
                      >
                        Problem Challenges
                      </span>
                    </p>
                  </div>
                  <div className="flex mt-12 justify-center gap-6">
                    <a href="https://www.linkedin.com/in/Muhammed-Roshan-Ps/" target="_blank">
                    <FontAwesomeIcon className="text-3xl text-cyan-400" icon={faLinkedin} />
                    </a>
                    <a href="https://github.com/Roshan-Here/OneCompiler" target="_blank">
                    <FontAwesomeIcon className="text-3xl text-black" icon={faGithub} />
                    </a>
                    <a href="https://tx.me/Xequist" target="_blank">
                    <FontAwesomeIcon className="text-3xl text-sky-500" icon={faTelegram} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Drawer;
