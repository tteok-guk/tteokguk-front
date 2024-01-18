import { putRequest } from './apiClient'
import { MattParamsType } from '@/types/changeMattType'
import { RequestParamType, ApiResponseType } from '../types/apiTypes'

export const putMatt = async (MattData: RequestParamType): Promise<ApiResponseType> => {
  return putRequest({ url: `/api/v1/tteokguk`, params: MattData })
}
