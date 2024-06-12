import React, { useEffect, useState } from "react";
import Editor, { useMonaco } from "@monaco-editor/react";
import Footer from "../components/Footer";
import dracula from "monaco-themes/themes/Dracula.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay, faL } from "@fortawesome/free-solid-svg-icons";
import { faGoogle, faYoutube } from "@fortawesome/free-brands-svg-icons";
import CodeEditorButtonforChallenge from "./../components/CodeEditorButtonforChallenge";
import toast from "react-hot-toast";

function SingleChallenge() {
  const monaco = useMonaco();
  const [deftmsg, setdeftmsg] = useState(
    "Welcome to Onecompiler where anything can be compiled"
  );
  const [themename, setThemename] = useState("Theme");
  const [theme, setTheme] = useState();
  const [language, setlanguage] = useState("Languages");
  const [code, setcode] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [langforbutton, setlangforbutton] = useState("Languages");
  const [outputLoading, setoutputLoading] = useState(false);
  const [catchbot, setcatchbot] = useState(false);
  const [solexpand, setsolexpand] = useState(false)

  const handlelanguage = (value) => {
    setlanguage(value.value);
    setlangforbutton(value.name);
    setdeftmsg(value.initCode);
    setcode(deftmsg);
  };

  useEffect(() => {
    setcode(deftmsg); // initial state
    if (monaco) {
      monaco.editor.defineTheme("newtheme", dracula);
      monaco.editor.setTheme("newtheme");
    }
  }, [monaco]);

  useEffect(() => {
    setisLoading(true);
    setTimeout(() => {
      setisLoading(false);
    }, 800);
  }, []);

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

  const replace=(data)=>{
    return data.replace(/ /g,"+")
  }

  const handleYoutubeSolution = (Title) => {
    let title = replace(Title)
    let query = `https://www.youtube.com/results?search_query=${title}+using+${
      language === "Languages" ? "" : language
    }`;
    console.log(query);
    window.open(query, "_blank");
  };

  const handelGoogleTopicSearch = (Title) =>{
    let title =  replace(Title)
    let query = `https://www.google.com/search?q=${title}`;
    window.open(query, "_blank")
  }

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
        <div className="m-3 p-4 w-auto md:w-1/2 overflow-y-auto bg-zinc-800 rounded-lg">
          <div className="flex justify-start gap-3 text-zinc-50">
            <h2 className="p-3 text-2xl font-bold">1. TWO SUM</h2>
            <div className="badge badge-error">Hard</div>
          </div>
          <p className="p-3 text-zinc-50">
            Given an array of integers nums and an integer target, return
            indices of the two numbers such that they add up to target. You may
            assume that each input would have exactly one solution, and you may
            not use the same element twice. You can return the answer in any
            order.
          </p>
          <div className="p-4">
            <h1 className="text-lg">Example 1.</h1>
            <h1 className="text-xl">Input: nums = [3,2,4], target = 6</h1>
            <h1 className="text-xl">Output: [1,2]</h1>
            <h1 className="text-xl">
              Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
            </h1>
          </div>
          <div className="p-4">
            <h1 className="text-lg">Example 2.</h1>
            <h1 className="text-xl">Input: nums = [3,2,4], target = 6</h1>
            <h1 className="text-xl">Output: [1,2]</h1>
          </div>
          {!solexpand && (
            <button className="px-4 text-lg text-red-400 btn-link" onClick={() => setsolexpand(true)}>Trouble Finding Solution ?</button>
          )}
          {/* <h1>Trouble Finding Solution ?</h1> */}
          <div className={`${solexpand?"":"hidden"} p-4 flex flex-col justify-start`}>
            <div className="flex">
              <h1 className="text-2xl mt-1 font-medium">Find Solution on Youtube : </h1>
              <button
                className=" px-2 btn btn-ghost btn-md"
                onClick={() => handleYoutubeSolution("Hello World")} // change sting to qustion.id
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
                        <p>Selet Language to find more Relatable </p>
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
                <FontAwesomeIcon className="text-3xl text-amber-100" icon={faGoogle} />

              </div>
              <div className="mt-2 grid grid-cols-6 gap-2">
                <button onClick={()=>handelGoogleTopicSearch("Hash map")} className="btn-neutral btn btn-xs font-bold hover:text-slate-200 hover:btn-success">Array </button>
                <button onClick={()=>handelGoogleTopicSearch("Array")} className="btn-neutral btn btn-xs font-bold hover:text-slate-200 hover:btn-success">Array </button>
                <button onClick={()=>handelGoogleTopicSearch("Array")} className="btn-neutral btn btn-xs font-bold hover:text-slate-200 hover:btn-success">Array </button>
                <button onClick={()=>handelGoogleTopicSearch("Array")} className="btn-neutral btn btn-xs font-bold hover:text-slate-200 hover:btn-success">Array </button>
                <button onClick={()=>handelGoogleTopicSearch("Array")} className="btn-neutral btn btn-xs font-bold hover:text-slate-200 hover:btn-success">Array </button>
                <button onClick={()=>handelGoogleTopicSearch("Array")} className="btn-neutral btn btn-xs font-bold hover:text-slate-200 hover:btn-success">Array </button>
                <button onClick={()=>handelGoogleTopicSearch("Array")} className="btn-neutral btn btn-xs font-bold hover:text-slate-200 hover:btn-success">Array </button>
                <button onClick={()=>handelGoogleTopicSearch("Array")} className="btn-neutral btn btn-xs font-bold hover:text-slate-200 hover:btn-success">Array </button>
                <button onClick={()=>handelGoogleTopicSearch("Array")} className="btn-neutral btn btn-xs font-bold hover:text-slate-200 hover:btn-success">Array </button>
              </div>
            {solexpand && (
            <button className="mt-3 text-lg text-amber-300 btn-link" onClick={() => setsolexpand(false)}>show less...</button>
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
            />
          </dir>
          {/* for output */}
          <div className="m-8 card justify-center">
            <div className="border border-cyan-500 rounded-md">
              <ul className="font-semibold text-xl p-3 overflow-y-auto">
                <li>Status : 200</li>
                <li>Run Time : 0.318 sec</li>
                <li>Memory Usage : 0.30mb</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
}

export default SingleChallenge;
