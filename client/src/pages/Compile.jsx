import Editor, {useMonaco } from '@monaco-editor/react'
import React, { useEffect, useState } from 'react'
import GitHubDarkTheme from "monaco-themes/themes/GitHub Dark.json";
import TomorrowNightTheme from "monaco-themes/themes/Tomorrow-Night.json";
import CobaltTheme from "monaco-themes/themes/Cobalt.json";
import OceanicNextTheme from "monaco-themes/themes/Oceanic Next.json";
import monokai from "monaco-themes/themes/Monokai.json";
import themeMap from '../utils/themelist';

function Compile() {
    const deftmsg = `Welcome to Onecompiler where anything can be compiled`
    const monaco = useMonaco()
    const [code,setcode] = useState("")
    const [theme,setTheme] = useState(themeMap.Active4D)
    const handlechange=(value)=>{
        setcode(value)
    }
    const handleTheme=(value)=>{
        setTheme(value)
    }
    console.log(code)
    useEffect(() => {
        if (monaco) {
          monaco.editor.defineTheme("monokai", monokai);
          monaco.editor.setTheme("monokai");
        }
      }, [monaco]);
    return (
    <div className='bg-gray-900 min-h-lvh'>
        {/* theme selector,language selector,run button */}
        <div className='flex flex-row justify-between'>
            <div className='flex justify-center px-6 mt-3'>
                <div className='px-6 '>Language seletor</div>
                <div className='px-12 '>Theme seletor</div>
            </div>
            {/* <div className='px-6 mt-3'>Theme seletor</div> */}
            <div className='px-6 mt-3'>Run button</div>
        </div>
      <div className='flex flex-col justify-between md:flex-row'>
        <div className='md:w-3/5 w-full p-6 h-screen'>
            <Editor
            // error ! - border-red-500
            className='border rounded-lg border-cyan-500'
            theme="vs-black"
            defaultLanguage="vs-code"
            defaultValue={deftmsg}
            onChange={handlechange}
            ></Editor>
        </div>
        
        <div className='md:w-2/5 p-6 w-full'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit placeat exercitationem laboriosam ut quaerat vel ab unde, temporibus sed cum? Asperiores rerum earum assumenda, atque accusantium eveniet. Fuga, accusamus? Tempora!</div>
      </div>
    </div>
  )
}

export default Compile
