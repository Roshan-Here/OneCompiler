import Editor, {useMonaco } from '@monaco-editor/react'
import React, { useEffect, useState } from 'react'
import monokai from "monaco-themes/themes/Monokai.json";
import nightOwl from "monaco-themes/themes/Night Owl.json";
import themeMap from '../utils/themelist';

function Compile() {
    const deftmsg = `Welcome to Onecompiler where anything can be compiled`
    const monaco = useMonaco()
    const [theme,setTheme] = useState("monokai")
    const [language,setlanguage] = useState("python")
    const [code,setcode] = useState("")
    const handlechange=(value)=>{
        setcode(value)
    }
    console.log(code)
    const handleTheme=(value)=>{
        monaco.editor.defineTheme("wow",value)
        monaco.editor.setTheme("wow");
        console.log(value)
        setTheme(value)
    }

    useEffect(() => {
        if (monaco) {
          monaco.editor.defineTheme("newtheme", monokai);
          monaco.editor.setTheme("newtheme");
        }
      }, [monaco]);

      const ThemeList = ({ themeMap }) => {
        const themeName = Object.keys(themeMap);
        return (
          <ul>
            {themeName.map((themName, index) => {
              return (
                <li key={index} onClick={()=>handleTheme(themName)}>
                  <a>{themName}</a>
                </li>
              );
            })}
          </ul>
        );
      };

    return (
    <div className='bg-gray-900 min-h-lvh'>
        {/* theme selector,language selector,run button */}
        <div className='flex flex-row justify-between'>
            <div className='flex justify-center px-6 mt-3'>
                <div className='px-6'>
                <div className="dropdown dropdown-hover">
                    <option className='font-semibold text-slate-300'>Theme Selector</option>
                    <div tabIndex={0} role="button" className="btn btn-block btn-neutral btn-outline btn-primary mt-1 ">{theme}</div>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                    <ThemeList themeMap={themeMap}/>
                        {/* <li><a>Item 1</a></li>
                        <li><a>Item 2</a></li> */}
                    </ul>
                    </div>
                </div>
                <div className='px-12 '>Select Language</div>
            </div>
            <div className='px-6 mt-3'>Run button</div>
        </div>
      <div className='flex flex-col justify-between md:flex-row'>
        <div className='md:w-3/5 w-full px-6 mt-3 h-screen'>
            <Editor
            // error ! - border-red-500
            className='border rounded-lg border-cyan-500'
            theme={theme}
            defaultLanguage={language}
            defaultValue={deftmsg}
            onChange={handlechange}
            ></Editor>
        </div>
        
        <div className='md:w-2/5 px-6 mt-3 w-full'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit placeat exercitationem laboriosam ut quaerat vel ab unde, temporibus sed cum? Asperiores rerum earum assumenda, atque accusantium eveniet. Fuga, accusamus? Tempora!</div>
      </div>
    </div>
  )
}

export default Compile
