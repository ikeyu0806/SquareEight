import type { NextPage } from 'next'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import GuideStripeAccountRegister from 'components/templates/GuideStripeAccountRegister'
import React, { useEffect, useState } from 'react'
import { Container, Table } from 'react-bootstrap'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import { TicketMasterParam } from 'interfaces/TicketMasterParam'
import { RootState } from 'redux/store'
import { useSelector } from 'react-redux'

const Index: NextPage = () => {
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const router = useRouter()
  const [ticketMasters, setTicketMasters] = useState<TicketMasterParam[]>([])
  const stripeAccountEnable = useSelector((state: RootState) => state.currentMerchantUser.stripeAccountEnable)

  useEffect(() => {
    const fetchTicketMasters = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/ticket_masters`, {
          headers: { 
            'Session-Id': cookies._square_eight_merchant_session
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
  }, [router.query.id, cookies._square_eight_merchant_session, router.query.website_id])

  return (
    <>
      <MerchantUserAdminLayout>
        <Container>
        {stripeAccountEnable === 'Enable' && <>
        <a className='btn btn-primary mt10 mb20'
           href='/admin/ticket/new'>回数券登録</a>
        <h2>回数券一覧</h2>
          <Table bordered>
            <thead>
              <tr>
                <th className='text-center'>表示名</th>
                <th className='text-center'>発行枚数</th>
                <th className='text-center'>値段</th>
                <th></th>
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
                      <a href={`/admin/ticket/${ticket.id}/edit`} className='btn btn-primary'>
                        編集
                      </a>
                    </td>
                    <td className='text-center'>
                      <a href={`/ticket/${ticket.id}/purchase`} className='btn btn-primary' target='_blank' rel='noreferrer'>
                        購入ページプレビュー
                      </a>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </>}
        {stripeAccountEnable === 'Disable' && <GuideStripeAccountRegister></GuideStripeAccountRegister>}
        </Container>
      </MerchantUserAdminLayout>
    </>
  )
}

export default Index
