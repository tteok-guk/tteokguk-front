import { ErrorType } from '@/types/CommonTypes'
import { Error } from '@/components/common'

export default function ClientErrorPage({ type = '404' }: ErrorType) {
  return <Error type={type} />
}
