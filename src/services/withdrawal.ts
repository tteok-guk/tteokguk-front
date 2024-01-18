import { deleteRequest } from './apiClient'
import { ApiResponseType } from '../types/apiTypes'

export const deleteNickname = async (): Promise<ApiResponseType> => {
  return deleteRequest({ url: `/api/v1/user/withdraw` })
}
