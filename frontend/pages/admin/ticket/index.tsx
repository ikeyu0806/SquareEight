import type { NextPage } from 'next'
import AdminNavbar from '../../../components/templates/AdminNavbarTemplate'
import React, { useEffect, useState } from 'react'
import RegularFooter from '../../../components/organisms/RegularFooter'
import { Container, Table, Button } from 'react-bootstrap'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import { TicketMasterParam } from '../../../interfaces/TicketMasterParam'

const Index: NextPage = () => {
  const [cookies] = useCookies(['_gybuilder_merchant_session'])
  const router = useRouter()
  const [ticketMasters, setTicketMasters] = useState<TicketMasterParam[]>([])

  useEffect(() => {
    const fetchTicketMasters = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/ticket_masters`, {
          headers: { 
            'Session-Id': cookies._gybuilder_merchant_session
          },
        }
      )
      .then(function (response) {
        const ticketMasterResponse: TicketMasterParam[] = response.data.ticket_masters
        setTicketMasters(ticketMasterResponse)
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchTicketMasters()
  }, [router.query.id, cookies._gybuilder_merchant_session, router.query.website_id])

  return (
    <>
      <AdminNavbar></AdminNavbar>
      <br />
      <Container>
        <h2>回数券一覧</h2>
        <Table bordered>
          <thead>
            <tr>
              <th className='text-center'>表示名</th>
              <th className='text-center'>発行枚数</th>
              <th className='text-center'>値段</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {ticketMasters.map((ticket, i) => {
              return (
                <tr key={i}>
                  <td className='text-center'>
                    {ticket.name}
                  </td>
                  <td className='text-center'>
                    {ticket.issue_number}
                  </td>
                  <td className='text-center'>
                    {ticket.price}
                  </td>
                  <td className='text-center'>
                    <Button onClick={() => router.push(`/admin/ticket/${ticket.id}/edit`)}>
                      編集
                    </Button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </Container>
      <br/>
      <br/>
      <br/>
      <RegularFooter></RegularFooter>
    </>
  )
}

export default Index
