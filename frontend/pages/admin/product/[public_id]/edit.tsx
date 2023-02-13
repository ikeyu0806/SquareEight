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
import Unauthorized from 'components/templates/Unauthorized'
import {  nameChanged,
          priceChanged,
          taxRateChanged,
          inventoryChanged,
          descriptionChanged,
          productTypesChanged,
          deliveryChargeTypeChanged,
          flatRateDeliveryChargeChange,
          publishStatusChanged,
          prefectureDeliveryChargesChange,
          deliveryChargeWithOrderNumberChanged,
          deliveryDatetimeTargetFlgChanged,
          showProductTypeFormChanged,
          selectedShopIdsChanged,
          productImage1ImagePublicUrlChanged,
          productImage2ImagePublicUrlChanged,
          productImage3ImagePublicUrlChanged,
          productImage4ImagePublicUrlChanged,
          productImage5ImagePublicUrlChanged, } from 'redux/productSlice'

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
  const publishStatus = useSelector((state: RootState) => state.product.publishStatus)
  const applyProductType = useSelector((state: RootState) => state.product.applyProductType)
  const productTypes = useSelector((state: RootState) => state.product.productTypes)
  const prefectureDeliveryCharges = useSelector((state: RootState) => state.product.prefectureDeliveryCharges)
  const deliveryChargeType = useSelector((state: RootState) => state.product.deliveryChargeType)
  const flatRateDeliveryCharge = useSelector((state: RootState) => state.product.flatRateDeliveryCharge)
  const deliveryChargeWithOrderNumber = useSelector((state: RootState) => state.product.deliveryChargeWithOrderNumber)
  const deliveryDatetimeTargetFlg = useSelector((state: RootState) => state.product.deliveryDatetimeTargetFlg)
  const allowUpdateProduct = useSelector((state: RootState) => state.merchantUserPermission.allowUpdateProduct)
  const stripeAccountEnable = useSelector((state: RootState) => state.currentMerchantUser.stripeAccountEnable)
  const shops = useSelector((state: RootState) => state.account.shops)
  const productImage1File = useSelector((state: RootState) => state.product.productImage1File)
  const productImage2File = useSelector((state: RootState) => state.product.productImage2File)
  const productImage3File = useSelector((state: RootState) => state.product.productImage3File)
  const productImage4File = useSelector((state: RootState) => state.product.productImage4File)
  const productImage5File = useSelector((state: RootState) => state.product.productImage5File)

  useEffect(() => {
    const fetchProduct = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/products/${router.query.public_id}`, {
          headers: {
            'Session-Id': cookies._square_eight_merchant_session
          }
        }
      )
      .then(function (response) {
        console.log(response.data)
        dispatch(nameChanged(response.data.product.name))
        dispatch(priceChanged(response.data.product.price))
        dispatch(taxRateChanged(response.data.product.tax_rate))
        dispatch(inventoryChanged(response.data.product.inventory))
        dispatch(descriptionChanged(response.data.product.description))
        dispatch(productTypesChanged(response.data.product.product_types))
        dispatch(showProductTypeFormChanged(response.data.product.show_product_type_form))
        dispatch(deliveryChargeTypeChanged(response.data.product.delivery_charge_type))
        dispatch(prefectureDeliveryChargesChange(response.data.product.shipping_fee_per_regions))
        dispatch(publishStatusChanged(response.data.product.publish_status))
        dispatch(flatRateDeliveryChargeChange(response.data.product.flat_rate_delivery_charge))
        dispatch(deliveryChargeWithOrderNumberChanged(response.data.product.delivery_charge_with_order_number))
        dispatch(deliveryDatetimeTargetFlgChanged(response.data.product.delivery_datetime_target_flg))
        dispatch(selectedShopIdsChanged(response.data.product.selected_shop_ids))
        dispatch(productImage1ImagePublicUrlChanged(response.data.product.image1_account_s3_image_public_url))
        dispatch(productImage2ImagePublicUrlChanged(response.data.product.image2_account_s3_image_public_url))
        dispatch(productImage3ImagePublicUrlChanged(response.data.product.image3_account_s3_image_public_url))
        dispatch(productImage4ImagePublicUrlChanged(response.data.product.image4_account_s3_image_public_url))
        dispatch(productImage5ImagePublicUrlChanged(response.data.product.image5_account_s3_image_public_url))
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchProduct()
  }, [cookies._square_eight_merchant_session, router.query.public_id, dispatch])


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
  
    axios.post(`${process.env.BACKEND_URL}/api/internal/products/${router.query.public_id}/update`,
    params,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
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
        <br />
        {stripeAccountEnable === 'Enable' && allowUpdateProduct === 'Allow' &&
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
        {allowUpdateProduct === 'Forbid' && <Unauthorized />}
      </MerchantUserAdminLayout>
    </>
  )
}

export default Edit
