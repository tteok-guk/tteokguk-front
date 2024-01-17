import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { isMobileDevice } from '@/utils/isMobileDevice'
import { MattType } from '@/types/mattType'

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
      {location && (
        <div className={`flex-center absolute ${location} flex  w-full flex-row gap-27 lg:gap-70 `}>
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
      )}
    </>
  )
}

export default SaveImage

export interface snapShotType {
  type: string
}
