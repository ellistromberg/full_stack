const Filter = ({ search, handleSearch }) => {
  return (
    <form>
      <div>
        find countries
        <input
          value={search}
          onChange={handleSearch}
        />
      </div>
    </form>
  )
}

export default Filter