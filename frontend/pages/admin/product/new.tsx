import React from 'react'
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

const New: NextPage = () => {
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_gybuilder_merchant_session'])
  const router = useRouter()
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

  const createProduct = () => {
    axios.post(`${process.env.BACKEND_URL}/api/internal/products`,
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
      dispatch(alertChanged({message: '登録しました', show: true}))
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
            <Button onClick={createProduct}>登録する</Button>
          </div>
        </>}
        {stripeAccountEnable === 'Disable' && <GuideStripeAccountRegister></GuideStripeAccountRegister>}
      </MerchantUserAdminLayout>
    </>
  )
}

export default New
