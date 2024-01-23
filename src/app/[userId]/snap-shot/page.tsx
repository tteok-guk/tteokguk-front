import SaveAsImageHandler from '@/components/SaveAsImageHandler'
import { Props } from '../page'
import { garnishes } from '../_object/object'

const snapShotPage = ({ params: { userId }, searchParams: { garnish } }: Props) => {
  const selectGarnish = garnish && garnishes.includes(garnish) ? garnish : 'basicRc'
  return <SaveAsImageHandler userId={userId} garnish={selectGarnish} />
}

export default snapShotPage
