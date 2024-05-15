import React, { useEffect, useState } from 'react'
import Footer from './../components/Footer';
import Editor,{ useMonaco } from '@monaco-editor/react';
import { useParams, Link } from 'react-router-dom';
import dracula from "monaco-themes/themes/Dracula.json";
import CodeEditorButtons from '../components/CodeEditorButtons';
import Loader from '../components/Loader';
import { faL, faLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

// onclick = link generate, =>
// check if link already generated : toast link already generated,
// => else change the code!=>if changed delete old link data, 
// ->also check if code changed ? then create new link,


function Pasteit() {
  const monaco = useMonaco()
  const [deftmsg,setdeftmsg] = useState("Enter your code to be Saved through link")
  const [code,setcode] = useState("")
  const [themename,setThemename] = useState("Theme")
  const [theme,setTheme] = useState()
  const [language,setlanguage] = useState("Languages")
  const [langforbutton, setlangforbutton] = useState("Languages")
  const [fileextention, setfileextention] = useState("txt")
  const [isLoading, setisLoading] = useState(false)
  const [catchbot, setcatchbot] = useState(false)
  const [newlink, setnewlink] = useState("")
  const [linkclicked, setlinkclicked] = useState(true)
  const [linkGenerated, setlinkGenerated] = useState(false)
  const { pastelink } = useParams()

  // console.log(pastelink)
  const geturl=async()=>{
    const submitdata = {
      'pref_language' : language,
      'code': code
    }
    if (linkGenerated){
      toast.error("already generated")
    }
    else{
      if (catchbot===true){
        toast.error("bot found")
        }
        else{
            try{
              const res = await axios.post('/api/savecode/',submitdata)
              setnewlink(res.data['unique_link'])
              // console.log(res.data['unique_link'])
              setdeftmsg(code)
              toast.success("Url grabbed")
              setlinkGenerated(true)
              console.log(newlink)
            }
            catch(error){
              toast.error(error)
            }
          }
        }
  }

  const getdatafromlink = async()=>{
    try{
      setisLoading(true)
      console.log(pastelink)
      const res = await axios.get(`/api/savecode/${pastelink}`)
      // const res = await axios.get(`/api/viewsavedcode/`)
      console.log(res.data)
      setdeftmsg(res.data['code'])
      setcode(deftmsg)
      setlanguage(res.data['pref_language'])
      setlangforbutton(language)
      setTimeout(() => {
        // setcode()
        setisLoading(false)
      }, 800);
    }
    catch(error){
      console.log(error)
      toast.error(error)
    }
  }

  const handlecopy = (value) =>{
    try{
      navigator.clipboard.write(value)
      toast.success("Link added to clipboard")
    }
    catch(error){
      toast.error("Unable to copy to clipboard")
    }
  }

  console.log(code)

  //calls the function whenever the pastlink changes 
  useEffect(()=>{
    if(pastelink){
      console.log(pastelink)
      getdatafromlink()
    }
  },[pastelink])

  useEffect(() => {
    if (monaco) {
      monaco.editor.defineTheme("newtheme", dracula);
      monaco.editor.setTheme("newtheme");
    }
  }, [monaco]);

  useEffect(()=>{
    setcode(deftmsg)
    setisLoading(true)
    setTimeout(() => {
        setisLoading(false);
      }, 800);
  },[])

  const handlelanguage = (value) =>{
    setlanguage(value.value)
    setlangforbutton(value.name)
    setdeftmsg(value.initCode)
    setcode(deftmsg)
    setfileextention(value.extension)
}
const handlebot=()=>{
  setcatchbot(true)
}


const handlesave = ()=>{
    console.log("save button clicked!",fileextention)
    let filename = "OneCompiler."+String(fileextention)
    console.log(filename)
    const blob = new Blob([code],{type:"text/plain"})
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    link.click()

    URL.revokeObjectURL(url)

}

const handlechange=(value)=>{
    setcode(value)
    // setdeftmsg(value) => incomming data
}

const handlegetlink=()=>{
  if(linkGenerated){
    toast.error('its already generated refreash, go back and create new')
  }
  else if(deftmsg===code){
    toast.error('try to add some keys')
    setlinkclicked(true)
  }
  else{
    geturl()
    setlinkclicked(false)
  }
}

// console.log(code)

const handleTheme=(value,name)=>{
  setTheme(value)
  setThemename(name)
  if (monaco){
      monaco.editor.defineTheme("updatetheme", value);
      monaco.editor.setTheme("updatetheme");
  }
  // console.log(value)
}


  return (
    <section>
    {isLoading ? (
    <Loader about={"Loading Pasteit...."}/>):(
      <div className='bg-gray-900 bg-auto h-auto overflow-hidden'>
        <Toaster/>
        <div className='flex flex-row justify-between items-center'>
        <input type="checkbox" onClick={handlebot} className="checkbox hidden" />
        <CodeEditorButtons
                handleTheme={handleTheme}
                handlelanguage={handlelanguage}
                handlesave={handlesave}
                themename={themename}
                langforbutton={langforbutton}
            />
            {/* link will be hidden only active when getLink fetch saved -result */}
            <div className={`flex mt-3 ${linkclicked? 'hidden':''}`}>
              <Link to={`/pasteit/${newlink}`}>
                <div onClick={handlecopy} className='hidden md:btn btn-link hover:btn-accent border border-gray-300 hover:border-violet-500 overflow-hidden hover:cursor-text'>
                  <p className='p-4 text-md font-sans text-cyan-500 hover:text-black'>https://oneCompiler/{newlink}</p>
                </div>
              </Link>
            </div>

            <div className='px-0.5 md:px-6 mt-3 overflow-hidden'>
                <div onClick={handlegetlink} role='button' className='btn btn-block btn-neutral border-r-2 border-green-500 hover:border-cyan-500  hover:text-green-400 font-semibold text-white'>
                <FontAwesomeIcon className='text-2xl text-green-500 transition-colors hover:text-cyan-500' icon={faLink} />
                    Get Link
                </div>
            </div>
        </div>
        <div className='flex-row mr-6 ml-6 mt-4'>
            <div className='border p-1 border-cyan-400 w-full h-96 rounded-lg'>
                <Editor
                // theme={theme || dracula}
                language={language || 'python'}
                value={deftmsg ||code}
                onChange={handlechange}
                ></Editor>
            </div>
            {/* <div className='flex justify-center items-center p-3'>
              <p>Thank you for Using 
              <span className='font-bold text-blue-600'> One</span>
             <span className='font-semibold text-cyan-300'>Compiler </span>
              </p>
            </div> */}
        </div>

      </div>
      )}
      <Footer/>
    </section>
  )
}

export default Pasteit
