const { response } = require('express')
const express = require('express')
const { type } = require('express/lib/response')
const morgan = require('morgan')
const app = express()
const cors =require('cors')

app.use(express.json())
app.use(cors())
//huom. morgan antaa jo post pyynnön mukana tulevan datan?
//app.use(morgan('tiny'))

//kustomoitu morgan toimii
morgan.token('postData', (request) => {
  if (request.method == 'POST') return ' ' + JSON.stringify(request.body);
  else return ' ';
});

app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :postData'
  )
);

let persons = [
    { id: 0, name: 'Arto Hellas', number: '040-123456' },
    { id:1, name: 'Ada Lovelace', number: '39-44-5323523' },
    { id:2, name: 'Dan Abramov', number: '12-43-234345' },
    { id:3, name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]


app.get('/', (req, res) => {
  res.send('<div> <h1>Hello World!</h1> <p> This is updated phonebook </p> </div>')
})

app.get('/api/persons', (req, res) => {
    //console.log(typeof(persons))
  res.json(persons)
})

app.get('/info', (req, res) => {
    //console.log(typeof(persons))
  const info =`Phonebook has info for ${persons.length} people`
  const origDate =new Date();
  const date = origDate.toLocaleString();
  const weekday = ["Sun","Mon","Tues","Wed","Thur","Fri","Sat"];
  let day= weekday[origDate.getDay()];

  //haetaan offset tunteina
  const offset =origDate.getTimezoneOffset()/60;
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  res.send(`<div> <p> ${info} </p> <p> ${day} ${date} GMT ${offset} (${timezone})  </p> </div>`)
})

app.get('/api/persons/:id', (req, res) => {
    const id =Number(req.params.id)
    const person =persons.find(person => person.id===id)
//    console.log(typeof(id), id, typeof(persons[0]))
//    console.log(persons[0])
    
    if(person){
    res.json(person)
    } else{
        res.status(404).end()
    }
  })

app.delete('/api/persons/:id', (request, response) => {
    const id =Number(request.params.id)
    persons=persons.filter(person => person.id !==id)

    response.status(204).end()
  })

  const generateId=() =>{
    const maxId = persons.length > 0
    ? Math.max(...persons.map(n => n.id))
    : 0
  return maxId + 1
  }

  function nameExists(name){
    return persons.some(function(el){
      return el.name===name
    })
  }

app.post('/api/persons', (request,response) => {
    const body = request.body
    console.log(body)
    console.log(body.name)

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

    const person ={
      name: body.name,
      number: body.number,
      id: generateId(),
    }

    persons=persons.concat(person)

    response.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})