const Persons = ({ persons, deletePerson }) => {
  const label = 'delete'

  return (
    <div>
      {persons.map(person => 
        <div 
          key={person.name}>
          {person.name} {person.number}
          <button onClick={() => deletePerson(person.id)}>{label}</button>
        </div>
      )}
    </div>
  )
}

export default Persons