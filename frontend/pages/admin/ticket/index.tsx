import type { NextPage } from 'next'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import React, { useEffect, useState } from 'react'
import { Container, Table } from 'react-bootstrap'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import { TicketMasterParam } from 'interfaces/TicketMasterParam'
import { RootState } from 'redux/store'
import { useSelector } from 'react-redux'
import PublishStatusBadge from 'components/atoms/PublishStatusBadge'
import Unauthorized from 'components/templates/Unauthorized'

const Index: NextPage = () => {
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const router = useRouter()
  const [ticketMasters, setTicketMasters] = useState<TicketMasterParam[]>([])

  const allowReadTicketMaster = useSelector((state: RootState) => state.merchantUserPermission.allowReadTicketMaster)
  const allowUpdateTicketMaster = useSelector((state: RootState) => state.merchantUserPermission.allowUpdateTicketMaster)

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
  }, [router.query.public_id, cookies._square_eight_merchant_session, router.query.website_id])

  return (
    <>
      <MerchantUserAdminLayout>
        {allowReadTicketMaster === 'Allow' && <Container>
          <a className='btn btn-primary mt10 mb20' href='/admin/ticket/new'>回数券登録</a>
          <h4>回数券一覧</h4>
          <Table bordered>
            <thead>
              <tr>
                <th>回数券名</th>
                <th>発行枚数</th>
                <th>値段</th>
                {allowUpdateTicketMaster === 'Allow' && <th>編集</th>}
                <th>購入ページ</th>
                <th>公開設定</th>
              </tr>
            </thead>
            <tbody>
              {ticketMasters.map((ticket, i) => {
                return(
                  <tr key={i}>
                    <td>{ticket.name}</td>
                    <td>{ticket.issue_number}枚</td>
                    <td>{ticket.price}</td>
                    {allowUpdateTicketMaster === 'Allow' && <td>
                      <a href={`/admin/ticket/${ticket.public_id}/edit`}
                        className='btn btn-primary btn-sm'>
                        編集
                      </a>
                    </td>}
                    <td>
                      <a href={`/ticket/${ticket.public_id}/purchase`}
                        className='btn btn-primary btn-sm'
                        target='_blank'
                        rel='noreferrer'>
                        購入ページプレビュー
                      </a>
                    </td>
                    <td>
                      <PublishStatusBadge publishStatus={ticket.publish_status} />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </Container>}
        {allowReadTicketMaster === 'Forbid' && <Unauthorized />}
      </MerchantUserAdminLayout>
    </>
  )
}

export default Index
