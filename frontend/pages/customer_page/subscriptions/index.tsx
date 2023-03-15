import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { Container, Pagination, Row, Col, Button, Table } from 'react-bootstrap'
import EndUserLoginLayout from 'components/templates/EndUserLoginLayout'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useCookies } from 'react-cookie'
import { MerchantStripeSubscription } from 'interfaces/MerchantStripeSubscription'
import { swalWithBootstrapButtons } from 'constants/swalWithBootstrapButtons'
import SubscriptionDescribeModal from 'components/molecules/SubscriptionDescribeModal'
import { showSubscriptionDescribeModalChanged } from 'redux/accountSlice'
import { usePaginationNumber } from 'hooks/usePaginationNumber'

const Index: NextPage = () => {
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_square_eight_end_user_session'])
  const [stripeSubscriptions, setStripeSubscriptions] = useState<MerchantStripeSubscription[]>()
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
    axios.get(`${process.env.BACKEND_URL}/api/internal/end_users/subscription_lists`,
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
      setStripeSubscriptions(response.data.subscriptions)
      setLastPage(response.data.last_page)
    }).catch((error) => {
      console.log(error)
    })
  }, [dispatch, cookies._square_eight_end_user_session, currentPage, lastPage])

  const cancelSubscription = (subscription: MerchantStripeSubscription) => {
    swalWithBootstrapButtons.fire({
      title: '解約します',
      html: `${subscription.monthly_payment_plan_name}を解約します。<br />よろしいですか？`,
      icon: 'question',
      confirmButtonText: '解約する',
      cancelButtonText: 'キャンセル',
      showCancelButton: true,
      showCloseButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${process.env.BACKEND_URL}/api/internal/end_users/${subscription.public_id}/cancel_subscription`, {
          headers: { 
            'Session-Id': cookies._square_eight_end_user_session
          }
        }).then(response => {
          swalWithBootstrapButtons.fire({
            title: '解除しました',
            icon: 'info'
          }).then((result) => {
            location.reload()
          })
        }).catch(error => {
          swalWithBootstrapButtons.fire({
            title: '解除失敗しました',
            icon: 'error'
          })
        })
      }
    })
  }

  return (
    <>
      <EndUserLoginLayout>
        <Container className='mt20'>
          <Row>
            <Col lg={1}></Col>
            <Col>
            {stripeSubscriptions && stripeSubscriptions.length > 0 &&
            <>
              <h3>加入中サブスクリプション</h3>
              <Button
                className='mt20 mb20 text-white'
                variant='info'
                onClick={() => dispatch(showSubscriptionDescribeModalChanged(true))}>サブスクリプションの請求と解約について</Button>
              <Table bordered>
                <thead>
                  <tr>
                    <th>サブスクリプション名</th>
                    <th>購入先</th>
                    <th>購入ページ</th>
                    <th>解約</th>
                  </tr>
                </thead>
                <tbody>
                  {stripeSubscriptions && stripeSubscriptions.map((s, i) => {
                  return (
                      <tr key={i}>
                        <td>{s.monthly_payment_plan_name}</td>
                        <td>{s.account_business_name}</td>
                        <td>
                        <a  className='btn btn-primary'
                            href={`/monthly_payment/${s.public_id}/purchase`}
                            target='_blank'
                            rel='noreferrer'>購入ページ</a>
                        </td>
                        <td>
                          <Button
                            variant='danger'
                            onClick={() => cancelSubscription(s)}>解約する</Button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </>}
            {stripeSubscriptions && stripeSubscriptions.length === 0 &&
            <div className='text-center font-size-25'>加入しているサブスクリプションがありません</div>}
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
            <Col lg={1}></Col>
          </Row>
        </Container>
        <SubscriptionDescribeModal/>
      </EndUserLoginLayout>
    </>
  )
}

export default Index
