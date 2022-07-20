import { NextPage } from 'next'
import React from 'react'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import RegisterMerchantCardForm from 'components/templates/RegisterMerchantCardForm'
import {loadStripe} from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

const stripePromise = loadStripe('pk_test_pzo8bTj4ggDEV52y7gnVsdWt')

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
