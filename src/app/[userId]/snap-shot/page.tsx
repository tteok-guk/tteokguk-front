import SaveAsImageHandler from '@/components/SaveAsImageHandler'
import { Props } from '../page'

const snapShotPage = ({ params: { userId } }: Props) => {
  return <SaveAsImageHandler userId={userId} />
}

export default snapShotPage
