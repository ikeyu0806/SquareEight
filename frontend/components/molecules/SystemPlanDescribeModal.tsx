import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'redux/store'
import { showshowSystemPlanDescribeModalChanged } from 'redux/accountSlice'

const SystemPlanDescribeModal = () => {
  const dispatch = useDispatch()
  const showSystemPlanDescribeModal = useSelector((state: RootState) => state.account.showSystemPlanDescribeModal)

  const closeModal = () => {
    dispatch(showshowSystemPlanDescribeModalChanged(false))
  }

  return (
    <Modal show={showSystemPlanDescribeModal} size={'lg'}>
      <Modal.Header>プランの請求日と解約について</Modal.Header>
      <Modal.Body>
        <div className='font-weight-bold'>請求日について</div>
        <div className='mt10'>
          プランに加入した日が請求日として設定され毎月同じ日に金額が請求されます。
        </div>
        <div className='mt10'>
          請求日が存在しない場合、請求日の前日に請求されます。
        </div>
        <div className='mt10'>
          例）1月31日に加入した場合、2月28日、3月31日に料金が請求されます。
        </div>
        <div className='font-weight-bold mt20'>解約について</div>
        <div className='mt10'>
          解約した場合、比例配で請求されます。
        </div>
        <div className='mt10'>
          例）1月1日に加入して1月15日に解約した場合、15日分の金額が請求されます。
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={closeModal}>閉じる</Button>
      </Modal.Footer>
    </Modal>
  )
}
export default SystemPlanDescribeModal
