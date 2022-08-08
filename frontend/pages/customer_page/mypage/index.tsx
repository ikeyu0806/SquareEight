import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import { Container, Card, Row, Col } from 'react-bootstrap'
import EndUserLoginLayout from 'components/templates/EndUserLoginLayout'
import GoogleIcon from 'components/atoms/GoogleIcon'
import ConnectedTextWithIcon from 'components/molecules/ConnectedTextWithIcon'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { EndUserParam } from 'interfaces/EndUserParam'
import { useCookies } from 'react-cookie'
import { DeliveryTargetParam } from 'interfaces/DeliveryTargetParam'

const Index: NextPage = () => {
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_gybuilder_end_user_session'])
  const [endUser, setEndUser] = useState<EndUserParam>()
  const [deliveryTarget, setDeliveryTarget] = useState<DeliveryTargetParam>()

  useEffect(() => {
    axios.get(`${process.env.BACKEND_URL}/api/internal/end_users/mypage_info`,
    {
      headers: {
        'Session-Id': cookies._gybuilder_end_user_session
      }
    }).then((response) => {
      console.log(response.data)
      setEndUser(response.data.end_user)
      setDeliveryTarget(response.data.delivery_target)
    }).catch((error) => {
      console.log(error)
    })
  }, [dispatch, cookies._gybuilder_end_user_session])

  return (
    <>
      <EndUserLoginLayout>
        <Container className='mt50 mb50'>
          <Row>
            <Col lg={3} md={3}></Col>
              <Col lg={6}>
                <Card>
                  <Card.Header className=' d-flex justify-content-between align-items-center'>
                    ご登録情報
                    <a className='btn btn-sm btn-primary' href={`/customer_page/user/${endUser?.id}/edit`}>編集</a>
                  </Card.Header>
                  <Card.Body>
                    <table className='table'>
                      <tbody>
                        <tr>
                          <td scope='row'>お名前</td>
                          <td className='text-center'>{endUser?.last_name}{endUser?.first_name}</td>
                        </tr>
                        <tr>
                          <td scope='row'>お名前（カナ）</td>
                          <td className='text-center'>{endUser?.last_name_kana}{endUser?.first_name_kana}</td>
                        </tr>
                        <tr>
                          <td scope='row'>メールアドレス（パスワード認証）</td>
                          <td className='text-center'>{endUser?.email}</td>
                        </tr>
                      </tbody>
                    </table>
                  </Card.Body>
                  <Card.Header className=' d-flex justify-content-between align-items-center'>
                    お届け先情報
                    <a className='btn btn-sm btn-primary' href={`/customer_page/user/${endUser?.id}/edit_target_delivery`}>編集</a>
                  </Card.Header>
                  <Card.Body>
                  {deliveryTarget
                  ?
                  <>
                    〒{deliveryTarget.postal_code} {deliveryTarget.last_name}{deliveryTarget.first_name}<br />
                    {deliveryTarget.state}{deliveryTarget.city}{deliveryTarget.town}{deliveryTarget.line1}{deliveryTarget.line2}
                  </>
                  :
                  <>お届け先が設定されていません</>
                  }
                  </Card.Body>
                  <Card.Header className=' d-flex justify-content-between align-items-center'>
                    連携サービス
                    <a className='btn btn-sm btn-primary' href={`/customer_page/user/${endUser?.id}/edit_connected_account`}>編集</a>
                  </Card.Header>
                  <Card.Body>
                  <table className='table'>
                      <tbody>
                        <tr>
                          <td scope='row'><GoogleIcon width={20} height={20} className={'mr10'}></GoogleIcon>Google</td>
                          <td className='text-center'>{endUser?.google_auth_id ? <ConnectedTextWithIcon></ConnectedTextWithIcon> : '連携なし'}</td>
                        </tr>
                        <tr>
                          <td scope='row'>メールアドレス（Google認証）</td>
                          <td className='text-center'>{endUser?.google_auth_email}</td>
                        </tr>
                      </tbody>
                    </table>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </EndUserLoginLayout>
    </>
  )
}

export default Index
