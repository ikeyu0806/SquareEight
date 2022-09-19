import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { Container, Table } from 'react-bootstrap'
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
        <Container>
          <Table bordered>
            <thead>
              <tr>
                <th className='text-center'>商品名</th>
                <th className='text-center'>購入先</th>
                <th className='text-center'>料金</th>
                <th className='text-center'>購入日</th>
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
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </Container>
      </EndUserLoginLayout>
    </>
  )
}

export default Index
