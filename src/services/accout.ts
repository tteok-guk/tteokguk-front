import { getRequest } from './apiClient'

export const getMyPage = async () => {
  return getRequest('/api/member/me')
}
