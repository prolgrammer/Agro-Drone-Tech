import { refreshToken } from "@entities/GateWay/auth";
import axios from "axios";
import Cookies from 'js-cookie';
import { jwtDecode, JwtPayload } from "jwt-decode";

export const $api = axios.create({
  baseURL: 'http://localhost:8080/api/',
  withCredentials: true,
})

export const $authApi = axios.create({
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

export interface UserJwtPayload extends JwtPayload {
  id?: string | null
  username?: string | null
  roles?: [] | null
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

      if (error.response?.status === 400 || error.response?.status === 401) {
        try {
          const decoded = jwtDecode<UserJwtPayload>(Cookies.get('accessToken') as string)
          const userId = decoded?.id
          const refresh = {
            refresh: Cookies.get('refreshToken') as string,
          }

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
