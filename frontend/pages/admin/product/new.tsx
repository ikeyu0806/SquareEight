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
import Unauthorized from 'components/templates/Unauthorized'

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
  const applyProductType = useSelector((state: RootState) => state.product.applyProductType)
  const productTypes = useSelector((state: RootState) => state.product.productTypes)
  const prefectureDeliveryCharges = useSelector((state: RootState) => state.product.prefectureDeliveryCharges)
  const deliveryChargeType = useSelector((state: RootState) => state.product.deliveryChargeType)
  const flatRateDeliveryCharge = useSelector((state: RootState) => state.product.flatRateDeliveryCharge)
  const deliveryChargeWithOrderNumber = useSelector((state: RootState) => state.product.deliveryChargeWithOrderNumber)
  const allowCreateProduct = useSelector((state: RootState) => state.merchantUserPermission.allowCreateProduct)
  const stripeAccountEnable = useSelector((state: RootState) => state.currentMerchantUser.stripeAccountEnable)
  const shops = useSelector((state: RootState) => state.account.shops)
  const productImage1File = useSelector((state: RootState) => state.product.productImage1File)
  const productImage2File = useSelector((state: RootState) => state.product.productImage2File)
  const productImage3File = useSelector((state: RootState) => state.product.productImage3File)
  const productImage4File = useSelector((state: RootState) => state.product.productImage4File)
  const productImage5File = useSelector((state: RootState) => state.product.productImage5File)

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

    const params = new FormData()
    let product_param = JSON.stringify({
      product: {
        name: name,
        price: price,
        description: description,
        tax_rate: taxRate,
        inventory: inventory,
        publish_status: publishStatus,
        product_types: applyProductType ? productTypes : [],
        prefecture_delivery_charges: prefectureDeliveryCharges,
        delivery_charge_type: deliveryChargeType,
        flat_rate_delivery_charge: flatRateDeliveryCharge,
        delivery_charge_with_order_number: deliveryChargeWithOrderNumber,
        shops: shops
      }
    })
    params.append('product', product_param)
    params.append('product_image1_file', productImage1File as Blob)
    params.append('product_image2_file', productImage2File as Blob)
    params.append('product_image3_file', productImage3File as Blob)
    params.append('product_image4_file', productImage4File as Blob)
    params.append('product_image5_file', productImage5File as Blob)

    axios.post(`${process.env.BACKEND_URL}/api/internal/products`,
    params,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
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
        <br />
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
        {allowCreateProduct === 'Forbid' && <Unauthorized />}
      </MerchantUserAdminLayout>
    </>
  )
}

export default New
