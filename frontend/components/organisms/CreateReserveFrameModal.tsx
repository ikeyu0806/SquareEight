import { Modal, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../redux/store'
import { showCreateReserveFrameModalChanged } from 'redux/reserveFrameSlice'
import ReserveFrameForm from 'components/molecules/ReserveFrameForm'
import { swalWithBootstrapButtons } from 'constants/swalWithBootstrapButtons'
import { useCookies } from 'react-cookie'
import axios from 'axios'

const CreateReserveFrameModal = (): JSX.Element => {
  const showCreateReserveFrameModal = useSelector((state: RootState) => state.reserveFrame.showCreateReserveFrameModal)
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_square_eight_merchant_session'])

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
  const repeatWDays = useSelector((state: RootState) => state.reserveFrame.repeatWDays)
  const isEveryDayRepeat = useSelector((state: RootState) => state.reserveFrame.isEveryDayRepeat)
  const isEveryWeekRepeat = useSelector((state: RootState) => state.reserveFrame.isEveryWeekRepeat)
  const isEveryMonthRepeat = useSelector((state: RootState) => state.reserveFrame.isEveryMonthRepeat)
  const localPaymentPrice = useSelector((state: RootState) => state.reserveFrame.localPaymentPrice)
  const creditCardPaymentPrice = useSelector((state: RootState) => state.reserveFrame.localPaymentPrice)
  const publishStatus = useSelector((state: RootState) => state.reserveFrame.publishStatus)
  const receptionType = useSelector((state: RootState) => state.reserveFrame.receptionType)
  const receptionStartDayBefore = useSelector((state: RootState) => state.reserveFrame.receptionStartDayBefore)
  const receptionPhoneNumber = useSelector((state: RootState) => state.reserveFrame.receptionPhoneNumber)
  const receptionDeadline = useSelector((state: RootState) => state.reserveFrame.receptionDeadline)
  const reserveFrameReceptionTimes = useSelector((state: RootState) => state.reserveFrame.reserveFrameReceptionTimes)  
  const outOfRangeFrames = useSelector((state: RootState) => state.reserveFrame.outOfRangeFrames)
  const unreservableFrames = useSelector((state: RootState) => state.reserveFrame.unreservableFrames)
  const isLocalPaymentEnable = useSelector((state: RootState) => state.reserveFrame.isLocalPaymentEnable)
  const isCreditCardPaymentEnable = useSelector((state: RootState) => state.reserveFrame.isCreditCardPaymentEnable)
  const isTicketPaymentEnable = useSelector((state: RootState) => state.reserveFrame.isTicketPaymentEnable)
  const isMonthlyPlanPaymentEnable = useSelector((state: RootState) => state.reserveFrame.isMonthlyPlanPaymentEnable)
  const questionnaireMasterId = useSelector((state: RootState) => state.reserveFrame.questionnaireMasterId)
  const shopIds = useSelector((state: RootState) => state.reserveFrame.shopIds)
  const resourceIds = useSelector((state: RootState) => state.reserveFrame.resourceIds)
  const monthlyPaymentPlanIds = useSelector((state: RootState) => state.reserveFrame.monthlyPaymentPlanIds)
  const reservableFrameTicketMaster = useSelector((state: RootState) => state.reserveFrame.reservableFrameTicketMaster)
  const reserveFrameImage1File = useSelector((state: RootState) => state.reserveFrame.reserveFrameImage1File)
  const reserveFrameImage2File = useSelector((state: RootState) => state.reserveFrame.reserveFrameImage2File)
  const reserveFrameImage3File = useSelector((state: RootState) => state.reserveFrame.reserveFrameImage3File)
  const reserveFrameImage4File = useSelector((state: RootState) => state.reserveFrame.reserveFrameImage4File)
  const reserveFrameImage5File = useSelector((state: RootState) => state.reserveFrame.reserveFrameImage5File)
  const receptionDeadlineHourBefore = useSelector((state: RootState) => state.reserveFrame.receptionDeadlineHourBefore)
  const receptionDeadlineDayBefore = useSelector((state: RootState) => state.reserveFrame.receptionDeadlineDayBefore)
  const isSetPrice = useSelector((state: RootState) => state.reserveFrame.isSetPrice)
  const multiLocalPaymentPrices = useSelector((state: RootState) => state.reserveFrame.multiLocalPaymentPrices)
  const multiCreditCardPaymentPrices = useSelector((state: RootState) => state.reserveFrame.multiCreditCardPaymentPrices)
  const applyMultiLocalPaymentPrice = useSelector((state: RootState) => state.reserveFrame.applyMultiLocalPaymentPrice)
  const applyMultiCreditCardPaymentPrice = useSelector((state: RootState) => state.reserveFrame.applyMultiCreditCardPaymentPrice)
  const isAcceptCancel = useSelector((state: RootState) => state.reserveFrame.isAcceptCancel)
  const isAcceptCancelOnTheDay = useSelector((state: RootState) => state.reserveFrame.isAcceptCancelOnTheDay)
  const cancelReceptionDayBefore = useSelector((state: RootState) => state.reserveFrame.cancelReceptionDayBefore)
  const cancelReceptionHourBefore = useSelector((state: RootState) => state.reserveFrame.cancelReceptionHourBefore)
  const lotteryConfirmedDayBefore = useSelector((state: RootState) => state.reserveFrame.lotteryConfirmedDayBefore)

  const createReserveFrame = () => {
    const params = new FormData()
    let reserve_frame_param = JSON.stringify({ reserve_frame: {
      title: title,
      description: description,
      capacity: capacity,
      start_at: startDate,
      is_repeat: isRepeat,
      repeat_interval_type: repeatIntervalType,
      repeat_interval_number_day: repeatIntervalNumberDay,
      repeat_interval_number_week: repeatIntervalNumberWeek,
      repeat_interval_number_month: repeatIntervalNumberMonth,
      repeat_interval_month_date: repeatIntervalMonthDate,
      repeat_end_date: repeatEndDate,
      repeat_wdays: repeatWDays,
      is_every_day_repeat: isEveryDayRepeat,
      is_every_week_repeat: isEveryWeekRepeat,
      is_every_month_repeat: isEveryMonthRepeat,
      local_payment_price: localPaymentPrice,
      credit_card_payment_price: creditCardPaymentPrice,
      publish_status: publishStatus,
      reception_type: receptionType,
      reception_start_day_before: receptionStartDayBefore,
      reception_phone_number: receptionPhoneNumber,
      reception_deadline: receptionDeadline,
      reserve_frame_reception_times: reserveFrameReceptionTimes,
      out_of_range_frames: outOfRangeFrames,
      unreservable_frames: unreservableFrames,
      questionnaire_master_id: questionnaireMasterId,
      resource_ids: resourceIds,
      shop_ids: shopIds,
      is_set_price: isSetPrice,
      is_local_payment_enable: isLocalPaymentEnable,
      is_credit_card_payment_enable: isCreditCardPaymentEnable,
      is_ticket_payment_enable: isTicketPaymentEnable,
      is_monthly_plan_payment_enable: isMonthlyPlanPaymentEnable,
      monthly_payment_plan_ids: monthlyPaymentPlanIds,
      reservable_frame_ticket_master: reservableFrameTicketMaster,
      reception_deadline_hour_before: receptionDeadlineHourBefore,
      reception_deadline_day_before: receptionDeadlineDayBefore,
      multi_local_payment_prices: multiLocalPaymentPrices,
      multi_credit_card_payment_prices: multiCreditCardPaymentPrices,
      apply_multi_local_payment_price: applyMultiLocalPaymentPrice,
      apply_multi_credit_card_payment_price: applyMultiCreditCardPaymentPrice,
      is_accept_cancel: isAcceptCancel,
      is_accept_cancel_on_the_day: isAcceptCancelOnTheDay,
      cancel_reception_hour_before: cancelReceptionHourBefore,
      cancel_reception_day_before: cancelReceptionDayBefore,
      lottery_confirmed_day_before: lotteryConfirmedDayBefore
    }})
    params.append('reserve_frame', reserve_frame_param)
    params.append('reserve_frame_image1_file', reserveFrameImage1File as Blob)
    params.append('reserve_frame_image2_file', reserveFrameImage2File as Blob)
    params.append('reserve_frame_image3_file', reserveFrameImage3File as Blob)
    params.append('reserve_frame_image4_file', reserveFrameImage4File as Blob)
    params.append('reserve_frame_image5_file', reserveFrameImage5File as Blob)
    axios.post(`${process.env.BACKEND_URL}/api/internal/reserve_frames`,
      params,
    {
      headers: { 
        'Content-Type': 'multipart/form-data',
        'Session-Id': cookies._square_eight_merchant_session
      }
    }).then(response => {
      swalWithBootstrapButtons.fire({
        title: '登録しました',
        icon: 'info'
      })
      dispatch(showCreateReserveFrameModalChanged(false))
      location.reload()
    }).catch(error => {
      swalWithBootstrapButtons.fire({
        title: '登録失敗しました',
        icon: 'error'
      })
    })
  }

  const validateSubmit = () => {
    // 必須項目チェック
    if (!title || !capacity || !startDate || !reserveFrameReceptionTimes.length) {
      return true
    }

    if (isSetPrice ) {
      if (!isLocalPaymentEnable && !isCreditCardPaymentEnable && !isTicketPaymentEnable && !isMonthlyPlanPaymentEnable) {
        return true
      }
    }
    if (isMonthlyPlanPaymentEnable) {
      if (!monthlyPaymentPlanIds) {
        return true
      }
    }

    if (isTicketPaymentEnable) {
      if (!reservableFrameTicketMaster.length) {
        return true
      }
    }
    return false
  }

  return (
    <>
      <Modal show={showCreateReserveFrameModal} size='lg'>
        <Modal.Header> 
          <Modal.Title>新規予約メニュー登録</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ReserveFrameForm></ReserveFrameForm>
        </Modal.Body>
        <Modal.Footer>
        <div>
          <Button variant='primary' 
                  disabled={validateSubmit()}
                  onClick={createReserveFrame}>登録する</Button>
        </div>
        <Button variant='secondary' onClick={() => dispatch(showCreateReserveFrameModalChanged(false))}>閉じる</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default CreateReserveFrameModal
