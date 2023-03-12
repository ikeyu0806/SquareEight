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
                    <span className='badge bg-info text-white'>物販商品</span>
                  </td>
                  <td className='text-center'>{payment.customer_fullname}</td>
                  <td className='text-center'>￥{payment.amount}</td>
                  <td className='text-center'>{payment.order_date}</td>
                  <td className='text-center'><a className='btn btn-sm btn-danger'>返金</a></td>
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
