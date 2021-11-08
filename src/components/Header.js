import React from 'react'
import Toggle from './Toggle'
const Header = () => {
    return (
        <>
            <header className='flex items-center justify-between fixed w-full bg-white shadow p-5 sm:pl-16 sm:pr-16 dark:bg-gray-900'>
                <div>
                    <h1 className='font-bold text-gray-900 dark:text-white sm:text-4xl text-lg'>Where in the world?</h1>
                </div>
                <div >
                    <Toggle/>
                </div>
            </header>   
        </>
    )
}

export default Header
