import React, { useEffect } from 'react'
import type { NextPage } from 'next'
import { Container, Row, Col, Button } from 'react-bootstrap'
import CreateShop from 'components/templates/CreateShop'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'redux/store'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { swalWithBootstrapButtons } from 'constants/swalWithBootstrapButtons'
import Unauthorized from 'components/templates/Unauthorized'
import { nameChanged,
  phoneNumberChanged,
  description1Changed,
  description2Changed,
  description3Changed,
  description4Changed,
  description5Changed,
  description6Changed,
  postalCodeChanged,
  stateChanged,
  cityChanged,
  townChanged,
  line1Changed,
  line2Changed,
  accessInfoChanged,
  parkingLotGuidanceChanged,
  businessHoursTextChanged,
  remarksChanged,
  publishStatusChanged,
  shopImage1ImagePublicUrlChanged,
  shopImage2ImagePublicUrlChanged,
  shopImage3ImagePublicUrlChanged,
  shopImage4ImagePublicUrlChanged,
  shopImage5ImagePublicUrlChanged,
  shopImage6ImagePublicUrlChanged,
  reserveFrameInfoChanged,
  monthlyPatmentPlanInfoChanged,
  ticketMasterInfoChanged,
  productInfoChanged,
  selectedProductIdsChanged,
  selectedReserveFrameIdsChanged,
  selectedMonthlyPaymentPlanIdsChanged,
  selectedTicketMasterIdsChanged,
  selectedWebpageIdsChanged,
  selectedResourceIdsChanged,
  reserveFramesChanged,
  productsChanged,
  ticketMastersChanged,
  monthlyPaymentPlansChanged,
  webpagesChanged,
  resourcesChanged } from 'redux/shopSlice'
import {  navbarBrandTextChanged,
   navbarBrandTypeChanged,
   navbarBrandImageChanged,
   navbarBrandImageWidthChanged,
   navbarBrandImageHeightChanged,
   navbarBrandBackgroundColorChanged,
   navbarBrandVariantColorChanged,
   footerCopyRightTextChanged } from 'redux/sharedComponentSlice'

const Edit: NextPage = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [cookies] = useCookies(['_square_eight_merchant_session'])

  const name = useSelector((state: RootState) => state.shop.name)
  const phoneNumber = useSelector((state: RootState) => state.shop.phoneNumber)
  const description1 = useSelector((state: RootState) => state.shop.description1)
  const description2 = useSelector((state: RootState) => state.shop.description2)
  const description3 = useSelector((state: RootState) => state.shop.description3)
  const description4 = useSelector((state: RootState) => state.shop.description4)
  const description5 = useSelector((state: RootState) => state.shop.description5)
  const description6 = useSelector((state: RootState) => state.shop.description6)
  const remarks = useSelector((state: RootState) => state.shop.remarks)
  const publishStatus = useSelector((state: RootState) => state.shop.publishStatus)
  const postalCode = useSelector((state: RootState) => state.shop.postalCode)
  const state = useSelector((state: RootState) => state.shop.state)
  const city = useSelector((state: RootState) => state.shop.city)
  const town = useSelector((state: RootState) => state.shop.town)
  const line1 = useSelector((state: RootState) => state.shop.line1)
  const line2 = useSelector((state: RootState) => state.shop.line2)
  const accessInfo = useSelector((state: RootState) => state.shop.accessInfo)
  const businessHoursText = useSelector((state: RootState) => state.shop.businessHoursText)
  const parkingLotGuidance = useSelector((state: RootState) => state.shop.parkingLotGuidance)
  const shopImage1File = useSelector((state: RootState) => state.shop.shopImage1File)
  const shopImage2File = useSelector((state: RootState) => state.shop.shopImage2File)
  const shopImage3File = useSelector((state: RootState) => state.shop.shopImage3File)
  const shopImage4File = useSelector((state: RootState) => state.shop.shopImage4File)
  const shopImage5File = useSelector((state: RootState) => state.shop.shopImage5File)
  const shopImage6File = useSelector((state: RootState) => state.shop.shopImage6File)
  const selectedReserveFrameIds = useSelector((state: RootState) => state.shop.selectedReserveFrameIds)
  const selectedTicketMasterIds = useSelector((state: RootState) => state.shop.selectedTicketMasterIds)
  const selectedMonthlyPaymentPlanIds = useSelector((state: RootState) => state.shop.selectedMonthlyPaymentPlanIds)
  const selectedProductIds = useSelector((state: RootState) => state.shop.selectedProductIds)
  const selectedWebpageIds = useSelector((state: RootState) => state.shop.selectedWebpageIds)
  const selectedResourceIds = useSelector((state: RootState) => state.shop.selectedResourceIds)
  const allowUpdateShop = useSelector((state: RootState) => state.merchantUserPermission.allowUpdateShop)

  useEffect(() => {
    const fetchShop = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/shops/${router.query.public_id}`, {
          headers: { 
            'Session-Id': cookies._square_eight_merchant_session
          },
        }
      )
      .then(function (response) {
        dispatch(nameChanged(response.data.shop.name))
        dispatch(phoneNumberChanged(response.data.shop.phone_number))
        dispatch(description1Changed(response.data.shop.description1))
        dispatch(description2Changed(response.data.shop.description2))
        dispatch(description3Changed(response.data.shop.description3))
        dispatch(description4Changed(response.data.shop.description4))
        dispatch(description5Changed(response.data.shop.description5))
        dispatch(description6Changed(response.data.shop.description6))
        dispatch(postalCodeChanged(response.data.shop.postal_code))
        dispatch(stateChanged(response.data.shop.state))
        dispatch(cityChanged(response.data.shop.city))
        dispatch(townChanged(response.data.shop.town))
        dispatch(line1Changed(response.data.shop.line1))
        dispatch(line2Changed(response.data.shop.line2))
        dispatch(accessInfoChanged(response.data.shop.access_info))
        dispatch(parkingLotGuidanceChanged(response.data.shop.parking_lot_guidance))
        dispatch(businessHoursTextChanged(response.data.shop.business_hours_text))
        dispatch(remarksChanged(response.data.shop.remarks))
        dispatch(publishStatusChanged(response.data.shop.publish_status))
        dispatch(shopImage1ImagePublicUrlChanged(response.data.shop.shop_image1_public_url))
        dispatch(shopImage2ImagePublicUrlChanged(response.data.shop.shop_image2_public_url))
        dispatch(shopImage3ImagePublicUrlChanged(response.data.shop.shop_image3_public_url))
        dispatch(shopImage4ImagePublicUrlChanged(response.data.shop.shop_image4_public_url))
        dispatch(shopImage5ImagePublicUrlChanged(response.data.shop.shop_image5_public_url))
        dispatch(shopImage6ImagePublicUrlChanged(response.data.shop.shop_image6_public_url))
        dispatch(reserveFrameInfoChanged(response.data.shop.reserve_frames_info))
        dispatch(monthlyPatmentPlanInfoChanged(response.data.shop.monthly_payment_plans_info))
        dispatch(ticketMasterInfoChanged(response.data.shop.ticket_masters_info))
        dispatch(productInfoChanged(response.data.shop.products_info))
        dispatch(selectedProductIdsChanged(response.data.shop.selected_product_ids))
        dispatch(selectedReserveFrameIdsChanged(response.data.shop.selected_reserve_frame_ids))
        dispatch(selectedMonthlyPaymentPlanIdsChanged(response.data.shop.selected_monthly_payment_plan_ids))
        dispatch(selectedTicketMasterIdsChanged(response.data.shop.selected_ticket_master_ids))
        dispatch(selectedWebpageIdsChanged(response.data.shop.selected_webpage_ids))
        dispatch(selectedResourceIdsChanged(response.data.shop.selected_resource_ids))
        dispatch(reserveFramesChanged(response.data.reserve_frames))
        dispatch(productsChanged(response.data.products))
        dispatch(ticketMastersChanged(response.data.ticket_masters))
        dispatch(monthlyPaymentPlansChanged(response.data.monthly_payment_plans))
        dispatch(webpagesChanged(response.data.webpages))
        dispatch(resourcesChanged(response.data.resources))
        // ヘッダ、フッタ
        dispatch(navbarBrandTextChanged(response.data.shared_component.navbar_brand_text))
        dispatch(navbarBrandTypeChanged(response.data.shared_component.navbar_brand_type))
        dispatch(navbarBrandImageChanged(response.data.shared_component.navbar_brand_image_s3_object_public_url))
        dispatch(navbarBrandImageWidthChanged(response.data.shared_component.nabvar_brand_image_width))
        dispatch(navbarBrandImageHeightChanged(response.data.shared_component.nabvar_brand_image_height))
        dispatch(navbarBrandBackgroundColorChanged(response.data.shared_component.navbar_brand_background_color))
        dispatch(navbarBrandVariantColorChanged(response.data.shared_component.navbar_brand_variant_color))
        dispatch(footerCopyRightTextChanged(response.data.shared_component.footer_copyright_text))
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchShop()
  }, [dispatch, router.query.public_id, cookies._square_eight_merchant_session])

  const updateShop = () => {
    const params = new FormData()
    params.append('name', name)
    params.append('phone_number', phoneNumber)
    params.append('description1', description1)
    params.append('description2', description2)
    params.append('description3', description3)
    params.append('description4', description4)
    params.append('description5', description5)
    params.append('description6', description6)
    params.append('postal_code', postalCode)
    params.append('state', state)
    params.append('city', city)
    params.append('town', town)
    params.append('line1', line1)
    params.append('line2', line2)
    params.append('access_info', accessInfo)
    params.append('remarks', remarks)
    params.append('publish_status', publishStatus)
    params.append('business_hours_text', businessHoursText)
    params.append('parking_lot_guidance', parkingLotGuidance)
    params.append('shop_image1_file', shopImage1File as Blob)
    params.append('shop_image2_file', shopImage2File as Blob)
    params.append('shop_image3_file', shopImage3File as Blob)
    params.append('shop_image4_file', shopImage4File as Blob)
    params.append('shop_image5_file', shopImage5File as Blob)
    params.append('shop_image6_file', shopImage6File as Blob)
    selectedReserveFrameIds.forEach((id, i) => {
      params.append('reserve_frame_ids' + '[]', String(id))
    })
    selectedTicketMasterIds.forEach((id, i) => {
      params.append('ticket_master_ids' + '[]', String(id))
    })
    selectedMonthlyPaymentPlanIds.forEach((id, i) => {
      params.append('monthly_payment_plan_ids' + '[]', String(id))
    })
    selectedProductIds.forEach((id, i) => {
      params.append('product_ids' + '[]', String(id))
    })
    selectedWebpageIds.forEach((id, i) => {
      params.append('webpage_ids' + '[]', String(id))
    })
    selectedResourceIds.forEach((id, i) => {
      params.append('resource_ids' + '[]', String(id))
    })
    axios.post(`${process.env.BACKEND_URL}/api/internal/shops/${router.query.public_id}/update`, params, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Session-Id': cookies._square_eight_merchant_session
      },
    }).then(response => {
      console.log(response)
      swalWithBootstrapButtons.fire({
        title: '登録しました',
        icon: 'info'
      })
      router.push('/admin/shop')
    }).catch(error => {
      console.log(error)
      swalWithBootstrapButtons.fire({
        title: '登録失敗しました',
        icon: 'error'
      })
    })
  }

  return (
    <MerchantUserAdminLayout>
      {allowUpdateShop === 'Allow' &&
      <Container>
        <Row>
          <Col lg={3}></Col>
          <Col lg={6}>
            <CreateShop
              showDeleteButton={true} />
            <Button
              onClick={updateShop}
              className='mt20'>保存する</Button>
          </Col>
        </Row>
      </Container>}
      {allowUpdateShop === 'Forbid' && <Unauthorized />}
    </MerchantUserAdminLayout>
  )
}

export default Edit
