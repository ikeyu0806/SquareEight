import { NextPage } from 'next'
import React from 'react'
import AdminNavbar from '../../../components/templates/AdminNavbarTemplate'
import RegularFooter from '../../../components/organisms/RegularFooter'
import {loadStripe} from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from '../../../components/templates/CheckoutForm'


const Register: NextPage = () => {
  const stripePromise = loadStripe('pk_live_urOT8mGZEiw7p17v4U9rGn7L')
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
