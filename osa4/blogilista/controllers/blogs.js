const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
//const User = require('../models/user')
//const jwt = require('jsonwebtoken')
/*
const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}
*/

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user',{username:1, name:1, id:1})


  response.json(blogs.map(blog => blog.toJSON()))
})
  
blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  //const token = getTokenFrom(request)
  // eslint-disable-next-line no-undef
  //const decodedToken = jwt.verify(request.token, process.env.SECRET)
 
 
  /*  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  */
  //const user = await User.findById(decodedToken.id)
  const user = request.user


  if (!body.likes) {
    body.likes=0
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  try {
    const savedBlog =await blog.save()
    user.blogs=user.blogs.concat(savedBlog._id)
    await user.save()

    response.json(savedBlog.toJSON())



  } catch(exeption){
    next(exeption)
  } /*
  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
    */
})

blogsRouter.delete('/:id', async (request, response, next) =>{ 
//  const removedBlog = await Blog.findById(response.params.id)
  // eslint-disable-next-line no-undef
  //const decodedToken = jwt.verify(request.token, process.env.SECRET)

  //haetaan oikea user
  //const user = await User.findById(decodedToken.id)
  const user = request.user
  const deleteBlog = await Blog.findById(request.params.id)

  if( deleteBlog.user._id.toString() === user._id.toString()){
    try{
      await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end()
    } catch (exeption){
      next(exeption)
    }
  } else{
    // unauthorized status code 401
    return response.status(401).json({ error: 'Unauthorized action'})
  }
})

blogsRouter.put('/:id', async (request, response, next) =>{
  const body = request.body

  if(!body.likes){
    body.likes=0
  }

  const blog ={
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes 
  }

  try{
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new:true})
    response.json(updatedBlog.toJSON())
  } catch (exeption){
    next(exeption)
  }

  

})

module.exports = blogsRouter