import * as axios from 'axios'

const BASE_URL = 'https://nimebox-api.herokuapp.com/'
const BEARER_TOKEN = 'c0366e6f04436200b9998419134e4c3216b08daf'

export default axios.create({
  baseURL: BASE_URL,
  headers: {
    'Authorization': `Bearer ${BEARER_TOKEN}`,
    'Content-Type': 'application/json'
  },
  withCredentials: true
})
