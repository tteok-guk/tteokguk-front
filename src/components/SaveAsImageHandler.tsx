'use client'

import { useEffect, useRef, useState } from 'react'
import saveAs from 'file-saver'
import { BottomButton } from './common'
import Image from 'next/image'
import html2canvas from 'html2canvas' // Import html2canvas
import SaveImage from './SaveImage'
import { iconClose } from '../../public/images/icons'
import { toast } from '@/hooks/use-toast'
import Link from 'next/link'

export default function SaveAsImageHandler({}) {
  const divRef = useRef<HTMLDivElement>(null)
  const [capturedImage, setCapturedImage] = useState('')
  const [screenshot, setScreenshot] = useState(false)
  const [isKakao, setIsKakao] = useState(false)
  // const [isMobileOpen, setIsMobileOpen] = useState(false)

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
              return
            } else {
              toast({ description: '사진이 저장되었습니다.' })
            }
            if (isKakao) {
              setCapturedImage(imageURL)
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

  useEffect(() => {}, [])

  const basic = !screenshot && !isKakao && !capturedImage
  return (
    <>
      {basic && (
        <div className="mx-[-20px] mt-[-32px] h-dvh bg-[url(/images/matts/red.png)] p-20">
          <div className="flex flex-row-reverse">
            <Link href={'/host'}>
              <Image src={iconClose} width={24} height={24} alt="iconClose" className=" m-12 " />
            </Link>
          </div>
          <div className="font-xl mb-75">
            <p>덕담 남기기 완료</p>
            <p>같이 사진 찍고 소원빌래?</p>
          </div>
          <SaveImage />
          <BottomButton
            bgColor="bg-transperant"
            split="twice"
            smallBtnName="저장"
            fullBtnName="사진 공유"
            smallBtnClick={handleDownload}
          />
        </div>
      )}
      {screenshot && (
        <div className="relative mx-[-20px] mt-[-32px] h-dvh bg-red-200">
          <div
            ref={divRef}
            className=" flex-center    flex h-dvh flex-col items-center bg-[url(/images/matts/red.png)] "
          >
            <div className="font-lg mt-50 pb-20">
              <p>2024 어쩌구 이런 멘트랑</p>
              <p>뒷 배경은 일러스트</p>
            </div>
            <SaveImage />
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
          <Image src={capturedImage} alt="snap-shot" layout="fill" />
          <Image
            src={iconClose}
            width={24}
            height={24}
            alt="iconClose"
            className=" absolute right-20 top-20 m-12"
            onClick={() => setIsKakao(false)}
          />
        </div>
      )}
    </>
  )
}
