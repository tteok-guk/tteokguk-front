'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { isMobileDevice } from '@/utils/isMobileDevice'
import { checkWriteQuery } from '@/utils/checkWriteQuery'
import { useGarnishInput } from '@/hooks/useGarnishInput'
import { useToast } from '@/hooks/use-toast'
import { useMutation } from '@tanstack/react-query'
import { postGarnish } from '@/services/write'
import { RequestParamType } from '@/types/apiTypes'
import { BottomButton, TopButton } from '@/components/common'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { dragonSmall, dogSmall, rabbitSmall } from '../../../../../public/images/avatar/small'

export default function WritePage() {
  const [data, onChange] = useGarnishInput({
    writerNickname: '',
    content: '',
  })
  const [disabled, setDisabled] = useState(true)

  const pathname = usePathname()
  const params = useSearchParams()
  const router = useRouter()
  const isMobile = isMobileDevice()
  const { toast } = useToast()

  const hostId = pathname.split('/').filter((item) => item)[0]
  const hostNickname = params.get('nickname')

  // * 공통/동적 스타일 변수
  const avatarHeight = isMobile ? 54 : 84
  const avatarTop = isMobile ? 'top-[-48px]' : 'top-[-76px]'
  const avatarLocation = [
    { name: '공룡', src: dragonSmall, location: `${isMobile ? 'right-50' : 'right-80'}` },
    { name: '강아지', src: dogSmall, location: `${isMobile ? 'right-20' : 'right-30'}` },
    { name: '토끼', src: rabbitSmall, location: `${isMobile ? 'right-[-13px]' : 'right-[-20px]'}` },
  ]

  // * URL 쿼리 고명, 닉네임 검증
  const checkQueryValid = (): boolean => {
    const getChosenGarnish = params.get('garnish')
    const [isQueryValid, msg] = checkWriteQuery({
      nickname: hostNickname,
      garnish: getChosenGarnish,
    })
    if (!isQueryValid) {
      setDisabled(true)
      // todo 페이지 넘어가기 전에 toast 활성화하고 넘어가는지 확인
      toast({ description: msg })
      router.push(`/${hostId}?page=1`)
    }
    return isQueryValid
  }

  // * 고명 작성하기
  const onSubmit = useMutation({
    mutationFn: (garnishData: RequestParamType) => postGarnish(garnishData),
    onSuccess: (res) => {
      if (res.code === 200) router.push(`/${hostId}/snap-shot?nickname=${hostNickname}`)
    },
    onError: (err) => console.log('err', err), // todo 에러핸들링 추가
  })

  // * 완료 버튼 클릭
  const doneBtnClick = () => {
    const isQueryValid = checkQueryValid()
    if (!isQueryValid) {
      setDisabled(true)
    }
    setDisabled(false)
    const garnishData = {
      tteokGukId: hostId,
      nickname: data.writerNickname,
      garnishType: params.get('garnish') || '',
      content: data.content.replaceAll(/\r\n|\r|\n/gm, '\n'),
    }
    onSubmit.mutate(garnishData)
  }

  // * 뒤로가기 버튼 클릭
  const backBtnClick = () => {
    if (!disabled) {
      // todo alert 모달
      console.log('이전페이지로 돌아가면\n작성한 내용은 저장되지 않아요!')
    }
    router.back()
  }

  useEffect(() => {
    checkQueryValid()
  }, [])

  useEffect(() => {
    const userInputData = Object.values(data)
    const isAllInputValid = userInputData.every((v) => v && v.length <= 700)
    setDisabled(isAllInputValid ? false : true)
  }, [data])

  return (
    <div className="">
      <TopButton onClick={backBtnClick} />
      <form>
        <h1 className="font-xl pt-12">
          {`${hostNickname}에게`}
          <br />
          덕담을 남겨주세요!
        </h1>
        <p className="font-xs relative pb-12 pt-8 text-gr-300">
          욕설/비방/음란 메시지는 이용 제한이 있을 수 있어요.
        </p>
        <div className="relative">
          {avatarLocation.map((avatar) => (
            <Image
              key={avatar.name}
              src={avatar.src}
              alt={`${avatar.name} 일러스트`}
              height={avatarHeight}
              className={`absolute ${avatar.location} ${avatarTop}`}
            />
          ))}
          <Input
            value={data.writerNickname}
            onChange={(e) => onChange('writerNickname', e.target.value)}
            maxLength={8}
            placeholder="떡국에 남겨질 닉네임을 입력해주세요"
            className="placeholder:font-sm rounded-4 border-2 border-pr-200 bg-white px-24 py-16 font-soyoThin placeholder:text-gr-300"
          />
          <span className="font-sm absolute bottom-19 right-24 text-[#4B4B4B]">
            {`${data.writerNickname.length > 8 ? 8 : data.writerNickname.length}/8`}
          </span>
        </div>
        <div className="relative">
          <Textarea
            value={data.content}
            onChange={(e) => onChange('content', e.target.value)}
            placeholder="덕담으로 행복한 새해를 선물해 주세요!"
          />
          <span className="font-sm absolute bottom-15 right-24 text-[#4B4B4B]">
            {`${data.content.length > 700 ? 700 : data.content.length}/700`}
          </span>
        </div>
      </form>

      {isMobile ? (
        <Button size="full" className="mb-20 mt-16" onClick={doneBtnClick} disabled={disabled}>
          완료
        </Button>
      ) : (
        <BottomButton fullBtnName="완료" fullBtnClick={doneBtnClick} fullBtnDisabled={disabled} />
      )}
    </div>
  )
}
