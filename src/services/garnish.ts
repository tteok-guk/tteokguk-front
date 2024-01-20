import { RequestParamType, ApiResponseType } from '../types/apiTypes'
import { getRequest, putRequest } from './apiClient'

// 고명 목록 조회
export const getGarnishList = async (): Promise<ApiResponseType> => {
  return getRequest(`/api/v1/garnish/me`)
}
// 고명 개별 조회
export const getGarnishDetail = async (garnishId:string): Promise<ApiResponseType> => {
  return getRequest(`/api/v1/garnish/${garnishId}`)
}