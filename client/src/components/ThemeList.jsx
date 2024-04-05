import React from 'react'
import themeMap from '../utils/themelist';


function ThemeList({handleTheme}) {
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
  )
}

export default ThemeList
