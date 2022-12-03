import { useEffect } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../redux/store'
import { showEditReserveFrameModalChanged } from 'redux/reserveFrameSlice'
import ReserveFrameForm from 'components/molecules/ReserveFrameForm'
import { swalWithBootstrapButtons } from 'constants/swalWithBootstrapButtons'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import axios from 'axios'
import {
  startDateChanged,
  titleChanged,
  descriptionChanged,
  capacityChanged,
  localPaymentPriceChanged,
  creditCardPaymentPriceChanged,
  publishStatusChanged,
  receptionTypeChanged,
  receptionStartDayBeforeChanged,
  receptionDeadlineChanged,
  receptionDeadlineHourBeforeChanged,
  receptionDeadlineDayBeforeChanged,
  repeatIntervalTypeChanged,
  repeatWDaysChanged,
  repeatEndDateChanged,
  repeatIntervalNumberDayChanged,
  repeatIntervalNumberWeekChanged,
  repeatIntervalNumberMonthChanged,
  repeatIntervalMonthDateChanged,
  isSetPriceChanged,
  isLocalPaymentEnableChanged,
  isCreditCardPaymentEnableChanged,
  isTicketPaymentEnableChanged,
  isMonthlyPlanPaymentEnableChanged,
  isEveryDayRepeatChanged,
  isEveryWeekRepeatChanged,
  isEveryMonthRepeatChanged,
  reserveFrameReceptionTimesChanged,
  resourceIdsChanged,
  questionnaireMasterIdChanged,
  monthlyPaymentPlanIdsChanged,
  reservableFrameTicketMasterChanged,
  s3ObjectPublicUrlChanged,
  outOfRangeFramesChanged,
  unreservableFramesChanged,
  isRepeatChanged,
  isAcceptCancelChanged,
  isAcceptCancelOnTheDayChanged,
  cancelReceptionDayBeforeChanged,
  cancelReceptionHourBeforeChanged } from 'redux/reserveFrameSlice'

const EditReserveFrameModal = (): JSX.Element => {
  const showEditReserveFrameModal = useSelector((state: RootState) => state.reserveFrame.showEditReserveFrameModal)
  const dispatch = useDispatch()
  const router = useRouter()
  const [cookies] = useCookies(['_square_eight_merchant_session'])

  const reserveFrameId = useSelector((state: RootState) => state.reserveFrame.reserveFrameId)
  const publicId = useSelector((state: RootState) => state.reserveFrame.publicId)
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
  const unreservableFrames = useSelector((state: RootState) => state.reserveFrame.unreservableFrames)
  const outOfRangeFrames = useSelector((state: RootState) => state.reserveFrame.outOfRangeFrames)
  const isLocalPaymentEnable = useSelector((state: RootState) => state.reserveFrame.isLocalPaymentEnable)
  const isCreditCardPaymentEnable = useSelector((state: RootState) => state.reserveFrame.isCreditCardPaymentEnable)
  const isTicketPaymentEnable = useSelector((state: RootState) => state.reserveFrame.isTicketPaymentEnable)
  const isMonthlyPlanPaymentEnable = useSelector((state: RootState) => state.reserveFrame.isMonthlyPlanPaymentEnable)
  const resourceIds = useSelector((state: RootState) => state.reserveFrame.resourceIds)
  const questionnaireMasterId = useSelector((state: RootState) => state.reserveFrame.questionnaireMasterId)
  const monthlyPaymentPlanIds = useSelector((state: RootState) => state.reserveFrame.monthlyPaymentPlanIds)
  const reservableFrameTicketMaster = useSelector((state: RootState) => state.reserveFrame.reservableFrameTicketMaster)
  const base64Image = useSelector((state: RootState) => state.reserveFrame.base64Image)
  const receptionDeadlineHourBefore = useSelector((state: RootState) => state.reserveFrame.receptionDeadlineHourBefore)
  const receptionDeadlineDayBefore = useSelector((state: RootState) => state.reserveFrame.receptionDeadlineDayBefore)
  const isSetPrice = useSelector((state: RootState) => state.reserveFrame.isSetPrice)
  const applyMultiLocalPaymentPrice = useSelector((state: RootState) => state.reserveFrame.applyMultiLocalPaymentPrice)
  const applyMultiCreditCardPaymentPrice = useSelector((state: RootState) => state.reserveFrame.applyMultiCreditCardPaymentPrice)
  const isAcceptCancel = useSelector((state: RootState) => state.reserveFrame.isAcceptCancel)
  const isAcceptCancelOnTheDay = useSelector((state: RootState) => state.reserveFrame.isAcceptCancelOnTheDay)
  const cancelReceptionDayBefore = useSelector((state: RootState) => state.reserveFrame.cancelReceptionDayBefore)
  const cancelReceptionHourBefore = useSelector((state: RootState) => state.reserveFrame.cancelReceptionHourBefore)

  const allowDeleteReserveFrame = useSelector((state: RootState) => state.merchantUserPermission.allowDeleteReserveFrame)
  const allowUpdateReserveFrame = useSelector((state: RootState) => state.merchantUserPermission.allowUpdateReserveFrame)

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

  const updateReserveFrame = () => {
    axios.post(`${process.env.BACKEND_URL}/api/internal/reserve_frames/${publicId}`,
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
        repeat_wdays: repeatWDays,
        is_every_day_repeat: isEveryDayRepeat,
        is_every_week_repeat: isEveryWeekRepeat,
        is_every_month_repeat: isEveryMonthRepeat,
        local_payment_price: localPaymentPrice,
        credit_card_payment_price: creditCardPaymentPrice,
        publish_status: publishStatus,
        reception_type: receptionType,
        reception_start_day_before: receptionStartDayBefore,
        reception_deadline: receptionDeadline,
        reserve_frame_reception_times: reserveFrameReceptionTimes,
        unreservable_frames: unreservableFrames,
        out_of_range_frames: outOfRangeFrames,
        resource_ids: resourceIds,
        questionnaire_master_id: questionnaireMasterId,
        is_local_payment_enable: isLocalPaymentEnable,
        is_credit_card_payment_enable: isCreditCardPaymentEnable,
        is_ticket_payment_enable: isTicketPaymentEnable,
        is_monthly_plan_payment_enable: isMonthlyPlanPaymentEnable,
        monthly_payment_plan_ids: monthlyPaymentPlanIds,
        reservable_frame_ticket_master: reservableFrameTicketMaster,
        reception_deadline_hour_before: receptionDeadlineHourBefore,
        reception_deadline_day_before: receptionDeadlineDayBefore,
        is_set_price: isSetPrice,
        apply_multi_local_payment_price: applyMultiLocalPaymentPrice,
        apply_multi_credit_card_payment_price: applyMultiCreditCardPaymentPrice,
        is_accept_cancel: isAcceptCancel,
        is_accept_cancel_on_the_day: isAcceptCancelOnTheDay,
        cancel_reception_hour_before: cancelReceptionHourBefore,
        cancel_reception_day_before: cancelReceptionDayBefore
      },
    },
    {
      headers: { 
        'Session-Id': cookies._square_eight_merchant_session
      }
    }).then(response => {
      swalWithBootstrapButtons.fire({
        title: '登録しました',
        icon: 'info'
      }).then((result) => {
        if (result.isConfirmed) {
          location.reload()
        }
      })
    }).catch(error => {
      swalWithBootstrapButtons.fire({
        title: '登録失敗しました',
        icon: 'error'
      })
    })
  }

  const deleteReserveFrame = () => {
    swalWithBootstrapButtons.fire({
      title: '削除します',
      html: `${title}を削除します。<br />よろしいですか？`,
      icon: 'question',
      confirmButtonText: '削除する',
      cancelButtonText: 'キャンセル',
      showCancelButton: true,
      showCloseButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${process.env.BACKEND_URL}/api/internal/reserve_frames/${publicId}`, {
          headers: { 
            'Session-Id': cookies._square_eight_merchant_session
          }
        }).then(response => {
          swalWithBootstrapButtons.fire({
            title: '削除しました',
            icon: 'info'
          })
          location.reload()
        }).catch(error => {
          swalWithBootstrapButtons.fire({
            title: '削除失敗しました',
            icon: 'error'
          })
        })
      }
    })
  }

  useEffect(() => {
    const fetchReserveFrame = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/reserve_frames/${publicId}`, {
          headers: { 
            'Session-Id': cookies._square_eight_merchant_session
          },
        }
      )
      .then(function (response) {
        dispatch(startDateChanged(response.data.reserve_frame.start_date_input_value))
        dispatch(titleChanged(response.data.reserve_frame.title))
        dispatch(descriptionChanged(response.data.reserve_frame.description))
        dispatch(capacityChanged(response.data.reserve_frame.capacity))
        dispatch(localPaymentPriceChanged(response.data.reserve_frame.local_payment_price))
        dispatch(creditCardPaymentPriceChanged(response.data.reserve_frame.credit_card_payment_price))
        dispatch(publishStatusChanged(response.data.reserve_frame.publish_status))
        dispatch(receptionTypeChanged(response.data.reserve_frame.reception_type))
        dispatch(receptionStartDayBeforeChanged(response.data.reserve_frame.reception_start_day_before))
        dispatch(receptionDeadlineChanged(response.data.reserve_frame.reception_deadline))
        dispatch(receptionDeadlineHourBeforeChanged(response.data.reserve_frame.reception_deadline_hour_before))
        dispatch(receptionDeadlineDayBeforeChanged(response.data.reserve_frame.reception_deadline_day_before))
        dispatch(isLocalPaymentEnableChanged(response.data.reserve_frame.is_local_payment_enable))
        dispatch(isCreditCardPaymentEnableChanged(response.data.reserve_frame.is_credit_card_payment_enable))
        dispatch(isTicketPaymentEnableChanged(response.data.reserve_frame.is_ticket_payment_enable))
        dispatch(isMonthlyPlanPaymentEnableChanged(response.data.reserve_frame.is_monthly_plan_payment_enable))
        dispatch(reserveFrameReceptionTimesChanged(response.data.reserve_frame.reserve_frame_reception_times_values))
        dispatch(repeatIntervalTypeChanged(response.data.reserve_frame.repeat_interval_type))
        dispatch(repeatIntervalNumberDayChanged(response.data.reserve_frame.repeat_interval_number_day))
        dispatch(repeatIntervalNumberWeekChanged(response.data.reserve_frame.repeat_interval_number_week))
        dispatch(repeatIntervalNumberMonthChanged(response.data.reserve_frame.repeat_interval_number_month))
        dispatch(repeatIntervalMonthDateChanged(response.data.reserve_frame.repeat_interval_month_date))
        dispatch(isEveryDayRepeatChanged(response.data.reserve_frame.is_every_day_repeat))
        dispatch(isEveryWeekRepeatChanged(response.data.reserve_frame.is_every_week_repeat))
        dispatch(isEveryMonthRepeatChanged(response.data.reserve_frame.is_every_month_repeat))
        dispatch(repeatWDaysChanged(response.data.reserve_frame.repeat_wdays))
        dispatch(repeatEndDateChanged(response.data.reserve_frame.repeat_end_date_input_value))
        dispatch(resourceIdsChanged(response.data.reserve_frame.resource_ids))
        dispatch(questionnaireMasterIdChanged(response.data.reserve_frame.questionnaire_master_id))
        dispatch(monthlyPaymentPlanIdsChanged(response.data.reserve_frame.monthly_payment_plan_ids))
        dispatch(reservableFrameTicketMasterChanged(response.data.reserve_frame.reservable_frame_ticket_master))
        dispatch(s3ObjectPublicUrlChanged(response.data.reserve_frame.s3_object_public_url))
        dispatch(outOfRangeFramesChanged(response.data.reserve_frame.out_of_range_frames_to_webform))
        dispatch(unreservableFramesChanged(response.data.reserve_frame.unreservable_frames_to_webform))
        dispatch(isRepeatChanged(response.data.reserve_frame.is_repeat))
        dispatch(isSetPriceChanged(response.data.reserve_frame.is_set_price))
        dispatch(isAcceptCancelChanged(response.data.reserve_frame.is_accept_cancel))
        dispatch(isAcceptCancelOnTheDayChanged(response.data.reserve_frame.is_accept_cancel_on_the_day))
        dispatch(cancelReceptionDayBeforeChanged(response.data.reserve_frame.cancel_reception_day_before))
        dispatch(cancelReceptionHourBeforeChanged(response.data.reserve_frame.cancel_reception_hour_before))
      })
      .catch(error => {
        console.log(error)
      })  
    }
    fetchReserveFrame()
  }, [router.query.public_id, cookies._square_eight_merchant_session, dispatch, publicId])

  return (
    <>
      <Modal show={showEditReserveFrameModal} size='lg'>
        <Modal.Header> 
          <Modal.Title>予約メニュー編集</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ReserveFrameForm></ReserveFrameForm>
        </Modal.Body>
        <Modal.Footer>
          {allowDeleteReserveFrame === 'Allow' && <Button className='me-auto'
                  onClick={() => deleteReserveFrame()}
                  variant='danger'
                  size='sm'>予約枠を削除</Button>}
          {allowUpdateReserveFrame === 'Allow' && <Button variant='primary' 
                  disabled={validateSubmit()}
                  onClick={updateReserveFrame}>登録する</Button>}
          <Button variant='secondary' onClick={() => dispatch(showEditReserveFrameModalChanged(false))}>閉じる</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default EditReserveFrameModal
