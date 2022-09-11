import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { Container, ListGroup, Row, Col } from 'react-bootstrap'
import EndUserLoginLayout from 'components/templates/EndUserLoginLayout'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { PurchasedTicketParam } from 'interfaces/PurchasedTicketParam'
import { useCookies } from 'react-cookie'

const Index: NextPage = () => {
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_square_eight_end_user_session'])
  const [purchasedTickets, setPurchasedTickets] = useState<PurchasedTicketParam[]>()

  useEffect(() => {
    axios.get(`${process.env.BACKEND_URL}/api/internal/purchased_tickets`,
    {
      headers: {
        'Session-Id': cookies._square_eight_end_user_session
      }
    }).then((response) => {
      setPurchasedTickets(response.data.purchased_tickets)
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
              {purchasedTickets && purchasedTickets.map((ticket, i) => {
                return (
                  <ListGroup key={i}>
                    <Row>
                      <Col>
                        <div>回数券名 {ticket.name}</div>
                        <div>残り枚数 {ticket.remain_number}</div>
                        <div>有効期限 {ticket.display_expired_at}</div>
                      </Col>
                      <Col>
                       <a className='btn btn-primary'
                          href={`/customer_page/purchased_ticket/detail/${ticket.id}`}>
                        詳細</a>
                      </Col>
                    </Row>
                    
                  </ListGroup>
                )
              })}
            </Col>
          </Row>
        </Container>
      </EndUserLoginLayout>
    </>
  )
}

export default Index
