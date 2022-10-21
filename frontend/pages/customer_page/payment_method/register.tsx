import { NextPage } from 'next'
import React from 'react'
import EndUserLoginLayout from 'components/templates/EndUserLoginLayout'
import RegisterEndUserCardForm from 'components/templates/RegisterEndUserCardForm'
import {loadStripe} from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

const stripePromise = loadStripe(String(process.env.STRIPE_PUBLISHABLE_KEY))

const Register: NextPage = () => {
  return (
    <>
      <EndUserLoginLayout>
        <br/>
        <br/>
        <Elements stripe={stripePromise}>
          <RegisterEndUserCardForm />
        </Elements>
      </EndUserLoginLayout>
    </>
  )
}

export default Register
