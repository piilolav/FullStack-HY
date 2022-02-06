// eslint-disable-next-line no-unused-vars
const dummy =(blogs) =>{
  return 1
}



const totalLikes = (blogs) =>{
  return blogs.lenght === 0
    ? 0
    :blogs.reduce((sum, blog) => sum + blog.likes, 0)
}


const favoriteBlog = (blogs) => {
  return blogs.length === 0
    ? {}
    : blogs.reduce((maxLikes, blog) => blog.likes > maxLikes ? blog.likes : maxLikes, blogs[0].likes)
}


module.exports ={
  dummy,
  totalLikes,
  favoriteBlog
}