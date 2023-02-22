import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { Container, ListGroup, Row, Col, Button, Table } from 'react-bootstrap'
import EndUserLoginLayout from 'components/templates/EndUserLoginLayout'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useCookies } from 'react-cookie'
import { MerchantStripeSubscription } from 'interfaces/MerchantStripeSubscription'
import { swalWithBootstrapButtons } from 'constants/swalWithBootstrapButtons'
import SubscriptionDescribeModal from 'components/molecules/SubscriptionDescribeModal'
import { showSubscriptionDescribeModalChanged } from 'redux/accountSlice'

const Index: NextPage = () => {
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_square_eight_end_user_session'])
  const [stripeSubscriptions, setStripeSubscriptions] = useState<MerchantStripeSubscription[]>()

  useEffect(() => {
    axios.get(`${process.env.BACKEND_URL}/api/internal/end_users/subscription_lists`,
    {
      headers: {
        'Session-Id': cookies._square_eight_end_user_session
      }
    }).then((response) => {
      console.log(response.data)
      setStripeSubscriptions(response.data.subscriptions)
    }).catch((error) => {
      console.log(error)
    })
  }, [dispatch, cookies._square_eight_end_user_session])

  const cancelSubscription = (subscription: MerchantStripeSubscription) => {
    swalWithBootstrapButtons.fire({
      title: '解約します',
      html: `${subscription.monthly_payment_plan_name}を解約します。<br />よろしいですか？`,
      icon: 'question',
      confirmButtonText: '解約する',
      cancelButtonText: 'キャンセル',
      showCancelButton: true,
      showCloseButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${process.env.BACKEND_URL}/api/internal/end_users/${subscription.public_id}/cancel_subscription`, {
          headers: { 
            'Session-Id': cookies._square_eight_end_user_session
          }
        }).then(response => {
          swalWithBootstrapButtons.fire({
            title: '解除しました',
            icon: 'info'
          }).then((result) => {
            location.reload()
          })
        }).catch(error => {
          swalWithBootstrapButtons.fire({
            title: '解除失敗しました',
            icon: 'error'
          })
        })
      }
    })
  }

  return (
    <>
      <EndUserLoginLayout>
        <Container className='mt20'>
          <Row>
            <Col lg={1}></Col>
            <Col>
            <h3>加入中サブスクリプション</h3>
              <Button
                className='mt20 mb20 text-white'
                variant='info'
                onClick={() => dispatch(showSubscriptionDescribeModalChanged(true))}>サブスクリプションの請求と解約について</Button>
              <Table bordered>
                <thead>
                  <tr>
                    <th>サブスクリプション名</th>
                    <th>購入先</th>
                    <th>購入ページ</th>
                    <th>解約</th>
                  </tr>
                </thead>
                <tbody>
                  {stripeSubscriptions && stripeSubscriptions.map((s, i) => {
                  return (
                      <tr key={i}>
                        <td>{s.monthly_payment_plan_name}</td>
                        <td>{s.account_business_name}</td>
                        <td>
                        <a  className='btn btn-primary'
                            href={`/monthly_payment/${s.public_id}/purchase`}
                            target='_blank'
                            rel='noreferrer'>購入ページ</a>
                        </td>
                        <td>
                          <Button
                            variant='danger'
                            onClick={() => cancelSubscription(s)}>解約する</Button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </Col>
            <Col lg={1}></Col>
          </Row>
        </Container>
        <SubscriptionDescribeModal/>
      </EndUserLoginLayout>
    </>
  )
}

export default Index
