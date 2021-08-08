import axios from 'axios'
const baseUrl = '/api/persons'

const getAllPersons = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createPerson = newPerson => {
  return axios.post(baseUrl, newPerson)
}

const deletePerson = personId => {
  return axios.delete(`${baseUrl}/${personId}`)
}

const updatePerson = (id, updatedPerson) => {
  const request = axios.put(`${baseUrl}/${id}`, updatedPerson)
  return request.then(response => response.data)
}

export default { 
  getAllPersons, 
  createPerson,
  deletePerson,
  updatePerson
}