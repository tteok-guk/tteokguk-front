'use client'

import { useEffect, useRef, useState } from 'react'
import saveAs from 'file-saver'
import { BottomButton } from './common'
import Image from 'next/image'
import * as htmlToImage from 'html-to-image'
import SaveImage from './SaveImage'
import { iconClose } from '../../public/images/icons'
import { toast } from '@/hooks/use-toast'
import Link from 'next/link'

export default function SaveAsImageHandler({}) {
  const divRef = useRef<HTMLDivElement>(null)
  const [capturedImage, setCapturedImage] = useState('')
  const [screenshot, setScreenshot] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const handleDownload = async () => {
    setScreenshot(true)

    setTimeout(async () => {
      if (!divRef.current) return
      try {
        const div = divRef.current

        const canvas = await htmlToImage.toCanvas(div, { includeQueryParams: true })

        canvas.toBlob((blob) => {
          if (blob !== null) {
            // Blob 데이터를 이미지 URL로 변환하여 상태에 저장
            const imageURL = URL.createObjectURL(blob)
            setCapturedImage(imageURL)

            // 파일로 저장
            saveAs(blob, 'result.png')
          }
        })
        if (isMobile) {
          setIsMobileOpen(true)
          setScreenshot(false)
          alert('모바일 이여서 isMobileOpen됨!')
        }
        toast({ description: '사진이 저장되었습니다.' })
      } catch (error) {
        console.error('Error converting div to image:', error)
      } finally {
        setTimeout(() => {
          setScreenshot(false)
        }, 3000)
      }
    }, 0)
  }

  useEffect(() => {
    const isMobile = /Mobi/i.test(window.navigator.userAgent)
    if (isMobile) {
      setIsMobile(true)
      alert('모바일로 열림')
    }
  }, [])

  const basic = !screenshot && !isMobileOpen
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
      {isMobileOpen && (
        <div className="relative mx-[-20px] mt-[-32px] h-dvh">
          <Image src={capturedImage} alt="snap-shot" layout="fill" />
          <Image
            src={iconClose}
            width={24}
            height={24}
            alt="iconClose"
            className=" absolute right-20 top-20 m-12"
            onClick={() => setIsMobile(false)}
          />
        </div>
      )}
    </>
  )
}
