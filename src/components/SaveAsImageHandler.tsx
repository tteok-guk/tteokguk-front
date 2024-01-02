'use client'

import { useEffect, useRef, useState } from 'react'
import saveAs from 'file-saver'
import { BottomButton } from './common'
import Image from 'next/image'
import * as htmlToImage from 'html-to-image'
import SaveImage from './SaveImage'
import { iconClose } from '../../public/images/icons'
import { toast } from '@/hooks/use-toast'

export default function SaveAsImageHandler({}) {
  const divRef = useRef<HTMLDivElement>(null)

  const [screenshot, setScreenshot] = useState(false)

  const handleDownload = async () => {
    // setScreenshot(true)를 setTimeout 이전으로 이동
    setScreenshot(true)

    setTimeout(async () => {
      if (!divRef.current) return // divRef를 참조하기 전에 체크
      try {
        const div = divRef.current

        // Use html-to-image library
        const canvas = await htmlToImage.toCanvas(div)
        canvas.toBlob((blob) => {
          if (blob !== null) {
            saveAs(blob, 'result.png')
          }
        })
        toast({ description: '사진이 저장되었습니다.' })
      } catch (error) {
        console.error('Error converting div to image:', error)
      } finally {
        // setScreenshot(false)를 여기서 호출하여 3초 후에 숨기도록 변경
        setTimeout(() => {
          setScreenshot(false)
        }, 3000)
      }
    }, 0) // setTimeout 내부에서 바로 실행
  }
  console.log(screenshot)
  return (
    <>
      {!screenshot && (
        <div className="mx-[-20px] mt-[-32px] h-dvh bg-[url(/images/matts/red.png)] p-20">
          <div className="flex flex-row-reverse">
            <Image src={iconClose} width={24} height={24} alt="iconClose" className=" m-12 " />
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
        <div
          ref={divRef}
          className="flex-center mx-[-20px] mt-[-32px] flex h-dvh flex-col items-center bg-[url(/images/matts/red.png)] "
        >
          <div className="font-lg mt-50 pb-20">
            <p>2024 어쩌구 이런 멘트랑</p>
            <p>뒷 배경은 일러스트</p>
          </div>
          <SaveImage />
        </div>
      )}
    </>
  )
}
