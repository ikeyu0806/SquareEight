import React, { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import { useCookies } from 'react-cookie'
import { Container, Row, Col, ListGroup, Button } from 'react-bootstrap'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { MerchantUserParam } from 'interfaces/MerchantUserParam'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import Unauthorized from 'components/templates/Unauthorized'
import { swalWithBootstrapButtons } from 'constants/swalWithBootstrapButtons'

const Index: NextPage = () => {
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const router = useRouter()
  const [merchantUsers, setMerchantUsers] = useState<MerchantUserParam[]>([])
  const allowReadMerchantUser = useSelector((state: RootState) => state.merchantUserPermission.allowReadMerchantUser)
  const allowUpdateMerchantUser = useSelector((state: RootState) => state.merchantUserPermission.allowUpdateMerchantUser)
  const allowDeleteMerchantUser = useSelector((state: RootState) => state.merchantUserPermission.allowDeleteMerchantUser)

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
        const merchantUserResponse: MerchantUserParam[] = response.data.merchant_users
        setMerchantUsers(merchantUserResponse)
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchProducts()
  }, [router.query.public_id, cookies._square_eight_merchant_session])

  const deleteMerchantUser = (publicId: string) => {
    swalWithBootstrapButtons.fire({
      title: '削除します',
      html: 'ユーザを削除します。<br />よろしいですか？',
      icon: 'question',
      confirmButtonText: '削除する',
      cancelButtonText: 'キャンセル',
      showCancelButton: true,
      showCloseButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${process.env.BACKEND_URL}/api/internal/merchant_users/${publicId}`, {
          headers: { 
            'Session-Id': cookies._square_eight_merchant_session
          }
        }).then(response => {
          swalWithBootstrapButtons.fire({
            title: '削除しました',
            icon: 'info'
          })
          location.reload()
        }).catch(error => {
          swalWithBootstrapButtons.fire({
            title: '削除失敗しました',
            icon: 'error'
          })
        })
      }
    })
  }

  return (
    <MerchantUserAdminLayout>
      {allowReadMerchantUser === 'Allow' && <Container>
        <Row>
          <Col md={3}></Col>
          <Col md={6}>
            <a className='btn btn-primary mb20' href='/admin/user/invitation'>ユーザを招待する</a>
            <ListGroup>
              {merchantUsers.map((user, i) => {
                return (
                  <ListGroup.Item key={i}>
                    <Row>
                      <Col sm={6}>
                        <div>メールアドレス: {user.email}</div>
                        <div>
                          <>{user.last_name}{user.first_name}</>
                        </div>
                        <div>
                          <>{user.last_name_kana}{user.first_name_kana}</>
                        </div>
                      </Col>
                      <Col sm={3}>
                        {user.authority_category === 'RootUser' && <div className='badge bg-info text-white mr10'>ルートユーザ</div>}
                        {user.email_authentication_status === 'Enabled' && <div className='badge bg-info'>本人確認済み</div>}
                        {user.email_authentication_status === 'Disabled' && <div className='badge bg-danger'>本人未認証</div>}
                        {user.authority_category !== 'RootUser' && <div className='mt10'><a  href={`/admin/user/${user.public_id}/permission`} className='btn btn-primary btn-sm'>権限設定</a></div>}
                      </Col>
                      <Col sm={3}>
                        {allowUpdateMerchantUser === 'Allow'
                          && user.authority_category !== 'RootUser'
                          && <div><a className='btn btn-primary btn-sm mb10' href={`/admin/user/${user.public_id}/edit`}>編集</a></div>}
                        {allowDeleteMerchantUser === 'Allow'
                          && user.authority_category !== 'RootUser' && <Button variant='danger' size='sm' onClick={() => deleteMerchantUser(user.public_id)}>削除</Button>}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )
              })}
            </ListGroup>
          </Col>
        </Row>
      </Container>}
      {allowReadMerchantUser === 'Forbid' && <Unauthorized />}
    </MerchantUserAdminLayout>
  )
}

export default Index
