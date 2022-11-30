import React, { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import { useCookies } from 'react-cookie'
import { Container, Row, Col, ListGroup } from 'react-bootstrap'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { MerchantUserParam } from 'interfaces/MerchantUserParam'
import axios from 'axios'
import { useRouter } from 'next/router'

const Index: NextPage = () => {
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const router = useRouter()
  const [merchantUsers, setMerchantUsers] = useState<MerchantUserParam[]>([])

  useEffect(() => {
    const fetchProducts = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/merchant_users`, {
          headers: { 
            'Session-Id': cookies._square_eight_merchant_session
          },
        }
      )
      .then(function (response) {
        console.log(response.data)
        const merchantUserResponse: MerchantUserParam[] = response.data.merchant_users
        setMerchantUsers(merchantUserResponse)
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchProducts()
  }, [router.query.public_id, cookies._square_eight_merchant_session])

  return (
    <MerchantUserAdminLayout>
      <Container>
        <Row>
          <Col md={3}></Col>
          <Col md={6}>
            <a className='btn btn-primary mb20' href='/admin/user/invitation'>ユーザを招待する</a>
            <ListGroup>
              {merchantUsers.map((user, i) => {
                return (
                  <ListGroup.Item key={i}>
                    <div>メールアドレス: {user.email}</div>
                    <div>
                      {user.last_name === null && user.first_name === null && <>名前が登録されていません</>}
                      {user.last_name !== null || user.first_name !== null && <>{user.last_name}{user.first_name}</>}
                    </div>
                  </ListGroup.Item>
                )
              })}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </MerchantUserAdminLayout>
  )
}

export default Index
