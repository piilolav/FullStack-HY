import React from 'react'

const Name =({name, deletePerson}) =>{
  return (
  <p> {name.name} {name.number} <button onClick={()=>deletePerson(name.id)}>delete</button></p>
  )
}

const Content =({persons,allPersons, deletePerson}) =>{
  
  if (persons.length >0){
    return(
    <ul>
      {persons.map((name,i) =>
        <Name key={i} name={name} deletePerson={deletePerson}/>
      )}
    </ul>
  )
}
else {
  return(
    <ul>
      {allPersons.map((name, i) =>
        <Name key={i} name={name} deletePerson={deletePerson}/>
      )}
    </ul>
  )
}
}

export default Content