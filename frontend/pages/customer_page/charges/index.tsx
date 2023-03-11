import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { Container, Table, Button } from 'react-bootstrap'
import EndUserLoginLayout from 'components/templates/EndUserLoginLayout'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { StripePaymentIntentsParam } from 'interfaces/StripePaymentIntentsParam'
import { useCookies } from 'react-cookie'

const Index: NextPage = () => {
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_square_eight_end_user_session'])
  const [stripePaymentIntents, setStripePaymentIntents] = useState<StripePaymentIntentsParam[]>()

  useEffect(() => {
    axios.get(`${process.env.BACKEND_URL}/api/internal/end_users/stripe_payment_history`,
    {
      headers: {
        'Session-Id': cookies._square_eight_end_user_session
      }
    }).then((response) => {
      console.log(response.data.stripe_payment_intents)
      setStripePaymentIntents(response.data.stripe_payment_intents)
    }).catch((error) => {
      console.log(error)
    })
  }, [dispatch, cookies._square_eight_end_user_session])


  return (
    <>
      <EndUserLoginLayout>
        <Container className='mt20'>
          {stripePaymentIntents && stripePaymentIntents.length > 0 &&
          <Table bordered>
            <thead>
              <tr>
                <th className='text-center'>商品名</th>
                <th className='text-center'>購入先</th>
                <th className='text-center'>料金</th>
                <th className='text-center'>購入日</th>
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
          {stripePaymentIntents && stripePaymentIntents.length === 0 &&
            <div className='text-center font-size-25'>お支払い履歴がありません</div>}
        </Container>
      </EndUserLoginLayout>
    </>
  )
}

export default Index
