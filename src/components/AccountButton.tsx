'use client'
import Image from 'next/image'
import { iconMypage } from '../../public/images/icons'

const AccountButton = () => {
  return <Image src={iconMypage} width={28} height={28} alt="myPageButton" className="pb-1 pt-2" />
}

export default AccountButton
