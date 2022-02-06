const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const body = request.body

  if(body.password.length <3){
    return response.status(400).json({error: 'Password shorter than required (3)'})
  }

  const salt = bcrypt.genSaltSync(10)
  const passwordHash = await bcrypt.hashSync(body.password, salt)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs',{url:1, title: 1, author:1, id: 1})

  response.json(users.map(u => u.toJSON()))
})

module.exports = usersRouter