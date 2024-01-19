import { GetAvatarType } from '@/types/apiTypes'
import { api } from './interceptor'

export const getAvatar = async ({ userId }: ApiGetAvatar): Promise<GetAvatarType> => {
  const response = await api.get(`/api/v1/tteokguk/${userId}/snap-shop`)
  return response.data.data
}

interface ApiGetAvatar {
  userId: string
}
