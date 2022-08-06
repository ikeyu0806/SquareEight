import React, { useEffect, useState } from 'react'
import  { Container, Row, Col, ListGroup, Button } from 'react-bootstrap'
import ReservePageSalesLineChart from '../organisms/ReservePageSalesLineChart'
import MonthlyPaymentTicketLineChart from '../organisms/MonthlyPaymentTicketLineChart'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { Notification } from 'interfaces/Notification'
import { useRouter } from 'next/router'

const DashboardTemplate = (): JSX.Element => {
  const [cookies] = useCookies(['_gybuilder_merchant_session'])
  const [notification, setNotification] = useState<Notification[]>([])
  const router = useRouter()

  useEffect(() => {
    const fetchDashboardContent = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/accounts/dashboard_contents`, {
          headers: { 
            'Session-Id': cookies._gybuilder_merchant_session
          }
        }
      )
      .then(function (response) {
        console.log(response)
        setNotification(response.data.system_notifications)
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchDashboardContent()
  }, [cookies._gybuilder_merchant_session])

  return (
    <Container>
      <Row>
        <Col>
          <ListGroup as='ul'>
            <ListGroup.Item as='li' active>
              通知一覧
            </ListGroup.Item>
            <ListGroup.Item as='li'>
              8月2日 12:00から筋トレメソッドに3名の予約が入っています
            </ListGroup.Item>
            <ListGroup.Item as='li'>
              池谷さんが100回回数券 10000円を購入しました。
            </ListGroup.Item>
            <ListGroup.Item as='li'>
              池谷さんが隔週受講プランに加入しました。 
            </ListGroup.Item>
            <ListGroup.Item as='li'>
              8月1日 12:00からボディメイクに3名の予約が入っています
            </ListGroup.Item>
          </ListGroup>
          <div className='text-center mt10'>
            <Button>もっと見る</Button>
          </div>
        </Col>
        <Col>
          <ListGroup as='ul'>
            <ListGroup.Item as='li' active>
              運営からのお知らせ
            </ListGroup.Item>
            {notification.map((n, i) => {
              return (
                <ListGroup.Item as='li' key={i} onClick={() => router.push(`/admin/notification/system/${n.id}/`)}>
                  {n.title}
                </ListGroup.Item>
              )
            })}
          </ListGroup>
          <div className='text-center mt10'>
            <a className='btn btn-primary' href='/admin/notification/system/list'>もっと見る</a>
          </div>
        </Col>
      </Row>
      <br />
      <Row>
        <Col>
          <ReservePageSalesLineChart></ReservePageSalesLineChart>
        </Col>
        <Col>
          <MonthlyPaymentTicketLineChart></MonthlyPaymentTicketLineChart>
        </Col>
      </Row>
    </Container>
  )
}

export default DashboardTemplate

