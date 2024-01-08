import { TopButton } from '@/components/common'
import Image from 'next/image'
import { basicDish } from '../../../../public/images/dishes'
import {
  miniBlueGradation,
  miniBlueDew,
  minipinkDew,
  minipinkGradation,
  miniPurpleCheck,
  miniYellowCheck,
} from '../../../../public/images/matts'
import { BottomButton } from '@/components/common'

export default function ChangeMattPage() {
  return (
    <>
      <div className="bg h-364 bg-[url(/images/matts/purpleCheck.png)] bg-cover bg-no-repeat">
        <TopButton />
        <p className="font-xl">변경할 테이블 매트를</p>
        <p className="font-xl">선택해 주세요</p>
        <Image width={184} height={184} src={basicDish} alt="dish image" className="m-auto mt-20" />
      </div>
      {/* 메트이미지 클릭시 border 선택표시 활성화 */}
      <div className="grid grid-cols-4 grid-rows-2 gap-x-12">
        <button>
          <Image
            width={75}
            height={75}
            src={miniBlueDew}
            alt="dish image"
            className="m-auto mt-20"
          />
        </button>
        <button>
          {' '}
          <Image
            width={75}
            height={75}
            src={miniPurpleCheck}
            alt="dish image"
            className="m-auto mt-20"
          />
        </button>
        <button>
          <Image
            width={75}
            height={75}
            src={minipinkDew}
            alt="dish image"
            className="m-auto mt-20"
          />
        </button>
        <button>
          {' '}
          <Image
            width={75}
            height={75}
            src={minipinkGradation}
            alt="dish image"
            className="m-auto mt-20"
          />
        </button>
        <button>
          <Image
            width={75}
            height={75}
            src={miniBlueDew}
            alt="dish image"
            className="m-auto mt-20"
          />
        </button>
        <button>
          {' '}
          <Image
            width={75}
            height={75}
            src={miniYellowCheck}
            alt="dish image"
            className="m-auto mt-20"
          />
        </button>
        <button>
          <Image
            width={75}
            height={75}
            src={minipinkDew}
            alt="dish image"
            className="m-auto mt-20"
          />
        </button>
        <button>
          {' '}
          <Image
            width={75}
            height={75}
            src={minipinkGradation}
            alt="dish image"
            className="m-auto mt-20"
          />
        </button>
      </div>
      <BottomButton fullBtnName="완료" />
    </>
  )
}
