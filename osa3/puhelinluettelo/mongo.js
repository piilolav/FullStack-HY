const mongoose = require('mongoose')

// eslint-disable-next-line no-undef
if (process.argv.length<3) {
  console.log('give password as argument')
  // eslint-disable-next-line no-undef
  process.exit(1)
}

// eslint-disable-next-line no-undef
const password = process.argv[2]


const url =
  `mongodb+srv://vpiilola:${password}@cluster0.sptgz.mongodb.net/Phonebook?retryWrites=true`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

// eslint-disable-next-line no-undef
if (process.argv.length ===3){
  console.log('phonebook')
  Person.find({}).then(result =>{
    result.forEach(person =>{
      console.log(person.name, person.number)
    })
    mongoose.connection.close
  })
}

// eslint-disable-next-line no-undef
if (process.argv.length >3 && process.argv.length <6){

  // eslint-disable-next-line no-undef
  const name =process.argv[3]
  // eslint-disable-next-line no-undef
  const number = process.argv[4]

  const person = new Person({
    name: name,
    number: number,
  })

  person.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })

}