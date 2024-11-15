import axios from "axios";
import Cookies from 'js-cookie';

export const $api = axios.create({
  baseURL: 'http://localhost:8080/api/',
  withCredentials: true,
})

$api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }

    console.log(`
      Request:
      Method: ${config.method?.toUpperCase()}
      URL: ${config.baseURL}${config.url}
      Headers: ${JSON.stringify(config.headers, null, 2)}
      Data: ${JSON.stringify(config.data, null, 2)}
    `)

    return config
  },
  (error) => {
    console.error("Request Error:", error)
    return Promise.reject(error)
  }
)

$api.interceptors.response.use(
  (response) => {
    console.log(`
      Response:
      Status: ${response.status}
      Data: ${JSON.stringify(response.data, null, 2)}
    `);
    return response
  },
  (error) => {
    console.error(`
      Response Error:
      ${error.response ? `Status: ${error.response.status}` : ''}
      ${error.response ? `Data: ${JSON.stringify(error.response.data, null, 2)}` : ''}
      Message: ${error.message}
    `)
    return Promise.reject(error)
  }
)
