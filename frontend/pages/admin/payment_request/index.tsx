import type { NextPage } from 'next'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import GuideStripeAccountRegister from 'components/templates/GuideStripeAccountRegister'
import React, { useEffect, useState } from 'react'
import { Container, ListGroup, Row, Col } from 'react-bootstrap'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import { PaymentRequestParam } from 'interfaces/PaymentRequestParam'
import { RootState } from 'redux/store'
import { useSelector } from 'react-redux'

const Index: NextPage = () => {
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const router = useRouter()
  const [paymentRequests, setPaymentRequests] = useState<PaymentRequestParam[]>([])
  const stripeAccountEnable = useSelector((state: RootState) => state.currentMerchantUser.stripeAccountEnable)

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
        const ticketMasterResponse: PaymentRequestParam[] = response.data.payment_requests
        setPaymentRequests(ticketMasterResponse)
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchPaymentRequests()
  }, [router.query.id, cookies._square_eight_merchant_session, router.query.website_id])

  return (
    <>
      <MerchantUserAdminLayout>
        <Container>
        <Row>
          <Col lg={3}></Col>
          <Col lg={6}>
            {stripeAccountEnable === 'Enable' && <>
            <a className='btn btn-primary mt10 mb20'
              href='/admin/payment_request/new'>決済リクエスト登録</a>
              <h3>回数券一覧</h3>
              <ListGroup>
                {paymentRequests.map((request, i) => {
                  return(
                    <ListGroup.Item key={i}>
                    <Row>
                      <Col>
                        {request.request_url}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  )
                })}
                </ListGroup>
              </>}
              {stripeAccountEnable === 'Disable' && <GuideStripeAccountRegister></GuideStripeAccountRegister>}
            </Col>
          </Row>
        </Container>
      </MerchantUserAdminLayout>
    </>
  )
}

export default Index
