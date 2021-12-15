import React from 'react'


const Header =({course}) => {
  return(
    <div>
      <h1>{course}</h1>
    </div>
  )
}

const Total =({parts}) => {
  const total =parts.reduce((currentValue,previousValue)=> currentValue+previousValue.exercises,0)

  return(
    <div>
      <b>
        Total of {total} exercises
      </b>
    </div>
  )
}

const Part =({part, exercises}) => {
//  console.log(props)
  return(
    <div>
      <p>
        {part} {exercises}
      </p>
    </div>
  )
}

const Content =({parts}) =>{
 // console.log(props)
  return(
    <div>
      {parts.map((part,i) =>
      <Part key={i} part={part.name} exercises={part.exercises}/>
      )}
    </div>
  )
}


const Course=({course})=>{
//  console.log(course.name)
//Muutetaan tänne mappaus, jossa käydään kurssi id:t läpi


    return(
      <div>
        {course.map((course,i) =>
        <div key={course.id}>
          <Header key={i} course= {course.name} />
          <ul>
          <Content parts={course.parts} />
          <Total parts={course.parts} />
          </ul>
      </div>

      )}
      </div>
    )
}

export default Course
