import { NextPage } from 'next'
import React from 'react'
import EndUserLoginLayout from 'components/templates/EndUserLoginLayout'
import RegisterMerchantCardForm from 'components/templates/RegisterMerchantCardForm'
import {loadStripe} from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

const stripePromise = loadStripe('pk_test_pzo8bTj4ggDEV52y7gnVsdWt')

const Register: NextPage = () => {
  return (
    <>
      <EndUserLoginLayout>
        <br/>
        <br/>
        <Elements stripe={stripePromise}>
          <RegisterMerchantCardForm />
        </Elements>
      </EndUserLoginLayout>
    </>
  )
}

export default Register
