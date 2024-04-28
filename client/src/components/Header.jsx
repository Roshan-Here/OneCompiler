import React from 'react'
import { Link } from 'react-router-dom'


function Header() {
  return (

<div>
    <div className='bg-slate-800 flex max-w-8xl mx-auto p-5 justify-between items-center cursor-pointer border-b-4 border-cyan-500 rounded-b-lg overflow-hidden'>
        <Link to='/'> 
            <div className='flex gap-1'>
                <span className='font-medium text-3xl text-blue-600'>One</span>
                <span className='font-semibold text-3xl text-cyan-300'>Compiler</span>
            </div>
        </Link>
        <div>
            <ul className='flex items-center gap-4 text-base text-slate-300'>
                <Link to='/about'>
                    <li className='md:inline hover:opacity-75'>About</li>
                </Link>
                <li className='hidden md:inline hover:opacity-75'>Challenges</li>
                <Link to='/blog'>
                <li className='md:inline hover:opacity-75'>Blog</li>
                </Link>
                <Link to='/login'>
                    <li className='md:inline hover:opacity-75'>Login</li>
                </Link>
            </ul>
        </div>
    </div>
</div>
  )
}

export default Header
