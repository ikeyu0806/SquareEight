import { NextPage } from 'next'
import React, { useEffect } from 'react'
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
import { ResourceParam } from 'interfaces/ResourceParam'
import Unauthorized from 'components/templates/Unauthorized'
import { nameChanged,
         quantityChanged,
         descriptionChanged,
         resourceImage1PublicUrlChanged,
         resourceTypeChanged,
         selectedShopIdsChanged,
         selectableReserveFramesChanged,
         selectedReserveFrameIdsChanged } from 'redux/resourceSlice'

const Edit: NextPage = () => {
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const router = useRouter()

  const name = useSelector((state: RootState) => state.resource.name)
  const description = useSelector((state: RootState) => state.resource.description)
  const resourceType = useSelector((state: RootState) => state.resource.resourceType)
  const isShowReservePage = useSelector((state: RootState) => state.resource.isShowReservePage)
  const quantity = useSelector((state: RootState) => state.resource.quantity)
  const resourceImage1File =  useSelector((state: RootState) => state.resource.resourceImage1File)
  const selectedShopIds = useSelector((state: RootState) => state.resource.selectedShopIds)

  const allowUpdateResource = useSelector((state: RootState) => state.merchantUserPermission.allowUpdateResource)

  useEffect(() => {
    const fetchResource = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/resources/${router.query.public_id}/edit`, {
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
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchResource()
  }, [router.query.public_id, cookies._square_eight_merchant_session, dispatch])

  const onSubmit = () => {
    const params = new FormData()
    params.append('name', name)
    params.append('description', description)
    params.append('resource_type', resourceType)
    params.append('quantity', String(quantity))
    params.append('resource_image1_file', resourceImage1File as Blob)
    params.append('is_show_reserve_page', String(isShowReservePage))
    selectedShopIds.forEach((id, i) => {
      params.append('shop_ids' + '[]', String(id))
    })
    axios.post(`${process.env.BACKEND_URL}/api/internal/resources/${router.query.public_id}/update`, params, {
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
        {allowUpdateResource === 'Allow' && <Container>
          <Row>
            <Col lg={3} md={3}></Col>
            <Col lg={6} md={6}>
              {/* <ResourceLimitAlert /> */}
              {/* {['Standard', 'Premium'].includes(servicePlan) && */}
                <>
                  <CreateResource></CreateResource>

                  <div className='text-center'>
                    <Button onClick={onSubmit} className='mt10'>登録する</Button>
                  </div>
                </>
              {/* } */}
            </Col>
          </Row>
        </Container>}
        {allowUpdateResource === 'Forbid' && <Unauthorized />}
      </MerchantUserAdminLayout>
    </>
  )
}

export default Edit
