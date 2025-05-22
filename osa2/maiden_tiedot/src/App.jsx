import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/CountryList'
import Country from './components/Country'

const App = () => {
  const [countries, setCountries] = useState(null)
  const [country, setCountry] = useState(null)
  const [search, setSearch] = useState('')

  useEffect(() => {
    console.log('country data')
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  if (!countries) {
    return null
  }

  const viewCountry = (country) => {
    console.log(`view ${country.name.common}`)
    setCountry(country)
  }

  const handleSearch = (event) => {
    console.log(event.target.value)
    setSearch(event.target.value)
    setCountry(null)
  }

  const countriesToShow = countries.filter(country => 
    country.name.common.toLowerCase().includes(search.toLowerCase())
  )

  const viewToShow = () => {
    if (!search) {
      return null
    }
    if (country) {
      return <Country country={country} />
    }
    if (countriesToShow.length > 10) {
      return 'Too many matches, specify another filter'
    }
    if (countriesToShow.length === 1) {
      return <Country country={countriesToShow[0]} />
    }
    return <Countries countries={countriesToShow} view={viewCountry} />

  }

  return(
    <div>
      <Filter search={search} handleSearch={handleSearch}/>
      <div>
        {viewToShow()}
      </div>
    </div>
  )
}
export default App
