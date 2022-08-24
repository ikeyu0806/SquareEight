import { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { Container, Table } from 'react-bootstrap'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { StripePaymentIntentsParam } from 'interfaces/StripePaymentIntentsParam'
import { useCookies } from 'react-cookie'

const Index: NextPage = () => {
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const [stripePaymentIntents, setStripePaymentIntents] = useState<StripePaymentIntentsParam[]>()

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
      <Container>

      </Container>
    </MerchantUserAdminLayout>
  )
}

export default Index
