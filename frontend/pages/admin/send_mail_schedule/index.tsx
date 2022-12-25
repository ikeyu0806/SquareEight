import React, { useState, useEffect } from 'react'
import { NextPage } from 'next'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { Container, Table, Button } from 'react-bootstrap'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { SendMailScheduleParam } from 'interfaces/SendMailScheduleParam'
import MessageBodyModal from 'components/templates/MessageBodyModal'
import { useDispatch } from 'react-redux'
import { swalWithBootstrapButtons } from 'constants/swalWithBootstrapButtons'
import { showMessageBodyModalChanged,
  selectedMessageBodyChanged,
  selectedMessageTypeChanged,
  selectedHtmlTemplateTypeChanged,
  selectedParsedMessageBodyChanged } from 'redux/sendMailHistorySlice'

const Index: NextPage = () => {
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const [sendMailSchedules, setSendMailSchedules] = useState<SendMailScheduleParam[]>([])

  useEffect(() => {
    const fetchSendMailSchedules = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/send_mail_schedules`, {
          headers: { 
            'Session-Id': cookies._square_eight_merchant_session
          },
        }
      )
      .then(function (response) {
        console.log(response.data)
        setSendMailSchedules(response.data.send_mail_schedules)
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchSendMailSchedules()
  }, [cookies._square_eight_merchant_session])

  const cancelSchedule = (publicId: string) => {
    swalWithBootstrapButtons.fire({
      title: '送信予約をキャンセルします',
      html: `キャンセルします。<br />よろしいですか？`,
      icon: 'question',
      confirmButtonText: 'キャンセルする',
      cancelButtonText: 'キャンセルしない',
      showCancelButton: true,
      showCloseButton: true
    }).then((result) => {
      axios.post(`${process.env.BACKEND_URL}/api/internal/send_mail_schedules/${publicId}/cancel`,
      {},
      {
        headers: {
          'Session-Id': cookies._square_eight_merchant_session
        }
      }).then(response => {
        swalWithBootstrapButtons.fire({
          title: 'キャンセルしました',
          icon: 'info'
        })
        location.reload()
      }).catch(error => {
        swalWithBootstrapButtons.fire({
          title: '失敗しました',
          icon: 'error'
        })
      })
    })
  }

  return (
    <MerchantUserAdminLayout>
      <Container>
        <Table bordered>
          <thead>
            <tr>
              <th>メールタイトル</th>
              <th>対象メールアドレス</th>
              <th>顧客名</th>
              <th>本文</th>
              <th>送信予定日時</th>
              <th>ステータス</th>
            </tr>
          </thead>
          <tbody>
            {sendMailSchedules.map((schedule, i) => {
              return (
                <tr key={i} style={schedule.past_flg ? {backgroundColor: 'lightgray'} : {}}>
                  <td>{schedule.mail_title}</td>
                  <td>{schedule.email}</td>
                  <td>{schedule.customer_fullname}</td>
                  <td className='text-center'>
                    <Button onClick={() => {
                      dispatch(showMessageBodyModalChanged(true))
                      dispatch(selectedMessageBodyChanged(schedule.message_body))
                      dispatch(selectedMessageTypeChanged(schedule.message_template_type))
                      dispatch(selectedHtmlTemplateTypeChanged(schedule.html_template_type))
                      dispatch(selectedParsedMessageBodyChanged(schedule.parsed_message_body))
                    }}>表示する</Button>
                  </td>
                  <td>{schedule.display_scheduled_datetime}</td>
                  <td>
                    {schedule.send_status === 'Incomplete' &&
                    <div>
                      <div>未送信</div>
                      <Button
                        size='sm'
                        className='mt5'
                        onClick={() => cancelSchedule(schedule.public_id)}
                        variant='danger'>キャンセル</Button>
                    </div>}
                    {schedule.send_status === 'Cancel' && <>キャンセル済み</>}
                    {schedule.send_status === 'Complete' && <>送信済み</>}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </Container>
      <MessageBodyModal></MessageBodyModal>
    </MerchantUserAdminLayout>
  )
}

export default Index
