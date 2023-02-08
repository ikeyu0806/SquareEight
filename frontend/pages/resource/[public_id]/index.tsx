import { NextPage } from 'next'
import { useEffect } from 'react'
import CreateResource from 'components/templates/CreateResource'
import { Container, Row, Col } from 'react-bootstrap'
import MerchantCustomLayout from 'components/templates/MerchantCustomLayout'
import { Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'redux/store'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'
import { alertChanged } from 'redux/alertSlice'
import { ResourceParam } from 'interfaces/ResourceParam'
import Unauthorized from 'components/templates/Unauthorized'
import resourceStyles from 'styles/Resource.module.css'
import { nameChanged,
         quantityChanged,
         descriptionChanged,
         resourceImage1PublicUrlChanged,
         resourceTypeChanged,
         selectedShopIdsChanged,
         selectableReserveFramesChanged,
         selectedReserveFrameIdsChanged,
         reserveFrameInfoChanged } from 'redux/resourceSlice'
import {  navbarBrandTextChanged,
          navbarBrandTypeChanged,
          navbarBrandImageChanged,
          navbarBrandImageWidthChanged,
          navbarBrandImageHeightChanged,
          navbarBrandBackgroundColorChanged,
          navbarBrandVariantColorChanged,
          footerCopyRightTextChanged } from 'redux/sharedComponentSlice'

const Index: NextPage = () => {
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const router = useRouter()

  const name = useSelector((state: RootState) => state.resource.name)
  const description = useSelector((state: RootState) => state.resource.description)
  const resourceImage1PublicUrl = useSelector((state: RootState) => state.resource.resourceImage1PublicUrl)
  const isShowReservePage = useSelector((state: RootState) => state.resource.isShowReservePage)
  const quantity = useSelector((state: RootState) => state.resource.quantity)
  const resourceImage1File =  useSelector((state: RootState) => state.resource.resourceImage1File)
  const selectedShopIds = useSelector((state: RootState) => state.resource.selectedShopIds)

  const allowUpdateResource = useSelector((state: RootState) => state.merchantUserPermission.allowUpdateResource)

  useEffect(() => {
    const fetchResource = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/resources/${router.query.public_id}`, {
          headers: { 
            'Session-Id': cookies._square_eight_merchant_session
          },
        }
      )
      .then(function (response) {
        console.log(response.data)
        dispatch(nameChanged(response.data.resource.name))
        dispatch(descriptionChanged(response.data.resource.description))
        dispatch(quantityChanged(response.data.resource.quantity))
        dispatch(resourceImage1PublicUrlChanged(response.data.resource.resource_image1_public_url))
        dispatch(resourceTypeChanged(response.data.resource.resource_type))
        dispatch(selectedShopIdsChanged(response.data.resource.selected_shop_ids))
        dispatch(selectableReserveFramesChanged(response.data.selectable_reserve_frames))
        dispatch(selectedReserveFrameIdsChanged(response.data.resource.selected_reserve_frame_ids))
        dispatch(reserveFrameInfoChanged(response.data.resource.reserve_frames_info))
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
    fetchResource()
  }, [router.query.public_id, cookies._square_eight_merchant_session, dispatch])

  return (
    <MerchantCustomLayout>
      <Container className='mt20'>
        <Row>
          <Col lg={3}></Col>
          <Col lg={6}>
            <Row>
              <Col>
                {resourceImage1PublicUrl &&
                <img
                  className={resourceStyles.resource_image}
                  alt='resourceImage1'
                  src={resourceImage1PublicUrl} />}
              </Col>
              <Col>
                <div className='mb10'>
                  <span className={resourceStyles.headline_resource_name_text}>{name}</span>
                </div>
                <div>
                {description &&
                  <div className={resourceStyles.description_text}>
                    {description}
                  </div>}
                </div>
              </Col>
            </Row>
            <hr />
          </Col>
        </Row>
      </Container>
    </MerchantCustomLayout>
  )
}

export default Index
