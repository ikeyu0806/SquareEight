import React, { useEffect, useState } from 'react'
import { NextPage } from 'next'
import { Container, Row, Col, ListGroup, Button } from 'react-bootstrap'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'
import { LineUserParam } from 'interfaces/LineUserParam'

const LineUser: NextPage = () => {
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const router = useRouter()
  const [lineUsers, setLineUsers] = useState<LineUserParam[]>([])

  useEffect(() => {
    axios.get(`${process.env.BACKEND_URL}/api/internal/line_official_accounts/${router.query.public_id}/line_users`,
    {
      headers: {
        'Session-Id': cookies._square_eight_merchant_session
      }
    }).then((response) => {
      console.log(response.data)
      setLineUsers(response.data.line_users)
    }).catch((error) => {
      console.log(error)
    })
  }, [cookies._square_eight_merchant_session, router.query.public_id])

  return (
    <MerchantUserAdminLayout>
      <Container>
        <Row>
          <Col lg={2}></Col>
          <Col lg={8}>
            <ListGroup>
              {lineUsers.map((line_user, i) => {
                return (
                  <ListGroup.Item key={i}>
                    <Row>
                      <Col>
                        <img
                          className='linePictureUrl'
                          src={line_user.line_picture_url}
                          alt='line_picture_url' />
                      </Col>
                      <Col>
                        <div>{line_user.line_display_name}</div>
                      </Col>
                    </Row>
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

export default LineUser
