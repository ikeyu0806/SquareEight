import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import { Container, Card, Row, Col } from 'react-bootstrap'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import GoogleIcon from 'components/atoms/GoogleIcon'
import ConnectedTextWithIcon from 'components/molecules/ConnectedTextWithIcon'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { MerchantUserParam } from 'interfaces/MerchantUserParam'
import { useCookies } from 'react-cookie'

const LoginUserInfo: NextPage = () => {
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
    <>
      <MerchantUserAdminLayout>
        <Container className='mt50 mb50'>
          <Row>
            <Col lg={3} md={3}></Col>
              <Col lg={6}>
                <Card>
                  <Card.Header className=' d-flex justify-content-between align-items-center'>
                    ご登録情報
                    <a className='btn btn-sm btn-primary' href={`/admin/merchant_user/${merchantUser?.id}/edit`}>編集</a>
                  </Card.Header>
                  <Card.Body>
                    <table className='table'>
                      <tbody>
                        <tr>
                          <td scope='row'>お名前</td>
                          <td className='text-center'>{merchantUser?.last_name} {merchantUser?.first_name}</td>
                        </tr>
                        <tr>
                          <td scope='row'>お名前（カナ）</td>
                          <td className='text-center'>{merchantUser?.last_name_kana} {merchantUser?.first_name_kana}</td>
                        </tr>
                        <tr>
                          <td scope='row'>メールアドレス</td>
                          <td className='text-center'>{merchantUser?.email}</td>
                        </tr>
                      </tbody>
                    </table>
                  </Card.Body>
                  <Card.Header className=' d-flex justify-content-between align-items-center'>
                    連携サービス
                    <a className='btn btn-sm btn-primary' href={`/admin/merchant_user/${merchantUser?.id}/edit_connected_account`}>編集</a>
                  </Card.Header>
                  <Card.Body>
                    <table className='table'>
                      <tbody>
                        <tr>
                          <td scope='row'><GoogleIcon width={20} height={20} className={'mr10'}></GoogleIcon>Google</td>
                          <td className='text-center'>{merchantUser?.google_auth_id ? <ConnectedTextWithIcon></ConnectedTextWithIcon> : '連携なし'}</td>
                        </tr>
                        <tr>
                          <td scope='row'>メールアドレス（Google認証）</td>
                          <td className='text-center'>{merchantUser?.google_auth_email}</td>
                        </tr>
                      </tbody>
                    </table>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </MerchantUserAdminLayout>
    </>
  )
}

export default LoginUserInfo
