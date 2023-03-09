import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { Container, Row, Col, ListGroup, Pagination } from 'react-bootstrap'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { Notification } from 'interfaces/Notification'
import { useRouter } from 'next/router'
import { usePaginationNumber } from 'hooks/usePaginationNumber'


const Index: NextPage = () => {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const router = useRouter()
  // Pagination用
  // 表示するレコード数
  const displayCount = 10
  const [currentPage, setCurrentPage] = useState(1)
  const [lastPage, setLastPage] = useState(1000)
  let usePaginationNumberReturnVal = usePaginationNumber(currentPage, lastPage)
  let firstPaginationNum: number = usePaginationNumberReturnVal[0]
  let secondPaginationNum: number = usePaginationNumberReturnVal[1]
  let thirdPaginationNum: number = usePaginationNumberReturnVal[2]
  let forthPaginationNum: number = usePaginationNumberReturnVal[3]
  let fifthPaginationNum: number = usePaginationNumberReturnVal[4]

  useEffect(() => {
    const fetchDashboardContent = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/account_notifications`, {
          headers: { 
            'Session-Id': cookies._square_eight_merchant_session
          },
          params: {
            current_page: currentPage,
            display_count: displayCount
          }
        }
      )
      .then(function (response) {
        console.log(response)
        setNotifications(response.data.account_notifications)
        setLastPage(response.data.last_page)
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchDashboardContent()
  }, [cookies._square_eight_merchant_session, currentPage, lastPage])

  useEffect(() => {
    axios.post(`${process.env.BACKEND_URL}/api/internal/merchant/read_notification_status/read_account_notifications_status`,
    {},
    {
      headers: {
        'Session-Id': cookies._square_eight_merchant_session
      }
    })
  }, [cookies._square_eight_merchant_session])

  return (
    <MerchantUserAdminLayout>
      <br />
      <Container>
        <Row>
          <Col lg={3}></Col>
          <Col lg={6}>
            <ListGroup as='ul'>
              <ListGroup.Item as='li' active>
                お知らせ
              </ListGroup.Item>
              {notifications.map((n, i) => {
                return (
                  <ListGroup.Item
                    as='li'
                    key={i} onClick={() => router.push(`${n.url}`)}>
                    {n.title}
                  </ListGroup.Item>
                )
              })}
            </ListGroup>
            <br />
            <Pagination>
              <Pagination.First onClick={() => setCurrentPage(1)} />
              {currentPage > 1 && <Pagination.Prev
                onClick={() => setCurrentPage(currentPage - 1)} />}
              <Pagination.Item
                active={currentPage == firstPaginationNum}
                onClick={() => setCurrentPage(firstPaginationNum)}>{firstPaginationNum}</Pagination.Item>
              {lastPage > 1 && <Pagination.Item
                active={currentPage == secondPaginationNum}
                onClick={() => setCurrentPage(secondPaginationNum)}>{secondPaginationNum}</Pagination.Item>}
              {lastPage > 2 && <Pagination.Item
                active={currentPage == thirdPaginationNum}
                onClick={() => setCurrentPage(thirdPaginationNum)}>{thirdPaginationNum}</Pagination.Item>}
              {lastPage > 3 && currentPage < lastPage &&  <Pagination.Item
                active={currentPage == forthPaginationNum}
                onClick={() => setCurrentPage(forthPaginationNum)}>{forthPaginationNum}</Pagination.Item>}
              {lastPage > 4 && currentPage < lastPage - 1 && <Pagination.Item
                active={currentPage == fifthPaginationNum}
                onClick={() => setCurrentPage(fifthPaginationNum)}>{fifthPaginationNum}</Pagination.Item>}
              {currentPage !== lastPage && <Pagination.Next
                onClick={() => setCurrentPage(currentPage + 1)} />}
              <Pagination.Last onClick={() => setCurrentPage(lastPage)} />
            </Pagination>
          </Col>
        </Row>
      </Container>
    </MerchantUserAdminLayout>
  )
}

export default Index
