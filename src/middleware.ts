import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getUserType } from "@/services/userType";

export async function middleware(request: NextRequest) {
	// 요청 헤더에서 로그인 여부를 확인할 수 있도록 쿠키에 접근
  // console.log(']iddleware : ', request.nextUrl.searchParams.get('token'))
  if(request.nextUrl.searchParams.get('token')){
    const token = request.nextUrl.searchParams.get('token')
    const userType = await getUserType(token)
    if(userType.isMember){
      return NextResponse.redirect(new URL('/host', request.url))
    }else{
      return NextResponse.redirect(new URL('/join', request.url))
    }
  }else{
    // 아예 토큰이 없는 경우
    return NextResponse.redirect(new URL('/', request.url))
  }
}

export const config = {
  matcher: ["/login/success"]
};