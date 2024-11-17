// import axios from "axios";
// import Cookies from 'js-cookie';

// export const $api = axios.create({
//   baseURL: 'http://localhost:8080/api/',
//   withCredentials: true,
// })

// $api.interceptors.request.use(
//   (config) => {
//     const token = Cookies.get('access')
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`
//     }

//     console.log(`
//       Request:
//       Method: ${config.method?.toUpperCase()}
//       URL: ${config.baseURL}${config.url}
//       Headers: ${JSON.stringify(config.headers, null, 2)}
//       Data: ${JSON.stringify(config.data, null, 2)}
//     `)

//     return config
//   },
//   (error) => {
//     console.error("Request Error:", error)
//     return Promise.reject(error)
//   }
// )

// $api.interceptors.response.use(
//   (response) => {
//     console.log(`
//       Response:
//       Status: ${response.status}
//       Data: ${JSON.stringify(response.data, null, 2)}
//     `);
//     return response
//   },
//   (error) => {
//     console.error(`
//       Response Error:
//       ${error.response ? `Status: ${error.response.status}` : ''}
//       ${error.response ? `Data: ${JSON.stringify(error.response.data, null, 2)}` : ''}
//       Message: ${error.message}
//     `)
//     return Promise.reject(error)
//   }
// )

import { refreshToken } from "@entities/GateWay/auth";
import axios from "axios";
import Cookies from 'js-cookie';
import { jwtDecode, JwtPayload } from "jwt-decode";

export const $api = axios.create({
  baseURL: 'http://localhost:8080/api/',
  withCredentials: true,
})

export const $refreshApi = axios.create({
  baseURL: 'http://localhost:8080/api/',
  withCredentials: true,
})

$api.interceptors.request.use(
  (config) => {
    console.log(
      "AXIOS Response:",
      "\n URL:",
      config.url,
      "\n METHOD:",
      config.method,
      "\n PARAMS:",
      config.params,
      "\n REQUEST DATA:",
      config.data,
    )

    const accessToken = Cookies.get('accessToken')
    config.headers['Authorization'] = `Bearer ${accessToken}`

    return config
  },
  (error) => {
    console.error(
      "AXIOS Response:",
      "\n URL:",
      error.request.url,
      "\n METHOD:",
      error.request.method,
      "\n PARAMS:",
      error.request.params,
      "\n REQUEST DATA:",
      error.data,
      "\n ErrorMessage:",
      error.message
    )
    return Promise.reject(error)
  }
)

interface UserJwtPayload extends JwtPayload {
  id?: string
}

$api.interceptors.response.use(
  (response) => {
    // console.log(
    //   "AXIOS Response:",
    //   "\n URL:",
    //   response.request.url,
    //   "\n METHOD:",
    //   response.request.method,
    //   "\n PARAMS:",
    //   response.request.params,
    //   "\n REQUEST DATA:",
    //   response.data,
    // )
    return response
  },

  async (error) => {
    const originalRequest = error.config

    if ((error.response?.status === 401 || error.response?.status === 400) && !originalRequest._retry) {
      originalRequest._retry = true

      if (error.response?.status === 400) {
        try {
          const decoded = jwtDecode<UserJwtPayload>(Cookies.get('accessToken') as string)
          const userId = decoded?.id
          const refresh = Cookies.get('refreshToken')

          if (userId && refresh) {
            const { access } = await refreshToken(userId, refresh)
            Cookies.set('accessToken', access)
            originalRequest.headers['Authorization'] = `Bearer ${access}`
            return $api(originalRequest)
          }
        } catch (refreshError) {
          console.error("Refresh token failed:", refreshError)
        }
      }
    }

    // console.error(
    //   "AXIOS Response:",
    //   "\n URL:",
    //   error.request.url,
    //   "\n METHOD:",
    //   error.request.method,
    //   "\n PARAMS:",
    //   error.request.params,
    //   "\n REQUEST DATA:",
    //   error.data,
    //   "\n ErrorMessage:",
    //   error.message
    // )
    return Promise.reject(error)
  }
)
