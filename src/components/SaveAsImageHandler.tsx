'use client'

import { toast } from '@/hooks/use-toast'
import { getAvatar } from '@/services/snapShot'
import { useQuery } from '@tanstack/react-query'
import saveAs from 'file-saver'
import html2canvas from 'html2canvas' // Import html2canvas
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { captureInfo } from '../../public/images/avatar'
import { iconClose, iconError, iconSave } from '../../public/images/icons'
import SaveImage from './SaveImage'
import { BottomButton } from './common'

export interface Props {
  userId: string
  garnish?: string
}

export default function SaveAsImageHandler({ userId, garnish }: Props) {
  const divRef = useRef<HTMLDivElement>(null)
  const [capturedImage, setCapturedImage] = useState('')
  const [screenshot, setScreenshot] = useState(false)
  const [isKakao, setIsKakao] = useState(false)

  const { data } = useQuery({
    queryKey: ['getAvatar'],
    queryFn: () => getAvatar({ userId }),
  })

  const handleDownload = async () => {
    setScreenshot(true)

    setTimeout(async () => {
      if (!divRef.current) return

      try {
        const div = divRef.current

        const canvas = await html2canvas(div, { logging: true })

        canvas.toBlob((blob) => {
          if (blob !== null) {
            const imageURL = URL.createObjectURL(blob)

            saveAs(blob, '떡국.png')
            const isKakaoTalkInAppBrowser = /KAKAOTALK/i.test(window.navigator.userAgent)
            if (isKakaoTalkInAppBrowser) {
              setIsKakao(true)
              setScreenshot(false)
              // setCapturedImage(imageURL)
              blobToDataURL(blob).then((dataUrl) => setCapturedImage(dataUrl))
              return
            } else {
              toast({ description: '이미지 저장이 완료되었어요!' })
            }
          }
        })
      } catch (error) {
        console.error('Error converting div to image:', error)
      } finally {
        setTimeout(() => {
          setScreenshot(false)
        }, 3000)
      }
    }, 0)
  }

  // ! test: blob -> base64 인코딩된 DataURL 로 변환
  const blobToDataURL = (imageURL: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        // 결과가 null이 아닌지 확인하고 string으로 캐스팅
        if (reader.result) {
          resolve(reader.result as string)
        } else {
          reject(new Error('FileReader의 결과값이 null입니다.'))
        }
      }
      reader.onerror = reject
      reader.readAsDataURL(imageURL)
    })
  }

  const basic = !screenshot && !isKakao
  return (
    <>
      {basic && (
        <div className=" relative mx-[-20px] mt-[-32px] h-dvh bg-[url(/images/avatar/photo.png)] bg-cover bg-center p-20">
          {/* <a href={`${capturedImage}`} download={'떡국.png'} className="z-50">
            <p>카카오 인앱 다운로드 테스트</p>
          </a> */}
          <button onClick={handleDownload}>테스트</button>
          {capturedImage && <Image src={capturedImage} alt="" width={200} height={200} />}

          {/* <div className="flex flex-row-reverse">
            <Link href={`/${userId}?page=${data?.lastPage}`}>
              <Image src={iconClose} width={24} height={24} alt="iconClose" className=" m-12 " />
            </Link>
          </div>
          <div className="font-xl ">
            <p>덕담 남기기 완료!</p>
            <p>사진을 저장하고 공유해 보세요.</p>
          </div>
          <div className="font-sm flex flex-row items-center gap-4 text-pr-500">
            <Image src={iconError} alt="iconError" width={18} height={18} className="py-2" />
            <p>현재 페이지는 벗어나면 다시 돌아올 수 없어요!</p>
          </div>

          <div className=" flex-center  relative mt-40 ">
            {data && garnish && <SaveImage type="basic" avatar={data} garnish={garnish} />}
        </div> */}

          <BottomButton
            bgColor="bg-transperant"
            fullBtnName="사진 저장하기"
            fullBtnClick={handleDownload}
            icon={iconSave}
          />
        </div>
      )}
      {screenshot && (
        <div className="mx-[-20px] mt-[-32px] ">
          <div
            ref={divRef}
            className="relative h-dvh bg-[url(/images/avatar/savePhoto.png)] bg-cover bg-center p-20"
          >
            <div className=" flex-center mt-152 ">
              {data && garnish && <SaveImage type="snapShot" avatar={data} garnish={garnish} />}
            </div>
          </div>
          <Image
            src={iconClose}
            width={24}
            height={24}
            alt="iconClose"
            className=" absolute right-20 top-20 m-12"
            onClick={() => setScreenshot(false)}
          />
        </div>
      )}
      {isKakao && capturedImage && (
        <div className="relative mx-[-20px] mt-[-32px] h-dvh">
          {/* <Image src={capturedImage} alt="snap-shot" layout="fill" className=" cursor-pointer" />
          <Link href={`/${userId}?page=${data?.lastPage}`}>
            <Image
              src={iconClose}
              width={24}
              height={24}
              alt="iconClose"
              className=" absolute right-20 top-20 m-12"
            />
          </Link> */}
          {/* <a href={`${capturedImage}`} download={'떡국.png'}>
            <Image
              src={capturedImage}
              alt="capturedImage"
              width={310}
              height={104}
              className="absolute bottom-[50px] left-[33px]"
            />
          </a> */}
          <Image src={capturedImage} alt="" width={200} height={200} />
        </div>
      )}
    </>
  )
}
