import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { Container, Table, Pagination } from 'react-bootstrap'
import axios from 'axios'
import { useRouter } from 'next/router'
import { OrderParam } from 'interfaces/OrderParam'
import EndUserLoginLayout from 'components/templates/EndUserLoginLayout'
import { usePaginationNumber } from 'hooks/usePaginationNumber'

const Index: NextPage = () => {
  const [cookies] = useCookies(['_square_eight_end_user_session'])
  const router = useRouter()
  const [orders, setOrders] = useState<OrderParam[]>([])
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
    const fetchOrders = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/orders`, {
          headers: { 
            'Session-Id': cookies._square_eight_end_user_session
          },
          params: {
            current_page: currentPage,
            display_count: displayCount
          }
        }
      )
      .then(function (response) {
        console.log(response.data)
        setOrders(response.data.orders)
        setLastPage(response.data.last_page)
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchOrders()
  }, [router.query.public_id, cookies._square_eight_end_user_session, currentPage, lastPage])

  return (
    <EndUserLoginLayout>
      <Container className='mt20'>
        <h4>注文一覧</h4>
        <Table bordered>
          <thead>
            <tr>
              <th>商品・サービス名</th>
              <th>合計金額</th>
              <th>注文日</th>
              <th>お届け先</th>
              <th>詳細</th>
            </tr>
          </thead>
          <tbody>
            {orders && orders.length > 0 &&
            orders.map((order, i) => {
              return (
                <tr key={i}>
                  <td>
                    {order.product_names.map((p, i) => {
                      return(
                        <div key={i + '_product_name'}>{p}</div>
                      )
                    })}
                  </td>
                  <td>¥{order.total_price}</td>
                  <td>{order.order_date}</td>
                  <td>
                    <div>{order.name}</div>
                    <div>{order.postal_code}</div>
                    <div>{order.address}</div>
                  </td>
                  <td>
                    <a className='btn btn-primary btn-sm mt10' href={`/customer_page/order/${order.public_id}`}>
                      詳細
                    </a>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
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
        {orders && orders.length === 0 &&
        <div className='text-center font-size-25'>注文履歴がありません</div>}
      </Container>
    </EndUserLoginLayout>
  )
}

export default Index
