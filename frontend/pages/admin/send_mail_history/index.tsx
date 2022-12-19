import React, { useState, useEffect } from 'react'
import { NextPage } from 'next'
import { useCookies } from 'react-cookie'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { Table, Container, Button } from 'react-bootstrap'
import axios from 'axios'
import { SendMailHistoryParam } from 'interfaces/SendMailHistoryParam'

const Index: NextPage = () => {
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
                <td>{history.customer_full_name}</td>
                <td>{history.mail_title}</td>
                <td>{history.email}</td>
                <td className='text-center'><Button>表示する</Button></td>
                <td>{history.send_at}</td>
              </tr>
            )
          })}
          </tbody>
        </Table>
      </Container>
    </MerchantUserAdminLayout>
  )
}

export default Index
