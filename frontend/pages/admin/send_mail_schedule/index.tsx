import React, { useState, useEffect } from 'react'
import { NextPage } from 'next'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { Container, Table } from 'react-bootstrap'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { SendMailScheduleParam } from 'interfaces/SendMailScheduleParam'

const Index: NextPage = () => {
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
        setSendMailSchedules(response.data.send_mail_schedules)
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchSendMailSchedules()
  }, [cookies._square_eight_merchant_session])

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
            </tr>
          </thead>
          <tbody>
            {sendMailSchedules.map((schedule, i) => {
              return (
                <tr key={i}>
                  <td>{schedule.mail_title}</td>
                  <td>{schedule.email}</td>
                  <td>{schedule.customer_fullname}</td>
                  <td></td>
                  <td>{schedule.display_scheduled_datetime}</td>
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
