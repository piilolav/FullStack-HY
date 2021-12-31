require('dotenv').config()
const http = require('http')
// const express = require('express')
const app = require('./app')
// const cors = require('cors')
// const Blog = require('./models/blog')
const logger = require('./utils/logger')
const config = require('./utils/config')
//const supertest = require('supertest')
// const blogsRouter =require('./controllers/blogs')
//const api =supertest(app)

const server=http.createServer(app)

/*
app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)

*/

/*
app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})
*/

server.listen(config.PORT,() =>{  
// eslint-disable-next-line no-undef
  logger.info(`Server running on port ${config.PORT}`)
})