import path from 'path'
import { promises as fs } from 'fs'

export type Tteokguk = {
  nickname: string
  id: string
  dDay: number
  garnishCnt: number
  garnish: [{ garnishId: number; nickname: string; garnishName: string }]
  mattId: string
  lastPageNum: number
  isPublic?: boolean
}

export async function getTteokguks(): Promise<Tteokguk[]> {
  // JSON파일 경로 가져오기
  const filePath = path.join(process.cwd(), 'data', 'main.json')
  // 가져온 JSON파일에 데이터 가져오기
  const data = await fs.readFile(filePath, 'utf-8')
  return JSON.parse(data)
}

export async function getTteokguk(id: string): Promise<Tteokguk | undefined> {
  const tteokguk = await getTteokguks()
  return tteokguk.find((item) => item.id === id)
}
