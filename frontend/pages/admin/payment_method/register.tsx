import { NextPage } from 'next'
import React from 'react'
import AdminNavbar from '../../../components/templates/AdminNavbarTemplate'
import RegularFooter from '../../../components/organisms/RegularFooter'
import CheckoutForm from '../../../components/templates/CheckoutForm'


const Register: NextPage = () => {
  return (
    <>
      <AdminNavbar></AdminNavbar>
        <br/>
        <br/>
        <CheckoutForm />
      <RegularFooter></RegularFooter>
    </>
  )
}

export default Register
