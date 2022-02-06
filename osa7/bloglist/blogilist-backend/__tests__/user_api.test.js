const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const bcrypt = require('bcryptjs')

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})
  
    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })
  
    await user.save()
  })
  
  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await User.find({})
  
    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }
  
    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    const usersAtEnd = await User.find({})
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
  
    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('fails if username exists already', async() =>{
    const usersAtStart = await User.find({})
    // alussa alustettuna käyttäjänimi root, joten testataan sillä    
    const newUser={
      username: 'root',
      name: 'Its me Again',
      password: 'Top Secred'
    }

    const result = await api   
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await User.find({})
    expect(usersAtEnd).toHaveLength(usersAtStart.length)

  })

  test('fails if username too short', async () => {
    const usersAtStart = await User.find({})

    const newUser = {
      username: 'Yo',
      name: 'JouluPukki',
      password: 'TonttuSalainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('shorter than the minimum allowed length (3)')

    const usersAtEnd = await User.find({})
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  afterAll(() => {
    mongoose.connection.close()
  })
})