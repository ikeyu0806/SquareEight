import React, { useState, useEffect } from 'react'
import { NextPage } from 'next'
import { useCookies } from 'react-cookie'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { Table, Container, Button } from 'react-bootstrap'
import axios from 'axios'
import { SendLineHistoryParam } from 'interfaces/SendLineHistoryParam'
import { useDispatch } from 'react-redux'
import { showLineMessageModalChanged, selectedMessageChanged } from 'redux/sendLineSlice'
import LineMessageBodyModal from 'components/templates/LineMessageBodyModal'

const Index: NextPage = () => {
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const [sendLineHistories, setSendLineHistories] = useState<SendLineHistoryParam[]>([])

  useEffect(() => {
    const fetchResources = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/send_line_histories`, {
          headers: { 
            'Session-Id': cookies._square_eight_merchant_session
          },
        }
      )
      .then(function (response) {
        console.log(response.data)
        setSendLineHistories(response.data.send_line_histories)
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchResources()
  }, [cookies._square_eight_merchant_session])

  return (
    <MerchantUserAdminLayout>
      <br />
      <Container>
        <Table bordered>
          <thead>
            <tr>
              <th>送信元LINE公式アカウント</th>
              <th>対象LINEユーザ名</th>
              <th>本文</th>
              <th>送信予定日時</th>
            </tr>
          </thead>
          <tbody>
            {sendLineHistories.map((history, i) => {
              return (
                <tr key={i}>
                  <td>{history.line_official_account_name}</td>
                  <td>{history.line_user_display_name}</td>
                  <td className='text-center'>
                    <Button onClick={() => {
                      dispatch(showLineMessageModalChanged(true))
                      dispatch(selectedMessageChanged(history.message))
                    }}>表示する</Button>
                  </td>
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
