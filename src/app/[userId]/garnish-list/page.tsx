'use client'
import { getGarnishList, getGarnishDetail } from '@/services/garnish'
import { QueryKey, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { RequestParamType } from '@/types/apiTypes'
import { Button } from '@/components/ui/button'

export default function GarnishListpage() {
  const { isLoading, error, data } = useQuery({
    queryKey: ['garnishAllList'],
    queryFn: getGarnishList,
  })

  console.log(">>>>>>>",data?.data)


  const onSubmit = useMutation({
    mutationFn: (garnishId: string) => getGarnishDetail('105'),
    onSuccess: (res) => {
      console.log('res', res)
      if (res.code === 200) {
        // const token = res.data.token?res.data.token:''
        // Cookies.set('token', token)
        // router.push(`/host?page=1`)
      }else if (res.code === 400){
        // const token = res.data.token?res.data.token:''
        // Cookies.set('token', token)
        // router.push(`/host?page=1`)
      }
    },
    onError: (err) => console.log('err', err), // todo 에러핸들링 추가
  })

  const getGarnishDetailsHandler = () => {
    onSubmit.mutate('105')
  }
  

  return <div>
    <Button onClick={getGarnishDetailsHandler}> 테스트 </Button>

  </div>
}
