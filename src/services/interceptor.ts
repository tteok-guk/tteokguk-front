import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from 'axios'
import Cookies from 'js-cookie'

// * create instance
export const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_KEY,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
})

// * renspnse interceptor
api.interceptors.request.use(
  (config: AxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = Cookies.get('token')
    return {
      ...config,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      },
    } as InternalAxiosRequestConfig
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  },
)

// * response interceptor
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => Promise.reject(error),
)
