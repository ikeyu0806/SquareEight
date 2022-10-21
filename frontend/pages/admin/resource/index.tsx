import { NextPage } from 'next'
import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { Container, ListGroup, Row, Col } from 'react-bootstrap'
import axios from 'axios'
import { ResourceParam } from 'interfaces/ResourceParam'
import ResourceLimitAlert from 'components/molecules/ResourceLimitAlert'
import { RootState } from 'redux/store'
import { useSelector } from 'react-redux'

const Index: NextPage = () => {
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const router = useRouter()
  const [resources, setResources] = useState<ResourceParam[]>([])
  const servicePlan =  useSelector((state: RootState) => state.currentMerchantUser.servicePlan)

  useEffect(() => {
    const fetchResources = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/resources`, {
          headers: { 
            'Session-Id': cookies._square_eight_merchant_session
          },
        }
      )
      .then(function (response) {
        const resourceResponse: ResourceParam[] = response.data.resources
        setResources(resourceResponse)
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchResources()
  }, [router.query.public_id, cookies._square_eight_merchant_session])

  return (
    <>
      <MerchantUserAdminLayout>
        <br />
        <Container>
          <Row>
            <Col lg={3}></Col>
            <Col lg={6}>
              <ResourceLimitAlert />
              {['Standard', 'Premium'].includes(servicePlan) &&
                <>
                  <a  href='/admin/resource/new'
                    className='btn btn-primary mb20'>
                  新規登録
                  </a>
                  <ListGroup>
                    {resources.map((resource, i) => {
                      return (
                        <ListGroup.Item key={i}>
                          <Row>
                            <Col>{resource.name}</Col>
                            <Col>数量: {resource.quantity}</Col>
                            <Col>
                              <a className='btn btn-primary'
                                href={`/admin/resource/${resource.public_id}/edit`}>編集</a>
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      )
                    })}
                  </ListGroup>
                </>
              }
            </Col>
          </Row>
        </Container>
      </MerchantUserAdminLayout>
    </>
  )
}

export default Index
