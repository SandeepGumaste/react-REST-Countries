import React from 'react'



    const Filter = ({regions,filterByRegion, searching}) => {
        



        return (
            <section className='flex items-start justify-between flex-col md:flex-row md:items-center md:justify-between 2xl:container 2xl mx-auto p-10 pt-32 md:pl-16 md:pr-16 pb-10'>
                <form onSubmit={(e)=>{e.preventDefault()}}>
                    <input type="search" name='search' placeholder='Search for a country...' onChange={(e)=>searching(e.target.value)} className='py-2 px-5 rounded w-72 shadow bg-white dark:bg-gray-800 dark:text-white outline-none' autoComplete='off'/>
                </form>
                <div className='mt-5 md:m-0'>
                    <select name="select" id="select" className='flex items-center text-gray-800 dark:text-white  bg-white dark:bg-gray-800 rounded shadow pl-5 pr-5 py-2 text-center outline-none' onChange={(e)=>filterByRegion(e.target.value)}>
                        {regions.map((region, index)=>(
                            <option  key={index} className='flex text-center text-gray-800 dark:text-gray-400 bg-white dark:bg-gray-800' value={region}>{region}</option>
                        ))}
                        
                    </select>
                </div>
            </section>
        )
    }

export default Filter
