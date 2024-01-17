import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { isMobileDevice } from '@/utils/isMobileDevice'
import { MattType } from '@/types/mattType'
import { speechBubble } from '../../public/images/avatar'

const SaveImage = ({ type }: snapShotType) => {
  const isMobile = isMobileDevice()
  const [location, setLocation] = useState('')
  const tempData = {
    hostAvatar: 'rabbit',
    visitorAvatar: 'dragon',
  }
  useEffect(() => {
    if (type === 'basic' && isMobile) {
      setLocation('left-[0px] top-[200px]')
      return
    }
    if (type === 'basic' && !isMobile) {
      setLocation('left-[0px] top-[262px]')
      return
    }
    if (type === 'snapShot' && isMobile) {
      setLocation('left-[0px] top-[310px]')
      return
    }
    if (type === 'snapShot' && !isMobile) {
      setLocation('left-[0px] top-[350px]')
      return
    }
    // const location: MattType = {
    //   basic: isMobile ? 'left-[0px] top-[200px]' : 'left-[0px] top-[262px]',
    //   snapShot: isMobile ? 'left-[0px] top-[310px]' : 'left-[0px] top-[350px]',
    // }
  }, [])

  return (
    <>
      {/* <div className={`flex-center absolute ${location} flex  w-full flex-row gap-27 lg:gap-70 `}>
        <div className={`relative h-164 w-164 scale-x-[-1] md:h-164 md:w-164 lg:h-200 lg:w-200`}>
          <Image
            src={`/images/avatar/arm/${tempData.hostAvatar}Arm.png`}
            layout="fill"
            alt="hostAvatar"
          />
        </div>
        <div className={`relative h-164 w-164  lg:h-200 lg:w-200`}>
          <Image
            src={`/images/avatar/arm/${tempData.visitorAvatar}Arm.png`}
            layout="fill"
            alt="visitorAvatar"
          />
        </div>
      </div> */}
      {/* <div className=" grid w-full grid-cols-2 bg-gr-300 ">
        <div className="relative col-span-2 h-205  w-full pl-27 pr-20">
          <Image src={speechBubble} alt="말풍선" layout="fill" />
        </div>
        <div className=" relative flex h-164 w-full scale-x-[-1] bg-red-200">
          <Image
            src={`/images/avatar/arm/${tempData.hostAvatar}Arm.png`}
            layout="fill"
            alt="hostAvatar"
          />
        </div>
        <div className="relative h-164 w-full bg-pr-200">
          <Image
            src={`/images/avatar/arm/${tempData.visitorAvatar}Arm.png`}
            layout="fill"
            alt="hostAvatar"
          />
        </div>
      </div> */}
      <div className="relative  h-full w-full bg-pr-200 px-2">
        <div className="relative block  w-full">
          <Image src={speechBubble} alt="말풍선" layout="responsive" />
        </div>
        <div className=" flex flex-row gap-30 bg-red-200">
          <div className="relative block h-160 w-1/2 scale-x-[-1] ">
            <Image
              src={`/images/avatar/arm/${tempData.hostAvatar}Arm.png`}
              width={164}
              height={164}
              layout="responsive"
              alt="hostAvatar"
            />
          </div>

          <div className="relative block h-160 w-1/2">
            <Image
              src={`/images/avatar/arm/${tempData.visitorAvatar}Arm.png`}
              width={164}
              height={164}
              layout="responsive"
              alt="hostAvatar"
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default SaveImage

export interface snapShotType {
  type: string
}
