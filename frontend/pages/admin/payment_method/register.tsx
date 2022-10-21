import { NextPage } from 'next'
import React from 'react'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import RegisterMerchantCardForm from 'components/templates/RegisterMerchantCardForm'
import {loadStripe} from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

const stripePromise = loadStripe(String(process.env.STRIPE_PUBLISHABLE_KEY))

const Register: NextPage = () => {
  return (
    <>
      <MerchantUserAdminLayout>
        <br/>
        <br/>
        <Elements stripe={stripePromise}>
          <RegisterMerchantCardForm />
        </Elements>
      </MerchantUserAdminLayout>
    </>
  )
}

export default Register
