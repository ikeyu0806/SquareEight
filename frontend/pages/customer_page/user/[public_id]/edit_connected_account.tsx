import React, { useEffect, useState } from 'react'
import { NextPage } from 'next'
import { Container, Row, Col, Button, Card, Modal } from 'react-bootstrap'
import EndUserLoginLayout from 'components/templates/EndUserLoginLayout'
import GoogleIcon from 'components/atoms/GoogleIcon'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { MerchantUserParam } from 'interfaces/MerchantUserParam'
import { useCookies } from 'react-cookie'
import { swalWithBootstrapButtons } from 'constants/swalWithBootstrapButtons'
import { alertChanged } from 'redux/alertSlice'
import { END_USER_GOOGLE_AUTH_URL } from 'constants/socialLogin'

const EditConnectedAccount: NextPage = () => {
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_square_eight_end_user_session'])
  const [merchantUser, setMerchantUser] = useState<MerchantUserParam>()
  const [showConnectGoogleAuthModal, setShowConnectGoogleAuthModal] = useState(false)

  useEffect(() => {
    axios.get(`${process.env.BACKEND_URL}/api/internal/end_users/current_end_user_info`,
    {
      headers: {
        'Session-Id': cookies._square_eight_end_user_session
      }
    }).then((response) => {
      setMerchantUser(response.data.end_user)
    }).catch((error) => {
      console.log(error)
    })
  }, [dispatch, cookies._square_eight_end_user_session])

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
        axios.delete(`${process.env.BACKEND_URL}/api/internal/end_users/disconnect_google_auth`, {
          headers: { 
            'Session-Id': cookies._square_eight_end_user_session
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
    <>
      <EndUserLoginLayout>
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
                            ? <Button variant='danger'
                                      onClick={() => disconnectGoogle()}
                                      disabled={!merchantUser.email}>連携解除</Button>
                            : <a className='btn btn-primary'
                                 href={END_USER_GOOGLE_AUTH_URL}>連携する</a>}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </EndUserLoginLayout>
      <Modal show={showConnectGoogleAuthModal}>
        <Modal.Body>
          Google連携
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowConnectGoogleAuthModal(false)}>閉じる</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default EditConnectedAccount
