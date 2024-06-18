import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { SetRefreshToken, SetTokenFailed, SetTokenSucess } from '../redux/User/userSlice';

function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const authenticated = useSelector((state) => state.user.authenticated);
    const [formdata, setformdata] =  useState({})
    const handlechange = (e)=>{
        setformdata({...formdata, [e.target.id]:e.target.value})
    }
    // console.log(formdata)

    const LoaderText = authenticated?"Aleady Logined..":""

    useEffect(()=>{
        if(authenticated){
            toast.error("Aleady Logined.")
            setTimeout(() => {
                navigate('/')
            }, 200);
        }
    },[])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const res = await axios.post('/api/login/',formdata,{
                headers: {
                    "Content-Type": "application/json",
                  },
            })
            const data = res.data
            // console.log(data)
            dispatch(SetTokenSucess(data.access))
            dispatch(SetRefreshToken(data.refresh))
            toast.success("User Signin Sucessfully")
            setTimeout(() => {
                navigate('/')
            }, 1000);
        }catch(error){
            dispatch(SetTokenFailed())
            toast.error(`Err: ${error}`)
        }
    }

  return (
    <div className='flex justify-center overflow-hidden'>
    <Toaster/>
      <div className='flex flex-col m-20 items-center'>
        <div className='card w-96 bg-blue-400'>
            <div className='card-body text-black'>
                <div className='flex flex-col items-center'>
                    <p className='m-5 font-bold text-2xl'>Login !</p>
                </div>
                    <form onSubmit={handleSubmit} method="post">
                        <div className=''>
                            <label className='block font-medium text-lg text-gray-900 m-1' htmlFor="username"><FontAwesomeIcon className='text-md' icon={faUser}/> Username</label>
                            <input className='input input-bordered w-80 text-zinc-300' type="text" placeholder='username' onChange={handlechange} id="username" />
                        </div>
                        <div className=''>
                            <label className='block text-lg font-medium text-gray-900 m-1' htmlFor="password"><FontAwesomeIcon className='text-md' icon={faLock}/> Password</label>
                            <input className='input grow input-bordered w-80 text-zinc-300' type="password" placeholder='password' onChange={handlechange} id="password" />
                        </div>
                        <div className='flex flex-col items-center mt-4'>
                            <button className='btn btn-active hover:bg-red-300 bg-yellow-300 w-44 btn-sm text-slate-900' type="submit">Login</button>
                        </div>
                    </form>
                <div className='flex flex-col items-center mt-3'>
                    <span>New Here? <Link to="/">Create one</Link></span>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Login
