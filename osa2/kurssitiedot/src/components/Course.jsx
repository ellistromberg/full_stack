const Header = ({ course }) => {
  return (
    <div>
      <h2>{course}</h2>
    </div>
  )
}
  
const Part = ({ name, exercises }) => {
  return (
    <div>
     <p>{name} {exercises}</p>
    </div>
  )
}
  
const Content = ({ parts }) => {
  return (
    <div>
      <div>
        {parts.map(part =>
          <Part key={part.id} name={part.name} exercises={part.exercises} />
        )}
      </div>
    </div>
  )
}
  
const Course = ({ name, parts }) => {
  console.log(name, parts)
  
  const total = parts.reduce( (s, p) => {
    console.log('what is happening', s, p)
    return s + p.exercises
  }, 0)
  
  return (
    <div>
      <Header course={name} />
      <Content parts={parts} />
      <p><b>total of {total} exercises</b></p>
    </div>
  )
}

export default Course