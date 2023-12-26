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
      <h1 className="mb-2 text-center text-3xl font-bold">컴포넌트 예시 페이지 링크</h1>

      <hr className="hr" />
      <span className="flex-center gap-2">
        사용 예시 페이지 있는 컴포넌트: button<sub>(23-12-26 19:50 기준)</sub>
      </span>
      <hr className="hr" />

      <div className="flex-center mx-auto w-full flex-col space-y-4">
        {components.map((name, idx) => (
          <div key={idx} className="flex gap-2 font-medium">
            <span className="flex-center">{name} :</span>
            <Button className="border p-2 hover:bg-indigo-100">
              <Link href={`https://ui.shadcn.com/docs/components/${name}`} target="_blank">
                공식문서
              </Link>
            </Button>
            <Button key={idx} className="border p-2 hover:bg-orange-100">
              <Link href={`sample/${name}`} target="_blank">
                사용예시
              </Link>
            </Button>
          </div>
        ))}
      </div>
    </>
  )
}
