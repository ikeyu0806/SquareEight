import { NextPage } from 'next'
import React from 'react'
import AdminNavbar from '../../../components/templates/AdminNavbarTemplate'
import RegularFooter from '../../../components/organisms/RegularFooter'
import CheckoutForm from '../../../components/templates/CheckoutForm'
import {loadStripe} from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

const stripePromise = loadStripe('pk_test_pzo8bTj4ggDEV52y7gnVsdWt')

const Register: NextPage = () => {
  return (
    <>
      <AdminNavbar></AdminNavbar>
        <br/>
        <br/>
        <Elements stripe={stripePromise}>     
          <CheckoutForm />
        </Elements>
      <RegularFooter></RegularFooter>
    </>
  )
}

export default Register
