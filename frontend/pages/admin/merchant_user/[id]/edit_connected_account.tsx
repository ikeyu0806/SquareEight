import React, { useEffect, useState } from 'react'
import { NextPage } from 'next'
import { Container, Row, Col, Button, Card } from 'react-bootstrap'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import GoogleIcon from 'components/atoms/GoogleIcon'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { MerchantUserParam } from 'interfaces/MerchantUserParam'
import { useCookies } from 'react-cookie'
import { swalWithBootstrapButtons } from 'constants/swalWithBootstrapButtons'
import { alertChanged } from 'redux/alertSlice'
import { MERCHANT_GOOGLE_AUTH_URL } from 'constants/socialLogin'

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

  const disconnectGoogle = () => {
    swalWithBootstrapButtons.fire({
      title: '解除します',
      text: '解除してもよろしいですか？',
      icon: 'question',
      confirmButtonText: '解除する',
      cancelButtonText: 'キャンセル',
      showCancelButton: true,
      showCloseButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${process.env.BACKEND_URL}/api/internal/merchant_users/disconnect_google_auth`, {
          headers: { 
            'Session-Id': cookies._gybuilder_merchant_session
          }
        }).then(res => {
          location.reload!
        }).catch(err => {
          dispatch(alertChanged({message: '解除失敗しました', show: true, type: 'danger'}))
        })
      }
    })
  }

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
                    <td scope='row'><GoogleIcon width={20} height={20} className={'mr10'}></GoogleIcon>Google</td>
                    <td className='text-center'>
                      {merchantUser?.google_auth_email
                        ? <Button onClick={() => disconnectGoogle()}
                                  disabled={!merchantUser.email}
                                  variant='danger'>連携解除</Button>
                        : <a className='btn btn-primary'
                             href={MERCHANT_GOOGLE_AUTH_URL}>連携する</a>}
                    </td>
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
