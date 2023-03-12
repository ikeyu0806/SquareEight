import { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { Container, Table } from 'react-bootstrap'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { StripePaymentIntentsParam } from 'interfaces/StripePaymentIntentsParam'
import { useCookies } from 'react-cookie'
import { RootState } from 'redux/store'
import Unauthorized from 'components/templates/Unauthorized'
import { swalWithBootstrapButtons } from 'constants/swalWithBootstrapButtons'

const Index: NextPage = () => {
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const [stripePaymentIntents, setStripePaymentIntents] = useState<StripePaymentIntentsParam[]>()
  const allowReadSales = useSelector((state: RootState) => state.merchantUserPermission.allowReadSales)

  useEffect(() => {
    axios.get(`${process.env.BACKEND_URL}/api/internal/accounts/stripe_payment_history`,
    {
      headers: {
        'Session-Id': cookies._square_eight_merchant_session
      }
    }).then((response) => {
      console.log(response.data.stripe_payment_intents)
      setStripePaymentIntents(response.data.stripe_payment_intents)
    }).catch((error) => {
      console.log(error)
    })
  }, [dispatch, cookies._square_eight_merchant_session])

  const execRefund = (publicId: string) => {
    swalWithBootstrapButtons.fire({
      title: '返金します',
      html: `返金実行します。<br />よろしいですか？`,
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
          location.reload!
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
        <Table bordered>
          <thead>
            <tr>
              <th className='text-center'>商品・サービス名</th>
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
      </Container>}
      {allowReadSales === 'Forbid' && <Unauthorized />}
    </MerchantUserAdminLayout>
  )
}

export default Index
