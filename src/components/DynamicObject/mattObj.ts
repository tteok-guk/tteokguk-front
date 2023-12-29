export const mattObj: MattType = {
  red: 'bg-[url(/images/red.png)]',
  yellow: 'bg-[url(/images/yellow.png)]',
}

export interface MattType {
  [key: string]: string | undefined
}
