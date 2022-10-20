import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { Container, Table, Row, Col, Card } from 'react-bootstrap'
import EndUserLoginLayout from 'components/templates/EndUserLoginLayout'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { PurchasedTicketParam } from 'interfaces/PurchasedTicketParam'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'

const Index: NextPage = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_square_eight_end_user_session'])
  const [purchasedTicket, setPurchasedTicket] = useState<PurchasedTicketParam>()

  useEffect(() => {
    const fetchPaymentMethod = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/purchased_tickets/${router.query.public_id}`, {
          headers: { 
            'Session-Id': cookies._square_eight_end_user_session
          },
        }
      )
      .then(function (response) {
        setPurchasedTicket(response.data.purchased_ticket)
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchPaymentMethod()
  }, [router.query.public_id, cookies._square_eight_end_user_session])

  return (
    <>
      <EndUserLoginLayout>
        <Container>
        <Row>
          <Col lg={3}></Col>
          <Col lg={6}>
            <Card>
              <Card.Header>{purchasedTicket?.name}</Card.Header>
              <Card.Body>
                <div className='mt10'>残り枚数: {purchasedTicket?.remain_number}枚</div>
                <div className='mt10'>有効期限: {purchasedTicket?.display_expired_at}</div>
                <div className='mt10'>{purchasedTicket?.description}</div>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={9}>
          </Col>
        </Row>
        </Container>
      </EndUserLoginLayout>
    </>
  )
}

export default Index
