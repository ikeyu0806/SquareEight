import React, { useState, useEffect } from 'react'
import { NextPage } from 'next'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { Container, Table, Button } from 'react-bootstrap'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { SendLineScheduleParam } from 'interfaces/SendLineScheduleParam'
import LineMessageBodyModal from 'components/templates/LineMessageBodyModal'
import { useDispatch } from 'react-redux'
import { showLineMessageModalChanged, selectedMessageChanged } from 'redux/sendLineHistorySlice'

const Index: NextPage = () => {
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const [sendLineSchedules, setSendLineSchedules] = useState<SendLineScheduleParam[]>([])

  useEffect(() => {
    const fetchSendMailSchedules = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/send_line_schedules`, {
          headers: { 
            'Session-Id': cookies._square_eight_merchant_session
          },
        }
      )
      .then(function (response) {
        console.log(response.data)
        setSendLineSchedules(response.data.send_line_schedules)
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
              <th>送信元LINE公式アカウント</th>
              <th>対象LINEユーザ名</th>
              <th>顧客名</th>
              <th>本文</th>
              <th>送信予定日時</th>
            </tr>
          </thead>
          <tbody>
            {sendLineSchedules.map((schedule, i) => {
              return (
                <tr key={i} style={schedule.past_flg ? {backgroundColor: 'lightgray'} : {}}>
                  <td>{schedule.line_official_account_name}</td>
                  <td>{schedule.line_user_display_name}</td>
                  <td>{schedule.customer_fullname}</td>
                  <td className='text-center'>
                  <Button onClick={() => {
                    dispatch(showLineMessageModalChanged(true))
                    dispatch(selectedMessageChanged(schedule.message))
                  }}>表示する</Button>
                </td>
                  <td>{schedule.display_scheduled_datetime}</td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </Container>
      <LineMessageBodyModal></LineMessageBodyModal>
    </MerchantUserAdminLayout>
  )
}

export default Index
