import { Modal, Button, Form } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'redux/store'
import axios from 'axios'
import { swalWithBootstrapButtons } from 'constants/swalWithBootstrapButtons'
import { useCookies } from 'react-cookie'
import { showSendMailReservationModalChanged,
         scheduledDateChanged,
         scheduledTimeChanged } from 'redux/sendMailReservationSlice'

const MailSendReservationModal = (): JSX.Element => {
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const dispatch = useDispatch()
  const showSendMailReservationModal = useSelector((state: RootState) => state.sendMailReservation.showSendMailReservationModal)
  const scheduledDate = useSelector((state: RootState) => state.sendMailReservation.scheduledDate)
  const scheduledTime = useSelector((state: RootState) => state.sendMailReservation.scheduledTime)

  const messageTemplatePublicId =  useSelector((state: RootState) => state.messageTemplate.publicId)
  const title = useSelector((state: RootState) => state.messageTemplate.title)
  const content = useSelector((state: RootState) => state.messageTemplate.content)
  const price = useSelector((state: RootState) => state.paymentRequest.price)
  const paymentRequestName = useSelector((state: RootState) => state.paymentRequest.name)
  const isSendPaymentRequest = useSelector((state: RootState) => state.lineOfficialAccount.isSendPaymentRequest)
  const selectedHtmlMailTemplate = useSelector((state: RootState) => state.sendMail.selectedHtmlMailTemplate)
  const messageTemplateType = useSelector((state: RootState) => state.sendMail.messageTemplateType)

  const onSubmit = () => {
    axios.post(`${process.env.BACKEND_URL}/api/internal/send_mail_schedules`,
    {
      send_mail_schedules: {
        scheduled_date: scheduledDate,
        scheduled_time: scheduledTime,
        mail_title: title,
        message: content,
        is_send_payment_request: isSendPaymentRequest,
        price: price,
        payment_request_name: paymentRequestName,
        message_template_public_id: messageTemplatePublicId,
        selected_html_mail_template: selectedHtmlMailTemplate,
        message_template_type: messageTemplateType
      }
    },
    {
      headers: {
        'Session-Id': cookies._square_eight_merchant_session
      }
    }).then(response => {
      swalWithBootstrapButtons.fire({
        title: '登録しました',
        icon: 'info'
      })
      location.reload()
    }).catch(error => {
      swalWithBootstrapButtons.fire({
        title: '登録失敗しました',
        icon: 'error'
      })
    })
  }


  return (
    <Modal show={showSendMailReservationModal}>
      <Modal.Body>
        <div>送信日時を入力してください</div>
        <Form.Control
          onChange={(e) => dispatch(scheduledDateChanged(e.target.value))}
          type='date'
          className='mt10'></Form.Control>
        <Form.Control
          onChange={(e) => dispatch(scheduledTimeChanged(e.target.value))}
          type='time'
          className='mt10'></Form.Control>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onSubmit}>
          登録する
        </Button>
        <Button onClick={() => dispatch(showSendMailReservationModalChanged(false))}>
          閉じる
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default MailSendReservationModal
