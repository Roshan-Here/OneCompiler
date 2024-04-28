import React, { useEffect } from 'react'
import Footer from './../components/Footer';
import TokenAuth from '../utils/TokenAuth';
// import privateaxious from '../utils/api';
// import { useSelector } from 'react-redux';



function CommingSoon() {
  TokenAuth()
//   const accessToken = useSelector((state) => state.user.ACESS_TOKEN)
//   console.log(accessToken)
// privateaxious()

  return (
      <>
      <div className='flex flex-col justify-center min-h-lvh bg-cyan-800 overflow-hidden p-5'>
        <div className='p-5 font-extrabold text-6xl md:text-8xl'>Under Construction !</div>
        <p className='text-2xl md:text-4xl font-semibold px-5'>Please Come back later</p>
      </div>
      <Footer/>
      </>
  )
}

export default CommingSoon
