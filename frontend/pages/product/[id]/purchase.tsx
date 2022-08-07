import React, { useEffect } from 'react'
import type { NextPage } from 'next'
import { Container, Row, Col, Card, ListGroup, Button } from 'react-bootstrap'
import MerchantCustomLayout from 'components/templates/MerchantCustomLayout'
import { useSelector } from 'react-redux'
import { useCookies } from 'react-cookie'
import { RootState } from 'redux/store'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { ProductParam } from 'interfaces/ProductParam'
import { swalWithBootstrapButtons } from 'constants/swalWithBootstrapButtons'
import { alertChanged } from 'redux/alertSlice'
import { loginStatusChanged, paymentMethodsChanged, defaultPaymentMethodIdChanged } from 'redux/currentEndUserSlice'
import { nameChanged,
         priceChanged,
         taxRateChanged,
         inventoryChanged,
         descriptionChanged,
         s3ObjectPublicUrlChanged } from 'redux/productSlice'

const Purchase: NextPage = () => {
  const [cookies] = useCookies(['_gybuilder_end_user_session'])
  const currentEndUserLogintStatus = useSelector((state: RootState) => state.currentEndUser.loginStatus)
  const defaultPaymentMethodId = useSelector((state: RootState) => state.currentEndUser.defaultPaymentMethodId)
  const paymentMethods = useSelector((state: RootState) => state.currentEndUser.paymentMethods)
  const dispatch = useDispatch()
  const router = useRouter()

  useEffect(() => {
    const fetchTicketMaster = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/products/${router.query.id}/purchase_info`, {
          headers: {
            'Session-Id': cookies._gybuilder_end_user_session
          }
        }
      )
      .then(function (response) {
        const productResponse: ProductParam = response.data.product
        dispatch(nameChanged(productResponse.name))
        dispatch(priceChanged(productResponse.price))
        dispatch(taxRateChanged(productResponse.tax_rate))
        dispatch(inventoryChanged(productResponse.inventory))
        dispatch(descriptionChanged(productResponse.description))
        dispatch(s3ObjectPublicUrlChanged(productResponse.s3_object_public_url))
        dispatch(defaultPaymentMethodIdChanged(response.data.default_payment_method_id))
        dispatch(paymentMethodsChanged(response.data.payment_methods))
        dispatch(loginStatusChanged(response.data.login_status))
      })
      .catch(error => {
        dispatch(loginStatusChanged('Logout'))
        console.log(error)
      })
    }
    fetchTicketMaster()
  }, [cookies._gybuilder_end_user_session, router.query.id, router.query.ticket_master_id, dispatch])

  return (
    <MerchantCustomLayout>

    </MerchantCustomLayout>
  )
}

export default Purchase
