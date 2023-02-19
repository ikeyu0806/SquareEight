import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { Container, ListGroup, Row, Col, Table } from 'react-bootstrap'
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
      console.log(response.data)
      setPurchasedTickets(response.data.purchased_tickets)
    }).catch((error) => {
      console.log(error)
    })
  }, [dispatch, cookies._square_eight_end_user_session])


  return (
    <>
      <EndUserLoginLayout>
        <Container className='mt20'>
          <Row>
            <Col lg={2}></Col>
            <Col>
              <Table bordered>
                <thead>
                  <tr>
                    <th>回数券名</th>
                    <th>残り枚数</th>
                    <th>有効期限</th>
                    <th>詳細</th>
                  </tr>
                </thead>
                <tbody>
                  {purchasedTickets && purchasedTickets.map((ticket, i) => {
                    return (
                      <tr key={i}>
                        <td>{ticket.name}</td>
                        <td>{ticket.remain_number}</td>
                        <td>
                          {ticket.display_expired_at}
                          {ticket.is_expired && <span className='badge bg-danger'>期限切れ</span>}
                        </td>
                        <td>
                          <a className='btn btn-primary'
                            href={`/customer_page/purchased_ticket/detail/${ticket.public_id}`}>
                            詳細</a>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </Col>
            <Col lg={2}></Col>
          </Row>
        </Container>
      </EndUserLoginLayout>
    </>
  )
}

export default Index
