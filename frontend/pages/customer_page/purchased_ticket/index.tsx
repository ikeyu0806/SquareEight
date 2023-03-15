import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { Container, Pagination, Row, Col, Table } from 'react-bootstrap'
import EndUserLoginLayout from 'components/templates/EndUserLoginLayout'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { PurchasedTicketParam } from 'interfaces/PurchasedTicketParam'
import { useCookies } from 'react-cookie'
import { usePaginationNumber } from 'hooks/usePaginationNumber'

const Index: NextPage = () => {
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_square_eight_end_user_session'])
  const [purchasedTickets, setPurchasedTickets] = useState<PurchasedTicketParam[]>()
  // Pagination用
  // 表示するレコード数
  const displayCount = 20
  const [currentPage, setCurrentPage] = useState(1)
  const [lastPage, setLastPage] = useState(1000)
  let usePaginationNumberReturnVal = usePaginationNumber(currentPage, lastPage)
  let firstPaginationNum: number = usePaginationNumberReturnVal[0]
  let secondPaginationNum: number = usePaginationNumberReturnVal[1]
  let thirdPaginationNum: number = usePaginationNumberReturnVal[2]
  let forthPaginationNum: number = usePaginationNumberReturnVal[3]
  let fifthPaginationNum: number = usePaginationNumberReturnVal[4]
  useEffect(() => {
    axios.get(`${process.env.BACKEND_URL}/api/internal/purchased_tickets`,
    {
      headers: {
        'Session-Id': cookies._square_eight_end_user_session
      },
      params: {
        current_page: currentPage,
        display_count: displayCount
      }
    }).then((response) => {
      console.log(response.data)
      setPurchasedTickets(response.data.purchased_tickets)
      setLastPage(response.data.last_page)
    }).catch((error) => {
      console.log(error)
    })
  }, [dispatch, cookies._square_eight_end_user_session, currentPage, lastPage])


  return (
    <>
      <EndUserLoginLayout>
        <Container className='mt20'>
          <Row>
            <Col lg={2}></Col>
            <Col>
              {purchasedTickets && purchasedTickets.length > 0 && <Table bordered>
                <thead>
                  <tr>
                    <th>回数券名</th>
                    <th>購入時枚数</th>
                    <th>残り枚数</th>
                    <th>有効期限</th>
                    <th>詳細</th>
                  </tr>
                </thead>
                <tbody>
                  {purchasedTickets.map((ticket, i) => {
                    return (
                      <tr key={i}>
                        <td>{ticket.name}</td>
                        <td>{ticket.purchased_number}</td>
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
              </Table>}
              {purchasedTickets && purchasedTickets.length === 0 &&
                <div className='text-center font-size-25'>チケット購入履歴がありません</div>
              }
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
            <Col lg={2}></Col>
          </Row>
        </Container>
      </EndUserLoginLayout>
    </>
  )
}

export default Index
