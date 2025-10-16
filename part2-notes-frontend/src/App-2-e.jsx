import {useState, useEffect} from 'react'
import axios from 'axios'

const App = () => {
    const [countries, setCountries] = useState([])
    const [searchInfo, setSearchInfo] = useState('')


    useEffect(() => {
        axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
        .then(response => {
            setCountries(response.data)
        })
    }, [])

    const handleCountryInput = (event) => -setSearchInfo(event.target.value.toLowerCase());
    
    const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(searchInfo))
    
    return(
        <div>
            find countries <input type="search" placeholder='search for country' onChange={handleCountryInput}/>
            <SearchedCountries countries={filteredCountries}/>
        </div>
    )

}


const SearchedCountries = ({countries}) => {
    console.log(countries)

    if (countries.length > 10) return <p>Please use the search engine.</p>
    else if (countries.length === 1) {
        const country = countries[0]
        return (
            <div>
                <h2>{country.name.common}</h2>
                <p>Capital: {country.capital}</p>
                <p>Area: {country.area}</p>
                <h3>Languages</h3>
                <ul>
                    {Object.values(country.languages).map((language, index) => <li key={index}>{language}</li>)}
                </ul>
                <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
            </div>
        )
    }
    else {
        return (
        <ul>
            {countries.map(country => <li key={country.cca3}>{country.name.common}</li>)}
        </ul>
        )
    } 
}

export default App