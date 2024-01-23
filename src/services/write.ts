import { RequestParamType, ApiResponseType } from '../types/apiTypes'
import { postRequest } from './apiClient'

export const postGarnish = async (garnishData: RequestParamType): Promise<ApiResponseType> => {
  return postRequest({ url: `/api/v1/garnish`, params: garnishData })
}
