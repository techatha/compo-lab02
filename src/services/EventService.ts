import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://my-json-server.typicode.com/techatha/Compo-Lab02-number14',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getEvents(perPage: Number, page: Number) {
    return apiClient.get('/events?_limit=' + perPage + '&_page=' + page)
  }, 
  getEvent(id: Number){
    return apiClient.get('/events/' + id)
  }
}
