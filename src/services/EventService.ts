import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://my-json-server.typicode.com/techatha/Compo-Lab02-number14',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getEvents() {
    return apiClient.get('/events')
  }, 
  getEvent(id: String){
    return apiClient.get('/events/' + id)
  }
}
