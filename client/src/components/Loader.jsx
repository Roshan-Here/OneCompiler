import React from 'react'

function Loader({about="Loading..."}) { 
  return (
    <div className='flex justify-center items-center h-screen w-auto overflow-x-hidden'>
      <span className="text-primary  h-20 w-20 md:h-36 md:w-36 loading loading-dots loading-lg"></span><span className=' text-lg md:text-5xl text-cyan-300 font-mono'>{about}</span>
    </div>
  )
}

export default Loader
