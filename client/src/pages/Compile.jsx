import Editor, {useMonaco } from '@monaco-editor/react'
import React, { useEffect, useState } from 'react'
import dracula from "monaco-themes/themes/Dracula.json";
import themeMap from '../utils/themelist';
import Footer from './../components/Footer';
import languagesList from '../utils/listLanguges';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCirclePlay, faFloppyDisk} from '@fortawesome/free-solid-svg-icons'
import { axios } from 'axios';

function Compile() {
    const monaco = useMonaco()
    const [deftmsg,setdeftmsg] = useState("Welcome to Onecompiler where anything can be compiled")
    const [themename,setThemename] = useState("Theme")
    const [theme,setTheme] = useState()
    const [language,setlanguage] = useState("Languages")
    const [langforbutton, setlangforbutton] = useState("Languages")
    const [fileextention, setfileextention] = useState("txt")
    const [code,setcode] = useState("")
    const [codestatus,setcodestatus] = useState("Nill")
    const [runtime, setruntime] = useState("Nill")
    const [memusage, setmemusage] = useState("Nill")
    const submitdata = {

    }
    const runCode= async()=>{
        axios.post(
'url',{submitdata}
        )
        .then(res=>console.log(res))
        .catch(err=>console.log(err))
    }
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
                  <li key={themee.id} className='collapse-open hover:cursor-pointer' onClick={()=>handleTheme(themee.changeto,themee.name)}>
                      <a>{themee.name}</a>
                  </li>
              </ul>
              );
          })}
          </>
      );
      };

    const handlelanguage = (value) =>{
        setlanguage(value.name)
        setlangforbutton(value.value)
        setdeftmsg(value.initCode)
        setcode(deftmsg)
        setfileextention(value.extension)
    }
    console.log(deftmsg)

    const LangList = () => {
    return (
        <>
        {languagesList.map((lang) => {
            return (
            <ul className='collapse menu' key={lang.id}>
                <li key={lang.id} className='collapse-open hover:cursor-pointer' onClick={()=>handlelanguage(lang)}>
                    <a>{lang.name}</a>
                </li>
            </ul>
            );
        })}
        </>
    );
    };

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


    return (
    <section>
    <div className=' bg-gray-900 bg-auto h-auto overflow-hidden'>
        {/* theme selector,language selector,run button */}
        <div className='flex flex-row justify-between'>
            <div className='flex justify-center px-2 md:px-6 mt-3'>
                <div className='px-6'>
                <div className="dropdown dropdown-hover">
                    {/* <option className='font-semibold text-slate-300'>Theme Selector</option> */}
                    <div tabIndex={0} role="button" className="btn btn-block btn-neutral btn-outline btn-primary mt-1">{themename}</div>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-slate-800 rounded-box w-52">
                            <ThemeList/>
                        </ul>
                    </div>
                </div>
                <div className='px-5'>
                <div className="dropdown dropdown-hover">
                    {/* <option className='font-semibold text-slate-300'>Select Language</option> */}
                    <div tabIndex={0} role="button" className="btn btn-block btn-neutral btn-outline btn-accent mt-1">{language}</div>
                        <ul tabIndex={0} className="dropdown-content z-[1] shadow bg-slate-800 rounded-box w-56 max-h-48 overflow-y-auto">
                            <LangList/>
                        </ul>
                    </div>
                </div>
                <div className='px-5'>
                    <div onClick={handlesave} role='button' className='hidden md:btn btn-block btn-neutral border-r-2 border-green-500 hover:border-cyan-500 mt-1 hover:text-green-400 font-semibold text-white'>
                        Save
                    <FontAwesomeIcon className='text-2xl text-blue-400 transition-colors' icon={faFloppyDisk} />
                    </div>
                </div>
            </div>
            <div className='px-0.5 md:px-6 mt-3'>
                <div role='button' className='btn btn-block btn-neutral border-r-2 border-green-500 hover:border-cyan-500 mt-1 hover:text-green-400 font-semibold text-white'>
                <FontAwesomeIcon className='text-2xl text-green-500 transition-colors hover:text-cyan-500' icon={faCirclePlay} />
                    Run
                </div>
                {/* <button className='bg-success p-3 border border-green-400 hover:border-blue-600 rounded-md font-semibold text-white'>Run</button> */}
            </div>
        </div>
      <div className='flex flex-col justify-between md:flex-row m-3'>
        <div className='md:w-3/5 w-full h-96 md:px-6 px-4 md:h-auto'>
            <Editor
            // error ! - border-red-500 : border-cyan-500
            className='border rounded-lg border-cyan-500'
            theme={theme || "Dracula"}
            language={langforbutton || "python"}
            value={deftmsg}
            onChange={handlechange}
            ></Editor>
        </div>
        
        <div className='md:w-2/5 md:px-2 px-6 w-4.5/5 over'
        >
            <div className='my-2 text-white text-xl font-semibold'>
                Output
            </div>
            <div className='w-full border border-gray-400 rounded-md h-44 md:h-96'>
                {/* text-green-500 : text-red-500 */}
                <pre className='p-2 text-green-500 text-lg overflow-hidden'>
                    output from backend is this ok ?
                </pre>
            </div>
            <div className='my-2 text-white text-xl font-semibold'>
                Statistics 
            </div>
            <div className='border border-red-500 rounded-md'>
                <ul className='font-semibold text-xl p-3'>
                    <li>Status : {codestatus}</li>
                    <li>Run Time : {runtime}</li>
                    <li>Memory Usage : {memusage}</li>
                </ul>
            </div>
        </div>
      </div>
    </div>
    <Footer/>
    </section>
  )
}

export default Compile