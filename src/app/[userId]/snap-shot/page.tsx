import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { iconClose } from '../../../../public/images/icons'
import { avatar1, defaultAvatar } from '../../../../public/images/avatar'
import React from 'react'
import ShareButton from '@/components/ShareButton'

const snapShotPage = () => {
  const tempData = {
    hostAvatar: 'avatar1',
    visitorAvatar: 'defaultAvatar',
  }
  return (
    <section>
      <div className="flex flex-row-reverse">
        <Image src={iconClose} width={24} height={24} alt="iconClose" className=" m-12 "></Image>
      </div>
      <div className="font-xl mb-75">
        <p>덕담 남기기 완료</p>
        <p>같이 사진 찍고 소원빌래?</p>
      </div>
      <div className="flex-center flex flex-row">
        <Image
          src={`/images/avatar/${tempData.hostAvatar}.png`}
          width={125}
          height={158}
          alt="hostAvatar"
        />
        <Image
          src={`/images/avatar/${tempData.visitorAvatar}.png`}
          width={125}
          height={158}
          alt="visitorAvatar"
        />
      </div>
      <div className="flex-center mb-95 flex flex-row gap-13">
        <div className=" flex-center flex h-108 w-108 rounded-full border bg-gr-500">{'떡국'}</div>
        <div className=" flex-center flex h-108 w-108 rounded-full border bg-gr-500">{'떡국'}</div>
      </div>
      <ShareButton btnType="snap-shot" />
    </section>
  )
}

export default snapShotPage
