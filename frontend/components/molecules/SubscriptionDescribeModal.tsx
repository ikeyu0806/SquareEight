import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'redux/store'
import { showSubscriptionDescribeModalChanged } from 'redux/accountSlice'

const SubscriptionDescribeModal = () => {
  const dispatch = useDispatch()
  const showSubscriptionDescribeModal = useSelector((state: RootState) => state.account.showSubscriptionDescribeModal)

  const closeModal = () => {
    dispatch(showSubscriptionDescribeModalChanged(false))
  }

  return (
    <Modal show={showSubscriptionDescribeModal}>
      <Modal.Header>月額サブスクリプションの請求日と解約について</Modal.Header>
      <Modal.Body>
        <div className='font-weight-bold'>請求日について</div>
        <div>
          月額サブスクリプションに加入した日が請求日として設定され毎月同じ日に金額が請求されます。
        </div>
        <div>
          例）1月10日に加入した場合、2月10日。3月10に料金が請求されます。
        </div>
        <div className='font-weight-bold'>解約について</div>
        <div>
          解約した場合加入時間の比例配分で請求されます。
        </div>
        <div>
          例えば1月10日に加入して1月25日に解約した場合月額料金の半額が請求されます。
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={closeModal}>閉じる</Button>
      </Modal.Footer>
    </Modal>
  )
}
export default SubscriptionDescribeModal
