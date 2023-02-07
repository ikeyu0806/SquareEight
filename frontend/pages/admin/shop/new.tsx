import { useEffect } from 'react'
import { NextPage } from 'next'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { Container, Row, Col, Button } from 'react-bootstrap'
import CreateShop from 'components/templates/CreateShop'
import axios from 'axios'
import { alertChanged } from 'redux/alertSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import { RootState } from 'redux/store'
import { swalWithBootstrapButtons } from 'constants/swalWithBootstrapButtons'
import Unauthorized from 'components/templates/Unauthorized'
import { 
  reserveFramesChanged,
  productsChanged,
  ticketMastersChanged,
  monthlyPaymentPlansChanged,
  webpagesChanged,
  resourcesChanged } from 'redux/shopSlice'

const New: NextPage = () => {
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const router = useRouter()

  const name = useSelector((state: RootState) => state.shop.name)
  const phoneNumber = useSelector((state: RootState) => state.shop.phoneNumber)
  const description1 = useSelector((state: RootState) => state.shop.description1)
  const description2 = useSelector((state: RootState) => state.shop.description2)
  const description3 = useSelector((state: RootState) => state.shop.description3)
  const description4 = useSelector((state: RootState) => state.shop.description4)
  const description5 = useSelector((state: RootState) => state.shop.description5)
  const description6 = useSelector((state: RootState) => state.shop.description6)
  const remarks = useSelector((state: RootState) => state.shop.remarks)
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
  const allowCreateShop = useSelector((state: RootState) => state.merchantUserPermission.allowCreateShop)

  useEffect(() => {
    const fetchShop = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/shops/related_data`, {
          headers: { 
            'Session-Id': cookies._square_eight_merchant_session
          },
        }
      )
      .then(function (response) {
        dispatch(reserveFramesChanged(response.data.reserve_frames))
        dispatch(productsChanged(response.data.products))
        dispatch(ticketMastersChanged(response.data.ticket_masters))
        dispatch(monthlyPaymentPlansChanged(response.data.monthly_payment_plans))
        dispatch(webpagesChanged(response.data.webpages))
        dispatch(resourcesChanged(response.data.resources))
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchShop()
  }, [dispatch, router.query.public_id, cookies._square_eight_merchant_session])

  const createShop = () => {
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
    params.append('business_hours_text', businessHoursText)
    params.append('parking_lot_guidance', parkingLotGuidance)
    params.append('remarks', remarks)
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
    axios.post(`${process.env.BACKEND_URL}/api/internal/shops`, params, {
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
      swalWithBootstrapButtons.fire({
        title: '登録失敗しました',
        icon: 'error'
      })
      console.log(error)
    })
  }

  return (
    <MerchantUserAdminLayout>
      {allowCreateShop === 'Allow' && <Container>
        <Row>
          <Col lg={3}></Col>
          <Col lg={6}>
            <CreateShop />
            <Button
              onClick={createShop}
              className='mt20'>保存する</Button>
          </Col>
        </Row>
      </Container>}
      {allowCreateShop === 'Forbid' && <Unauthorized />}
    </MerchantUserAdminLayout>
  )
}

export default New
