import type { NextPage } from 'next'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import React, { useEffect, useState } from 'react'
import { Container, Table, Pagination } from 'react-bootstrap'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import { PaymentRequestParam } from 'interfaces/PaymentRequestParam'
import { RootState } from 'redux/store'
import { useSelector } from 'react-redux'
import Unauthorized from 'components/templates/Unauthorized'
import lineUserStyles from 'styles/LineUser.module.css'
import { messageSendMethodText } from 'functions/messageSendMethodText'
import { usePaginationNumber } from 'hooks/usePaginationNumber'

const Index: NextPage = () => {
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const router = useRouter()
  const [paymentRequests, setPaymentRequests] = useState<PaymentRequestParam[]>([])
  const allowReadPaymentRequest = useSelector((state: RootState) => state.merchantUserPermission.allowReadPaymentRequest)
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
    const fetchPaymentRequests = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/payment_requests`, {
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
        console.log(response.data)
        const paymentRequestResponse: PaymentRequestParam[] = response.data.payment_requests
        setPaymentRequests(paymentRequestResponse)
        setLastPage(response.data.last_page)
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchPaymentRequests()
  }, [router.query.public_id, cookies._square_eight_merchant_session, router.query.website_id, currentPage, lastPage])

  return (
    <>
      <MerchantUserAdminLayout>
      <br />
      {allowReadPaymentRequest === 'Allow' &&
      <Container>
        <h3>決済リクエスト一覧</h3>
        <Table bordered>
        <thead>
          <tr>
            <th>金額</th>
            <th>送信方法</th>
            <th>請求先顧客</th>
            <th>請求先LINEユーザ</th>
            <th>メールアドレス</th>
            <th>決済ステータス</th>
            <th>決済URL</th>
          </tr>
        </thead>
        <tbody>
          {paymentRequests.map((request, i) => {
            return (
              <tr key={i}>
                <td>￥{request.price}</td>
                <td>{messageSendMethodText(request.send_method)}</td>
                <td>{request.billing_customer_name}</td>
                <td>
                  {request.line_picture_url && <img
                    className={lineUserStyles.line_picture_url}
                    src={request.line_picture_url}
                    alt='line_picture_url' />}
                  <span className='ml10'>{request.line_display_name}</span>
                </td>
                <td>{request.billing_customer_email}</td>
                <td>
                  {request.status === 'Pending' && <span  className='badge bg-danger'>未払い</span>}
                  {request.status === 'Paid' && <span  className='badge bg-info'>支払い済み</span>}
                </td>
                <td>
                  <a
                    href={request.request_url}
                    target='_blank'
                    rel='noreferrer'
                    className='btn btn-primary'>決済URL</a>
                </td>
              </tr>
            )
          })}
        </tbody>
        </Table>
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
      </Container>}
      {allowReadPaymentRequest === 'Forbid' && <Unauthorized />}
      </MerchantUserAdminLayout>
    </>
  )
}

export default Index
