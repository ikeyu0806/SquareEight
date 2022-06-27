import { NextPage } from 'next'
import React from 'react'
import AdminNavbar from '../../../components/templates/AdminNavbarTemplate'
import RegularFooter from '../../../components/organisms/RegularFooter'
import RegisterMerchantBank from '../../../components/templates/RegisterMerchantBank'
import {loadStripe} from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap'

const stripePromise = loadStripe('pk_test_pzo8bTj4ggDEV52y7gnVsdWt')

const Register: NextPage = () => {
  const handleSubmit = () => {
    console.log('test')
  }
  return (
    <>
      <AdminNavbar></AdminNavbar>
      <br/>
      <br/>
      <Container>
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
      </Container>
      <RegularFooter></RegularFooter>
    </>
  )
}

export default Register
