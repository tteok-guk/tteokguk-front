import { Loading } from '../common'

export default function LoadingModal() {
  return (
    <div className="modal-bg">
      <div className="modal-wrap">
        <Loading />
      </div>
    </div>
  )
}
