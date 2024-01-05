'use client'

import Link from 'next/link'
import { mattObj, miniMattObj } from '../app/[userId]/_object/object'

const MattEdit = ({ mattType }: MattEditType) => {
  return (
    <div className="flex-center flex flex-col">
      <button
        className={` mb-4 h-60 w-60 rounded-full bg-cover bg-center shadow-md ${mattObj[mattType]}`}
      />
      <p className="font-sm ">매트변경</p>
    </div>
  )
}

export default MattEdit

export interface MattEditType {
  mattType: string
}
