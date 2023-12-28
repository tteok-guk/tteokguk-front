'use client'
import Image from 'next/image'
import { myPage } from '../../public/images/index'

const AccountButton = () => {
  return <Image src={myPage} width={28} height={28} alt="myPageButton" className="pb-1 pt-2" />
}

export default AccountButton
