import { Button } from '@/components/ui/button'
import { BottomButton } from '@/components/common'
import Link from 'next/link'

export default function SampleButtonPage() {
  return (
    <>
      <span className="font-bold">
        📢 기본 사이즈 지정 되어있더라도 className에 추가 지정해주면 className에 정의된 속성이
        우선하도록 설정해뒀음
      </span>

      <hr className="hr" />

      <p className="mb-2 font-bold">☑️ 아무것도 지정하지 않은 기본 버튼</p>
      <Button>default</Button>

      <hr className="hr" />

      <p className="mb-2 font-bold">☑️ size=sm</p>
      <Button size="sm" className="bg-slate-300">
        sm과 full의 높이는 서로 동일함 (40px)
      </Button>

      <hr className="hr" />

      <p className="mb-2 font-bold">☑️ size=full</p>
      <Button size="full" className="bg-slate-300">
        size: full은 해당 화면의 width를 가득 채움
      </Button>

      <hr className="hr" />

      <p className="mb-2 font-bold">☑️ shape=circle / width, height는 className으로 지정</p>
      <Button shape="circle" className="h-14 w-14 bg-slate-300">
        동글
      </Button>

      <hr className="hr" />

      <p className="mb-2 font-bold">☑️ 버튼에 링크를 연결하는 방법</p>
      <Button className="bg-slate-300 p-4">
        <Link href="/">클릭 시 메인페이지로 이동</Link>
      </Button>
    </>
  )
}
