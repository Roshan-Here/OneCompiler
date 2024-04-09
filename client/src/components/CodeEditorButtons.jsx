import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons'
import ThemeList from '../components/ThemeList';
import LangList from '../components/LangList';

function CodeEditorButtons({
    handleTheme,
    handlelanguage,
    handlesave,themename,
    langforbutton
}) {
  return (
    <>
    <div className='flex justify-center px-2 md:px-6 mt-3'>
        <div className='px-6'>
        <div className="dropdown dropdown-hover">
            {/* <option className='font-semibold text-slate-300'>Theme Selector</option> */}
            <div tabIndex={0} role="button" className="btn btn-block btn-neutral btn-outline btn-primary mt-1">{themename}</div>
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-slate-800 rounded-box w-52">
                    <ThemeList handleTheme={handleTheme}/>
                </ul>
            </div>
        </div>
        <div className='px-5'>
        <div className="dropdown dropdown-hover">
            {/* <option className='font-semibold text-slate-300'>Select Language</option> */}
            <div tabIndex={0} role="button" className="btn btn-block btn-neutral btn-outline btn-accent mt-1">{langforbutton}</div>
                <ul tabIndex={0} className="dropdown-content z-[1] shadow bg-slate-800 rounded-box w-56 max-h-48 overflow-y-auto">
                    <LangList handlelanguage={handlelanguage}/>
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
    </>
  )
}
export default CodeEditorButtons
