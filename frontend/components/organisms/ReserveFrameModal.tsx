import { Modal, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../redux/store'
import { showReserveFrameModalChanged } from 'redux/reserveFrameSlice'
import ReserveFrameForm from 'components/molecules/ReserveFrameForm'
import { swalWithBootstrapButtons } from 'constants/swalWithBootstrapButtons'
import { useCookies } from 'react-cookie'
import axios from 'axios'

const ReserveFrameModal = (): JSX.Element => {
  const showReserveFrameModal = useSelector((state: RootState) => state.reserveFrame.showeserveFrameModal)
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_gybuilder_merchant_session'])

  const title = useSelector((state: RootState) => state.reserveFrame.title)
  const description = useSelector((state: RootState) => state.reserveFrame.description)
  const startDate = useSelector((state: RootState) => state.reserveFrame.startDate)
  const capacity = useSelector((state: RootState) => state.reserveFrame.capacity)
  const isRepeat = useSelector((state: RootState) => state.reserveFrame.isRepeat)
  const repeatIntervalType = useSelector((state: RootState) => state.reserveFrame.repeatIntervalType)
  const repeatIntervalNumberDay = useSelector((state: RootState) => state.reserveFrame.repeatIntervalNumberDay)
  const repeatIntervalNumberWeek = useSelector((state: RootState) => state.reserveFrame.repeatIntervalNumberWeek)
  const repeatIntervalNumberMonth = useSelector((state: RootState) => state.reserveFrame.repeatIntervalNumberMonth)
  const repeatIntervalMonthDate = useSelector((state: RootState) => state.reserveFrame.repeatIntervalMonthDate)
  const repeatEndDate = useSelector((state: RootState) => state.reserveFrame.repeatEndDate)
  const isEveryDayRepeat = useSelector((state: RootState) => state.reserveFrame.isEveryDayRepeat)
  const isEveryWeekRepeat = useSelector((state: RootState) => state.reserveFrame.isEveryWeekRepeat)
  const isEveryMonthRepeat = useSelector((state: RootState) => state.reserveFrame.isEveryMonthRepeat)
  const localPaymentPrice = useSelector((state: RootState) => state.reserveFrame.localPaymentPrice)
  const creditCardPaymentPrice = useSelector((state: RootState) => state.reserveFrame.localPaymentPrice)
  const publishStatus = useSelector((state: RootState) => state.reserveFrame.publishStatus)
  const receptionType = useSelector((state: RootState) => state.reserveFrame.receptionType)
  const receptionStartDayBefore = useSelector((state: RootState) => state.reserveFrame.receptionStartDayBefore)
  const cancelReception = useSelector((state: RootState) => state.reserveFrame.cancelReception)
  const reserveFrameReceptionTimes = useSelector((state: RootState) => state.reserveFrame.reserveFrameReceptionTimes)
  const unreservableFrames = useSelector((state: RootState) => state.reserveFrame.unreservableFrames)
  const isLocalPaymentEnable = useSelector((state: RootState) => state.reserveFrame.isLocalPaymentEnable)
  const isCreditCardPaymentEnable = useSelector((state: RootState) => state.reserveFrame.isCreditCardPaymentEnable)
  const isTicketPaymentEnable = useSelector((state: RootState) => state.reserveFrame.isTicketPaymentEnable)
  const isMonthlyPlanPaymentEnable = useSelector((state: RootState) => state.reserveFrame.isMonthlyPlanPaymentEnable)
  const resourceIds = useSelector((state: RootState) => state.reserveFrame.resourceIds)
  const monthlyPaymentPlanIds = useSelector((state: RootState) => state.reserveFrame.monthlyPaymentPlanIds)
  const reservableFrameTicketMaster = useSelector((state: RootState) => state.reserveFrame.reservableFrameTicketMaster)
  const base64Image = useSelector((state: RootState) => state.reserveFrame.base64Image)
  const cancelReceptionHourBefore = useSelector((state: RootState) => state.reserveFrame.cancelReceptionHourBefore)
  const cancelReceptionDayBefore = useSelector((state: RootState) => state.reserveFrame.cancelReceptionDayBefore)

  const createReserveFrame = () => {
    axios.post(`${process.env.BACKEND_URL}/api/internal/reserve_frames`,
    {
      reserve_frame: {
        title: title,
        description: description,
        base64_image: base64Image,
        capacity: capacity,
        start_at: startDate,
        is_repeat: isRepeat,
        repeat_interval_type: repeatIntervalType,
        repeat_interval_number_day: repeatIntervalNumberDay,
        repeat_interval_number_week: repeatIntervalNumberWeek,
        repeat_interval_number_month: repeatIntervalNumberMonth,
        repeat_interval_month_date: repeatIntervalMonthDate,
        repeat_end_date: repeatEndDate,
        is_every_day_repeat: isEveryDayRepeat,
        is_every_week_repeat: isEveryWeekRepeat,
        is_every_month_repeat: isEveryMonthRepeat,
        local_payment_price: localPaymentPrice,
        credit_card_payment_price: creditCardPaymentPrice,
        publish_status: publishStatus,
        reception_type: receptionType,
        reception_start_day_before: receptionStartDayBefore,
        cancel_reception: cancelReception,
        reserve_frame_reception_times: reserveFrameReceptionTimes,
        unreservable_frames: unreservableFrames,
        resource_ids: resourceIds,
        is_local_payment_enable: isLocalPaymentEnable,
        is_credit_card_payment_enable: isCreditCardPaymentEnable,
        is_ticket_payment_enable: isTicketPaymentEnable,
        is_monthly_plan_payment_enable: isMonthlyPlanPaymentEnable,
        monthly_payment_plan_ids: monthlyPaymentPlanIds,
        reservable_frame_ticket_master: reservableFrameTicketMaster,
        cancel_reception_hour_before: cancelReceptionHourBefore,
        cancel_reception_day_before: cancelReceptionDayBefore
      },
    },
    {
      headers: { 
        'Session-Id': cookies._gybuilder_merchant_session
      }
    }).then(response => {
      swalWithBootstrapButtons.fire({
        title: '登録しました',
        icon: 'info'
      })
      dispatch(showReserveFrameModalChanged(false))
      location.reload()
    }).catch(error => {
      swalWithBootstrapButtons.fire({
        title: '登録失敗しました',
        icon: 'error'
      })
    })
  }

  return (
    <>
      <Modal show={showReserveFrameModal} size='lg'>
        <Modal.Header> 
          <Modal.Title>新規予約メニュー登録</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ReserveFrameForm></ReserveFrameForm>
        </Modal.Body>
        <Modal.Footer>
        <div>
          <Button variant='primary' onClick={createReserveFrame}>登録する</Button>
        </div>
        <Button variant='secondary' onClick={() => dispatch(showReserveFrameModalChanged(false))}>閉じる</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ReserveFrameModal
