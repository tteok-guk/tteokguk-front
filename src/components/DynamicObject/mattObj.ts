export const mattObj = () => {
  const mattObj: MattType = {
    red: 'bg-[url(/images/red.png)]',
    yellow: 'bg-[url(/images/yellow.png)]',
  }
  return mattObj
}

export interface MattType {
  [key: string]: string | undefined
}
