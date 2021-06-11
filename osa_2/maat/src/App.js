import React, {useState, useEffect, useRef} from "react"
import './App.css';
import axios from "axios"
import Filter from "./components/Filter"
import CountryList from "./components/CountryList";

const api_key = process.env.REACT_APP_API_KEY

const App = () => {
  const [countries, setCountries] = useState([])
  const [weather, setWeather] = useState({})
  //const [newSearch, setSearch] = useState("")
  const [filteredCountries, setFilteredCountries] = useState([])
  const [capital, setCapital] = useState("")
  const notInitialRender = useRef(false)

  /*
  const filteredCountries = countries.filter(country => {
    const name = country.name.toLowerCase()
    return name.includes(newSearch)
  })
  */

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all")
    .then(response => {
      setCountries(response.data)
    })
  },[])

  useEffect(() => {
    if (notInitialRender.current) {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}`)
      .then(response => {
          const res = response.data
          setWeather(res)
      })
    } else {
      notInitialRender.current = true
    }
    
  }, [capital])

  const CountryFilter = (searchTerm) => {
    const search = searchTerm.toLowerCase()
    const filter = countries.filter(country => {
      const name = country.name.toLowerCase()
      return name.includes(search)
    }) 
    return filter
  }

  const handleSearch = (event) => {
    let search = event.target.value.toLowerCase()
    //setSearch(search.toLowerCase())
    const filter = CountryFilter(search)
    setFilteredCountries(filter)
    if (filter.length===1 ) {setCapital(filter[0].capital)}
  }

  const handleCountryView = (event) => {
    const countryName = event.target.id.toLowerCase()
    const filter = CountryFilter(countryName)
    setFilteredCountries(filter)
    setCapital(filter[0].capital)
  }

  return (
    <div>
      <Filter handleOnChange={handleSearch}/>
      <CountryList countries={filteredCountries} handleClick={handleCountryView} weather={weather}/>
    </div>
  );
}

export default App;
