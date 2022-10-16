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

const Edit: NextPage = () => {
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const router = useRouter()

  const name = useSelector((state: RootState) => state.resource.name)
  const quantity = useSelector((state: RootState) => state.resource.quantity)
  const servicePlan =  useSelector((state: RootState) => state.currentMerchantUser.servicePlan)

  useEffect(() => {
    const fetchMonthlyPaymentPlan = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/resources/${router.query.id}/edit`, {
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
  }, [router.query.id, cookies._square_eight_merchant_session, dispatch])

  const onSubmit = () => {
    axios.post(`${process.env.BACKEND_URL}/api/internal/resources/${router.query.id}/update`,
    {
      resources: {
        name: name,
        quantity: quantity
      }
    },
    {
      headers: {
        'Session-Id': cookies._square_eight_merchant_session
      }
    }).then(response => {
      router.push('/admin/resource')
      dispatch(alertChanged({message: 'リソースを更新しました', show: true}))
    }).catch(error => {
      dispatch(alertChanged({message: error, show: true, type: 'danger'}))
    })
  }

  return (
    <>
      <MerchantUserAdminLayout>
        {['Standard', 'Premium'].includes(servicePlan) &&
          <>
            <Container>
              <Row>
                <Col lg={3} md={3}></Col>
                <Col lg={6} md={6}>
                  <CreateResource></CreateResource>
                </Col>
              </Row>
            </Container>
            <div className='text-center'>
              <Button onClick={onSubmit} className='mt10'>更新する</Button>
            </div>
          </>
        }
      </MerchantUserAdminLayout>
    </>
  )
}

export default Edit
