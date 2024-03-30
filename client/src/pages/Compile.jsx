import Editor, {useMonaco } from '@monaco-editor/react'
import React, { useEffect, useState } from 'react'
import dracula from "monaco-themes/themes/Dracula.json";
import themeMap from '../utils/themelist';
import Footer from './../components/Footer';

function Compile() {
    const deftmsg = `Welcome to Onecompiler where anything can be compiled`
    const monaco = useMonaco()
    const [themename,setThemename] = useState("Dracula")
    const [theme,setTheme] = useState()
    const [language,setlanguage] = useState("python")
    const [code,setcode] = useState("")
    const handlechange=(value)=>{
        setcode(value)
    }
    console.log(code)
    const handleTheme=(value,name)=>{
        setTheme(value)
        setThemename(name)
        if (monaco){
            monaco.editor.defineTheme("updatetheme", value);
            monaco.editor.setTheme("updatetheme");
        }
        console.log(value)
    }

    useEffect(() => {
        if (monaco) {
          monaco.editor.defineTheme("newtheme", dracula);
          monaco.editor.setTheme("newtheme");
        }
      }, [monaco]);

      const ThemeList = () => {
        return (
        <>
            {themeMap.map((themee) => {
                return (
                <ul className='collapse' key={themee.id}>
                    <li key={themee.id} className='collapse-open' onClick={()=>handleTheme(themee.changeto,themee.name)}>
                        <a>{themee.name}</a>
                    </li>
                </ul>
              );
            })}
          </>
        );
      };

    return (
    <section>
    <div className=' bg-gray-900 bg-auto'>
        {/* theme selector,language selector,run button */}
        <div className='flex flex-row justify-between'>
            <div className='flex justify-center px-6 mt-3'>
                <div className='px-6'>
                <div className="dropdown dropdown-hover">
                    <option className='font-semibold text-slate-300'>Theme Selector</option>
                    <div tabIndex={0} role="button" className="btn btn-block btn-neutral btn-outline btn-primary mt-1">{themename}</div>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-slate-800 rounded-box w-52">
                            <ThemeList/>
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
    <Footer/>
    </section>
  )
}

export default Compile
