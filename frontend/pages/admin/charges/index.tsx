import { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { Container, Table, Pagination } from 'react-bootstrap'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { StripePaymentIntentsParam } from 'interfaces/StripePaymentIntentsParam'
import { useCookies } from 'react-cookie'
import { RootState } from 'redux/store'
import Unauthorized from 'components/templates/Unauthorized'
import { swalWithBootstrapButtons } from 'constants/swalWithBootstrapButtons'
import { usePaginationNumber } from 'hooks/usePaginationNumber'

const Index: NextPage = () => {
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const [stripePaymentIntents, setStripePaymentIntents] = useState<StripePaymentIntentsParam[]>()
  const allowReadSales = useSelector((state: RootState) => state.merchantUserPermission.allowReadSales)
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
    axios.get(`${process.env.BACKEND_URL}/api/internal/accounts/stripe_payment_history`,
    {
      headers: {
        'Session-Id': cookies._square_eight_merchant_session
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
  }, [dispatch, cookies._square_eight_merchant_session, currentPage, lastPage])

  const execRefund = (publicId: string) => {
    swalWithBootstrapButtons.fire({
      title: '返金します',
      html: `返金実行します。<br />手数料は返金されません。よろしいですか？`,
      icon: 'question',
      confirmButtonText: '返金する',
      cancelButtonText: 'キャンセル',
      showCancelButton: true,
      showCloseButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        axios.post(`${process.env.BACKEND_URL}/api/internal/payment_intents/${publicId}/refund_payment`,
        {},
        {
          headers: {
            'Session-Id': cookies._square_eight_merchant_session
          }
        }).then(response => {
          swalWithBootstrapButtons.fire({
            title: '返金しました',
            icon: 'info'
          })
          location.reload()
        }).catch(error => {
          swalWithBootstrapButtons.fire({
            title: '返金失敗しました',
            icon: 'error'
          })
        })
      }
    })
  }

  return (
    <MerchantUserAdminLayout>
      <br />
      {allowReadSales === 'Allow' && <Container>
        <h4>売上一覧</h4>
        <div className='mt10 mb10'>現地払いの売り上げは表示されません。</div>
        <Table bordered>
          <thead>
            <tr>
              <th className='text-center'>商品・サービス名</th>
              <th className='text-center'>購入数</th>
              <th className='text-center'>種別</th>
              <th className='text-center'>購入者</th>
              <th className='text-center'>料金</th>
              <th className='text-center'>購入日</th>
              <th className='text-center'>返金</th>
            </tr>
          </thead>
          <tbody>
            {stripePaymentIntents && stripePaymentIntents.map((payment, i) => {
              return (
                <tr key={i}>
                  <td className='text-cente'>{payment.purchase_product_name}</td>
                  <td className='text-center'>{payment.quantity}</td>
                  <td className='text-center'>
                    <span className='badge bg-info text-white'>{payment.product_label_text}</span>
                  </td>
                  <td className='text-center'>{payment.customer_fullname}</td>
                  <td className='text-center'>￥{payment.amount}</td>
                  <td className='text-center'>{payment.order_date}</td>
                  <td className='text-center'>
                    {payment.refund_at_text === '' ?
                    <a
                      onClick={() => execRefund(payment.public_id)}
                      className='btn btn-sm btn-danger'>返金</a>
                    :
                    <span>{payment.refund_at_text}</span>}
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
      </Container>}
      {allowReadSales === 'Forbid' && <Unauthorized />}
    </MerchantUserAdminLayout>
  )
}

export default Index
