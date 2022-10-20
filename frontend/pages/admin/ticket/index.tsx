import type { NextPage } from 'next'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import GuideStripeAccountRegister from 'components/templates/GuideStripeAccountRegister'
import React, { useEffect, useState } from 'react'
import { Container, ListGroup, Row, Col } from 'react-bootstrap'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import { TicketMasterParam } from 'interfaces/TicketMasterParam'
import { RootState } from 'redux/store'
import { useSelector } from 'react-redux'
import PublishStatusBadge from 'components/atoms/PublishStatusBadge'

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
        <Row>
          <Col lg={3}></Col>
          <Col lg={6}>
            {stripeAccountEnable === 'Enable' && <>
            <a className='btn btn-primary mt10 mb20'
              href='/admin/ticket/new'>回数券登録</a>
              <h3>回数券一覧</h3>
              <ListGroup>
                {ticketMasters.map((ticket, i) => {
                  return(
                    <ListGroup.Item key={i}>
                    <Row>
                      <Col>
                        表示名 {ticket.name}
                        <PublishStatusBadge publishStatus={ticket.publish_status} /><br/>
                        発行枚数 {ticket.issue_number}枚<br/>
                        値段 ￥{ticket.price}
                      </Col>
                      <Col>
                        <a href={`/admin/ticket/${ticket.public_id}/edit`}
                           className='btn btn-primary btn-sm'>
                          編集
                        </a>
                        <br/>
                        <a href={`/ticket/${ticket.public_id}/purchase`}
                          className='btn btn-primary mt10 btn-sm'
                          target='_blank'
                          rel='noreferrer'>
                          購入ページプレビュー
                        </a>
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
