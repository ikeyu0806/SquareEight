import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { Container, Table } from 'react-bootstrap'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { StripePaymentIntentsParam } from 'interfaces/StripePaymentIntentsParam'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'

const Index: NextPage = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const [stripePaymentIntents, setStripePaymentIntents] = useState<StripePaymentIntentsParam[]>()

  useEffect(() => {
    axios.get(`${process.env.BACKEND_URL}/api/internal/account/customers/${router.query.public_id}/charges`,
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
  }, [router.query.public_id, dispatch, cookies._square_eight_merchant_session])


  return (
    <>
      <MerchantUserAdminLayout>
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
      </MerchantUserAdminLayout>
    </>
  )
}

export default Index
