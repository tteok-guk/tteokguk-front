import { RequestParamType, ApiResponseType } from '../types/apiTypes'
import { postRequest } from './apiClient'

// 떡국 최초생성 완료
export const postMakeDish = async (tteokgukData: RequestParamType): Promise<ApiResponseType> => {
  return postRequest({ url: `/api/v1/tteokguk`, params: tteokgukData })
}