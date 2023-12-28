'use client'

type colorsType = {
  [key: number]: string
}

export default function SampleEtcPage() {
  const prColors: colorsType = {
    1: 'bg-pr-100',
    2: 'bg-pr-200',
    3: 'bg-pr-300',
    4: 'bg-pr-400',
    5: 'bg-pr-500',
    6: 'bg-pr-600',
    7: 'bg-pr-700',
    8: 'bg-pr-800',
    9: 'bg-pr-900',
  }

  const grColors: colorsType = {
    1: 'bg-gr-100',
    2: 'bg-gr-200',
    3: 'bg-gr-300',
    4: 'bg-gr-400',
    5: 'bg-gr-500',
    6: 'bg-gr-600',
    7: 'bg-gr-700',
    8: 'bg-gr-800',
    9: 'bg-gr-900',
  }

  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]

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
        <div className="font-xs grid flex-1 grid-cols-3 text-white">
          {arr.map((num, idx) => (
            <div key={idx} className={`flex-center h-50 w-50 rounded-8 ${prColors[num]}`}>
              {prColors[num].slice(-6)}
            </div>
          ))}
        </div>
        <div className="font-xs grid flex-1 grid-cols-3 text-white">
          {arr.map((num, idx) => (
            <div key={idx} className={`flex-center h-50 w-50 rounded-8 ${grColors[num]}`}>
              {grColors[num].slice(-6)}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
