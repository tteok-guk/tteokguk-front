'use client'
import { getGarnishDetail } from '@/services/garnish'
import { useMutation } from '@tanstack/react-query'
import Image from 'next/image'
import { iconArrow } from '../../../../public/images/icons'
import { garnishes as grnisheImgs } from '../../../../data/garnishes'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

export default function Garnishpage() {
  const { toast } = useToast()
  const router = useRouter()
  const params = useParams<{ userId: string; garnishId: string }>()
  
  const [garnishType, setGarnishType] = useState('basicRc')
  const [nickname, setNickname] = useState('')
  const [content, setContent] = useState('')

  const onSubmit = useMutation({
    mutationFn: (garnishId: string) => getGarnishDetail(garnishId),
    onSuccess: (res) => {
      console.log("tteok>>" , res)
      if (res.code === 200) {
        setGarnishType(res.data.garnishType?res.data.garnishType:'basicRc')
        setNickname(res.data.nickName?res.data.nickName:'')
        setContent(res.data.content?res.data.content:'')
      } else if (res.code === 400) {
        // 존재하지 않는 고명입니다.
        console.log('존재하지 않는 고명입니다.')
        // todo 솔님이 만들어준 컴포넌트 붙이기
      } else if (res.code === 1000) {
        // todo 1000 에러처리
      }
    },
    onError: (err) => console.log('tteok err>>', err), // todo 에러핸들링 추가

  })

  useEffect(() => {
    onSubmit.mutate(params.garnishId)
  }, [])

  return (
    <div className={'bg-cover h-full'}>
      <div className={'flex mt-[-12px]'}>
        <div className={'pl-0 pr-24 py-12 cursor-pointer'} onClick={() => (router.back())}>
          <Image src={iconArrow} alt="왼쪽을 가르키는 화살표 이미지" width={24} height={24} />
        </div>
      </div>
      <div className='flex flex-col gap-y-24'>
        <div className={'flex justify-center flex-col items-center gap-y-10'}>
          <Image src={grnisheImgs.find((garnishImg) => garnishImg.id === garnishType)?.src || grnisheImgs[6].src} alt={'고명이미지'} width={78} height={78} ></Image>
          <h1 className={'text-gr-900 font-soyoThin text-16 font-normal'}><span className={'text-pr-500 font-bold'}>{nickname}</span>님이 남긴 덕담</h1>
        </div>
        <div className={'w-full bg-white border-1 border-pr-200 rounded-4 flex-grow flex-shrink-0  h-[calc(100vh-224px)] p-20 font-soyoThin font-normal text-14 blue-scroll'}>
          <div className={'whitespace-pre-line  break-all'}>
            {content}
          </div>
        </div>
      </div>
    </div>
  )
}
