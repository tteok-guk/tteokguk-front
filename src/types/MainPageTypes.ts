export interface TteokgukType {
  code: number
  message: string
  data: {
    nickname: string
    tteokGukId: string
    dday: number
    mattType: string
    public?: boolean
    hasTteokGuk?: boolean
  }
}

// export interface HostTteokgukType {
//   nickname: string
//   tteokGukId: string
//   dday: number
//   mattType: string
// }

export interface GarnishArrType {
  garnishes: {
    garnishId: number
    nickname: string
    garnishType: string
  }[]
  pageSize: number
  garnishCnt: number
}

export interface GarnishType {
  garnishInfo?: {
    garnishId: number
    nickname: string
    garnishType: string
  }[]
}

export interface GarnishLocationType {
  [key: number]: string
}

export interface GarnishItem {
  garnishId: number
  nickname: string
  garnishType: string
}

export interface paginationType {
  pageSize: number
  pageParam: string
  currentNum: number
}
