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
import { ProductParam } from 'interfaces/ProductParam'
import { alertChanged } from 'redux/alertSlice'
import {  nameChanged,
          priceChanged,
          taxRateChanged,
          inventoryChanged,
          descriptionChanged,
          s3ObjectPublicUrlChanged } from 'redux/productSlice'

const Edit: NextPage = () => {
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_gybuilder_merchant_session'])
  const router = useRouter()
  const [errMessage, setErrMessage] = useState('')
  const name = useSelector((state: RootState) => state.product.name)
  const price = useSelector((state: RootState) => state.product.price)
  const description = useSelector((state: RootState) => state.product.description)
  const taxRate = useSelector((state: RootState) => state.product.taxRate)
  const inventory = useSelector((state: RootState) => state.product.inventory)
  const base64Image = useSelector((state: RootState) => state.product.base64Image)
  const s3ObjectPublicUrl = useSelector((state: RootState) => state.product.s3ObjectPublicUrl)
  const applyProductType = useSelector((state: RootState) => state.product.applyProductType)
  const productTypes = useSelector((state: RootState) => state.product.productTypes)
  const stripeAccountEnable = useSelector((state: RootState) => state.currentMerchantUser.stripeAccountEnable)

  useEffect(() => {
    const fetchProduct = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/products/${router.query.id}`, {
          headers: {
            'Session-Id': cookies._gybuilder_merchant_session
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
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchProduct()
  }, [cookies._gybuilder_merchant_session, router.query.id, dispatch])


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
        base64_image: base64Image,
        product_types: applyProductType ? productTypes : []
      }
    },
    {
      headers: {
        'Session-Id': cookies._gybuilder_merchant_session
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
          <CreateProductTemplate></CreateProductTemplate>
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
