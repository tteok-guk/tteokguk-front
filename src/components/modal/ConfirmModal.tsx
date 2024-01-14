import { ConfirmModalProps } from '@/types/CommonTypes'

export default function ConfirmModal({ cancelClick, confirmClick }: ConfirmModalProps) {
  return (
    <div className="modal-bg">
      <div className="modal-wrap">
        <section className="bg-bg">모달 본문</section>
      </div>
    </div>
  )
}
