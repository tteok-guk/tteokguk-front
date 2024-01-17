import { atom } from 'recoil'

export const ToastState = atom({
  key: 'toast',
  default: {
    open: true,
    msg: '',
  },
})
