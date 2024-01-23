import Image from 'next/image'
import { speechBubble } from '../../public/images/avatar'

const SaveImage = ({ avatar, garnish }: snapShotType) => {
  const visitorAvatar = avatar.visitorAvatar !== 'NONE' ? avatar.visitorAvatar : 'dragon'

  return (
    <>
      <div className="relative px-2">
        <div className="relative block  w-full">
          <Image src={speechBubble} alt="말풍선" layout="responsive" />
        </div>
        <div className=" flex w-full flex-row gap-30">
          <div className=" relative z-[99] block h-160 w-1/2 scale-x-[-1]">
            <Image
              src={`/images/avatar/arm/${avatar.hostAvatar}Arm.png`}
              width={164}
              height={164}
              layout="responsive"
              alt="hostAvatar"
              className=" min-h-164 min-w-164"
            />
          </div>
          <div className="relative mx-[-55px] mt-[20%] block h-57 w-1/5">
            <Image
              src={`/images/garnishes/${garnish}.png`}
              width={71}
              height={57}
              layout="responsive"
              alt="garnishes"
            />
          </div>
          <div className="relative block h-160 w-1/2">
            <Image
              src={`/images/avatar/arm/${visitorAvatar}Arm.png`}
              width={164}
              height={164}
              layout="responsive"
              alt="hostAvatar"
              className=" min-h-164 min-w-164"
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default SaveImage

export interface snapShotType {
  avatar: {
    hostAvatar: string
    visitorAvatar: string
  }
  garnish: string
}
