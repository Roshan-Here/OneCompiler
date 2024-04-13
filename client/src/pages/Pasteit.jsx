import React, { useEffect, useState } from 'react'
import Footer from './../components/Footer';
import Editor,{ useMonaco } from '@monaco-editor/react';
import { useParams } from 'react-router-dom';
import dracula from "monaco-themes/themes/Dracula.json";
import CodeEditorButtons from '../components/CodeEditorButtons';
import Loader from '../components/Loader';
import { faL, faLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// onclick = link generate, =>
// check if link already generated : toast link already generated,
// => else change the code!=>if changed delete old link data, 
// ->also check if code changed ? then create new link,


function Pasteit() {
  const pastelink = useParams()
  console.log(pastelink)
  if(Object.keys(pastelink).length===0){
    console.log("Empty!")
  }
  else{
    console.log("non Empty")
  }
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

  console.log(code)
  useEffect(() => {
    if (monaco) {
      monaco.editor.defineTheme("newtheme", dracula);
      monaco.editor.setTheme("newtheme");
    }
  }, [monaco]);

  useEffect(()=>{
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
  if(deftmsg===code){
    setlinkclicked(false)
  }
  else{
    setlinkclicked(true)
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
                <div className='hidden md:btn btn-active hover:btn-accent border border-gray-300 hover:border-violet-500 overflow-hidden'>
                  <p className='p-4 text-md font-sans text-cyan-500 hover:text-black'>{newlink}</p>
                </div>
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
                theme={theme || dracula}
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
