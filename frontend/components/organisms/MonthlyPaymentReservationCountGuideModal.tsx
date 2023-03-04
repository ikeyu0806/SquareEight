import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import { RootState } from 'redux/store'
import { useSelector, useDispatch } from 'react-redux'
import { showMonthlyPaymentReservationCountGuideModalChanged } from 'redux/monthlyPaymentPlanSlice'

const MonthlyPaymentReservationCountGuideModal = () => {
  const dispatch = useDispatch()
  const showMonthlyPaymentReservationCountGuideModal = useSelector((state: RootState) => state.monthlyPaymentPlan.showMonthlyPaymentReservationCountGuideModal)

  return (
    <Modal show={showMonthlyPaymentReservationCountGuideModal}>
      <Modal.Header>月額サブスクリプションの予約可能数設定について</Modal.Header>
      <Modal.Body>
        <div>予約の支払いに月額サブスクリプションを使用した場合の予約可能数を設定することができます。</div>
        <div className='mt20'>週間ごとの予約可能数を設定した場合、その週の日曜日から土曜日までの予約可能数に制限がかかります。</div>
        <div className='mt20'>例）「3日に2回予約可能」を設定した場合、予約日から前後2日に予約が2回入っていた場合予約不可能になります。</div>
        <div className='mt20'>例）「3週に2回予約可能」を設定した場合、予約日の2週前の日曜日から予約日の2週後の土曜日に予約が2回入っていた場合予約不可能になります。</div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant='secondary'
          onClick={() => dispatch(showMonthlyPaymentReservationCountGuideModalChanged(false))}>
          閉じる
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default MonthlyPaymentReservationCountGuideModal
