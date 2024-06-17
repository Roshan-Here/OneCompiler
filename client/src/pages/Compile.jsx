import Editor, {useMonaco } from '@monaco-editor/react'
import React, { useEffect, useState } from 'react'
import dracula from "monaco-themes/themes/Dracula.json";
import Footer from './../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlay, faL } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import Loader from './../components/Loader';
import CodeEditorButtons from '../components/CodeEditorButtons';
import toast, { Toaster } from 'react-hot-toast';
import TokenAuth from '../utils/TokenAuth';

function Compile() {
    TokenAuth(); // refreahing token
    const monaco = useMonaco()
    const [deftmsg,setdeftmsg] = useState("Welcome to Onecompiler where anything can be compiled")
    const [themename,setThemename] = useState("Theme")
    const [theme,setTheme] = useState()
    const [language,setlanguage] = useState("Languages")
    const [langforbutton, setlangforbutton] = useState("Languages")
    const [fileextention, setfileextention] = useState("txt")
    const [code,setcode] = useState("")
    const [codestatus,setcodestatus] = useState("Nill")
    const [outputdata, setoutputdata] = useState("Your output will be displayed here!")
    const [runtime, setruntime] = useState("Nill")
    const [memusage, setmemusage] = useState("Nill")
    const [errorstatus, seterrorstatus] = useState(false)
    const [isLoading, setisLoading] = useState(false)
    const [outputLoading, setoutputLoading] = useState(false)
    const [catchbot, setcatchbot] = useState(false)

    // console.log(import.meta.env.VITE_BACKEND_URL)
    // console.log(language)
    const repetedusage = (value) =>{
        setruntime(value.data["run time"])
        setmemusage(value.data["memory usage"])
        if (value.data["Error"]){
            seterrorstatus(true)
            // console.log(value.data["Error"])
            setoutputdata(value.data["Error"])
            setcodestatus("Failure")
            // console.log(value.data["memory usage"]); 
            // console.log(value.data["run time"]);
        }
        else{
            seterrorstatus(false)
            setoutputdata(value.data["Compiled Output"])
            setcodestatus("Success")
            // console.log(value.data["Compiled Output"]); 
            // console.log(value.data["memory usage"]); 
            // console.log(value.data["run time"]);
        }
    }

    const runCode= async()=>{
        if (catchbot===true){
        toast.error("bot found")
        }
        else{
            const submitdata = {
                'pref_language' : language,
                'code': code
            }
            try {
                setoutputLoading(true)
                const res = await axios.post(`/api/run/`, submitdata);
                repetedusage(res)
                toast.success("Compiled Sucessfully")
                setoutputLoading(false)
            } catch (error) {
                toast.error(`Error ${error}`)
                setoutputLoading(false)
                // console.log(error);
            }
        }

    }
    const handlechange=(value)=>{
        setcode(value)
    }
    // console.log(code)
    const handlebot=()=>{
        setcatchbot(true)
    }
    
    const handleTheme=(value,name)=>{
        setTheme(value)
        setThemename(name)
        if (monaco){
            monaco.editor.defineTheme("updatetheme", value);
            monaco.editor.setTheme("updatetheme");
        }
        // console.log(value)
    }

    useEffect(() => {
        setcode(deftmsg) // initial state
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
    // console.log(code)

    const handlesave = ()=>{
        // console.log("save button clicked!",fileextention)
        let filename = "OneCompiler."+String(fileextention)
        // console.log(filename)
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
        {isLoading ? (
        <Loader about={"Loading PlayGround...."}/>):(
        <div className=' bg-gray-900 bg-auto h-auto overflow-hidden'>
        <Toaster/>
        {/* theme selector,language selector,run button */}
        <div className='flex flex-row justify-between'>
            {/* repeated usage so created new component */}
            <CodeEditorButtons
                handleTheme={handleTheme}
                handlelanguage={handlelanguage}
                handlesave={handlesave}
                themename={themename}
                langforbutton={langforbutton}
            />
            <div className='px-0.5 md:px-6 mt-3'>
                <div onClick={runCode} role='button' className='btn btn-block btn-neutral border-r-2 border-green-500 hover:border-cyan-500 mt-1 hover:text-green-400 font-semibold text-white'>
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
            className={`border rounded-lg border-cyan-500 ${errorstatus ? 'border-red-500': 'border-cyan-500'}`}
            // theme={theme || "Dracula"}
            language={language || "python"}
            value={deftmsg}
            onChange={handlechange}
            ></Editor>
        </div>
        
        <div className='md:w-2/5 md:px-2 px-6 w-4.5/5'
        >
            <div className='my-2 text-white text-xl font-semibold'>
                Output
            </div>
            <input type="checkbox" onClick={handlebot} className="checkbox hidden" />
            <div className={` w-full border ${errorstatus ? 'border-red-400': 'border-cyan-400'} rounded-md h-44 md:h-96 overflow-y-auto`}>
                {/* text-green-500 : text-red-500 */}
                <div className={`p-2 text-lg overflow-hidden font-mono ${errorstatus === true ? 'text-red-500' : 'text-green-500'}`}>
                    {outputLoading ?(
                        <div className='flex justify-center items-center p-6'>
                            <span className="loading loading-bars loading-lg"></span>
                        </div>
                    ):(
                        <span>{outputdata}</span>
                        // {outputdata}
                    )}
                </div>
            </div>
            <div className='my-2 text-white text-xl font-semibold'>
                Statistics 
            </div>
            <div className='border border-cyan-500 rounded-md p-2'>
                <ul  className='font-semibold text-xl p-3  overflow-y-auto'>
                    <li>Status : {codestatus}</li>
                    <li>Run Time : {runtime}</li>
                    <li>Memory Usage : {memusage}</li>
                </ul>
            </div>
        </div>
        </div>
    </div>
        )}
    <Footer/>
    </section>
  )
}

export default Compile