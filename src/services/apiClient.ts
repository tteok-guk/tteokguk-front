import { api } from './interceptor'
import { ApiRequestType, ApiResponseType } from '../types/apiTypes'

export const getRequest = async (url: string): Promise<ApiResponseType> => {
  const response = await api.get(url)
  return response.data
}

export const postRequest = async ({ url, params }: ApiRequestType): Promise<ApiResponseType> => {
  const response = await api.post(url, params)
  return response.data
}

export const putRequest = async ({ url, params }: ApiRequestType): Promise<ApiResponseType> => {
  const response = await api.put(url, params)
  return response.data
}
