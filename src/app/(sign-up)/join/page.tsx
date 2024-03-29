'use client'
import Image from 'next/image'
import { useToast } from '@/hooks/useToast'
import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { iconArrow, iconCloseCircle } from '../../../../public/images/icons'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { avatars } from '../_object/object'
import { putJoinUser } from '@/services/join'
import { useMutation } from '@tanstack/react-query'
import { RequestParamType } from '@/types/apiTypes'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { iconArrow2 } from '../../../../public/images/icons'

// 상태 Enum
const StepStatus = {
  INITIAL: 'stepInitial',
  COMPLETE: 'stepComplete',
}
export default function JoinPage() {
  const { toast } = useToast()
  const router = useRouter()

  // input style
  const iptSt =
    'w-full px-0 py-4 rounded-0 font-lg text-gr-900 border-t-0 border-x-0 border-b-1 bg-transparent placeholder:text-[#ADADAD] placeholder:font-lg caret-pr-500 focus:outline-none'
  const invalidSt = 'border-b-[#FF0000]'
  const validSt = 'border-b-[#ADADAD]'

  // button style
  const activeBtnSt =
    'font-semibold border-0 bg-pr-500 text-17 leading-22 text-white active:bg-pr-500 cursor-pointer'
  const disabledBtnSt =
    'font-semibold border-0 bg-gr-100 text-17 leading-22 text-gr-400 disabled:bg-gr-100 active:bg-gr-100 hover:bg-gr-100'

  // 하단 버튼 활성화 상태
  const [isStepBtnActive, setIsStepBtnActive] = useState(false)

  // 회원가입 단계 및 진행 상태
  const [step, setStep] = useState({
    current: 0,
    status: [StepStatus.INITIAL, StepStatus.COMPLETE, StepStatus.INITIAL],
  })

  // 사용자 닉네임, 닉네임 유효성 상태
  const [userName, setUserName] = useState('')
  const [isValidName, setIsValidName] = useState(true)

  // 선택 아바타
  const [selectAvatar, setSelectAvatar] = useState({ name: 'dragon', idx: 0 })

  // 전체 선택박스 상태
  const [groupTerm, setGroupTerm] = useState(false)

  // 선택박스 상태
  const [terms, setTerms] = useState([
    {
      type: 'required',
      text: '(필수) 만 14세 이상입니다.',
      checked: false,
    },
    {
      type: 'required',
      text: '(필수) 서비스 이용 약관에 동의합니다.',
      checked: false,
      link: 'https://tteokguk.notion.site/5e0171c5524446ea84b5f2ffc2cb39b1?pvs=4',
    },
    {
      type: 'required',
      text: '(필수) 개인정보 수집이용에 동의합니다.',
      checked: false,
      link: 'https://tteokguk.notion.site/87fde28ebf8940bb85576e1a68563d10?pvs=4',
    },
  ])

  // 닉네임 상태변경 핸들러
  const userNameOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const typedValue = e.target.value
    // if (/^[^\s~`!@#$%\^&*()+=\[\]\\';,./{}|\\":<>\?_-]*$/.test(typedValue)) {
    // 정규식 변경 - 한글, 영문자, 숫자만 입력 가능
    // 정규식 변경 - 한글, 영문자, 숫자만 입력 가능 (천지인, 새천지인 대응 ㆍᆞᆢ 도 입력 가능)
    if (/^[a-zA-Z0-9가-힣ㆍᆞᆢㄱ-ㅎㅏ-ㅣ]*$/.test(typedValue)) {
      setIsValidName(true)
      setUserName(typedValue)
    } else {
      setIsValidName(false)
    }
  }

  // 닉네임 전체 지우기 핸들러
  const deleteNameOnClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    setUserName('')
  }

  // 캐릭터 선택 핸들러
  const selectAvatarOnClickHandler = (name: string, idx: number) => {
    setSelectAvatar({
      name,
      idx,
    })
  }

  // 선택박스 상태 변경 핸들러
  const checkboxOnChangeHandler = (idx: number) => {
    setTerms((prevTerms) => {
      const newTerms = [...prevTerms]
      newTerms[idx] = {
        ...newTerms[idx],
        checked: !newTerms[idx].checked,
      }
      return newTerms
    })
  }

  // 전체 선택 박스 상태 변경 핸들러
  const groupCheckboxOnChangeHandler = (groupChecked: boolean) => {
    setTerms((prevTerms) =>
      prevTerms.map((term) =>
        term.type === 'required' ? { ...term, checked: groupChecked } : term,
      ),
    )
  }

  // 단계 이동, 회원가입 핸들러
  const navBtnOnClickHandler = (curr: number, type: string) => {
    if (type === 'prev') {
      // 이전으로
      if (curr !== 0) {
        setStep((prevStep) => ({
          ...prevStep,
          current: prevStep.current - 1,
        }))
        setIsStepBtnActive(false)
      }
    } else {
      // 다음으로
      if (curr !== 2) {
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
    mutationFn: (userData: RequestParamType) => putJoinUser(userData),
    onSuccess: (res) => {
      if (res.code === 200) {
        const token = res.data.token ? res.data.token : ''
        Cookies.set('token', token)
        router.push(`/host?page=1`)
      } else if (res.code === 400) {
        const token = res.data.token ? res.data.token : ''
        Cookies.set('token', token)
        router.push(`/host?page=1`)
      } else if (res.code === 401) {
        router.push(`/`)
      }
    },
    onError: (err) => console.error('err', err),
  })

  // 완료 클릭 핸들러
  const joinCompliteOnClickHandler = () => {
    if (step.current === 2 && step.status.every((status) => status === StepStatus.COMPLETE)) {
      // 회원가입 함수 - 저장
      const userData = {
        nickname: userName,
        privacyConsent: true,
        avatar: selectAvatar.name,
      }
      onSubmit.mutate(userData)
    } else {
      // 토스트
      toast({
        duration: 1850,
        description: '필수 약관에 모두 동의해 주세요.',
      })
    }
  }

  // 약관 내용 페이지 이동
  const termsDetailPageOnClickHandler = (url: string) => {
    window.open(`${url}`)
  }

  // Hooks
  // [userName] useEffect Hook
  useEffect(() => {
    if (userName.length > 0) {
      if (userName.length <= 8) {
        //입력 중 상태, 다음 단계 가능 상태
        if (!/[ㆍᆞᆢ]/.test(userName)) {
          // 천지인 대응 추가. 해당 미들닷이 있을 경우 다음 단계 버튼 비활성화
          setStep((prevStep) => ({
            ...prevStep,
            status: [
              ...prevStep.status.slice(0, step.current),
              StepStatus.COMPLETE,
              ...prevStep.status.slice(step.current + 1),
            ],
          }))
        } else {
          setStep((prevStep) => ({
            ...prevStep,
            status: [
              ...prevStep.status.slice(0, step.current),
              StepStatus.INITIAL,
              ...prevStep.status.slice(step.current + 1),
            ],
          }))
        }
      } else {
        // 8 보다 큰 경우
        // 경고창 빨개지고 마지막 글자 절삭
      }
    } else {
      // 못 넘어감. 입력하라고 알려줘야함.
      setStep((prevStep) => ({
        ...prevStep,
        status: [
          ...prevStep.status.slice(0, step.current),
          StepStatus.INITIAL,
          ...prevStep.status.slice(step.current + 1),
        ],
      }))
    }
  }, [userName])

  // [terms] useEffect Hook
  useEffect(() => {
    const checkCondition = terms.map((term, idx) => {
      if (term.type === 'required') {
        return term.checked
      }
    })
    if (checkCondition.every(Boolean)) {
      setStep((prevStep) => ({
        ...prevStep,
        status: [
          ...prevStep.status.slice(0, step.current),
          StepStatus.COMPLETE,
          ...prevStep.status.slice(step.current + 1),
        ],
      }))
      setGroupTerm(true)
    } else {
      setStep((prevStep) => ({
        ...prevStep,
        status: [
          ...prevStep.status.slice(0, step.current),
          StepStatus.INITIAL,
          ...prevStep.status.slice(step.current + 1),
        ],
      }))
      setGroupTerm(false)
    }
  }, [terms])

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
        step.current === 1
          ? 'mx-[-20px] mt-[-32px] h-[calc(100%-117px)] bg-[url(/images/matts/blueDew.png)] bg-cover bg-[-140px]'
          : ''
      }
    >
      {/* 상단 영역 */}
      <div className={step.current === 1 ? 'flex px-20 pt-20' : 'mt-[-12px] flex'}>
        <div
          className={
            step.current === 0 ? 'invisible py-12 pl-0 pr-24' : 'cursor-pointer py-12 pl-0 pr-24'
          }
          onClick={() => {
            navBtnOnClickHandler(step.current, 'prev')
          }}
        >
          <Image src={iconArrow} alt="왼쪽을 가르키는 화살표 이미지" width={24} height={24} />
        </div>
        <div className={'ml-[calc(50%-56px)] flex items-center  gap-6'}>
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
          <div
            className={
              step.current === 2
                ? 'h-8 w-8 rounded-full bg-pr-300'
                : 'h-8 w-8 rounded-full bg-gr-100'
            }
          ></div>
        </div>
      </div>
      {/* 컨텐츠 영역 */}
      <div className={'h-[calc(100%-35px)]'}>
        {/* step 0 */}
        <div className={step.current === 0 ? 'flex flex-col gap-38' : 'hidden'}>
          <div className={'flex flex-col gap-4'}>
            <h1 className={'font-xl text-gr-900'}>
              내 떡국에 표시될 <br />
              닉네임을 만들어 주세요
            </h1>
            <h2 className={isValidName ? 'font-xs text-[#ADADAD]' : 'font-xs text-[#FF0000]'}>
              최대 8자 / 공백, 특수기호 불가
            </h2>
          </div>
          <div className={'relative'}>
            <Input
              type={'text'}
              placeholder={'닉네임을 입력해 주세요'}
              maxLength={8}
              className={isValidName ? `${iptSt}${validSt}` : `${iptSt}${invalidSt}`}
              onChange={(e) => userNameOnChangeHandler(e)}
              value={userName}
            />
            <div
              className={
                userName.length > 0 ? 'absolute right-0 top-4 w-fit cursor-pointer' : 'hidden'
              }
              onClick={deleteNameOnClickHandler}
            >
              <Image
                src={iconCloseCircle}
                alt="인풋 내용 삭제 버튼 이미지"
                width={20}
                height={20}
              />
            </div>
          </div>
        </div>
        {/* step 1 */}
        <div className={step.current === 1 ? 'flex h-full flex-col  gap-8 px-20' : 'hidden'}>
          <div>
            <h1 className={'font-xl text-gr-900'}>캐릭터를 선택해주세요</h1>
          </div>
          <div className={'flex h-full flex-col justify-between gap-20'}>
            <div className={'relative flex h-full justify-center'}>
              <Image
                src={avatars[selectAvatar.idx].nomalSrc}
                alt="선택 캐릭터 이미지"
                loading="eager"
                fill={true}
                style={{ objectFit: 'contain' }}
              />
            </div>
            <div
              className={
                step.current === 1
                  ? 'relative mx-[-20px] mt-[-20px] grid grid-cols-4 grid-rows-2 justify-center gap-12 bg-white px-[20px] pt-[20px]'
                  : 'relative grid grid-cols-4 grid-rows-2 justify-center gap-12'
              }
            >
              {avatars.map((avatar, idx) => {
                return (
                  <div
                    onClick={() => {
                      selectAvatarOnClickHandler(avatar.name, idx)
                    }}
                    className={
                      avatar.name === selectAvatar.name
                        ? ' flex aspect-square min-h-75 min-w-75 cursor-pointer items-center justify-center rounded-6 bg-pr-100 ring-[3px] ring-inset ring-pr-500'
                        : 'flex aspect-square min-h-75 min-w-75 cursor-pointer items-center justify-center rounded-6 bg-pr-100'
                    }
                    key={idx}
                  >
                    <Image
                      src={avatar.smallSrc}
                      alt={avatar.alt}
                      width={75}
                      height={75}
                      style={{ width: '100%', height: 'auto' }}
                      loading="eager"
                    />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        {/* step 2 */}
        <div className={step.current === 2 ? 'flex flex-col gap-38' : 'hidden'}>
          <div>
            <h1 className={'font-xl text-gr-900'}>
              니떡국 내떡국
              <br />
              서비스 이용에 동의해 주세요
            </h1>
          </div>
          <div className={'relative flex flex-col gap-y-20'}>
            <div
              className={
                isStepBtnActive
                  ? 'flex h-52 w-full cursor-pointer items-center gap-10 rounded-4 bg-pr-100 py-16 pl-20'
                  : 'flex h-52 w-full cursor-pointer items-center gap-10 rounded-4 bg-gr-100 py-16 pl-20'
              }
            >
              <Checkbox
                id="termsAll"
                checked={groupTerm}
                onCheckedChange={groupCheckboxOnChangeHandler}
                className={
                  'h-20 w-20 rounded-full border-0 bg-white bg-[url(/images/icons/iconCheckCircleBefore.png)] bg-center data-[state=checked]:bg-white data-[state=checked]:bg-[url(/images/icons/iconCheckCircleAfter.png)]'
                }
              />
              <Label htmlFor="termsAll" className={'font-semibold text-gr-900'}>
                필수 약관 전체 동의
              </Label>
            </div>
            <div className={'flex flex-col gap-y-22'}>
              {terms.map((term, idx) => {
                return (
                  <div key={idx} className={'flex w-full cursor-pointer items-center pl-20 pr-3'}>
                    <div className={'flex w-full cursor-pointer items-center gap-x-10'}>
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
                    {term.link ? (
                      <div
                        className="cursor-pointer"
                        onClick={() => termsDetailPageOnClickHandler(term.link)}
                      >
                        <Image
                          src={iconArrow2}
                          alt={'관련 약관 바로가기 링크 아이콘'}
                          width={16}
                          height={16}
                        ></Image>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
      {/* 하단 영역 */}
      <div>
        <div className="fixed bottom-0 left-0 h-117 w-full">
          <div
            className={`mx-auto flex h-full min-w-320 max-w-575 justify-center bg-white px-20 pt-16`}
          >
            <Button
              size="full"
              className={isStepBtnActive ? `${activeBtnSt}` : `${disabledBtnSt}`}
              onClick={() => {
                navBtnOnClickHandler(step.current, step.current === 2 ? 'fin' : 'next')
              }}
              disabled={step.current === 2 ? false : !isStepBtnActive}
            >
              {step.current === 2 ? '완료' : '다음'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
