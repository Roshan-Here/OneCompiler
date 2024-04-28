import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Loader from '../components/Loader'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';

// Blog needs 
// Titile,smalldescription, Author + img url

function Blog() {
  const authenticated = useSelector((state) => state.user.authenticated)
  console.log(authenticated)
  const [isLoading, setisLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(()=>{
    setisLoading(true)
    setTimeout(() => {
        setisLoading(false);
        navigate('/test')
      }, 1800);
  },[])

  return (
    <>
    <Toaster/>
        {
          authenticated?
              <div>
                <p>Hello World! Authenticated User</p>
              </div>
          : //else
          <>
          {
            isLoading?
            <Loader about='Please login!'/>
            : 
            <div>
              <p>Please login</p>
            </div>
          }
          </>
        }
    </>
  )
}

export default Blog
