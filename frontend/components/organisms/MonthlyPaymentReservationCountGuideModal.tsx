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
