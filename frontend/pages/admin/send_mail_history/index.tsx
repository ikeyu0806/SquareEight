import React, { useState, useEffect } from 'react'
import { NextPage } from 'next'
import { useCookies } from 'react-cookie'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { Table, Container, Button } from 'react-bootstrap'
import axios from 'axios'
import { SendMailHistoryParam } from 'interfaces/SendMailHistoryParam'
import MessageBodyModal from 'components/templates/MessageBodyModal'
import { useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import { showMessageBodyModalChanged,
         selectedMessageBodyChanged,
         selectedMessageTypeChanged,
         selectedHtmlTemplateTypeChanged,
         selectedParsedMessageBodyChanged } from 'redux/sendMailHistorySlice'
import { useDispatch } from 'react-redux'

const Index: NextPage = () => {
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const [sendMailHistories, setSendMailHistories] = useState<SendMailHistoryParam[]>([])

  useEffect(() => {
    const fetchResources = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/send_mail_histories`, {
          headers: { 
            'Session-Id': cookies._square_eight_merchant_session
          },
        }
      )
      .then(function (response) {
        setSendMailHistories(response.data.send_mail_histories)
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchResources()
  }, [cookies._square_eight_merchant_session])

  return (
    <MerchantUserAdminLayout>
      <Container>
        <Table bordered>
          <thead>
            <tr>
              <th>顧客名</th>
              <th>メールタイトル</th>
              <th>送信メールアドレス</th>
              <th>送信メッセージ</th>
              <th>送信日時</th>
            </tr>
          </thead>
          <tbody>
          {sendMailHistories.map((history, i) => {
            return(
              <tr key={i}>
                <td>{history.customer_fullname}</td>
                <td>{history.mail_title}</td>
                <td>{history.email}</td>
                <td className='text-center'>
                  <Button onClick={() => {
                    dispatch(showMessageBodyModalChanged(true))
                    dispatch(selectedMessageBodyChanged(history.message_body))
                    dispatch(selectedMessageTypeChanged(history.message_type))
                    dispatch(selectedHtmlTemplateTypeChanged(history.html_template_type))
                    dispatch(selectedParsedMessageBodyChanged(history.parsed_message_body))
                  }}>表示する</Button>
                </td>
                <td>{history.send_at}</td>
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
