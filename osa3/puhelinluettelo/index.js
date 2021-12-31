require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors =require('cors')
const Person = require('./models/person')


app.use(express.json())
app.use(cors())
app.use(express.static('build'))
//huom. morgan antaa jo post pyynnön mukana tulevan datan?
//app.use(morgan('tiny'))

/*
Nämä viedään omaan moduliin - poista mahdollisesti myöhemmin

const url =
  `mongodb+srv://vpiilola:<Password>@cluster0.sptgz.mongodb.net/Phonebook?retryWrites=true`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) =>{
    returnedObject.id =returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Person = mongoose.model('Person', personSchema)

*/

//kustomoitu morgan toimii
morgan.token('postData', (request) => {
  if (request.method == 'POST') return ' ' + JSON.stringify(request.body)
  else return ' '
})

app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :postData'
  )
)

let persons = [
  { id: 0, name: 'Arto Hellas', number: '040-123456' },
  { id:1, name: 'Ada Lovelace', number: '39-44-5323523' },
  { id:2, name: 'Dan Abramov', number: '12-43-234345' },
  { id:3, name: 'Mary Poppendieck', number: '39-23-6423122' }
]


app.get('/api/persons', (req, res) => {
  //console.log(typeof(persons))
  // res.json(persons)
  Person.find({}).then(persons => {
    res.json(persons)
  })
})

app.get('/info', (req, res) => {
  //console.log(typeof(persons))
  
  //const info =`Phonebook has info for ${pituus} people`
  const origDate =new Date()
  const date = origDate.toLocaleString()
  const weekday = ['Sun','Mon','Tues','Wed','Thur','Fri','Sat']
  let day= weekday[origDate.getDay()]

  //haetaan offset tunteina
  const offset =origDate.getTimezoneOffset()/60
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone

  Person.find({}).then(persons =>{
    res.send(`<div> 
                <p> Phonebook has info for ${persons.length} people </p> 
                <p> ${day} ${date} GMT ${offset} (${timezone})  </p> 
            </div>`)
  })
  
})

app.get('/api/persons/:id', (req, res, next) => {
//    const id =Number(req.params.id)
//    const person =persons.find(person => person.id===id)
//    console.log(typeof(id), id, typeof(persons[0]))
//    console.log(persons[0])
  Person.findById(req.params.id)    
    .then(person =>{
      if(person){
        res.json(person)
      } else{
        res.status(404).end()
      }

    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  //const id =Number(request.params.id)
  //persons=persons.filter(person => person.id !==id)
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
    
})
/*
const generateId=() =>{
  const maxId = persons.length > 0
    ? Math.max(...persons.map(n => n.id))
    : 0
  return maxId + 1
}
*/

function nameExists(name){
  return persons.some(function(el){
    return el.name===name
  })
}

app.post('/api/persons', (request,response, next) => {
  const body = request.body
  //    console.log(body)
  //    console.log(body.name)

  if (!body.name){
    return response.status(400).json({
      error: 'name missing'
    })
  }

  if (!body.number){
    return response.status(400).json({
      error: 'number missing'
    })
  }

  if (nameExists(body.name)){
    return response.status(400).json({
      error: 'name must be unique'
    })
  }

  const person =new Person({
    name: body.name,
    number: body.number
  })

  // persons=persons.concat(person)
  person.save()
    .then(savedPerson =>{
      response.json(savedPerson)
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body= request.body

  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(request.params.id, person, {new: true})
    .then(updatedPerson =>{
      response.json(updatedPerson)
    })
    .catch(error=> next(error))
})


//virhekäsittelijä
const errorHandler =(error, request, response, next)=>{
  console.error(error.message)

  if(error.name ==='CastError') {
    return response.status(400).send({ error: 'malformatted id'})
  } else if (error.name ==='ValidationError'){
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

app.use(errorHandler)

// eslint-disable-next-line no-undef
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})