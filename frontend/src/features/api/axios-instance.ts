import { BACKEND_URL } from 'app/constants'
import axios from 'axios'
import { getCookie } from 'cookies-next'

const token = getCookie('token')

export const $api = axios.create({
  withCredentials: true,
  baseURL: BACKEND_URL
})

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${token}`
  return config
})