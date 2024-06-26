import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import CompilerIMG from "./Statiacimages/Compiler.PNG";
import PasteitIMG from "./Statiacimages/Pasteit.png";
import ListProblemIMG from "./Statiacimages/ProblemList.png";
import TokenAuth from "../utils/TokenAuth";
import Drawer from "./Drawer";

function Testing() {
  TokenAuth();
  const [draweropen, setdraweropen] = useState(false);

  const handleDrawerOpen = () => {
    draweropen ? setdraweropen(false) : setdraweropen(true);
  };

  return (
    <main>
      <div className="bg-gray-900 min-h-screen overflow-auto">
        <Drawer OpenDrawer={handleDrawerOpen} IsOpen={draweropen} />
        <div className="flex md:justify-center p-5">
          <div className="text-5xl md:text-7xl text-slate-200 font-extrabold">
            Accelerate your career
          </div>
          {/* <div className='text-2xl text-slate-400 font-bold'>Live learning with industry experts. Jobs at technology companies.</div> */}
        </div>
        <div className="flex px-5 md:justify-center md:p-1">
          {/* <div className='text-5xl md:text-7xl text-slate-200 font-extrabold'>Accelerate your career</div> */}
          <div className="text-2xl text-slate-400 font-bold">
            OneCompiler is the best platform to help you enhance your skills,
            expand your knowledge,
          </div>
        </div>
        {/* new box*/}
        <div className="m-8 flex flex-col rounded-2xl shadow-lg p-2 mt-10 md:ml-6 md:mr-6 md:flex-row bg-slate-500 overflow-x-auto">
          <img
            src="https://picsum.photos/800/400"
            alt=""
            className="h-60 md:w-80 rounded-xl bg-center bg-cover bg-gray-100"
          ></img>
          <div className="flex flex-col gap-1 p-2 md:p-6">
            <div className="text-zinc-50 font-bold text-4xl">Developer</div>
            <p className="text-zinc-100">
              We now support
              <span className="text-lg font-bold text-gray-800"> 80 </span>
              popular coding languages. At our core,
              <span className="text-lg font-bold text-blue-600"> One</span>
              <span className="text-lg font-semibold text-cyan-300">
                Compiler{" "}
              </span>
              is about developers. Our powerful development tools such as
              Playground help you test, debug and even write your own projects
              online
            </p>
            {/* Drawer button */}
            <div className="flex gap-4 mt-12 justify-end">
              <input id="my-drawer" type="checkbox" className="drawer-toggle" />

              <button
              onClick={handleDrawerOpen}
                className="p-2 flex items-center gap-1 border border- border-red-500 rounded-full hover:bg-emerald-100"
              >
                <span className="text-monospace text-black">Read More..</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex text-2xl md:text-4xl font-bold justify-center text-slate-100">
          What we Provide
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center">
          <div className="p-6 md:p-6">
            <div className="card w-auto glass bg-base-100 shadow-xl ">
              <figure>
                <img src={CompilerIMG} alt="car!" />
              </figure>
              <div className="card-body">
                <h2 className="card-title font-bold text-black  md:text-2xl">
                  Code Compiler
                </h2>
                <p className="text-sm text-md md:text-xl">
                  A simple platform to execute more than 80+ programming
                  languages
                </p>
                <div className="card-actions justify-center md:justify-end">
                  <Link to="/compiler">
                    <button className="btn btn-primary">Compile now!</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="p-3 md:p-6">
            <div className="card w-auto glass bg-base-100 shadow-xl ">
              <figure>
                <img src={PasteitIMG} alt="Pasteit" />
              </figure>
              <div className="card-body">
                <h2 className="card-title font-bold text-black  md:text-2xl">
                  Paste it
                </h2>
                <p className="text-sm text-md md:text-xl">
                  Online clipboard. Share text over the internet by generating a
                  unique URL
                </p>
                <div className="card-actions justify-center md:justify-end">
                  <Link to="/pasteit">
                    <button className="btn btn-primary">Pastit now!</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="p-6 md:p-6">
            <div className="card w-auto glass bg-base-100 shadow-xl ">
              <figure>
                <img src={ListProblemIMG} alt="car!" />
              </figure>
              <div className="card-body">
                <h2 className="card-title font-bold text-black  md:text-2xl">
                  Code Challenges
                </h2>
                <p className="text-sm text-md md:text-xl">
                  Test your knowledge with code challenges based on real-world
                  technical interviews
                </p>
                <div className="card-actions justify-center md:justify-end">
                <Link to="/problems">
                  <button className="btn btn-primary">Challenge Now!</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* sample languages... 6,5,4 -format*/}
        <div className="flex text-2xl md:text-4xl font-bold justify-center text-slate-100">
          Available languages
        </div>
        <div className="m-8  border rounded-2xl gap-5 shadow-lg bg-cyan-950">
          {/* part one of lang 6 */}
          {/* used icons form here https://github.com/devicons/devicon/blob/master/icons/ */}
          <div className="flex flex-row justify-between md:flex-row mt-2 font-bold ml-7 mr-7 overflow-x-auto">
            <div className="flex flex-col p-3 text-center w-1/3 md:w-1/12 text-slate-100">
              <img
                src="https://raw.githubusercontent.com/devicons/devicon/6910f0503efdd315c8f9b858234310c06e04d9c0/icons/python/python-original.svg"
                alt=""
                className="w-14 self-center"
              />
              <h3 className="mt-3">Python</h3>
            </div>
            <div className="flex flex-col p-3 text-center w-1/3 md:w-1/12 text-slate-100">
              <img
                src="https://raw.githubusercontent.com/devicons/devicon/6910f0503efdd315c8f9b858234310c06e04d9c0/icons/php/php-original.svg"
                alt=""
                className="w-14 self-center"
              />
              <h3 className="mt-3">Php</h3>
            </div>
            <div className="flex flex-col p-3 text-center w-1/3 md:w-1/12 text-slate-100">
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg"
                alt=""
                className="w-14 self-center"
              />
              <h3 className="mt-3">JavaScript</h3>
            </div>
            <div className="flex flex-col p-3 text-center w-1/3 md:w-1/12 text-slate-100">
              <img
                src="https://raw.githubusercontent.com/devicons/devicon/6910f0503efdd315c8f9b858234310c06e04d9c0/icons/c/c-original.svg"
                alt=""
                className="w-14 self-center"
              />
              <h3 className="mt-3">C</h3>
            </div>
            <div className="flex flex-col p-3 text-center w-1/3 md:w-1/12 text-slate-100">
              <img
                src="https://raw.githubusercontent.com/devicons/devicon/6910f0503efdd315c8f9b858234310c06e04d9c0/icons/csharp/csharp-original.svg"
                alt=""
                className="w-14 self-center"
              />
              <h3 className="mt-3">C#</h3>
            </div>
            <div className="flex flex-col p-3 text-center w-1/3 md:w-1/12 text-slate-100">
              <img
                src="https://raw.githubusercontent.com/devicons/devicon/6910f0503efdd315c8f9b858234310c06e04d9c0/icons/ruby/ruby-original.svg"
                alt=""
                className="w-14 self-center"
              />
              <h3 className="mt-3">Ruby</h3>
            </div>
          </div>
          {/* part two of lang 5 */}
          <div className="flex flex-row justify-between md:flex-row mt-2 font-bold ml-20 mr-20 overflow-auto">
            <div className="flex flex-col p-3 text-center w-1/3 md:w-1/12 text-slate-100">
              <img
                src="https://raw.githubusercontent.com/devicons/devicon/6910f0503efdd315c8f9b858234310c06e04d9c0/icons/dart/dart-original.svg"
                alt=""
                className="w-14 self-center"
              />
              <h3 className="mt-3">Dart</h3>
            </div>
            <div className="flex flex-col p-3 text-center w-1/3 md:w-1/12 text-slate-100">
              <img
                src="https://raw.githubusercontent.com/devicons/devicon/6910f0503efdd315c8f9b858234310c06e04d9c0/icons/java/java-original.svg"
                alt=""
                className="w-14 self-center"
              />
              <h3 className="mt-3">Java</h3>
            </div>
            <div className="flex flex-col p-3 text-center w-1/3 md:w-1/12 text-slate-100">
              <img
                src="https://raw.githubusercontent.com/devicons/devicon/6910f0503efdd315c8f9b858234310c06e04d9c0/icons/go/go-original.svg"
                alt=""
                className="w-14 self-center"
              />
              <h3 className="mt-3">Go</h3>
            </div>
            <div className="flex flex-col p-3 text-center w-1/3 md:w-1/12 text-slate-100">
              <img
                src="https://raw.githubusercontent.com/devicons/devicon/6910f0503efdd315c8f9b858234310c06e04d9c0/icons/typescript/typescript-original.svg"
                alt=""
                className="w-14 self-center"
              />
              <h3 className="mt-3">TypeScript</h3>
            </div>
            <div className="flex flex-col p-3 text-center w-1/3 md:w-1/12 text-slate-100">
              <img
                src="https://raw.githubusercontent.com/devicons/devicon/6910f0503efdd315c8f9b858234310c06e04d9c0/icons/swift/swift-original.svg"
                alt=""
                className="w-14 self-center"
              />
              <h3 className="mt-3">Swift</h3>
            </div>
          </div>
          {/* Many More button! */}
          <div className="flex justify-center gap-4 mt-auto ml-auto">
            <Link to="/">
              <button className="p-2 flex items-center gap-1 border border-cyan-950 rounded-full hover:bg-cyan-700">
                <span className="text-monospace text-slate-100">
                  Many More..
                </span>
              </button>
            </Link>
          </div>
        </div>
        {/* Footer */}
        <Footer />
      </div>
    </main>
  );
}

export default Testing;
