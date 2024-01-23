import { useState } from 'react'
import { WriteGarnishProps } from './../types/WriteTypes'

type useGarnishInputHook = [WriteGarnishProps, (name: string, value: string) => void]

export const useGarnishInput = (initialValue: WriteGarnishProps): useGarnishInputHook => {
  const [value, setValue] = useState<WriteGarnishProps>(initialValue)

  const onChange = (name: string, value: string): void => {
    setValue((prev) => ({ ...prev, [name]: value }))
  }

  return [value, onChange]
}
