const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const loginRouter = require('express').Router()
const User = require('../models/user')

//Note to self: Postmanin testaus ei näyttänyt toimivan mutta VS:n REST toimi :)

loginRouter.post('/', async (request, response) => {
  const body = request.body
  // console.log('ITS GETTING HERE')
  //  console.log(body.username)

  const user = await User.findOne({ username: body.username })
  //  console.log(user, ' USER LOOKS LIKE')
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  // eslint-disable-next-line no-undef
  const token = jwt.sign(userForToken, process.env.SECRET)

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter