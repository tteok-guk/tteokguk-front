import React from 'react'

interface LogoutProps {
  title?: string
  cancelBtnTitle?: string
  confirmTitle?: string
  cancelBtnFn?: () => void
  confirmBtnFn?: () => void
}

function LogoutModal({
  title,
  cancelBtnTitle,
  confirmTitle,
  cancelBtnFn,
  confirmBtnFn,
}: LogoutProps) {
  return (
    <div className="modal-bg">
      <div className="modal-wrap">
        <div className="flex-center">
          <div className="flex-center h-157 w-295 flex-col gap-23 rounded-md bg-white">
            <h2 className="font-lg whitespace-pre text-center text-black">{title}</h2>
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
      </div>
    </div>
  )
}

export default LogoutModal
