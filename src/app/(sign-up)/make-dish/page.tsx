'use client'
import Image from 'next/image'
import { useToast } from '@/hooks/use-toast'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { iconArrow, iconCloseCircle } from '../../../../public/images/icons'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { sampleDish } from '../../../../public/images/dishes'
import { matts } from './_object/object'
import { sampleDishPublic, sampleDishPrivate } from '../../../../public/images/etc'
import { postMakeDish } from '@/services/makeDish'
import { useMutation } from '@tanstack/react-query'
import { RequestParamType } from '@/types/apiTypes'
import { useRouter } from 'next/navigation'

// 상태 Enum
const StepStatus = {
  INITIAL: 'stepInitial',
  COMPLETE: 'stepComplete',
}
export default function MakeDishPage() {
  const { toast } = useToast()
  const router = useRouter()

  // button style
  const activeBtnSt =
    'font-semibold border-0 bg-pr-500 text-17 leading-22 text-white active:bg-pr-500'
  const disabledBtnSt =
    'font-semibold border-0 bg-gr-100 text-17 leading-22 text-gr-400 disabled:bg-gr-100 active:bg-gr-100 hover:bg-gr-100'

  // 하단 버튼 활성화 상태
  const [isStepBtnActive, setIsStepBtnActive] = useState(true)

  // 떡국 만들기 단계 및 진행 상태
  const [step, setStep] = useState({
    current: 0,
    status: [StepStatus.COMPLETE, StepStatus.INITIAL],
  })

  // 선택 매트
  const [selectMatt, setSelectMatt] = useState({ id: 'blueDew', idx: 0 })

  // 공개 범위
  const [isPublic, setIsPublic] = useState<undefined | boolean>(undefined)

  // 선택박스 상태
  const [terms, setTerms] = useState([
    {
      type: 'optional',
      text: '전체공개 할래요!',
      checked: false,
      sampleImg: sampleDishPublic,
      value: true,
    },
    {
      type: 'optional',
      text: '나만 볼래요!',
      checked: false,
      sampleImg: sampleDishPrivate,
      value: false,
    },
  ])

  // 매트 선택 핸들러
  const selectMattOnClickHandler = (id: string, idx: number) => {
    setSelectMatt({
      id,
      idx,
    })
  }
  // 선택박스 상태 변경 핸들러
  const checkboxOnChangeHandler = (idx: number) => {
    setTerms((prevTerms) => {
      const updatedTerms = terms.map((term, i) => ({
        ...term,
        checked: i === idx ? !term.checked : false,
      }))
      return updatedTerms
    })
    setIsPublic(terms[idx].value)
  }

  // 단계 이동 핸들러
  const navBtnOnClickHandler = (curr: number, dire: string) => {
    if (dire === 'prev') {
      // 이전으로
      if (curr !== 0) {
        setStep((prevStep) => ({
          ...prevStep,
          current: prevStep.current - 1,
        }))
        setIsStepBtnActive(false)
      } else if (curr == 0) {
        router.push(`/host?page=1`)
      }
    } else {
      // 다음으로
      if (curr !== 1) {
        setStep((prevStep) => ({
          ...prevStep,
          current: prevStep.current + 1,
        }))
        setIsStepBtnActive(false)
      } else {
        joinCompliteOnClickHandler()
      }
    }
  }

  // 뮤테이션
  const onSubmit = useMutation({
    mutationFn: (dishData: RequestParamType) => postMakeDish(dishData),
    onSuccess: (res) => {
      console.log('res', res)
      if (res.code === 200) {
        router.push(`/host?page=1`)
      } else if (res.code === 400) {
        toast({
          duration: 1850,
          description: '이미 만들어진 떡국이 있습니다.',
        })
        router.push(`/host?page=1`)
      }
    },
    onError: (err) => console.log('err', err), // todo 에러핸들링 추가
  })

  // 완료 클릭 핸들러
  const joinCompliteOnClickHandler = () => {
    if (step.current === 1 && step.status.every((status) => status === StepStatus.COMPLETE)) {
      // make-dish 함수
      const tteokgukData = {
        mattType: selectMatt.id,
        public: isPublic === undefined ? false : isPublic,
      }
      onSubmit.mutate(tteokgukData)
    } else {
      // 토스트
      toast({
        duration: 1850,
        description: '떡국 공개범위를 선택해주세요.',
      })
    }
  }

  // Hooks

  // [isPublic] useEffect Hook
  useEffect(() => {
    if (isPublic !== undefined) {
      setStep((prevStep) => ({
        ...prevStep,
        status: [
          ...prevStep.status.slice(0, step.current),
          StepStatus.COMPLETE,
          ...prevStep.status.slice(step.current + 1),
        ],
      }))
      setIsStepBtnActive(true)
    } else {
      if (step.current == 1) {
        setStep((prevStep) => ({
          ...prevStep,
          status: [
            ...prevStep.status.slice(0, step.current),
            StepStatus.INITIAL,
            ...prevStep.status.slice(step.current + 1),
          ],
        }))
        setIsStepBtnActive(false)
      }
    }
  }, [isPublic])

  // [step] useEffect Hook
  useEffect(() => {
    if (step.status[step.current] === StepStatus.COMPLETE) {
      setIsStepBtnActive(true)
    } else {
      setIsStepBtnActive(false)
    }
  }, [step])

  return (
    <div
      className={
        step.current === 0
          ? `bg-[url(/images/matts/${selectMatt.id}.png)] mx-[-20px] mt-[-32px] h-[calc(100%-70px)] bg-cover bg-[-140px] px-20 pt-32`
          : 'mx-[-20px] mt-[-32px] h-[calc(100%-70px)] bg-white px-20 pt-32'
      }
    >
      {/* 상단 영역 */}
      <div className={step.current === 2 ? 'flex px-20 pt-20' : 'mt-[-12px] flex'}>
        <div
          className={'py-12 pl-0 pr-24'}
          onClick={() => {
            navBtnOnClickHandler(step.current, 'prev')
          }}
        >
          <Image src={iconArrow} alt="왼쪽을 가르키는 화살표 이미지" width={24} height={24} />
        </div>
        <div className={'ml-[calc(50%-48px)] flex items-center  gap-6'}>
          <div
            className={
              step.current === 0
                ? 'h-8 w-8 rounded-full bg-pr-300'
                : 'h-8 w-8 rounded-full bg-gr-100'
            }
          ></div>
          <div
            className={
              step.current === 1
                ? 'h-8 w-8 rounded-full bg-pr-300'
                : 'h-8 w-8 rounded-full bg-gr-100'
            }
          ></div>
        </div>
      </div>
      {/* 컨텐츠 영역 */}
      <div className={'h-[calc(100%-35px)]'}>
        {/* step 0 */}
        <div className={step.current === 0 ? 'flex h-full flex-col gap-20' : 'hidden'}>
          <div className={'flex flex-col gap-4'}>
            <h1 className={'font-xl text-gr-900'}>
              내 떡국이 올라갈
              <br /> 테이블 매트를 선택해 주세요
            </h1>
          </div>
          <div className={'flex h-full flex-col justify-between gap-28'}>
            <div className={'relative flex flex-shrink-0 flex-grow-0 justify-center'}>
              <Image
                src={sampleDish}
                alt="샘플 떡국 이미지"
                width={184}
                height={184}
                loading="eager"
              />
            </div>
            <div
              className={
                step.current === 0
                  ? 'relative mx-[-20px] grid flex-shrink-0 flex-grow-0 grid-cols-4 grid-rows-2 justify-center gap-12 bg-white px-20 pb-20 pt-20'
                  : 'relative grid grid-cols-4 grid-rows-2 justify-center gap-12'
              }
            >
              {matts.map((matt, idx) => {
                return (
                  <div
                    onClick={() => {
                      selectMattOnClickHandler(matt.id, idx)
                    }}
                    className={
                      matt.id === selectMatt.id
                        ? ' flex aspect-square min-h-75 min-w-75 items-center justify-center overflow-hidden rounded-6 bg-pr-100 ring-[3px] ring-pr-500'
                        : 'flex aspect-square min-h-75 min-w-75 items-center justify-center overflow-hidden rounded-6 bg-pr-100'
                    }
                    key={idx}
                  >
                    <Image
                      src={matt.miniSrc}
                      alt={matt.alt}
                      width={75}
                      height={75}
                      layout="responsive"
                    />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        {/* step 1 */}
        <div className={step.current === 1 ? 'flex flex-col gap-y-16 px-20' : 'hidden'}>
          <div>
            <h1 className={'font-xl text-gr-900'}>
              받은 편지 내용과 개수
              <br />
              공개 범위를 설정해 주세요
            </h1>
          </div>
          <div className={'flex flex-col gap-y-10'}>
            {terms.map((term, idx) => {
              return (
                <div
                  key={idx}
                  className={
                    term.checked
                      ? 'flex w-full flex-col gap-y-16 rounded-4 border-1 border-pr-500'
                      : 'flex h-52 w-full flex-col gap-y-16 rounded-4 border-1 border-gr-100'
                  }
                >
                  <div className={'flex w-full items-center gap-10 py-16 pl-20'}>
                    <Checkbox
                      id={'terms' + idx}
                      checked={term.checked}
                      onCheckedChange={() => checkboxOnChangeHandler(idx)}
                      className={
                        'h-20 w-20 rounded-full border-0 bg-white bg-[url(/images/icons/iconCheckCircleBefore.png)] bg-center data-[state=checked]:bg-white data-[state=checked]:bg-[url(/images/icons/iconCheckCircleAfter.png)]'
                      }
                    />
                    <Label htmlFor={'terms' + idx}>{term.text}</Label>
                  </div>

                  {term.checked ? (
                    <div className={'px-20 pb-20'}>
                      <Image
                        src={term.sampleImg}
                        alt={'공개범위설정예시이미지'}
                        width={295}
                        height={270}
                        layout="responsive"
                      />
                    </div>
                  ) : (
                    ''
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
      {/* 하단 영역 */}
      <div>
        <div className="fixed bottom-0 left-0 h-101 w-full">
          <div className={`mx-auto flex h-full min-w-320 max-w-575 justify-center bg-white px-20`}>
            <Button
              size="full"
              className={isStepBtnActive ? `${activeBtnSt}` : `${disabledBtnSt}`}
              onClick={() => {
                navBtnOnClickHandler(step.current, 'next')
              }}
              disabled={step.current === 0 ? false : !isStepBtnActive}
            >
              {step.current === 1 ? '완료' : '다음'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
