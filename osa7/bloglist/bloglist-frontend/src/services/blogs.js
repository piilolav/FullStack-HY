import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null
//let config


const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async objectToUpdate => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(`${baseUrl}/${objectToUpdate.id}`, objectToUpdate, config)
  return response.data
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  //  console.log('REMOVING THIS BLOG')
  const response = await axios.delete(`${baseUrl}/${id}`,config)
  return response.data
}

const newComment = async (id, comment) =>  {
  //const config = {
  //  headers: { Authorization: token },
  // }
  console.log('Im REALLY trying!')
  const response = await axios.post(
    `${baseUrl}/${id}/comments`,
    { comment }
    //config
  )
  return response.data
}

export default { getAll, setToken, create, update, remove, newComment }