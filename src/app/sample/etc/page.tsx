export default function SampleEtcPage() {
  return (
    <>
      <h1 className="font-xl">기타 공통 컴포넌트/클래스 사용 예시</h1>
      <hr className="hr" />
      <div>
        <h2 className="font-lg">와이어프레임 기준 폰트 className</h2>
        <p className="mb-2 text-sm">
          font-XX 안에 와이어프레임에 맞는 font-size, font-weight, line-height 한번에 걸어뒀음
        </p>
        <ul className="flex flex-col gap-2">
          <li className="font-xl">className=&quot;font-xl&quot; 👉🏻 font-size: 24px</li>
          <li className="font-lg">className=&quot;font-lg&quot; 👉🏻 font-size: 18px</li>
          <li className="font-base">className=&quot;font-base&quot; 👉🏻 font-size: 16px</li>
          <li className="font-sm">className=&quot;font-sm&quot; 👉🏻 font-size: 14px</li>
          <li className="font-xs">className=&quot;font-xs&quot; 👉🏻 font-size: 11px</li>
        </ul>
      </div>
      <hr className="hr" />
    </>
  )
}
