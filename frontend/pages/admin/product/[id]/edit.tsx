import React, { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import CreateProductTemplate from 'components/templates/CreateProductTemplate'
import GuideStripeAccountRegister from 'components/templates/GuideStripeAccountRegister'
import { Button } from 'react-bootstrap'
import { RootState } from 'redux/store'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import { alertChanged } from 'redux/alertSlice'
import {  nameChanged,
          priceChanged,
          taxRateChanged,
          inventoryChanged,
          descriptionChanged,
          productTypesChanged,
          s3ObjectPublicUrlChanged,
          deliveryChargeTypeChanged,
          flatRateDeliveryChargeChange,
          prefectureDeliveryChargesChange,
          deliveryChargeWithOrderNumberChanged,
          deliveryDatetimeTargetFlgChanged,
          showProductTypeFormChanged } from 'redux/productSlice'

const Edit: NextPage = () => {
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const router = useRouter()
  const [errMessage, setErrMessage] = useState('')
  const name = useSelector((state: RootState) => state.product.name)
  const price = useSelector((state: RootState) => state.product.price)
  const description = useSelector((state: RootState) => state.product.description)
  const taxRate = useSelector((state: RootState) => state.product.taxRate)
  const inventory = useSelector((state: RootState) => state.product.inventory)
  const base64Image = useSelector((state: RootState) => state.product.base64Image)
  const publishStatus = useSelector((state: RootState) => state.product.publishStatus)
  const applyProductType = useSelector((state: RootState) => state.product.applyProductType)
  const productTypes = useSelector((state: RootState) => state.product.productTypes)
  const prefectureDeliveryCharges = useSelector((state: RootState) => state.product.prefectureDeliveryCharges)
  const deliveryChargeType = useSelector((state: RootState) => state.product.deliveryChargeType)
  const flatRateDeliveryCharge = useSelector((state: RootState) => state.product.flatRateDeliveryCharge)
  const deliveryChargeWithOrderNumber = useSelector((state: RootState) => state.product.deliveryChargeWithOrderNumber)
  const deliveryDatetimeTargetFlg = useSelector((state: RootState) => state.product.deliveryDatetimeTargetFlg)

  const stripeAccountEnable = useSelector((state: RootState) => state.currentMerchantUser.stripeAccountEnable)

  useEffect(() => {
    const fetchProduct = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/products/${router.query.id}`, {
          headers: {
            'Session-Id': cookies._square_eight_merchant_session
          }
        }
      )
      .then(function (response) {
        dispatch(nameChanged(response.data.product.name))
        dispatch(priceChanged(response.data.product.price))
        dispatch(taxRateChanged(response.data.product.tax_rate))
        dispatch(inventoryChanged(response.data.product.inventory))
        dispatch(descriptionChanged(response.data.product.description))
        dispatch(s3ObjectPublicUrlChanged(response.data.product.s3_object_public_url))
        dispatch(productTypesChanged(response.data.product.product_types))
        dispatch(showProductTypeFormChanged(response.data.product.show_product_type_form))
        dispatch(deliveryChargeTypeChanged(response.data.product.delivery_charge_type))
        dispatch(prefectureDeliveryChargesChange(response.data.product.shipping_fee_per_regions))
        dispatch(flatRateDeliveryChargeChange(response.data.product.flat_rate_delivery_charge))
        dispatch(deliveryChargeWithOrderNumberChanged(response.data.product.delivery_charge_with_order_number))
        dispatch(deliveryDatetimeTargetFlgChanged(response.data.product.delivery_datetime_target_flg))
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchProduct()
  }, [cookies._square_eight_merchant_session, router.query.id, dispatch])


  const updateProduct = () => {
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
    axios.post(`${process.env.BACKEND_URL}/api/internal/products/${router.query.id}/update`,
    {
      product: {
        name: name,
        price: price,
        description: description,
        tax_rate: taxRate,
        inventory: inventory,
        publish_tatus: publishStatus,
        base64_image: base64Image,
        product_types: applyProductType ? productTypes : [],
        prefecture_delivery_charges: prefectureDeliveryCharges,
        delivery_charge_type: deliveryChargeType,
        flat_rate_delivery_charge: flatRateDeliveryCharge,
        delivery_charge_with_order_number: deliveryChargeWithOrderNumber,
        delivery_datetime_target_flg: deliveryDatetimeTargetFlg
      }
    },
    {
      headers: {
        'Session-Id': cookies._square_eight_merchant_session
      }
    }).then(response => {
      dispatch(alertChanged({message: '更新しました', show: true}))
      router.push('/admin/product')
    }).catch(error => {
    })
  }

  return (
    <>
      <MerchantUserAdminLayout>
        {stripeAccountEnable === 'Enable' &&
        <>
          <CreateProductTemplate showDeleteButton={true}></CreateProductTemplate>
          <div className='text-center'>
            <Button onClick={updateProduct}>登録する</Button>
          </div>
          <div className='text-center mt20 color-red'>
            {errMessage}
          </div>
        </>}
        {stripeAccountEnable === 'Disable' && <GuideStripeAccountRegister></GuideStripeAccountRegister>}
      </MerchantUserAdminLayout>
    </>
  )
}

export default Edit
