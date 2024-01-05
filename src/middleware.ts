import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getUserType } from "@/services/userCheck";

export async function middleware(request: NextRequest) {
  console.log(':::::: in middleware (', request.nextUrl.pathname, ')')
  
  const path = request.nextUrl.pathname
  const params = request.nextUrl.searchParams
  const cookie = request.cookies
  
  const goNext = () => {
    return NextResponse.next()
  }
  
  const goUrl = (url: string) => {
    return NextResponse.redirect(new URL(url, request.url))
  }

  const authInfo = async () => {
    if(cookie.has('token')){
      const token = cookie.get('token')?.value
      console.log("token >> ", token)
      if(await getUserType(token)){
        return {'hasToken':true, 'isMember':true}
      }else{
        return {'hasToken':true, 'isMember':false}
      }
    }else{
      return {'hasToken':false, 'isMember':false}
    }
  }
  const authData = await authInfo()

  if(path.startsWith('/host')){
    // access denied url
    // TODO 유리님 개발 완료하고 나면 host/snap-shot도 막기
    if(path.includes('/set-garnish') || path.includes('/write') /*|| path.includes('/snap-shot')*/){
      return goUrl('/')
    }else{
      if(authData.hasToken){
        if(authData.isMember){
          return goNext()
        }else{
          return goUrl('/join')
        }
      }else{
        return goUrl('/')
      }
    }
  }else{
    // access denied url
    if(path.includes('/garnish-list')){
      return goUrl('/')
    }else if(path.includes('/join')){
      if(authData.hasToken){
        if(authData.isMember){
          return goUrl('/host')
        }else{
          return goNext()
        }
      }else{
        return goUrl('/')
      }
    }else if(path.includes('change-matt') || path.includes('/make-dish') || path.includes('/account')){
      if(authData.hasToken){
        if(authData.isMember){
          return goNext()
        }else{
          return goUrl('/join')
        }
      }else{
        return goUrl('/')
      }
    }else if (path.startsWith('/login/success')){
      if(params.get('token')){
        const token = params.get('token')
        if(!token){
          throw Error()
        }
        cookie.set('token', token)
        if(await getUserType(token)){
          return goUrl('/host')
        }else{
          return goUrl('/join')
        }
      }else{
        return goUrl('/')
      }
    }
  }
}

export const config = {
  // 전역에서 체크하려다가 너무 많이 호출 되서 바꿈.
  matcher: [
    '/login/success', '/host/:path*', '/join', '/change-matt', '/make-dish', '/account'
  ]
}

