import { NextPage } from 'next'
import React from 'react'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import RegisterMerchantInfoForm from 'components/templates/RegisterMerchantInfoForm'
import {loadStripe} from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import Unauauthorized from 'components/templates/Unauauthorized'

const stripePromise = loadStripe(String(process.env.STRIPE_PUBLISHABLE_KEY))

const Register: NextPage = () => {
  const allowUpdateStripeBusinessInfo = useSelector((state: RootState) => state.merchantUserPermission.allowUpdateStripeBusinessInfo)

  return (
    <>
      <MerchantUserAdminLayout>
        {allowUpdateStripeBusinessInfo === 'Allow' && <Elements stripe={stripePromise}>
          <RegisterMerchantInfoForm />
        </Elements>}
        {allowUpdateStripeBusinessInfo === 'Forbid' && <Unauauthorized />}
      </MerchantUserAdminLayout>
    </>
  )
}

export default Register
