'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { BottomButton, TopButton } from '@/components/common'

export default function SampleButtonPage() {
  const [disabled, setDisabled] = useState(false)
  
  return (
    <>
      <TopButton />
      <span className="mt-30 font-bold">
        ☑️ TopButton 화살표 클릭 시 뒤로가기가 default <br />
        ☑️ onClick props가 있을 경우 그 함수만 적용됨 <br />
        ☑️ 이때, onClick을 내려주는 상위 컴포넌트가 use client여야만 적용 가능
      </span>

      <hr className="hr" />

      <div className="mb-130">
        <span className="font-bold">
          📢 기본 사이즈 지정 되어있더라도 className에 추가 지정해주면 className에 정의된 속성이
          우선하도록 설정해뒀음 <br />
          📢 일반 default 버튼에는 hover 적용되어있지 않음
        </span>

        <hr className="hr" />

        <p className="mb-4 font-bold">☑️ 아무것도 지정하지 않은 기본 버튼</p>
        <Button onClick={() => window.alert('onClick으로 클릭이벤트 넘길 수 있음')}>
          클릭이벤트
        </Button>

        <hr className="hr" />

        <p className="mb-4 font-bold">☑️ size=full</p>
        <Button size="full">full</Button>

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

        <hr className="hr" />

        <p className="mb-4 font-bold">☑️ 버튼에 disabled 설정하기</p>
        <Button className="mb-10 bg-pr-100 p-10" onClick={() => setDisabled(!disabled)}>
          클릭하면 아래 버튼 disabled 상태 바뀜
        </Button>
        <Button size="full" disabled={disabled}>
          {`현재 disabled 상태 : ${disabled}`}
        </Button>
        <br />
        <p className="mb-10">
          이때 그냥 일반 버튼일 경우 disabled 내려주면 배경 색이 생기니까,
          <br />
          className에 <b className="font-bold text-blue-600">bg-transparent hover:bg-transparent</b>
          를<br /> 별도로 내려줘야 함!
        </p>
        <Button className="bg-transparent hover:bg-transparent" disabled={disabled}>
          {`현재 disabled 상태 : ${disabled}`}
        </Button>
      </div>

      {/* bottomButton에 disabled 내려야 할 경우 아래와 같이 각각 내려주면 됨 */}
      <BottomButton
        split="twice"
        smallBtnName={`${!disabled}`}
        smallBtnDisabled={!disabled}
        fullBtnName={`${disabled}`}
        fullBtnDisabled={disabled}
      />
    </>
  )
}
