import path from 'path'
import { promises as fs } from 'fs'

export type Tteokguk = {
  nickname: string
  id: string
  디데이: number
  편지총개수: number
  고명정보: [{ 고명식별자: number; 닉네임: string; 고명키값: string }]
  테이블매트정보: string
  총페이지수: number
  인입유저떡국설정완료여부?: boolean
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
