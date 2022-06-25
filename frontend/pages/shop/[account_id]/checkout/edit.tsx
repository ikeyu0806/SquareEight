import type { NextPage } from 'next'
import {loadStripe} from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import ShopCheckoutEdit from 'components/templates/ShopCheckoutEdit'

const Edit: NextPage = () => {
  const stripePromise = loadStripe('pk_test_pzo8bTj4ggDEV52y7gnVsdWt')

  return (
    <>
    <Elements stripe={stripePromise}>
      <ShopCheckoutEdit></ShopCheckoutEdit>
    </Elements>
    </>
  )
}

export default Edit
