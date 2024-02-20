'use client'
import { getGarnishDetail } from '@/services/garnish'
import { useMutation } from '@tanstack/react-query'
import Image from 'next/image'
import { iconArrow } from '../../../../public/images/icons'
import { garnishes as grnisheImgs } from '../../../../data/garnishes'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/useToast'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import LoadingPage from '@/app/loading'

export default function Garnishpage() {
  const { toast } = useToast()
  const router = useRouter()
  const params = useParams<{ userId: string; garnishId: string }>()

  const [garnishType, setGarnishType] = useState('basicRc')
  const [nickname, setNickname] = useState('')
  const [content, setContent] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const onSubmit = useMutation({
    mutationFn: (garnishId: string) => getGarnishDetail(garnishId),
    onSuccess: (res) => {
      if (res.code === 200) {
        setGarnishType(res.data.garnishType ? res.data.garnishType : 'basicRc')
        setNickname(res.data.nickName ? res.data.nickName : '')

        if (res.data.content) {
          // 사용자 디바이스 환경에 따른 줄바꿈 문자열 치환
          let userAgent = navigator.userAgent.toLowerCase()
          if (userAgent.indexOf('windows') !== -1) {
            // 윈도우 환경
            setContent(res.data.content.replaceAll(/<br\s*\/?>/gi, '\r\n'))
          } else if (
            userAgent.indexOf('mac') !== -1 ||
            userAgent.indexOf('iphone') !== -1 ||
            userAgent.indexOf('ipad') !== -1 ||
            userAgent.indexOf('ipod') !== -1
          ) {
            // 맥, iOS 환경
            setContent(res.data.content.replaceAll(/<br\s*\/?>/gi, '\n'))
          } else {
            // 기타 플랫폼
            setContent(res.data.content.replaceAll(/<br\s*\/?>/gi, '\n'))
          }
        }
      } else if (res.code === 400) {
        toast({
          duration: 1850,
          description: '존재하지 않는 고명입니다.',
        })
        router.push(`/error`)
      } else if (res.code === 1000) {
        // todo 1000 에러처리
        toast({
          duration: 1850,
          description: '해당 고명은 고명 주인만 확인 가능해요!',
        })
        router.push(`/error`)
      }
    },
    onError: (err) => console.error('tteok err', err),
  })

  useEffect(() => {
    const TIME_ZONE = 9 * 60 * 60 * 1000 // 9시간
    const d = new Date()

    const currDate = new Date(new Date(d.getTime() + TIME_ZONE).toISOString().split('T')[0])

    const openDate = new Date('2024-02-09')
    if (currDate >= openDate) {
      setIsOpen(true)
    } else {
      router.push(`/error`)
    }
    onSubmit.mutate(params.garnishId)
  }, [])

  return isOpen ? (
    <>
      <div className={'h-full bg-cover'}>
        <div className={'mt-[-12px] flex'}>
          <div className={'cursor-pointer py-12 pl-0 pr-24'} onClick={() => router.back()}>
            <Image src={iconArrow} alt="왼쪽을 가르키는 화살표 이미지" width={24} height={24} />
          </div>
        </div>
        <div className="flex flex-col gap-y-24">
          <div className={'flex flex-col items-center justify-center gap-y-10'}>
            <Image
              src={
                grnisheImgs.find((garnishImg) => garnishImg.id === garnishType)?.src ||
                grnisheImgs[6].src
              }
              alt={'고명이미지'}
              width={78}
              height={78}
            ></Image>
            <h1 className={'font-soyoThin text-16 font-normal text-gr-900'}>
              <span className={'font-bold text-pr-500'}>{nickname}</span>님이 남긴 덕담
            </h1>
          </div>
          <div
            className={
              'blue-scroll h-[calc(100vh-224px)] w-full flex-shrink-0 flex-grow rounded-4 border-1  border-pr-200 bg-white p-20 font-soyoThin text-14 font-normal'
            }
          >
            <div className={'whitespace-pre-line  break-all'}>{content}</div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <LoadingPage />
  )
}
