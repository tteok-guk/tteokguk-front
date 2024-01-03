'use client'

const JoinStep = ({ stepNum }: JoinStepType) => {
  const inputStyleClass = 'w-full px-0 py-4 rounded-0 font-lg text-gr-900 border-t-0 border-x-0 border-b-1 border-b-[#ADADAD] bg-transparent placeholder:text-[#ADADAD] placeholder:font-lg'
  let stepUI

  if (stepNum === 1) {
    stepUI = <>
      <div>
        <div>
          <div>
            <h1>내 떡국에 표시될<br />닉네임을 만들어 주세요</h1>
            <h2>최대 8자 / 공백, 특수기호 불가</h2>
            <div>
              <input
                type={'text'}
                placeholder={'닉네임을 입력해 주세요'}
                maxLength={8}
                className={`${inputStyleClass} caret-pr-500 focus:outline-none`} />
            </div>
          </div>
        </div>
      </div>
    </>
  } else if (stepNum === 2) {
    stepUI = <div>두 번째 단계 UI</div>;
  } else if (stepNum === 3) {
    stepUI = <div>세 번째 단계 UI</div>;
  }

  return stepUI
}

export default JoinStep

export interface JoinStepType {
  stepNum: number
}