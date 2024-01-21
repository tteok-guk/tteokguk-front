import React from 'react'

interface LogoutProps {
  title?: string
  cancelBtnTitle?: string
  confirmTitle?: string
  cancelBtnFn?: () => void
  confirmBtnFn?: () => void
}

function Logout({ title, cancelBtnTitle, confirmTitle, cancelBtnFn, confirmBtnFn }: LogoutProps) {
  return (
    <div className="flex-center fixed bottom-0 left-0 top-0 z-40 h-dvh w-dvw bg-[black] opacity-70">
      <div className=" flex-center h-157 w-295 flex-col gap-33 rounded-md bg-white">
        <h2 className="font-lg text-black">{title}</h2>
        <div className="flex gap-15">
          <button className="h-48 w-120 rounded-md bg-gr-300 text-white" onClick={cancelBtnFn}>
            {cancelBtnTitle}
          </button>
          <button className="h-48 w-120 rounded-md bg-pr-500 text-white" onClick={confirmBtnFn}>
            {confirmTitle}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Logout
