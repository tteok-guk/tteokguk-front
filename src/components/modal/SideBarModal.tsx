import { ConfirmModalProps } from '@/types/CommonTypes'
import SideBar from '../common/SideBar'

export default function SideBarModal({ cancelClick, confirmClick }: ConfirmModalProps) {
  return (
    <div className="modal-bg">
      <div className="modal-wrap">
        <section className="bg-bg">
          <SideBar />
        </section>
      </div>
    </div>
  )
}
