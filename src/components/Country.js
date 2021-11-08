import React,{useEffect, useState} from 'react'
import { Link, useParams } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
    
const Country = () => {
    const [country, setCountry]=useState([]);
    const[list,setList]= useState([]);
    const[loading,setLoading] = useState(true);
    const[change,setChange]= useState(true);
    const {name} = useParams()

    const fetchList= async()=>{
        const resp= await fetch('https://restcountries.com/v2/all');
        const newList = await resp.json();
        setList(newList)
    }
    
    useEffect(()=>{    
        const fetchCountry= async()=>{
            const resp = await fetch(`https://restcountries.com/v2/name/${name}`);
            const country= await resp.json();
            setCountry(country);
            
        }
        fetchCountry()
        fetchList()
        setLoading(false)

    },[change])



    return (
        <>
        {loading? <h1 className='text-5xl flex items-center min-h-screen justify-center uppercase tracking-widest '>Loading...</h1>:<section className=' min-h-screen pt-20 xl:max-w-7xl xl:mx-auto px-10 pb-12'>
        <button ><Link to='/' className=' text-base text-gray-800 dark:text-gray-100 flex items-center mt-8 mb-10 p-3 pl-7 pr-7 justify-around bg-white shadow-lg rounded dark:bg-gray-900'><FaArrowLeft/><h4 className='ml-5'>Back</h4></Link></button>
        {country.map((item)=>{
            const {numericCode, nativeName, population, flag, borders, languages, topLevelDomain, region,subregion, currencies, capital} = item
            return(
                <article key={numericCode} className='lg:flex lg:justify-between'>
                    <div className="lg:w-6/12 lg:mr-10">
                        <img src={flag} alt={name} className='shadow-lg' />
                    </div>
                    <div>
                        <div className='mt-10 text-gray-900 dark:text-gray-50 lg:flex lg:items-end'>
                            <div>
                                <h2 className='text-2xl sm:text-3xl lg:text-6xl font-bold mb-5'>{name}</h2>
                                <h5>Native Name: <span>{nativeName}</span> </h5>
                                <h5>Population: <span>{population}</span></h5>
                                <h5>Region: <span>{region}</span> </h5>
                                <h5>Sub Region: <span>{subregion}</span> </h5>
                                <h5>Capital: <span>{capital}</span> </h5>
                            </div>
                            <div className='mt-6 lg:pl-10 lg:mb-12'>
                                <h5>Top Level Domain: <span>{topLevelDomain}</span> </h5>
                                <h5>Currencies: {currencies && <span>{currencies[0].name}</span>} </h5>
                                <h5>Languages: {languages && <span>{languages[0].name}</span> }</h5>
                            </div>
                            

                        </div>
                        <div className='flex flex-col lg:mt-5'>
                            <h3 className='font-bold text-gray-900 dark:text-gray-50'>Border Countries: </h3>
                            <div>
                                {list.map((item)=>{
                                    const {alpha3Code,name} = item;
                                    
                                    for(let i=0; i<(borders?borders.length:0);i++){
                                        if(borders[i]===alpha3Code){
                                            return (<button className=' bg-gray-100 shadow-md dark:bg-gray-900 px-2 text-gray-900 dark:text-gray-50 rounded py-1 mr-2 mt-2' key={alpha3Code} onClick={()=>{setChange(!change)}}><Link to={`/${name}`}> {name} </Link></button>)
                                        }
                                    }
                                    return(null)
                                })}
                            </div>
                        </div>
                    </div>
                </article>
            )
        })}
     </section>}
         
        </>
    )
}

export default Country
