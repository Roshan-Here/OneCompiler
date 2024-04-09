import React, { useEffect, useState } from 'react'
import Footer from './../components/Footer';
import Editor,{ useMonaco } from '@monaco-editor/react';
import dracula from "monaco-themes/themes/Dracula.json";
import CodeEditorButtons from '../components/CodeEditorButtons';
import Loader from '../components/Loader';


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
      }, 400);
  },[])

  const handlelanguage = (value) =>{
    setlanguage(value.value)
    setlangforbutton(value.name)
    setdeftmsg(value.initCode)
    setcode(deftmsg)
    setfileextention(value.extension)
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
      <div className='bg-gray-900 overflow-auto'>
        <div className='flex justify-between items-center'>
        <CodeEditorButtons
                handleTheme={handleTheme}
                handlelanguage={handlelanguage}
                handlesave={handlesave}
                themename={themename}
                langforbutton={langforbutton}
            />
            {/* <div className='flex justify-between p-5'>
                <h1 className='p-5'>Theme</h1>
                <h1 className='p-5'>Languages</h1>
            </div> */}
            {/* link will be hidden only active when getLink fetch saved -result */}
            <div className='flex justify-center '>
                <h1>link</h1>
            </div>
            <div className='flex p-5'>
                <h1>GetLink</h1>
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
