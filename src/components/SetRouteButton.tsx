'use client'

import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { Button } from './ui/button'

export default function SetRouteButton() {
  const [isLoggedIn, setIsLoggedIn] = useState<Boolean | undefined>()

  useEffect(() => {
    const token = Cookies.get('token') ?? ''
    setIsLoggedIn(token ? true : false)
  }, [])

  return (
    <Button
      href={isLoggedIn === undefined ? '' : !isLoggedIn ? '/' : '/host?page=1'}
      className="rounded-full bg-pr-500 px-36 py-12 text-14 font-semibold text-white "
    >
      메인으로 이동하기
    </Button>
  )
}
