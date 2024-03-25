import React from 'react'
import { Link } from 'react-router-dom';

function Testing() {
  return (
    <div className='bg-gray-900 min-h-lvh'>
        <div className='flex md:justify-center p-5'>
            <div className='text-5xl md:text-7xl text-slate-200 font-extrabold'>Accelerate your career</div>
            {/* <div className='text-2xl text-slate-400 font-bold'>Live learning with industry experts. Jobs at technology companies.</div> */}
        </div>
        <div className='flex px-5 md:justify-center md:p-1'>
            {/* <div className='text-5xl md:text-7xl text-slate-200 font-extrabold'>Accelerate your career</div> */}
            <div className='text-2xl text-slate-400 font-bold'>OneCompiler is the best platform to help you enhance your skills, expand your knowledge,</div>
        </div>
        {/* new box*/}
        <div className='m-8 flex flex-col rounded-2xl shadow-lg p-2 mt-10 md:ml-6 md:mr-6 md:flex-row bg-white'>
          <img src="https://picsum.photos/800/400" alt=""
            className='h-60 md:w-80 rounded-xl bg-center bg-cover bg-gray-100'
          ></img>
          <div className='flex flex-col gap-1 p-2 md:p-6'>
            <div className='text-gray-700 font-bold text-4xl'>Developer</div>
            <p className='text-gray-500'>
            We now support 
            <span className='font-bold text-gray-800'> 80 </span>
             popular coding languages. At our core, 
             <span className='font-bold text-blue-600'> One</span>
             <span className='font-semibold text-cyan-300'>Compiler </span>
              is about developers. Our powerful development tools such as Playground help you test, debug and even write your own projects online
            </p>
            <div className='flex gap-4 mt-auto ml-auto'>
                <Link to='/about'>
                  <button className='p-2 flex items-center gap-1 border border-gray-500 rounded-full hover:bg-gray-200'>
                      <span className='text-monospace'>Read More..</span>
                  </button>
                </Link>
            </div>
          </div>

        </div>

        {/* sample languages... 6,5,4 -format*/}
        <div className='flex text-4xl font-bold justify-center text-slate-100'>
            Available languages
        </div>
        <div className='m-8 border rounded-2xl gap-5 shadow-lg bg-cyan-950'>
            {/* part one of lang 6 */}
            <div className='flex flex-row justify-between md:flex-row mt-2 font-bold ml-7 mr-7'>
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
            <div className='flex flex-row justify-between md:flex-row mt-2 font-bold ml-20 mr-20'>
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
            <div className='flex justify-center gap-4 mt-auto ml-auto'>
                <Link to='/about'>
                  <button className='p-2 flex items-center gap-1 border border-cyan-950 rounded-full hover:bg-cyan-700'>
                      <span className='text-monospace'>Many More..</span>
                  </button>
                </Link>
            </div>
        </div>

    </div> 
  )
}

export default Testing
