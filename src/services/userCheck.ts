export type UserType = {
  isMember: boolean
}

export async function getUserType(token: string | null): Promise<UserType> {
  // 토큰 정보로 유저 정보 가져오기
  const response = await fetch('https://api.tteok-guk.store/api/member/check', {
    method: 'GET', // *GET, POST, PUT, DELETE 등
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  })
  if (response.status === 200 && response.statusText === 'OK') {
    return response.json() // isMember 값을 포함한 Promise 반환
  } else {
    throw new Error('Failed to fetch user type')
  }
}