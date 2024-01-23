import { RequestParamType, ApiResponseType } from '../types/apiTypes'
import { getRequest, putRequest } from './apiClient'

// 서비스 회원가입 완료
export const putJoinUser = async (userData: RequestParamType): Promise<ApiResponseType> => {
  return putRequest({ url: `/api/v1/user/join`, params: userData })
}