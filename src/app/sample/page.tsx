import Link from 'next/link'
import { Button } from '@/components/ui/button'

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
      <h1 className="mb-2 text-center text-3xl font-bold">shadcn 컴포넌트 예시 페이지 링크</h1>
      <hr className="my-4 border border-gray-200" />
      <p className="text-center text-sm">
        form의 경우 react-hook-form을 기반으로 하고 있어서 해당 라이브러리도 같이 설치해뒀어요!
      </p>
      <hr className="my-4 border border-gray-200" />
      <div className="align mx-auto flex w-32 flex-col space-y-4">
        {components.map((name, idx) => (
          <Button key={idx} variant="outline" asChild>
            <Link href={`https://ui.shadcn.com/docs/components/${name}`} target="_blank">
              {name}
            </Link>
          </Button>
        ))}
      </div>
    </>
  )
}
