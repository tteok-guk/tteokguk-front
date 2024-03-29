import { GarnishArrType, TteokgukType } from '@/types/MainPageTypes'
import { cookies } from 'next/headers'
import { useSearchParams } from 'next/navigation'
import { NextRequest } from 'next/server'

const baseUrl = process.env.NEXT_PUBLIC_API_KEY
export const tokens = () => {
  const token = cookies().get('token')?.value
  return token
}

export async function getGuestTteokguk(userId: string): Promise<TteokgukType> {
  const token = tokens()
  const res = await fetch(`${baseUrl}/api/v1/tteokguk/${userId}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  if (!res.ok) {
    throw new Error('failed')
  }

  return res.json()
}

export async function getHostTteokguk(): Promise<TteokgukType> {
  const token = tokens()
  const res = await fetch(`${baseUrl}/api/v1/tteokguk/me`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
  if (!res.ok) {
    throw new Error('failed')
  }
  return res.json()
}

export async function getGarnishes(userId: string, pageNum: number): Promise<GarnishArrType> {
  const res = await fetch(`${baseUrl}/api/v1/tteokguk/${userId}/garnishes?page=${pageNum}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  if (!res.ok) {
    throw new Error('failed')
  }
  const { data } = await res.json()
  return data
}
