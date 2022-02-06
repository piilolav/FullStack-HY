import axios from 'axios'
const baseUrl = '/api/users'


const getAll = () => {
  // console.log('Getting users: ')
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

export default { getAll }