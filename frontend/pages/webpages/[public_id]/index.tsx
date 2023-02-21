import React, { useEffect } from 'react'
import type { NextPage } from 'next'
import axios from 'axios'
import { Container } from 'react-bootstrap'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'redux/store'
import { pageContentChanged, publishStatusChanged } from 'redux/webpageSlice'
import MerchantCustomLayout from 'components/templates/MerchantCustomLayout'
import RenderWebpage from 'components/organisms/RenderWebpage'
import {  navbarBrandTextChanged,
          navbarBrandTypeChanged,
          navbarBrandImageChanged,
          navbarBrandImagePublicUrlChanged,
          navbarBrandImageWidthChanged,
          navbarBrandImageHeightChanged,
          navbarBrandBackgroundColorChanged,
          navbarBrandVariantColorChanged,
          footerCopyRightTextChanged } from 'redux/sharedComponentSlice'

const Index: NextPage = () => {
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const router = useRouter()
  const pageContent = useSelector((state: RootState) => state.webpage.pageContent)
  const publishStatus = useSelector((state: RootState) => state.webpage.publishStatus)

  useEffect(() => {
    const fetchWebpage = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/webpages/${router.query.public_id}`, {
          headers: { 
            'Session-Id': cookies._square_eight_merchant_session
          },
        }
      )
      .then(function (response) {
        console.log(response.data)
        dispatch(pageContentChanged({blockContent: response.data.webpage.block_contents}))
        dispatch(publishStatusChanged(response.data.webpage.publish_status))
        dispatch((navbarBrandTextChanged(response.data.shared_component.navbar_brand_text)))
        dispatch((navbarBrandTypeChanged(response.data.shared_component.navbar_brand_type)))
        dispatch((navbarBrandImageChanged(response.data.shared_component.navbar_brand_image_s3_object_public_url)))
        dispatch(navbarBrandImagePublicUrlChanged(response.data.shared_component.navbar_image_account_s3_image_public_url))
        dispatch((navbarBrandImageWidthChanged(response.data.shared_component.nabvar_brand_image_width)))
        dispatch((navbarBrandImageHeightChanged(response.data.shared_component.nabvar_brand_image_height)))
        dispatch((navbarBrandBackgroundColorChanged(response.data.shared_component.navbar_brand_background_color)))
        dispatch((navbarBrandVariantColorChanged(response.data.shared_component.navbar_brand_variant_color)))
        dispatch((footerCopyRightTextChanged(response.data.shared_component.footer_copyright_text)))
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchWebpage()
  }, [router.query.public_id, cookies._square_eight_merchant_session, dispatch])

  return (
    <MerchantCustomLayout>
      <Container>
        &thinsp;
        {publishStatus === 'Publish' ? <RenderWebpage></RenderWebpage> : <div className='text-center'>非公開です</div>}
      </Container>
    </MerchantCustomLayout>
  )
}

export default Index
