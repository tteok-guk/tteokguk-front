'use client'
import { getGarnishList, getGarnishDetail } from '@/services/garnish'
import { useMutation, useQuery} from '@tanstack/react-query'
import Image from 'next/image'
import { iconArrow } from '../../../../public/images/icons'
import { dragonHeart } from '../../../../public/images/avatar/arm'
import { garnishes, garnishes as grnisheImgs } from '../../../../data/garnishes'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'

export default function GarnishListpage() {
  const { toast } = useToast()
  const router = useRouter()

  // 가니쉬 목록 이미지
  const { isLoading, error, data } = useQuery({
    queryKey: ['garnishAllList'],
    queryFn: getGarnishList,
  })

  console.log(">>>>",data)

  const onSubmit = useMutation({
    mutationFn: (garnishId: string) => getGarnishDetail(garnishId),
    onSuccess: (res) => {
      console.log('res', res)
      if (res.code === 200) {
        // TODO sjy 고명 상세 페이지로 보내기 사실 애초에 여기서 상세를 조회할 필요가 없다 클릭할 경우 상세페이지로 라우팅 시키면 된다.
      } else if (res.code === 400) {
        // 언제 400 인지 여쭤보기
      }
    },
    onError: (err) => console.log('err', err), // todo 에러핸들링 추가
  })

  const getGarnishDetailsHandler = (isDday:boolean, garnishId:string, tteokGukId:string) => {
    //onSubmit.mutate(garnishId)
    if(isDday){
      router.push(`/${tteokGukId}/${garnishId}`)
    }else{
      toast({
        duration: 1850,
        description: '덕담 확인은 2월 9일까지 기다려 주세요!'
      })
    }
    
  }


  return (<>
    {/* <Button onClick={getGarnishDetailsHandler}> 테스트 </Button> */}
    <div className={'bg-cover'}>
      <div className={'flex mt-[-12px]'}>
        <div className={'pl-0 pr-24 py-12 cursor-pointer'} onClick={()=>(router.push('/account'))}>
          <Image src={iconArrow} alt="왼쪽을 가르키는 화살표 이미지" width={24} height={24} />
        </div>
        <div className={'absolute right-20 top-24'}>
          <Image src={dragonHeart} alt={`마음전달하는 용 일러스트`} width={81} height={73} />
        </div>
      </div>
      <div className={'flex flex-col gap-4 mb-20'}>
            <h1 className={'font-xl text-gr-900'}><span className={'text-pr-500'}>{data?.data?.garnishes ? data.data.garnishes.length : '0'}개의 덕담</span>을 받았어요!</h1>
      </div>
      <div className={'flex flex-col gap-16 h-[calc(100vh-120px)] overflow-y-scroll'}>
            {/* 고명 목록 -> 컴포넌트 분리할 것 */}
            {
              data?.data?.garnishes?.map((garnish, idx) => {
                return (
                  <div key={garnish.nickname + idx} className={'w-full flex gap-x-12 truncate cursor-pointer flex-shrink-0'} onClick={()=>(getGarnishDetailsHandler( garnish.content==='2월9일 이후에 확인 할 수 있어요'?false:true, String(garnish.garnishId), garnish.tteokGukId ))}>
                    <div className={'w-54 h-54 p-7 bg-white rounded-full flex justify-center items-center flex-shrink-0 flex-grow-0'}>
                      <Image src={grnisheImgs.find((garnishImg) => garnishImg.id === garnish.garnishType)?.src || grnisheImgs[6].src} alt={'고명이미지'} width={40} height={40} ></Image>
                    </div>
                    <div className={'flex flex-col w-[100%-61px] justify-center truncate flex-grow'}>
                      <p className={'text-16 font-medium text-gr-900'}>{garnish.nickname}</p>
                      <p className={'text-14 font-medium text-gr-400 truncate'}>{garnish.content ? garnish.content : '2월9일 이후에 확인 할 수 있어요'}</p>
                    </div>
                  </div>
                )
              })
            }
      </div>      
    </div>
  </>
  )
}
