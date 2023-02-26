import React, { useEffect, useState } from 'react'
import { NextPage } from 'next'
import CreateResource from 'components/templates/CreateResource'
import { Container, Row, Col } from 'react-bootstrap'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'redux/store'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'
import { alertChanged } from 'redux/alertSlice'
import Unauthorized from 'components/templates/Unauthorized'
import { selectableReserveFramesChanged } from 'redux/resourceSlice'
import CreateResourceLimitAlert from 'components/atoms/CreateResourceLimitAlert'
import ResouceLimitGuide from 'components/atoms/ResouceLimitGuide'

const New: NextPage = () => {
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const router = useRouter()

  const [enableCreateResource, setEnableCreateResource] = useState(false)
  const name = useSelector((state: RootState) => state.resource.name)
  const description = useSelector((state: RootState) => state.resource.description)
  const resourceType = useSelector((state: RootState) => state.resource.resourceType)
  const isShowReservePage = useSelector((state: RootState) => state.resource.isShowReservePage)
  const quantity = useSelector((state: RootState) => state.resource.quantity)
  const resourceImage1File =  useSelector((state: RootState) => state.resource.resourceImage1File)
  const resourceImage2File =  useSelector((state: RootState) => state.resource.resourceImage2File)
  const resourceImage3File =  useSelector((state: RootState) => state.resource.resourceImage3File)
  const resourceImage4File =  useSelector((state: RootState) => state.resource.resourceImage4File)
  const resourceImage5File =  useSelector((state: RootState) => state.resource.resourceImage5File)
  const selectedShopIds = useSelector((state: RootState) => state.resource.selectedShopIds)
  const selectedReserveFrameIds = useSelector((state: RootState) => state.resource.selectedReserveFrameIds)

  const allowCreateResource = useSelector((state: RootState) => state.merchantUserPermission.allowCreateResource)

  useEffect(() => {
    const fetchRelatedData = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/resources/related_data`, {
          headers: { 
            'Session-Id': cookies._square_eight_merchant_session
          },
        }
      )
      .then(function (response) {
        console.log(response.data)
        dispatch(selectableReserveFramesChanged(response.data.selectable_reserve_frames))
        setEnableCreateResource(response.data.enable_create_resource)
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchRelatedData()
  }, [router.query.public_id, cookies._square_eight_merchant_session, dispatch])

  const onSubmit = () => {
    const params = new FormData()
    params.append('name', name)
    params.append('description', description)
    params.append('resource_type', resourceType)
    params.append('quantity', String(quantity))
    params.append('resource_image1_file', resourceImage1File as Blob)
    params.append('resource_image2_file', resourceImage2File as Blob)
    params.append('resource_image3_file', resourceImage3File as Blob)
    params.append('resource_image4_file', resourceImage4File as Blob)
    params.append('resource_image5_file', resourceImage5File as Blob)
    params.append('is_show_reserve_page', String(isShowReservePage))
    selectedShopIds.forEach((id, i) => {
      params.append('shop_ids' + '[]', String(id))
    })
    selectedReserveFrameIds.forEach((id, i) => {
      params.append('reserve_frame_ids' + '[]', String(id))
    })
    axios.post(`${process.env.BACKEND_URL}/api/internal/resources`, params, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Session-Id': cookies._square_eight_merchant_session
      }
    }).then(response => {
      router.push('/admin/resource')
      dispatch(alertChanged({message: 'リソースを登録しました', show: true}))
    }).catch(error => {
      console.log(error)
      dispatch(alertChanged({message: error, show: true, type: 'danger'}))
    })
  }

  return (
    <>
      <MerchantUserAdminLayout>
        <CreateResourceLimitAlert />
        {allowCreateResource === 'Allow' &&<Container>
          <Row>
            <Col lg={3} md={3}></Col>
            <Col lg={6} md={6}>
              {/* TODO:お試し期間終わったら外す */}
              {/* <ResourceLimitAlert /> */}
              {/* {['Standard', 'Premium'].includes(servicePlan) && */}
                <>
                  <CreateResource></CreateResource>
                  <ResouceLimitGuide></ResouceLimitGuide>
                  <div className='text-center'>
                    <Button
                      disabled={!enableCreateResource}
                      onClick={onSubmit}
                      className='mt10'>登録する</Button>
                  </div>
                </>
              {/* } */}
            </Col>
          </Row>
        </Container>}
        {allowCreateResource === 'Forbid' && <Unauthorized />}
      </MerchantUserAdminLayout>
    </>
  )
}

export default New
