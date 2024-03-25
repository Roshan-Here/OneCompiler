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
        {/* new */}
        <div className='m-3 flex flex-col rounded-2xl shadow-lg p-2 mt-10 md:ml-6 md:mr-6 md:flex-row bg-white'>
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
    </div> 
  )
}

export default Testing
