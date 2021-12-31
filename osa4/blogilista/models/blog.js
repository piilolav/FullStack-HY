const mongoose = require('mongoose')

// eslint-disable-next-line no-undef
/*
const mongoUrl = process.env.mongoUrl
mongoose.connect(mongoUrl)
  .then(() =>{
    console.log('connected to MongoDB')
  })
  .catch((error) =>{
    console.log('error connecting to MongoDB', error.message)
  })

  */

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: true},
  author: String,
  url: {
    type: String,
    required: true},
  likes: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


module.exports = mongoose.model('Blog', blogSchema)