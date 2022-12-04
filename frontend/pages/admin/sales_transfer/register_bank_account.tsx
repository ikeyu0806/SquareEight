import { NextPage } from 'next'
import React from 'react'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import RegisterMerchantBank from 'components/templates/RegisterMerchantBank'
import {loadStripe} from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { RootState } from 'redux/store'

const stripePromise = loadStripe(String(process.env.STRIPE_PUBLISHABLE_KEY))

const Register: NextPage = () => {
  const allowUpdateStripeBusinessInfo = useSelector((state: RootState) => state.merchantUserPermission.allowUpdateStripeBusinessInfo)

  const handleSubmit = (e: any) => {
    e.preventDefault()
  }
  return (
    <>
      <MerchantUserAdminLayout>
        {allowUpdateStripeBusinessInfo === 'Allow' && <Container>
          <Row>
            <Col lg={4} md={3}></Col>
            <Col lg={4} md={5}>
              <Form onSubmit={handleSubmit}>
                <Card>
                  <Elements stripe={stripePromise}>
                    <RegisterMerchantBank></RegisterMerchantBank>
                  </Elements>
                </Card>
              </Form>
            </Col>
          </Row>
        </Container>}
      </MerchantUserAdminLayout>
    </>
  )
}

export default Register
