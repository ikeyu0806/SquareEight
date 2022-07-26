import React, { useEffect, useState } from 'react'
import { NextPage } from 'next'
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import GoogleIcon from 'components/atoms/GoogleIcon'
import EnvelopIcon from 'components/atoms/EnvelopIcon'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { MerchantUserParam } from 'interfaces/MerchantUserParam'
import { useCookies } from 'react-cookie'

const EditConnectedAccount: NextPage = () => {
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_gybuilder_merchant_session'])
  const [merchantUser, setMerchantUser] = useState<MerchantUserParam>()

  useEffect(() => {
    axios.get(`${process.env.BACKEND_URL}/api/internal/merchant_users/current_merchant_user_info`,
    {
      headers: {
        'Session-Id': cookies._gybuilder_merchant_session
      }
    }).then((response) => {
      setMerchantUser(response.data.merchant_user)
    }).catch((error) => {
      console.log(error)
    })
  }, [dispatch, cookies._gybuilder_merchant_session])

  return (
    <MerchantUserAdminLayout>
    <Container className='mt30'>
      <Row>
        <Col md={2} lg={3}></Col>
        <Col md={8} lg={6}>
          <Card>
            <Card.Header>
              <span>アカウント連携</span>
            </Card.Header>
            <Card.Body>
              <table className='table'>
                <tbody>
                  <tr>
                    <td scope='row'><EnvelopIcon width={20} height={20} className={'mr10'}></EnvelopIcon>メールアドレス認証</td>
                    <td className='text-center'>{merchantUser?.email ? <Button variant='danger'>連携解除</Button> : <Button>連携する</Button>}</td>
                  </tr>
                  <tr>
                    <td scope='row'><GoogleIcon width={20} height={20} className={'mr10'}></GoogleIcon>Google</td>
                    <td className='text-center'>{merchantUser?.google_auth_email ? <Button variant='danger'>連携解除</Button> : <Button>連携する</Button>}</td>
                  </tr>
                </tbody>
              </table>
            </Card.Body>
          </Card>
        </Col>
        </Row>
      </Container>
    </MerchantUserAdminLayout>
  )
}

export default EditConnectedAccount
