import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getUserType } from "@/services/userCheck";

export async function middleware(request: NextRequest) {
  // 접근 불가 URL 차단 + 접근 가능 URL? => 쿠키값 확인 => 사용자 타입 확인 타입별 valid 체크
  const path = request.nextUrl.pathname
  /*
    Access Denied URL
    [domain]/host/set-garnish
    [domain]/host/write
    [domain]/host/snap-shot  TODO 유리님 개발 완료하고 나면 막기
    [domain]/!host//garnish-list
  */
  if(path.startsWith('/host')){
    if(path.includes('/set-garnish') || path.includes('/write') /*|| path.includes('/snap-shot')*/){
      // 접근 불가 URLs
      return NextResponse.redirect(new URL('/', request.url))
    }else{
      // 쿠키 확인
      const token = request.cookies.get('token')?.value
      if(token){
        // 사용자 타입 확인
        const userType =  await getUserType(token)
        if(userType.data.isMember){
          return NextResponse.next()
        }else{
          return NextResponse.redirect(new URL('/', request.url)).cookies.delete('token')
        }
      }else{
        return NextResponse.redirect(new URL('/', request.url))
      }
    }
  }else{
    if(path.includes('/garnish-list')){
      if(request.cookies.get('token')?.value){
        return NextResponse.redirect(new URL('/', request.url)).cookies.delete('token')
      }else{
        return NextResponse.redirect(new URL('/', request.url))
      }
    }else if(path.startsWith('/join')){
      // 쿠키 확인
      const token = request.cookies.get('token')?.value
      if(token){
        // 사용자 타입 확인
        const userType =  await getUserType(token)
        if(userType.data.isMember){
          return NextResponse.redirect(new URL('/', request.url)).cookies.delete('token')
        }else{
          return NextResponse.next()
        }
      }else{
        return NextResponse.redirect(new URL('/', request.url))
      }
    }else if(path.startsWith('/change-matt') || path.startsWith('/make-dish') || path.startsWith('/account')){
      // 쿠키 확인
      const token = request.cookies.get('token')?.value
      if(token){
        // 사용자 타입 확인
        const userType =  await getUserType(token)
        if(userType.data.isMember){
          return NextResponse.next()
        }else{
          return NextResponse.redirect(new URL('/', request.url)).cookies.delete('token')
        }
      }else{
        return NextResponse.redirect(new URL('/', request.url))
      }
    }else if (path.startsWith('/login/success')){
      if(request.nextUrl.searchParams.get('token')){
        // 쿼리파람 - 토큰
        const token = request.nextUrl.searchParams.get('token')
        // 사용자 타입 확인
        const userType =  await getUserType(token)
        if(userType.data.isMember){
          // 쿠키에 토큰 세팅
          const response = NextResponse.redirect(new URL('/host', request.url))
          response.cookies.set('token', token || '')
          return response
        }else{
          const response = NextResponse.redirect(new URL('/join', request.url))
          response.cookies.set('token', token || '')
          return response
        }
      }else{
        const response = NextResponse.redirect(new URL('/', request.url))
        if(request.cookies.has('token')){
          response.cookies.delete('token')
        }
        return response
      }
    }
    }
  }

export const config = {
  matcher: [
    '/login/success', '/host/:path*', '/join', '/change-matt', '/make-dish', '/account'
  ]
}

