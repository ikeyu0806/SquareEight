import React, { useEffect, useState } from 'react'
import  { Container, Row, Col, ListGroup, Button } from 'react-bootstrap'
import CustomersLineChart from '../organisms/CustomersLineChart'
import SalesBarChart from '../organisms/SalesBarChart'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { Notification } from 'interfaces/Notification'
import { useRouter } from 'next/router'
import { weekDaysChanged,
         transferAmountArrayChanged,
         feeAmountArrayChanged,
         customerCountArrayChanged } from 'redux/dashboardSlice'
import { useDispatch } from 'react-redux'

const DashboardTemplate = (): JSX.Element => {
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [systemNotifications, setSystemNotifications] = useState<Notification[]>([])
  const router = useRouter()
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchDashboardContent = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/accounts/dashboard_contents`, {
          headers: { 
            'Session-Id': cookies._square_eight_merchant_session
          }
        }
      )
      .then(function (response) {
        console.log(response)
        setNotifications(response.data.notifications)
        setSystemNotifications(response.data.system_notifications)
        dispatch(weekDaysChanged(response.data.week_days))
        dispatch(transferAmountArrayChanged(response.data.transfer_amount_array))
        dispatch(feeAmountArrayChanged(response.data.fee_amount_array))
        dispatch(customerCountArrayChanged(response.data.customer_count_array))
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchDashboardContent()
  }, [cookies._square_eight_merchant_session, dispatch])

  return (
    <Container>
      <Row>
        <Col>
          <ListGroup as='ul'>
            <ListGroup.Item as='li' active>
              通知一覧
            </ListGroup.Item>
            {notifications && notifications.map((n, i) => {
              return (
                <ListGroup.Item
                  as='li'
                  key={i}
                  className='list-group-hover'
                  onClick={() => router.push(`/admin/notification/account/${n.id}/`)}>
                  {n.title}
                </ListGroup.Item>
              )
            })}
          </ListGroup>
          <div className='text-center mt10'>
            <a className='btn btn-primary' href='/admin/notification/account/list'>もっと見る</a>
          </div>
        </Col>
        <Col>
          <ListGroup as='ul'>
            <ListGroup.Item as='li' active>
              運営からのお知らせ
            </ListGroup.Item>
            {systemNotifications && systemNotifications.map((n, i) => {
              return (
                <ListGroup.Item
                  as='li' key={i}
                  className='list-group-hover'
                  onClick={() => router.push(`/admin/notification/system/${n.id}/`)}>
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
          <CustomersLineChart></CustomersLineChart>
        </Col>
        <Col>
          <SalesBarChart></SalesBarChart>
        </Col>
      </Row>
    </Container>
  )
}

export default DashboardTemplate

