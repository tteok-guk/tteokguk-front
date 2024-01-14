import Image from 'next/image'
import React from 'react'

const SaveImage = () => {
  const tempData = {
    hostAvatar: 'avatar1',
    visitorAvatar: 'defaultAvatar',
  }
  return (
    <>
      <div className="flex-center flex flex-row ">
        <div className="relative h-158 w-125">
          <Image src={`/images/avatar/${tempData.hostAvatar}.png`} layout="fill" alt="hostAvatar" />
        </div>
        <div className="relative h-158 w-125">
          <Image
            src={`/images/avatar/${tempData.visitorAvatar}.png`}
            layout="fill"
            alt="visitorAvatar"
          />
        </div>
      </div>
      <div className="flex-center mb-95 flex flex-row gap-13">
        <div className=" flex-center flex h-108 w-108 rounded-full border bg-gr-500">{'떡국'}</div>
        <div className=" flex-center flex h-108 w-108 rounded-full border bg-gr-500">{'떡국'}</div>
      </div>
    </>
  )
}

export default SaveImage
