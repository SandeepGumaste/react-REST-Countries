import React,{useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Filter from './Filter';

const url = 'https://restcountries.com/v2/all';

const Countries = () => {
    const[countries,setCountries]= useState([]);
    const[newCountries,setNewCountries]= useState([]);
    const [loading, setLoading] = useState(true);
    const[search,setSearch]= useState('');
    

    
    const fetchCountries= async()=>{
        const resp= await fetch(url);
        const newCountry = await resp.json();
        setCountries(newCountry)
        setNewCountries(newCountry)
        setLoading(false);

    }
    useEffect(()=>{
        fetchCountries()
    },[])

    const regions = ['Filter by Region', ...new Set(countries.map((country)=>country.region)), 'none'];
    const filterByRegion=(region)=>{
        if(region==='Filter by Region' || region==='none'){
          setNewCountries(countries)
          return;
        }
        const newCountrys = countries.filter((country)=>country.region===region)
        setNewCountries(newCountrys);
      }

      

    return (
        <>  
            <Filter regions={regions} filterByRegion={filterByRegion} searching={setSearch} />
                {loading? <h1 className='text-5xl flex items-center justify-center uppercase min-h-screen tracking-widest text-gray-900 dark:text-white font-bold'>Loading...</h1>:<section className='grid grid-cols-1 gap-10 md:gap-16 p-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:container 2xl:mx-auto pt-5 md:pl-16 md:pr-16 min-h-screen'>
                {
                    newCountries.filter((item)=>{
                        if(!search || /^\s*$/.test(search) ){
                            return item;
                        }else if(item.name.toLowerCase().includes(search.toLowerCase())){
                            return item
                        }
                    }).map((country)=>{
                        const {numericCode, name, population, region, capital, flag}=country
                        return(
                            <article key={numericCode} className=" bg-gray-100 rounded-lg shadow overflow-hidden dark:bg-gray-800 dark:hover:bg-gray-700 hover:bg-gray-100 transition-all duration-300 h-96">
                                <Link to={`/${name}`}>
                                    <div className='flex flex-col items-start'>
                                        <img src={flag} alt={name} className=" object-cover h-44 w-full"/>
                                        <div className='p-5 mb-5 mt-2'>
                                            <h2 className='font-bold text-xl text-gray-800 dark:text-white mb-2'>{name}</h2>
                                            <h4 className="text-gray-900 dark:text-white font-semibold">Population: <span className="font-light">{population}</span></h4>
                                            <h4 className="text-gray-900 dark:text-white font-semibold">Region: <span className="font-light">{region}</span></h4>
                                            <h4 className="text-gray-900 dark:text-white font-semibold">Capital: <span className="font-light">{capital}</span></h4>
                                        </div>
                                    </div>
                                </Link>
                            </article>
                        )
                    })
                }
                </section>}
            
            
        </>
    )
}

export default Countries
