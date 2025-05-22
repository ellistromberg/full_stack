import Weather from './Weather'

const Country = ({ country }) => {
    return (
    <div>
        <h1>{country.name.common}</h1>
        <div>Capital {country.capital}</div>
        <div>Area {country.area}</div>
        <h2>Languages</h2>
        <ul>
        {Object.entries(country.languages).map(([key, value]) => (
            <li key={key}>{value}</li>
        ))}
        </ul>
        <img src={country.flags.png}/>
        <h2>Weather in {country.capital}</h2>
        <Weather capital={country.capital} />
    </div>
    )
}

export default Country