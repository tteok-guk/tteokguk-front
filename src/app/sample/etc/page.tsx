'use client'

export default function SampleEtcPage() {
  return (
    <>
      <h1 className="font-xl">기타 공통 컴포넌트/클래스 사용 예시</h1>

      <hr className="hr" />

      <h2 className="font-lg">와이어프레임 기준 폰트 className</h2>
      <p className="mb-20 text-sm">
        font-XX 안에 와이어프레임에 맞는 font-size, font-weight, line-height 한번에 걸어뒀음
      </p>
      <ul className="flex flex-col gap-10">
        <li className="font-xl">className=&quot;font-xl&quot; 👉🏻 font-size: 24px</li>
        <li className="font-lg">className=&quot;font-lg&quot; 👉🏻 font-size: 18px</li>
        <li className="font-base">className=&quot;font-base&quot; 👉🏻 font-size: 16px</li>
        <li className="font-sm">className=&quot;font-sm&quot; 👉🏻 font-size: 14px</li>
        <li className="font-xs">className=&quot;font-xs&quot; 👉🏻 font-size: 11px</li>
      </ul>

      <hr className="hr" />

      <h2 className="font-lg">공통 색상</h2>
      <div className="flex">
        <div className="flex-1 grid grid-cols-3 text-white font-xs">
          <div className="w-50 h-50 bg-pr-100 rounded-8 flex-center">pr-100</div>
          <div className="w-50 h-50 bg-pr-200 rounded-8 flex-center">pr-200</div>
          <div className="w-50 h-50 bg-pr-300 rounded-8 flex-center">pr-300</div>
          <div className="w-50 h-50 bg-pr-400 rounded-8 flex-center">pr-400</div>
          <div className="w-50 h-50 bg-pr-500 rounded-8 flex-center">pr-500</div>
          <div className="w-50 h-50 bg-pr-600 rounded-8 flex-center">pr-600</div>
          <div className="w-50 h-50 bg-pr-700 rounded-8 flex-center">pr-700</div>
          <div className="w-50 h-50 bg-pr-800 rounded-8 flex-center">pr-800</div>
          <div className="w-50 h-50 bg-pr-900 rounded-8 flex-center">pr-900</div>
        </div>
        <div className="flex-1 grid grid-cols-3 text-white font-xs">
          <div className="w-50 h-50 bg-gr-100 rounded-8 flex-center">gr-100</div>
          <div className="w-50 h-50 bg-gr-200 rounded-8 flex-center">gr-200</div>
          <div className="w-50 h-50 bg-gr-300 rounded-8 flex-center">gr-300</div>
          <div className="w-50 h-50 bg-gr-400 rounded-8 flex-center">gr-400</div>
          <div className="w-50 h-50 bg-gr-500 rounded-8 flex-center">gr-500</div>
          <div className="w-50 h-50 bg-gr-600 rounded-8 flex-center">gr-600</div>
          <div className="w-50 h-50 bg-gr-700 rounded-8 flex-center">gr-700</div>
          <div className="w-50 h-50 bg-gr-800 rounded-8 flex-center">gr-800</div>
          <div className="w-50 h-50 bg-gr-900 rounded-8 flex-center">gr-900</div>
        </div>
      </div>
    </>
  )
}
