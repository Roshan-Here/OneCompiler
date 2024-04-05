import React from 'react'
import languagesList from '../utils/listLanguges';

function LangList({handlelanguage}) {
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
  )
}

export default LangList
