import { NextPage } from 'next'
import React from 'react'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import RegisterMerchantInfoForm from 'components/templates/RegisterMerchantInfoForm'
import {loadStripe} from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

const stripePromise = loadStripe(String(process.env.STRIPE_PUBLISHABLE_KEY))

const Register: NextPage = () => {
  return (
    <>
      <MerchantUserAdminLayout>
        <Elements stripe={stripePromise}>
          <RegisterMerchantInfoForm />
        </Elements>
      </MerchantUserAdminLayout>
    </>
  )
}

export default Register
