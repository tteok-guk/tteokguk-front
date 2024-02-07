import { Button } from '@/components/ui/button'
import { BottomButton } from '@/components/common'
import { share, burger } from '../../../public/images/icons'

export default function SamplePage() {
  const components = [
    'badge',
    'button',
    'checkbox',
    'input',
    'label',
    'pagination',
    'skeleton',
    'textarea',
    'toast',
  ]

  return (
    <>
      <h1 className="font-xl mb-4 text-center font-bold">컴포넌트 예시 페이지 링크</h1>

      <hr className="hr" />

      <h2 className="font-lg">shadcn 공식문서 보러가기</h2>
      <div className="mt-10">
        {components.map((name, idx) => (
          <Button
            key={idx}
            href={`https://ui.shadcn.com/docs/components/${name}`}
            className="mr-20 border p-4 text-14 hover:bg-gray-100"
          >
            {name}
          </Button>
        ))}
      </div>

      <hr className="hr" />

      <h2 className="font-lg">shadcn 컴포넌트 사용 예시 보러가기</h2>
      <div className="mt-10">
        <Button href={`sample/shadcn`} className="border p-4 hover:bg-gray-100">
          클릭 시 이동
        </Button>
      </div>

      <hr className="hr" />

      <h2 className="font-lg">기타 (폰트 등) 공통 사용 예시</h2>
      <div className="mt-10">
        <Button href={`sample/button`} className="mr-20 border p-4 hover:bg-gray-100">
          버튼
        </Button>
        <Button href={`sample/etc`} className="border p-4 hover:bg-gray-100">
          폰트 외 기타
        </Button>
      </div>

      <BottomButton
        bgColor="bg-transperant"
        split="openTwice"
        icon={share}
        fullBtnIcon={burger}
        fullBtnName="받은 덕담 모아보기"
      />
    </>
  )
}
