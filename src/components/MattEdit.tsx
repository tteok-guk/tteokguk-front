'use client'

import Link from 'next/link'
import { mattObj } from '../../data/mattObj'

const MattEdit = ({ mattId }: MattEditType) => {
  return (
    <div className="flex-center flex flex-col">
      <button
        className={` mb-4 h-60 w-60 rounded-full bg-[url('/images/red.png')] shadow-md ${mattObj[mattId]}`}
      />
      <p className="font-sm ">매트변경</p>
    </div>
  )
}

export default MattEdit

export interface MattEditType {
  mattId: string
}
