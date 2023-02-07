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
import { nameChanged, quantityChanged } from 'redux/resourceSlice'
import ResourceLimitAlert from 'components/molecules/ResourceLimitAlert'
import Unauthorized from 'components/templates/Unauthorized'

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
    const fetchMonthlyPaymentPlan = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/resources/${router.query.public_id}/edit`, {
          headers: { 
            'Session-Id': cookies._square_eight_merchant_session
          },
        }
      )
      .then(function (response) {
        const resourceResponse: ResourceParam = response.data.resource
        dispatch(nameChanged(resourceResponse.name))
        dispatch(quantityChanged(resourceResponse.quantity))
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchMonthlyPaymentPlan()
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
