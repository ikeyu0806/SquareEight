import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { Container, ListGroup, Row, Col } from 'react-bootstrap'
import EndUserLoginLayout from 'components/templates/EndUserLoginLayout'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { StripeSubscriptionsParam } from 'interfaces/StripeSubscriptionsParam'
import { useCookies } from 'react-cookie'

const Index: NextPage = () => {
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_square_eight_end_user_session'])
  const [stripeSubscriptions, setStripeSubscriptions] = useState<StripeSubscriptionsParam[]>()

  useEffect(() => {
    axios.get(`${process.env.BACKEND_URL}/api/internal/end_users/subscription_lists`,
    {
      headers: {
        'Session-Id': cookies._square_eight_end_user_session
      }
    }).then((response) => {
      setStripeSubscriptions(response.data.stripe_payment_subscriptions)
    }).catch((error) => {
      console.log(error)
    })
  }, [dispatch, cookies._square_eight_end_user_session])


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
                      プラン名: {subscription.metadata.name}<br/>
                      購入先: {subscription.metadata.account_business_name}
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
