import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { iconClose } from '../../../../public/images/icons'
import { avatar1, defaultAvatar } from '../../../../public/images/avatar'
import React from 'react'
import ShareButton from '@/components/ShareButton'
import SaveAsImageHandler from '@/components/SaveAsImageHandler'

const snapShotPage = () => {
  return <SaveAsImageHandler />
}

export default snapShotPage
