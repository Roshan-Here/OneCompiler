import React, { useEffect, useState } from "react";
import Editor, { useMonaco } from "@monaco-editor/react";
import Footer from "../components/Footer";
import dracula from "monaco-themes/themes/Dracula.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay, faL } from "@fortawesome/free-solid-svg-icons";
import { faGoogle, faYoutube } from "@fortawesome/free-brands-svg-icons";
import CodeEditorButtonforChallenge from "./../components/CodeEditorButtonforChallenge";
import toast, { Toaster } from "react-hot-toast";
import privateaxious from "./../utils/api";
import { useNavigate, useParams } from "react-router-dom";
import TokenAuth from "../utils/TokenAuth";
import axios from "axios";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";

function SingleChallenge() {
  TokenAuth()
  const navigate = useNavigate();
  const authenticated = useSelector((state) => state.user.authenticated);
  console.log(authenticated);
  const monaco = useMonaco();
  const [deftmsg, setdeftmsg] = useState(
    "Welcome to Onecompiler where anything can be compiled"
  );
  const [themename, setThemename] = useState("Theme");
  const [score, setscore] = useState(0);
  const [theme, setTheme] = useState();
  const [language, setlanguage] = useState("Languages");
  const [code, setcode] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [langforbutton, setlangforbutton] = useState("Languages");
  const [outputLoading, setoutputLoading] = useState(false);
  const [catchbot, setcatchbot] = useState(false);
  const [outputdata, setoutputdata] = useState(
    "Your output will be displayed here!"
  );
  const [errorstatus, seterrorstatus] = useState(false);
  const [codestatus, setcodestatus] = useState("Nill");
  const [runtime, setruntime] = useState("Nill");
  const [memusage, setmemusage] = useState("Nill");
  const [solexpand, setsolexpand] = useState(false);
  const [problemdata, setproblemdata] = useState([]);
  const currentexample = problemdata ? problemdata.examples : "";
  const currenttags = problemdata?.Tags ? problemdata?.Tags : "";
  const { Qslug } = useParams();
  console.log(Qslug);
  const handlelanguage = (value) => {
    setlanguage(value.value);
    setlangforbutton(value.name);
    setdeftmsg(value.initCode);
    setcode(deftmsg);
  };

  const LoaderaboutText = authenticated ? "Loading problem..." : "Please Login";

  useEffect(() => {
    setcode(deftmsg); // initial state
    if (monaco) {
      monaco.editor.defineTheme("newtheme", dracula);
      monaco.editor.setTheme("newtheme");
    }
  }, [monaco]);

  const fetchSingleProblem = async () => {
    const res = await privateaxious.get(`/api/problem/${Qslug}/`);
    console.log(res.data);
    setproblemdata(res.data);
    handleSetScore()
  };

  const handleSetScore =()=>{
    problemdata?.difficulty==="Easy"?setscore(10):problemdata?.difficulty==="Medium"?setscore(20):setscore(50)
  }

  const handleQuestionAttempt = async () => {
    try {
      let formdata = {
        score: score,
        usersolvedquestionlist: [
          {
            Q_slug: Qslug,
            Q_title: problemdata.Title,
            Q_difficulty: problemdata.difficulty,
          },
        ],
      };
      const res = await privateaxious.put(
        "/api/profile/score/update",
        formdata
      );
      console.log(res);
    } catch (error) {
      toast.error(`${error}`);
    }
  };

  // const formatingdata=(data)=>{
  //   const reqdata = data.split('\n').map(line => `${line}</br>`).join('');
  //   console.log(reqdata);
  //   return reqdata
  // }

  // const attemptedProblem = async() =>{
  //   const res = await privateaxious.put(`/api/profile/score/update`)
  // }

  useEffect(() => {
    setisLoading(true);
    if (!authenticated) {
      setTimeout(() => {
        navigate("/login");
        setisLoading(false);
      }, 800);
    }
    fetchSingleProblem();
    setTimeout(() => {
      setisLoading(false);
    }, 4800);
  }, []);

  const repetedusage = (value) => {
    setruntime(value.data["run time"]);
    setmemusage(value.data["memory usage"]);
    if (value.data["Error"]) {
      seterrorstatus(true);
      console.log(value.data["Error"]);
      setoutputdata(value.data["Error"]);
      setcodestatus("Failure");
      console.log(value.data["memory usage"]);
      console.log(value.data["run time"]);
    } else {
      seterrorstatus(false);
      handleQuestionAttempt();
      setoutputdata(value.data["Compiled Output"]);
      setcodestatus("Success");
      console.log(value.data["Compiled Output"]);
      console.log(value.data["memory usage"]);
      console.log(value.data["run time"]);
    }
  };

  const runCode = async () => {
    if (catchbot === true) {
      toast.error("bot found");
    } else {
      const submitdata = {
        pref_language: language,
        code: code,
      };
      try {
        setoutputLoading(true);
        const res = await axios.post(`/api/run/`, submitdata);
        repetedusage(res);
        toast.success("Compiled Sucessfully");
        setoutputLoading(false);
      } catch (error) {
        toast.error(`Error ${error}`);
        setoutputLoading(false);
        // console.log(error);
      }
    }
  };
  const handlechange = (value) => {
    setcode(value);
  };

  const replace = (data) => {
    return data.replace(/ /g, "+");
  };

  const handleYoutubeSolution = (Title) => {
    let title = replace(Title);
    let query = `https://www.youtube.com/results?search_query=${title}+using+${
      language === "Languages" ? "" : language
    }`;
    console.log(query);
    window.open(query, "_blank");
  };

  const handelGoogleTopicSearch = (Title) => {
    let title = replace(Title);
    let query = `https://www.google.com/search?q=${title}`;
    window.open(query, "_blank");
  };

  const handleTheme = (value, name) => {
    setTheme(value);
    setThemename(name);
    if (monaco) {
      monaco.editor.defineTheme("updatetheme", value);
      monaco.editor.setTheme("updatetheme");
    }
    // console.log(value)
  };
  return (
    <section>
      <div className="flex flex-col md:flex-row w-full  bg-gray-900 bg-auto min-h-screen overflow-hidden">
        {isLoading ? (
          <Loader about={LoaderaboutText} />
        ) : (
          <>
            <Toaster />
            <div className="m-3 p-4 w-auto md:w-1/2 overflow-y-auto bg-zinc-800 rounded-lg">
              <div className="flex justify-start gap-3 text-zinc-50">
                <h2 className="p-3 text-2xl font-bold">
                  {`${problemdata.id}`}. {`${problemdata.Title}`}
                </h2>
                <div
                  className={`badge
            {
              ${
                problemdata.difficulty === "Easy"
                  ? "badge-accent"
                  : problemdata.difficulty === "Medium"
                  ? "badge-success"
                  : "badge-error"
              }`}
                >
                  {problemdata.difficulty}
                </div>
              </div>
              <p className="p-3 text-zinc-50">{problemdata.description}</p>
              <div className="p-4">
                {currentexample?.map((exmp, itr) => (
                  <>
                    <h1 key={itr}>Example : {itr + 1}</h1>
                    <h1>
                      {`${
                        exmp.Input === "null" ? "" : exmp.Input ? "Input" : ""
                      }`}{" "}
                      {exmp.Input}
                    </h1>
                    <h1>
                      {`${
                        exmp.Output === "null"
                          ? ""
                          : exmp.Output
                          ? "Output"
                          : ""
                      }`}{" "}
                      {exmp.Output}
                    </h1>
                    <h1>
                      {`${
                        exmp.Explanation === "null"
                          ? ""
                          : exmp.Explanation
                          ? "Explanation"
                          : ""
                      }`}{" "}
                      {exmp.Explanation}
                    </h1>
                  </>
                ))}
              </div>
              {!solexpand && (
                <button
                  className="px-4 text-lg text-red-400 btn-link"
                  onClick={() => setsolexpand(true)}
                >
                  Trouble Finding Solution ?
                </button>
              )}
              {/* <h1>Trouble Finding Solution ?</h1> */}
              <div
                className={`${
                  solexpand ? "" : "hidden"
                } p-4 flex flex-col justify-start`}
              >
                <div className="flex">
                  <h1 className="text-2xl mt-1 font-medium">
                    Find Solution on Youtube :{" "}
                  </h1>
                  <button
                    className=" px-2 btn btn-ghost btn-md"
                    onClick={() => handleYoutubeSolution(problemdata.Title)} // change sting to qustion.id
                  >
                    <div className="dropdown dropdown-left dropdown-bottom  dropdown-hover">
                      <FontAwesomeIcon
                        className="text-3xl text-red-600 "
                        icon={faYoutube}
                      />
                      <div
                        tabIndex={0}
                        className="card compact dropdown-content z-[1] shadow bg-base-100 rounded-box w-48"
                      >
                        {language === "Languages" ? (
                          <div
                            tabIndex={0}
                            className="card-body rounded-lg bg-gray-900 text-green-500"
                          >
                            <p>
                              Selet Language to find more relatable Solutions
                            </p>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </button>
                </div>
                <div className="mt-1">
                  <div className="flex gap-4">
                    <h1 className="text-xl">Learn more about this Topic on </h1>
                    <FontAwesomeIcon
                      className="text-3xl text-amber-100"
                      icon={faGoogle}
                    />
                  </div>
                  <div className="mt-2 grid grid-cols-6 gap-2">
                    {currenttags === ""
                      ? ""
                      : currenttags?.map((tgs, itr) => (
                          <>
                            <button
                              key={itr}
                              onClick={() => handelGoogleTopicSearch(tgs)}
                              className="btn-neutral btn btn-xs font-bold hover:text-slate-200 hover:btn-success"
                            >
                              {tgs}
                            </button>
                          </>
                        ))}
                  </div>
                  {solexpand && (
                    <button
                      className="mt-3 text-lg text-amber-300 btn-link"
                      onClick={() => setsolexpand(false)}
                    >
                      show less...
                    </button>
                  )}
                </div>
              </div>
            </div>
            {/* Part-2 */}
            <div className="w-auto md:w-1/2">
              <div className="flex flex-row justify-between">
                {/* for buttons */}
                <CodeEditorButtonforChallenge
                  handleTheme={handleTheme}
                  handlelanguage={handlelanguage}
                  themename={themename}
                  langforbutton={langforbutton}
                />
                <div className="px-0.5 md:px-6 mt-3">
                  <div
                    role="button"
                    onClick={runCode}
                    className="btn btn-block btn-neutral border-r-2 border-green-500 hover:border-cyan-500 mt-1 hover:text-green-400 font-semibold text-white"
                  >
                    <FontAwesomeIcon
                      className="text-2xl text-green-500 transition-colors hover:text-cyan-500"
                      icon={faCirclePlay}
                    />
                    Run
                  </div>
                </div>
              </div>
              <dir className="mr-6">
                <Editor
                  className="w-full h-72"
                  language={language || "python"}
                  value={deftmsg}
                  onChange={handlechange}
                />
              </dir>
              <div
                className={`ml-8 mr-8 border ${
                  errorstatus ? "border-red-400" : "border-cyan-400"
                } rounded-md h-44 md:h-34 overflow-y-auto`}
              >
                {/* text-green-500 : text-red-500 */}
                <div
                  className={`p-2 text-lg overflow-hidden font-mono ${
                    errorstatus === true ? "text-red-500" : "text-green-500"
                  }`}
                >
                  {outputLoading ? (
                    <div className="flex justify-center items-center p-6">
                      <span className="loading loading-bars loading-lg"></span>
                    </div>
                  ) : (
                    <span>{outputdata}</span>
                    // {outputdata}
                  )}
                </div>
              </div>
              {/* for output */}
              <div className="mt-3 ml-8 mr-8 card justify-center">
                <div className="border border-cyan-500 rounded-md">
                  <ul className="font-semibold text-xl p-3 overflow-y-auto">
                    <li>Status : {codestatus}</li>
                    <li>Run Time : {runtime}</li>
                    <li>Memory Usage : {memusage}</li>
                  </ul>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </section>
  );
}

export default SingleChallenge;
