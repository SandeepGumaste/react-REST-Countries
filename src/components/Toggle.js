import React,{useState} from 'react'
import {FaMoon, FaSun} from 'react-icons/fa'

const Toggle = () => {
    const [dark,setDark]=useState(false);

    const toggleTheme = ()=>{
        document.body.classList.toggle('dark')
        setDark(!dark);
    }

    return (
        <>
            <button className='flex items-center' onClick={()=>toggleTheme()}>
                {dark?<FaSun className='text-white' />:<FaMoon className='text-gray-900' />}
                <h4 className='ml-1 text-xs md:text-lg text-gray-900 dark:text-white'>{dark?'Light mode':'Dark Mode'}</h4>
            </button>
        </>
    )
}

export default Toggle
