import React, { useEffect, useState } from 'react'
import Footer from './../components/Footer';
import Editor,{ useMonaco } from '@monaco-editor/react';
import dracula from "monaco-themes/themes/Dracula.json";

function Pasteit() {
  const monaco = useMonaco()
  const [code,setcode] = useState("")
  const handlechangeeditor = (value)=>{
    setcode(value)
  }
  console.log(code)
  useEffect(() => {
    if (monaco) {
      monaco.editor.defineTheme("newtheme", dracula);
      monaco.editor.setTheme("newtheme");
    }
  }, [monaco]);

  return (
    <section>
      <div className='bg-gray-900 h-screen overflow-auto'>
        <div className='flex justify-between items-center'>
            <div className='flex justify-between p-5'>
                <h1 className='p-5'>Theme</h1>
                <h1 className='p-5'>Languages</h1>
            </div>
            {/* link will be hidden only active when getLink fetch saved -result */}
            <div className='flex justify-center '>
                <h1>link</h1>
            </div>
            <div className='flex p-5'>
                <h1>GetLink</h1>
            </div>
        </div>
        <div className='flex m-3 overflow-auto'>
            <div className='border p-3 border-cyan-400 w-full h-96 rounded-lg'>
                <Editor
                theme={dracula}
                language='python'
                value={code}
                onChange={handlechangeeditor}
                ></Editor>
            </div>
        </div>

      </div>
      <Footer/>
    </section>
  )
}

export default Pasteit
