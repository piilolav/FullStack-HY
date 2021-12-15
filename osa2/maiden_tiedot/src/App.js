
import axios from 'axios';
import { useEffect, useState } from 'react';

const App=()=> {
  const [countries, setCountries] =useState([])
  const [newFilter, setNewFilter] =useState('')
  const [filteredCountry, setFilteredCountry] =useState([])
 
  useEffect(() => {
//    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  },[])
  // console.log("Number of countries ",countries.length)
  // console.log(countries)

  const handleFilterChange =(event) =>{
    setNewFilter(event.target.value)
    
    const regex =new RegExp(newFilter,'i');
    const filteredCountries =() => countries.filter(country => country.name.official.match(regex))
    setFilteredCountry(filteredCountries)
    // console.log("paljonko suodatettu", filteredCountry.length)
    
  }

  const Name=({country})=>{
    return(
      <div>
      <p>
        {country.name.official} <button onClick={()=>setFilteredCountry[country]}>show</button>
      </p>
      </div>
    )
  }

  /*
  const GetLanguages=({languages}) =>{
    return(
      <div>
        <p>
          {languages.name}
        </p>
      </div>
      
  /*
      languages.map((name, i)=> {
        <div>
          <p>{name.name}</p>
        </div>
      }) 

      */
/*
      const selectCountry=(id)=>{
        const selectedCountry = countries.filter(country =>country.id ===id)
        const selectedCountryName =selectedCountry[0].name

        console.log(selectedCountryName, " and id is ", selectedCountryName[0].id)
        setNewFilter(selectedCountry)
      }

      */

  const PrintLanguages=({languages}) =>{
    //const objArray =Object.keys({languages})
    // printObject(languages)
    var array= Object.values(languages)
    return (
      array.map(value=>
        <li> {value}</li>
      )
    )
    } 
      
      
  
  const CountryInfo=({country}) =>{
    return(
      <div>
        <h2>{country.name.official}</h2>
        <p>capital: {country.capital}</p>
        <p>region: {country.region}</p>
        <p>area: {country.area}</p>
        <h3>Languages</h3>
        <ul>
          <PrintLanguages languages={country.languages} />
        </ul>
        <img src={country.flags.svg} height={150} width={150} alt='flag' />
      </div>
    )
  }
  
  const Content = ({filtCountries, selectCountry}) =>{
//    console.log("pituus", filteredCountry.length)
    
    if(filteredCountry.length >10){
      return (
      <div>
      <p>Too many matches, specify  another filter</p>
      </div>)
    }

    if(filteredCountry.length ===1){
      return(
        <CountryInfo country={filteredCountry[0]}/>
      )
    }
    else {
      return(
      filtCountries.map((country,i)=>
      <Name key={i} country={country}/>
      )
    )}
  }

  return(
   <div>
      <h2>Counry listing</h2>
    <div>
        find countries <input value={newFilter} onChange={handleFilterChange}/>
    </div>    
        <Content filtCountries={filteredCountry} />
  </div>  
  )
}

export default App;


/*
kielien mappaus 1:

{filteredCountry[0].languages.map(language => <li key={language.name} >{language.name}</li>)}
filtered country.languages.map not a function


  const Content =({country}) =>{
    if (country.lenght >10) { return (
      <p>Liikaa vaihtoehtoja, tarkenna hakua</p>
    )
  }
    if (country.lenght <=10 && country.lenght >2) { return (
       <ul>
         {country.map((country, i)=>
         <p> key={i} {country.name.official} </p>
         )}
       </ul>
    )
    } else {
      return (
        <p> {country.name} </p>)
    }
  }



*/