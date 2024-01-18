import { putRequest } from './apiClient'
import { RequestParamType, ApiResponseType } from '../types/apiTypes'

export const putNickname = async (Data: RequestParamType): Promise<ApiResponseType> => {
  return putRequest({ url: `/api/v1/user/nickname`, params: Data })
}
