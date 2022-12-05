import React, { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import CreateProductTemplate from 'components/templates/CreateProductTemplate'
import GuideStripeAccountRegister from 'components/templates/GuideStripeAccountRegister'
import { Button } from 'react-bootstrap'
import { RootState } from 'redux/store'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import { swalWithBootstrapButtons } from 'constants/swalWithBootstrapButtons'
import { useDispatch } from 'react-redux'
import { publishStatusChanged } from 'redux/productSlice'
import Unauauthorized from 'components/templates/Unauauthorized'

const New: NextPage = () => {
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const router = useRouter()
  const [errMessage, setErrMessage] = useState('')
  const name = useSelector((state: RootState) => state.product.name)
  const price = useSelector((state: RootState) => state.product.price)
  const description = useSelector((state: RootState) => state.product.description)
  const taxRate = useSelector((state: RootState) => state.product.taxRate)
  const inventory = useSelector((state: RootState) => state.product.inventory)
  const publishStatus = useSelector((state: RootState) => state.product.publishStatus)
  const base64Image = useSelector((state: RootState) => state.product.base64Image)
  const applyProductType = useSelector((state: RootState) => state.product.applyProductType)
  const productTypes = useSelector((state: RootState) => state.product.productTypes)
  const prefectureDeliveryCharges = useSelector((state: RootState) => state.product.prefectureDeliveryCharges)
  const deliveryChargeType = useSelector((state: RootState) => state.product.deliveryChargeType)
  const flatRateDeliveryCharge = useSelector((state: RootState) => state.product.flatRateDeliveryCharge)
  const deliveryChargeWithOrderNumber = useSelector((state: RootState) => state.product.deliveryChargeWithOrderNumber)
  const allowCreateProduct = useSelector((state: RootState) => state.merchantUserPermission.allowCreateProduct)
  const stripeAccountEnable = useSelector((state: RootState) => state.currentMerchantUser.stripeAccountEnable)

  useEffect(() => {
    dispatch(publishStatusChanged('Unpublish'))
  }, [dispatch])

  const createProduct = () => {
    if (name === '') {
      setErrMessage('商品名を入力してください')
      return
    }
    if (applyProductType) {
      productTypes.map(p => {
        if (p.name === '') {
          setErrMessage('在庫種類を入力してください')
          return
        }
      })
    }

    axios.post(`${process.env.BACKEND_URL}/api/internal/products`,
    {
      product: {
        name: name,
        price: price,
        description: description,
        tax_rate: taxRate,
        inventory: inventory,
        publish_status: publishStatus,
        base64_image: base64Image,
        product_types: applyProductType ? productTypes : [],
        prefecture_delivery_charges: prefectureDeliveryCharges,
        delivery_charge_type: deliveryChargeType,
        flat_rate_delivery_charge: flatRateDeliveryCharge,
        delivery_charge_with_order_number: deliveryChargeWithOrderNumber
      }
    },
    {
      headers: {
        'Session-Id': cookies._square_eight_merchant_session
      }
    }).then(response => {
      swalWithBootstrapButtons.fire({
        title: '送信しました',
        icon: 'info'
      })
      router.push('/admin/product')
    }).catch(error => {
      swalWithBootstrapButtons.fire({
        title: '送信失敗しました',
        icon: 'error'
      })
    })
  }

  return (
    <>
      <MerchantUserAdminLayout>
        {stripeAccountEnable === 'Enable' && allowCreateProduct == 'Allow' &&
        <>
          <CreateProductTemplate></CreateProductTemplate>
          <div className='text-center'>
            <Button onClick={createProduct}>登録する</Button>
          </div>
          <div className='text-center mt20 color-red'>
            {errMessage}
          </div>
        </>}
        {stripeAccountEnable === 'Disable' && <GuideStripeAccountRegister></GuideStripeAccountRegister>}
        {allowCreateProduct === 'Forbid' && <Unauauthorized />}
      </MerchantUserAdminLayout>
    </>
  )
}

export default New
