import type { NextPage } from 'next'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import GuideStripeAccountRegister from 'components/templates/GuideStripeAccountRegister'
import React, { useEffect, useState } from 'react'
import { Container, ListGroup, Row, Col, Table } from 'react-bootstrap'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import { PaymentRequestParam } from 'interfaces/PaymentRequestParam'
import { RootState } from 'redux/store'
import { useSelector } from 'react-redux'
import Unauthorized from 'components/templates/Unauthorized'
import lineUserStyles from 'styles/lineUser.module.css'

const Index: NextPage = () => {
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const router = useRouter()
  const [paymentRequests, setPaymentRequests] = useState<PaymentRequestParam[]>([])
  const stripeAccountEnable = useSelector((state: RootState) => state.currentMerchantUser.stripeAccountEnable)
  const allowReadPaymentRequest = useSelector((state: RootState) => state.merchantUserPermission.allowReadPaymentRequest)

  useEffect(() => {
    const fetchPaymentRequests = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/payment_requests`, {
          headers: { 
            'Session-Id': cookies._square_eight_merchant_session
          },
        }
      )
      .then(function (response) {
        console.log(response.data)
        const paymentRequestResponse: PaymentRequestParam[] = response.data.payment_requests
        setPaymentRequests(paymentRequestResponse)
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchPaymentRequests()
  }, [router.query.public_id, cookies._square_eight_merchant_session, router.query.website_id])

  return (
    <>
      <MerchantUserAdminLayout>
      {allowReadPaymentRequest === 'Allow' &&
      <Container>
        <a className='btn btn-primary mt10 mb20'
            href='/admin/payment_request/new'>決済リクエスト登録</a>
        <h3>決済リクエスト一覧</h3>
        <Table bordered>
        <thead>
          <tr>
            <th>請求先顧客</th>
            <th>請求先LINEユーザ</th>
            <th>メールアドレス</th>
            <th>決済ステータス</th>
            <th>決済URL</th>
          </tr>
        </thead>
        <tbody>
          {paymentRequests.map((request, i) => {
            return (
              <tr key={i}>
                <td>{request.billing_customer_name}</td>
                <td>
                  <img
                    className={lineUserStyles.line_picture_url}
                    src={request.line_picture_url}
                    alt='line_picture_url' />
                  <span className='ml10'>{request.line_display_name}</span>
                </td>
                <td>{request.billing_customer_email}</td>
                <td>
                  {request.status === 'Pending' && <span  className='badge bg-danger'>未払い</span>}
                  {request.status === 'Paid' && <span  className='badge bg-info'>支払い済み</span>}
                </td>
                <td>
                  <a
                    href={request.request_url}
                    target='_blank'
                    rel='noreferrer'
                    className='btn btn-primary'>決済URL</a>
                </td>
              </tr>
            )
          })}
        </tbody>
        </Table>
      </Container>}
      {allowReadPaymentRequest === 'Forbid' && <Unauthorized />}
      </MerchantUserAdminLayout>
    </>
  )
}

export default Index
