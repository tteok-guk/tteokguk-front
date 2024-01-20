import SaveAsImageHandler from '@/components/SaveAsImageHandler'
import { Props } from '../page'

const snapShotPage = ({ params: { userId }, searchParams: { garnish } }: Props) => {
  return <SaveAsImageHandler userId={userId} garnish={garnish} />
}

export default snapShotPage
