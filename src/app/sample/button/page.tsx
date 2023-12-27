import { Button } from '@/components/ui/button'

export default function SampleButtonPage() {
  return (
    <>
      <span className="font-bold">
        📢 기본 사이즈 지정 되어있더라도 className에 추가 지정해주면 className에 정의된 속성이
        우선하도록 설정해뒀음
      </span>

      <hr className="hr" />

      <p className="mb-4 font-bold">☑️ 아무것도 지정하지 않은 기본 버튼</p>
      <Button>default</Button>

      <hr className="hr" />

      <p className="mb-4 font-bold">☑️ size=sm / size=lg</p>
      <div className="flex-center mt-10">
        <Button size="sm" className="bg-slate-300">
          sm
        </Button>
        <Button size="lg" className="ml-10 bg-slate-300">
          lg
        </Button>
      </div>

      <hr className="hr" />

      <p className="mb-4 font-bold">☑️ size=full</p>
      <Button size="full" className="bg-slate-300">
        full
      </Button>

      <hr className="hr" />

      <p className="mb-4 font-bold">☑️ shape=circle / width, height는 className으로 지정</p>
      <Button shape="circle" className="h-60 w-60 bg-slate-300">
        동글
      </Button>

      <hr className="hr" />

      <p className="mb-4 font-bold">
        ☑️ 버튼에 링크를 연결하는 방법: href prop에 경로만 적어주면 Link로 알아서 넘겨줌 <br />
        <sub>href가 아예 없으면 일반 버튼, href에 경로를 적으면 Link가 같이 있는 버튼</sub>
      </p>
      <Button href="/" className="bg-slate-300 p-8">
        클릭 시 메인페이지로 이동
      </Button>
    </>
  )
}
