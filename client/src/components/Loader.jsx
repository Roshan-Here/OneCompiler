import React from 'react'

function Loader() {
  return (
    <div className='flex justify-center items-center h-screen w-auto overflow-x-hidden'>
      <span className="text-primary  h-20 w-20 md:h-36 md:w-36 loading loading-dots loading-lg"></span><span className=' text-lg md:text-5xl font-mono'>Loading PlayGround....</span>
    </div>
  )
}

export default Loader
