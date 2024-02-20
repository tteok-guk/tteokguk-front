import { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { getUserType } from '@/services/userCheck'
import base64, { decode } from 'js-base64'

export async function middleware(request: NextRequest) {
  // 접근 불가 URL 차단 + 접근 가능 URL => 쿠키값 확인 => 사용자 타입 확인 타입별 valid 체크
  const path = request.nextUrl.pathname
  /*
    Access Denied URL
    [domain]/host/set-garnish
    [domain]/host/write
    [domain]/host/snap-shot
  */

  // 임시 주석
  if (path.startsWith('/host')) {
    if (path.includes('/set-garnish') || path.includes('/write') || path.includes('/snap-shot')) {
      // 접근 불가 URLs
      return NextResponse.redirect(new URL('/', request.url))
    } else {
      // 쿠키 확인
      const token = request.cookies.get('token')?.value
      if (token) {
        // 사용자 타입 확인
        const userType = await getUserType(token)
        if (userType?.data?.isMember) {
          return NextResponse.next()
        } else {
          const response = NextResponse.redirect(new URL('/', request.url))
          response.cookies.delete('token')
          return response
        }
      } else {
        return NextResponse.redirect(new URL('/', request.url))
      }
    }
  } else {
    if (path.startsWith('/join')) {
      // 쿠키 확인
      const token = request.cookies.get('token')?.value
      if (token) {
        // 사용자 타입 확인
        const userType = await getUserType(token)
        if (userType?.data?.isMember) {
          const response = NextResponse.redirect(new URL('/host?page=1', request.url))
          return response
        } else {
          return NextResponse.next()
        }
      } else {
        return NextResponse.redirect(new URL('/', request.url))
      }
    } else if (path.startsWith('/change-matt') || path.startsWith('/make-dish')) {
      // 쿠키 확인
      const token = request.cookies.get('token')?.value
      if (token) {
        // 사용자 타입 확인
        const userType = await getUserType(token)
        if (userType?.data?.isMember) {
          return NextResponse.next()
        } else {
          const response = NextResponse.redirect(new URL('/', request.url))
          response.cookies.delete('token')
          return response
        }
      } else {
        return NextResponse.redirect(new URL('/', request.url))
      }
    } else if (path.startsWith('/account')) {
      // 쿠키 확인
      const token = request.cookies.get('token')?.value
      if (token) {
        return NextResponse.next()
      } else {
        return NextResponse.redirect(new URL('/', request.url))
      }
    } else if (path.startsWith('/login/success')) {
      if (request.nextUrl.searchParams.get('token')) {
        // 쿼리파람 - 토큰
        const token = request.nextUrl.searchParams.get('token')
        const decodeToken = decode(token?.split('.') ? token?.split('.')[1] : '')
        const tokenExp = JSON.parse(decodeToken).exp
        const tokenExpDate = new Date(tokenExp * 1000) // 초를 밀리초로 변환
        tokenExpDate.setHours(tokenExpDate.getHours() + 9) // 한국 표준시

        // 사용자 타입 확인
        const userType = await getUserType(token)
        if (userType?.data?.isMember) {
          // 쿠키에 토큰 세팅
          // 만료일자 지정
          const response = NextResponse.redirect(new URL('/host?page=1', request.url))
          response.cookies.set({
            name: 'token',
            value: token || '',
            expires: tokenExpDate || '',
          })
          return response
        } else {
          const response = NextResponse.redirect(new URL('/join', request.url))
          response.cookies.set({
            name: 'token',
            value: token || '',
            expires: tokenExpDate || '',
          })
          return response
        }
      } else {
        const response = NextResponse.redirect(new URL('/', request.url))
        if (request.cookies.has('token')) {
          response.cookies.delete('token')
        }
        return response
      }
    }
  }
}

export const config = {
  matcher: ['/login/success', '/host/:path*', '/join', '/change-matt', '/make-dish', '/account'],
}
