import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { Container, Table } from 'react-bootstrap'
import EndUserLoginLayout from 'components/templates/EndUserLoginLayout'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { StripeSubscriptionsParam } from 'interfaces/StripeSubscriptionsParam'
import { useCookies } from 'react-cookie'

const Index: NextPage = () => {
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_gybuilder_end_user_session'])
  const [stripeSubscriptions, setStripeSubscriptions] = useState<StripeSubscriptionsParam[]>()

  useEffect(() => {
    axios.get(`${process.env.BACKEND_URL}/api/internal/end_users/subscription_lists`,
    {
      headers: {
        'Session-Id': cookies._gybuilder_end_user_session
      }
    }).then((response) => {
      setStripeSubscriptions(response.data.stripe_payment_subscriptions)
    }).catch((error) => {
      console.log(error)
    })
  }, [dispatch, cookies._gybuilder_end_user_session])


  return (
    <>
      <EndUserLoginLayout>
        <Container>
          <h3>加入プラン</h3>
          <Table bordered>
          <thead>
            <tr>
              <th className='text-center'>プラン名</th>
              <th className='text-center'>購入先</th>
            </tr>
          </thead>
          <tbody>
            {stripeSubscriptions && stripeSubscriptions.map((subscription, i) => {
              return (
                <tr key={i}>
                  <td className='text-center'>{subscription.metadata.name}</td>
                  <td className='text-center'>{subscription.metadata.account_business_name}</td>
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
