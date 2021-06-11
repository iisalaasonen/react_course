import React from "react"

const CountryList = ({countries, handleClick, weather}) => {
    const length = countries.length
    if (length>10) {
        return <p>Too many matches, specify another filter</p>
    } 
    if (length<=10 && length>1) {
        return (
            <>
        <table>
        <tbody>
            <tr>
                <th>
                    Country
                </th>
            </tr>
            {countries.map(country => {
                return (
                    <tr key={country.name}>
                        <td>{country.name}</td>
                        <td><button id={country.name} onClick={handleClick}>show</button></td>
                    </tr>
                )
            }

            )}
            
        </tbody>
        </table>
        </>
        )
    }
    if (length===1) {
        const c = countries[0]
        return (
            <>
            <h2>{c.name}</h2>
            <p>Capital: {c.capital}</p>
            <p>Population: {c.population}</p>
            <h3>Languages</h3>
            <ul>
                {c.languages.map(language => <li key={language.name}>{language.name}</li>)}
            </ul>
            <img src={c.flag} alt="country flag" width="100" height="100"/>
            <h2>Weather in {c.capital}</h2>
            <p>temperature {weather.main.temp}</p>
            </>
            )
    }
    if (length===0){
        return  <p>Start searching countries</p>
    }
    }

export default CountryList;