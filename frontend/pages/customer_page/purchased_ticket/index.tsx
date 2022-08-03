import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { Container, Table } from 'react-bootstrap'
import EndUserLoginLayout from 'components/templates/EndUserLoginLayout'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { PurchasedTicketParam } from 'interfaces/PurchasedTicketParam'
import { useCookies } from 'react-cookie'

const Index: NextPage = () => {
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_gybuilder_end_user_session'])
  const [purchasedTickets, setPurchasedTickets] = useState<PurchasedTicketParam[]>()

  useEffect(() => {
    axios.get(`${process.env.BACKEND_URL}/api/internal/purchased_tickets`,
    {
      headers: {
        'Session-Id': cookies._gybuilder_end_user_session
      }
    }).then((response) => {
      setPurchasedTickets(response.data.purchased_tickets)
    }).catch((error) => {
      console.log(error)
    })
  }, [dispatch, cookies._gybuilder_end_user_session])


  return (
    <>
      <EndUserLoginLayout>
        <Container>
          <Table>
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
                  <td>{ticket.display_expired_at}</td>
                  <td><a className='btn btn-primary'>詳細</a></td>
                </tr>
              )
            })}
          </tbody>
          </Table>
        </Container>
      </EndUserLoginLayout>
    </>
  )
}

export default Index
