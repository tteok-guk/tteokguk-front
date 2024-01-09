export interface GuestTteokgukType {
  code: number
  message: string
  data: {
    nickname: string
    tteokGukId: string
    dday: number
    mattType: string
    public: boolean
    hasTteokGuk: boolean
  }
}

export interface HostTteokgukType {
  nickname: string
  tteokGukId: string
  dday: number
  mattType: string
}

export interface GarnishArrType {
  garnishId: number
  nickname: string
  garnishType: string
}

export interface GarnishType {
  garnishInfo?: GarnishArrType[]
}

export interface GarnishLocationType {
  [key: number]: string
}
