'use client'

import { BottomButton } from "@/components/common";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

// 상태 Enum
const StepStatus = {
  INITIAL: 'stepInitial',
  IN_PROGRESS: 'stepInProgress',
  COMPLETE: 'stepComplete',
}

export default function JoinPage() {
  // TODO svg 이미지 경로로 분리
  // TODO useInput Hooks 만들기

  // 인풋 스타일 - 너무 길어서 변수로 뺏는데 더 나은 방법을 알려주세요..
  const inputStyleClass = 'w-full px-0 py-4 rounded-0 font-lg text-gr-900 border-t-0 border-x-0 border-b-1 border-b-[#ADADAD] bg-transparent placeholder:text-[#ADADAD] placeholder:font-lg'
  
  // 3단계 밖에 안되서 이렇게 했는데.. stack으로 구현하면 더 좋을거 같긴 해요... 어덯게 하는거죠?
  const [step, setStep] = useState({
      current : 0,
      status : [StepStatus.INITIAL, StepStatus.INITIAL, StepStatus.INITIAL]
    }
  )

  // 사용자 닉네임 상태, 상태변경 핸들러
  const [userName, setUserName] = useState('')
  const userNameOnChangeHandler = (e) => {
    const typedValue = e.target.value
    if (/^[^\s~`!@#$%\^&*()+=\[\]\\';,./{}|\\":<>\?_-]*$/.test(typedValue)) {
      setUserName(typedValue);
    }
  }
  
  useEffect(()=>{
    if(userName){
      if(userName.length <= 8){
        //입력 중 상태
        // x 표시 나타나야함
        // 다음 단계 가능 상태
        setStep(prevStep => ({
          ...prevStep,
          status: [
            ...prevStep.status.slice(0, step.current),
            StepStatus.IN_PROGRESS,
            ...prevStep.status.slice(step.current + 1),
          ],
        }))
      }else if(userName.length === 8){
        //입력 완료. 다음 단계 가능 상태
        setStep(prevStep => ({
          ...prevStep,
          status: [
            ...prevStep.status.slice(0, step.current),
            StepStatus.COMPLETE,
            ...prevStep.status.slice(step.current + 1),
          ],
        }))
      }else {
        // 8 보다 큰 경우
        // 경고창 빨개지고 마지막 글자 절삭
        
      }
    }else{
      // 못 넘어감. 입력하라고 알려줘야함.
      setStep(prevStep => ({
        ...prevStep,
        status: [
          ...prevStep.status.slice(0, step.current),
          StepStatus.INITIAL,
          ...prevStep.status.slice(step.current + 1),
        ],
      }))
    }
  },[userName])

  useEffect(()=>{
    console.log(">>>>>", step.current)
    console.log(">>>>>", step.status)
  },[step])


  return (
    <div>
      {/* 상단 영역 */}
      <div className={'flex mt-[-12px]'}>
        <div className={step.current===0?'p-12 invisible':'p-12'}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M3.29289 10.9497C2.90237 11.3403 2.90237 11.9734 3.29289 12.364L8.94975 18.0208C9.34027 18.4113 9.97344 18.4113 10.364 18.0208C10.7545 17.6303 10.7545 16.9971 10.364 16.6066L6.41421 12.6569H19.6568C20.2091 12.6569 20.6568 12.2091 20.6568 11.6569C20.6568 11.1046 20.2091 10.6569 19.6568 10.6569H6.41421L10.364 6.70711C10.7545 6.31658 10.7545 5.68342 10.364 5.29289C9.97344 4.90237 9.34027 4.90237 8.94975 5.29289L3.29289 10.9497Z" fill="#141414" />
          </svg>
        </div>
        <div className={'flex gap-6 items-center  ml-[calc(50%-56px)]'}>
          <div className={step.current===0?'w-8 h-8 rounded-full bg-pr-300':'w-8 h-8 rounded-full bg-gr-100'}></div>
          <div className={step.current===1?'w-8 h-8 rounded-full bg-pr-300':'w-8 h-8 rounded-full bg-gr-100'}></div>
          <div className={step.current===2?'w-8 h-8 rounded-full bg-pr-300':'w-8 h-8 rounded-full bg-gr-100'}></div>
        </div>
      </div>

      {/* 컨텐츠 영역 */}
      <div>
        {/* step 1 */}
        <div className={'flex flex-col gap-38'}>
          <div className={'flex flex-col gap-4'}>
            <h1 className={'font-xl text-gr-900'}>내 떡국에 표시될<br />닉네임을 만들어 주세요</h1>
            <h2 className={'font-xs text-[#ADADAD]'}>최대 8자 / 공백, 특수기호 불가</h2>
          </div>
          <div>
            <Input
              type={'text'}
              placeholder={'닉네임을 입력해 주세요'}
              maxLength={8}
              className={`${inputStyleClass} caret-pr-500 focus:outline-none`}
              onChange={(e)=>(userNameOnChangeHandler(e))}
              value={userName}/>
          </div>
        </div>
      </div>

      {/* 하단 영역 */}
      <div>
        <BottomButton
          fullBtnName='다음' />
      </div>
    </div>

  )
}
