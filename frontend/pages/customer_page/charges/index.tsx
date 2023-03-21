import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { Container, Table, Pagination } from 'react-bootstrap'
import EndUserLoginLayout from 'components/templates/EndUserLoginLayout'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { StripePaymentIntentsParam } from 'interfaces/StripePaymentIntentsParam'
import { useCookies } from 'react-cookie'
import { usePaginationNumber } from 'hooks/usePaginationNumber'

const Index: NextPage = () => {
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_square_eight_end_user_session'])
  const [stripePaymentIntents, setStripePaymentIntents] = useState<StripePaymentIntentsParam[]>()
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
    axios.get(`${process.env.BACKEND_URL}/api/internal/end_users/stripe_payment_history`,
    {
      headers: {
        'Session-Id': cookies._square_eight_end_user_session
      },
      params: {
        current_page: currentPage,
        display_count: displayCount
      }
    }).then((response) => {
      console.log(response.data.stripe_payment_intents)
      setStripePaymentIntents(response.data.stripe_payment_intents)
      setLastPage(response.data.last_page)
    }).catch((error) => {
      console.log(error)
    })
  }, [dispatch, cookies._square_eight_end_user_session, currentPage, lastPage])


  return (
    <>
      <EndUserLoginLayout>
        <Container className='mt20'>
          <h4>お支払い履歴</h4>
          {stripePaymentIntents && stripePaymentIntents.length > 0 &&
          <Table bordered>
            <thead>
              <tr>
                <th className='text-center'>商品名</th>
                <th className='text-center'>購入先</th>
                <th className='text-center'>料金</th>
                <th className='text-center'>お支払い日</th>
                {/* <th className='text-center'>支払いのキャンセル</th> */}
              </tr>
            </thead>
            <tbody>
              {stripePaymentIntents && stripePaymentIntents.map((payment, i) => {
                return (
                  <tr key={i}>
                    <td className='text-center'>{payment.purchase_product_name}</td>
                    <td className='text-center'>{payment.account_business_name}</td>
                    <td className='text-center'>￥{payment.amount}</td>
                    <td className='text-center'>{payment.order_date}</td>
                    {/* <td className='text-center'>
                      <Button size='sm' variant='danger'>キャンセル</Button>
                    </td> */}
                  </tr>
                )
              })}
            </tbody>
          </Table>}
          {stripePaymentIntents && stripePaymentIntents.length > 0 &&
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
          </Pagination>}
          {stripePaymentIntents && stripePaymentIntents.length === 0 &&
            <div className='text-center font-size-25'>お支払い履歴がありません</div>}
        </Container>
      </EndUserLoginLayout>
    </>
  )
}

export default Index
