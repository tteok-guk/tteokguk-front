export interface RequestParamType {
  [key: string]: string | number | boolean | object
}

export interface ApiRequestType {
  url: string
  [key: string]: string | number | boolean | object
}

export interface ApiResponseType {
  code: number
  message: string
  data: ResponseData
}

interface ResponseData {
  isMember?: boolean
  hasTteokGuk?: boolean
  token?: string
  createdType?: number
  public?: boolean
  garnishId?: number
  garnishType?: string
  garnishes?: Garnish[]
  tteokGukId?: string
  mattType?: string
  nickname?: string
  content?: string
  dday?: number
  pageSize?: number
  garnishCnt?: number
}

interface Garnish {
  garnishId: number
  nickname: string
  garnishType: string
}
