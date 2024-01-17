import Image from 'next/image'
import React from 'react'
import { isMobileDevice } from '@/utils/isMobileDevice'
import { MattType } from '@/types/mattType'

const SaveImage = ({ type }: snapShotType) => {
  console.log(type)
  const isMobile = isMobileDevice()

  const tempData = {
    hostAvatar: 'rabbit',
    visitorAvatar: 'dragon',
  }
  const location: MattType = {
    basic: isMobile ? 'left-[0px] top-[203px]' : 'left-[0px] top-[262px]',
    snapShot: isMobile ? 'left-[0px] top-[310px]' : 'left-[0px] top-[350px]',
  }
  return (
    <div
      className={`flex-center absolute ${location[type]} flex  w-full flex-row gap-27 lg:gap-70 `}
    >
      {/* <div
        className={` absolute ${
          type === 'snap-shot' ? Location['leftFilming'] : Location['leftBasic']
        } lg:pl-430 h-164 w-164 scale-x-[-1] lg:h-200 lg:w-200`}
      > */}
      <div className={`relative h-164 w-164 scale-x-[-1] md:h-164 md:w-164 lg:h-200 lg:w-200`}>
        <Image
          src={`/images/avatar/arm/${tempData.hostAvatar}Arm.png`}
          layout="fill"
          alt="hostAvatar"
        />
      </div>
      {/* <div
        className={` absolute ${
          type === 'snap-shot' ? Location['rightFilming'] : Location['rightBasic']
        }  h-164 w-164 lg:h-200 lg:w-200`}
      > */}
      <div className={`relative h-164 w-164  lg:h-200 lg:w-200`}>
        <Image
          src={`/images/avatar/arm/${tempData.visitorAvatar}Arm.png`}
          layout="fill"
          alt="visitorAvatar"
        />
      </div>
    </div>
  )
}

export default SaveImage

export interface snapShotType {
  type: string
}
