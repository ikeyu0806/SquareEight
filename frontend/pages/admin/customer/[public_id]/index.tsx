import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import { RootState } from 'redux/store'
import Unauthorized from 'components/templates/Unauthorized'
import { CustomerParam } from 'interfaces/CustomerParam'

const Index: NextPage = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const allowReadCustomer = useSelector((state: RootState) => state.merchantUserPermission.allowReadCustomer)
  const [customer, setCustomer] = useState<CustomerParam>()

  useEffect(() => {
    axios.get(`${process.env.BACKEND_URL}/api/internal/customers/${router.query.public_id}`,
    {
      headers: {
        'Session-Id': cookies._square_eight_merchant_session
      }
    }).then((response) => {
      console.log(response.data)
      setCustomer(response.data.customer)
    }).catch((error) => {
      console.log(error)
    })
  }, [router.query.public_id, dispatch, cookies._square_eight_merchant_session])


  return (
    <>
      <MerchantUserAdminLayout>
        <br />
        {allowReadCustomer === 'Allow' &&
        <Container>
          <Row>
            <Col lg={3} md={3}></Col>
            <Col lg={6}>
              <Card>
                <Card.Header className='font-weight-bold'>顧客情報</Card.Header>
                <Card.Body>
                  <Row>
                    <Col className='font-weight-bold'>お名前</Col>
                    <Col>
                      {customer &&
                      <>{customer.last_name}{customer.first_name}</>}
                    </Col>
                  </Row>
                  <hr />
                  <Row>
                    <Col className='font-weight-bold'>メールアドレス</Col>
                    <Col>
                      {customer &&
                      <>{customer.email}</>}
                    </Col>
                  </Row>
                  <hr />
                  <Row>
                    <Col className='font-weight-bold'>携帯電話番号</Col>
                    <Col>
                      {customer &&
                      <>{customer.phone_number}</>}
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row></Row>
        </Container>}
        {allowReadCustomer === 'Forbid' && <Unauthorized />}
      </MerchantUserAdminLayout>
    </>
  )
}

export default Index
