const Countries = ({ countries, view}) => {
    return (
      <div>
        {countries.map(country => (
          <div key={country.name.common}>{country.name.common}
          <button onClick={() => view(country)}>Show</button>
          </div>
        ))}
      </div>
    )
  }

export default Countries