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
        message_body: content,
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
        <Form.Select
          className='mt10'
          onChange={(e) => dispatch(scheduledTimeChanged(e.target.value))}>
          <option value='01:00'>01:00</option>
          <option value='02:00'>02:00</option>
          <option value='03:00'>03:00</option>
          <option value='04:00'>04:00</option>
          <option value='05:00'>05:00</option>
          <option value='06:00'>06:00</option>
          <option value='07:00'>07:00</option>
          <option value='08:00'>08:00</option>
          <option value='09:00'>09:00</option>
          <option value='10:00'>10:00</option>
          <option value='11:00'>11:00</option>
          <option value='12:00'>12:00</option>
          <option value='13:00' selected>13:00</option>
          <option value='14:00'>14:00</option>
          <option value='15:00'>15:00</option>
          <option value='16:00'>16:00</option>
          <option value='17:00'>17:00</option>
          <option value='18:00'>18:00</option>
          <option value='19:00'>19:00</option>
          <option value='20:00'>20:00</option>
          <option value='21:00'>21:00</option>
          <option value='22:00'>22:00</option>
          <option value='23:00'>23:00</option>
          <option value='00:00'>00:00</option>
        </Form.Select>
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
