import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { Container, ListGroup, Row, Col, Button } from 'react-bootstrap'
import EndUserLoginLayout from 'components/templates/EndUserLoginLayout'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useCookies } from 'react-cookie'
import { MerchantStripeSubscription } from 'interfaces/MerchantStripeSubscription'
import { swalWithBootstrapButtons } from 'constants/swalWithBootstrapButtons'

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
        axios.delete(`${process.env.BACKEND_URL}/api/internal/end_users/${subscription.id}/cancel_subscription`, {
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
        <Container>
          <Row>
            <Col lg={3}></Col>
            <Col lg={6}>
            <h3>加入中プラン</h3>
              <ListGroup>
              {stripeSubscriptions && stripeSubscriptions.map((subscription, i) => {
                return (
                  <ListGroup.Item key={i}>
                    <Row>
                      <Col>
                        プラン名: {subscription.monthly_payment_plan_name}<br/>
                        購入先: {subscription.account_business_name}
                      </Col>
                      <Col>
                        <a  className='btn btn-primary'
                            href={`/monthly_payment/${subscription.public_id}/purchase`}
                            target='_blank'
                            rel='noreferrer'>購入ページ</a>
                        <Button
                          variant='danger'
                          className='ml20'
                          onClick={() => cancelSubscription(subscription)}>解約する</Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )
              })}
              </ListGroup>
            </Col>
          </Row>
        </Container>
      </EndUserLoginLayout>
    </>
  )
}

export default Index
