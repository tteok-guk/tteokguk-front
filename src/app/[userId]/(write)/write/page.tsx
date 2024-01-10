'use client'

import { useEffect } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { garnishes } from '../../../../../data/garnishes'
import { isMobileDevice } from '@/utils/isMobileDevice'
import { useGarnishInput } from '@/hooks/useGarnishInput'
import { BottomButton, TopButton } from '@/components/common'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { dragonSmall, dogSmall, rabbitSmall } from '../../../../../public/images/avatar/small'

// todo1.
// http://localhost:3000/hansol/write?garnish=egg 이거
// 주소에만 write로 보이고 실 데이터는 write?garnish=egg 다 받아올 수 있는지

// todo2.
// host nickname 어디에 어떻게 저장되는건지,
// 저장되지 않는다면 쿼리스트링으로 밀어넣어서 받을지 고민해보기

export default function WritePage() {
  const [data, onChange] = useGarnishInput({
    nickname: '',
    content: '',
  })

  const pathname = usePathname()
  const params = useSearchParams()
  const router = useRouter()
  const isMobile = isMobileDevice()

  const textareaHeight = isMobile ? 'h-312' : 'h-512'
  const avatarHeight = isMobile ? 54 : 84
  const avatarTop = isMobile ? 'top-[-48px]' : 'top-[-76px]'
  const avatarLocation = [
    { name: '공룡', src: dragonSmall, location: `${isMobile ? 'right-50' : 'right-80'}` },
    { name: '강아지', src: dogSmall, location: `${isMobile ? 'right-20' : 'right-30'}` },
    { name: '토끼', src: rabbitSmall, location: `${isMobile ? 'right-[-13px]' : 'right-[-20px]'}` },
  ]

  // * mount될 때 체크되는 URL 데이터 리스트
  const getChosenGarnish = params.get('garnish')
  const validGarnish = garnishes.find((garnish) => garnish.id === getChosenGarnish)
  const userId = pathname.split('/').filter((item) => item)[0]

  useEffect(() => {
    if (!validGarnish) {
      router.push(`/${userId}/set-garnish`)
    }
  }, [])

  return (
    <div className="">
      <TopButton />
      <form>
        <h1 className="font-xl pt-12">
          닉네임닉네임닉네임에게
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
            value={data.nickname}
            onChange={(e) => onChange('nickname', e.target.value)}
            maxLength={8}
            placeholder="떡국에 남겨질 닉네임을 입력해주세요"
            className="placeholder:font-sm rounded-4 border-2 border-pr-200 bg-white px-24 py-16 font-soyoThin placeholder:text-gr-300"
          />
          <span className="font-sm absolute bottom-19 right-24 text-[#4B4B4B]">
            {`${data.nickname.length > 8 ? 8 : data.nickname.length}/8`}
          </span>
        </div>
        <div className="relative">
          <Textarea
            value={data.content}
            onChange={(e) => onChange('content', e.target.value)}
            maxLength={700}
            placeholder="덕담으로 행복한 새해를 선물해 주세요!"
            className={`
              ${textareaHeight}
              placeholder:font-sm my-16 font-soyoThin placeholder:text-gr-300
            `}
          />
          <span className="font-sm absolute bottom-15 right-24 text-[#4B4B4B]">
            {`${data.content.length > 700 ? 700 : data.content.length}/700`}
          </span>
        </div>
      </form>

      {isMobile ? (
        <Button size="full" className="mt-16">
          완료
        </Button>
      ) : (
        <BottomButton fullBtnName="완료" fullBtnClick={() => console.log(data)} />
      )}
    </div>
  )
}
