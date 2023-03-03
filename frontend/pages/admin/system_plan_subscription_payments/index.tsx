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
  const allowReadSystemPlanSubscriptionPayments = useSelector((state: RootState) => state.merchantUserPermission.allowReadSystemPlanSubscriptionPayments)

  useEffect(() => {
    axios.get(`${process.env.BACKEND_URL}/api/internal/account/stripe_payment_intents/system_plan_subscription_payments`,
    {
      headers: {
        'Session-Id': cookies._square_eight_merchant_session
      }
    }).then((response) => {
      console.log(response.data.stripe_payment_intents)
      setStripePaymentIntents(response.data.system_plan_subscription_payments)
    }).catch((error) => {
      console.log(error)
    })
  }, [dispatch, cookies._square_eight_merchant_session])

  return (
    <MerchantUserAdminLayout>
      <br />
      {allowReadSystemPlanSubscriptionPayments === 'Allow' && <Container>
        <h4>お支払い履歴</h4>
        <Table bordered>
          <thead>
            <tr>
              <th className='text-center'>プラン名</th>
              <th className='text-center'>お支払い金額</th>
              <th className='text-center'>加入日</th>
            </tr>
          </thead>
          <tbody>
            {stripePaymentIntents && stripePaymentIntents.map((payment, i) => {
              return (
                <tr key={i}>
                  <td className='text-center'>{payment.system_plan_name}</td>
                  <td className='text-center'>￥{payment.amount}</td>
                  <td className='text-center'>{payment.order_date}</td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </Container>}
      {allowReadSystemPlanSubscriptionPayments === 'Forbid' && <Unauthorized />}
    </MerchantUserAdminLayout>
  )
}

export default Index
