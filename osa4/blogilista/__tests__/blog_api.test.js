const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog =require('../models/blog')


const initialBlogs =[
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }  
]

beforeEach(async ()=>{
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[2])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[3])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[4])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[5])
  await blogObject.save()
})

describe('get operation', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () =>{
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)
  })

  //  test('content is as expected')

  test('unique field is named id',async() =>{
    const blogs = await Blog.find({})
    expect(blogs[0].id).toBeDefined
  })
})

describe('post operation', () => {
  test('a valid blog can be added ', async () =>{
    const newBlog={
      title: 'A whole lot of nothing',
      author: 'Someone I knew',
      url: 'http:doesnt really exist',
      likes: 12500
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const response =await api.get('/api/blogs')

    const contents = response.body.map(r=>r.title)

    expect(response.body).toHaveLength(initialBlogs.length +1)
    expect(contents).toContain(
      'A whole lot of nothing'
    )
  })

  test('likes are zero if missing', async () =>{
    const tryBlog = {
      title: 'Im not liked',
      author: 'Roah not-Hattari',
      url: 'http:doesnt really exist'
    }

    await api 
      .post('/api/blogs')
      .send(tryBlog)
      .expect(200)

    const response = await Blog.find({})
    const listOfBlogs =response.map(blog => blog.toJSON())
    const addedBlog = await listOfBlogs.find(blog => blog.title ==='Im not liked')
    expect(addedBlog.likes).toBe(0)
  })

  test('added blog has a title', async () =>{
    const noTitle={
      author: 'John Me',
      url: 'http://get.some',
      likes: 0
    }

    await api
      .post('/api/blogs')
      .send(noTitle)
      .expect(400)

    //Halutaan, että blogia ei ole lisätty
    const blogsAfter = await Blog.find({})
    expect(blogsAfter).toHaveLength(initialBlogs.length)

  })

  test('added blog has to have a url', async () =>{
    const noUrl={
      title: 'Happi Times',
      author: 'John Me',
      likes: 0
    }

    await api
      .post('/api/blogs')
      .send(noUrl)
      .expect(400)

    //Halutaan, että blogia ei ole lisätty
    const blogsAfter = await Blog.find({})
    expect(blogsAfter).toHaveLength(initialBlogs.length)

  })

})

describe('delete operation', () =>{
  
  test('succesful deletion', async() =>{
    const newBlog ={
      title:'Get rid of me',
      author:'Somebody who sold me out',
      url: 'http:doesnt.exist',
      likes: 1
    }

    //lisätään onnistuneesti
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)

    const allBlogs = await Blog.find({})
    const blogToRemoved = allBlogs.find(blog => blog.title ===newBlog.title)

    await api
      .delete(`/api/blogs/${blogToRemoved.id}`)
      .expect(204)
    
    const BlogsInTheEnd = await Blog.find({})

    //Tarkistetaan vielä, että pituus on sama kuin ennen lisäystä
    expect(BlogsInTheEnd).toHaveLength(initialBlogs.length)
    
  })
})

//Laiskuu iski: put testattu Postmanilla
  
afterAll(() => {
  mongoose.connection.close()
})