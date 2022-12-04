import { NextPage } from 'next'
import React from 'react'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import RegisterMerchantCardForm from 'components/templates/RegisterMerchantCardForm'
import {loadStripe} from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { useSelector } from 'react-redux'
import { RootState } from 'redux/store'

const stripePromise = loadStripe(String(process.env.STRIPE_PUBLISHABLE_KEY))

const Register: NextPage = () => {
  const allowUpdateCreditCard = useSelector((state: RootState) => state.merchantUserPermission.allowUpdateCreditCard)

  return (
    <>
      <MerchantUserAdminLayout>
        <br/>
        <br/>
        {allowUpdateCreditCard === 'Allow' && <Elements stripe={stripePromise}>
          <RegisterMerchantCardForm />
        </Elements>}
      </MerchantUserAdminLayout>
    </>
  )
}

export default Register
