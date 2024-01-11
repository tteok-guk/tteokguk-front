import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'

const sessionStorage = typeof window !== 'undefined' ? window.sessionStorage : undefined

const { persistAtom } = recoilPersist({
  key: 'pageNum',
  storage: sessionStorage,
})

export const paginationState = atom({
  key: 'paginationState',
  default: 1,
  effects_UNSTABLE: [persistAtom],
})
