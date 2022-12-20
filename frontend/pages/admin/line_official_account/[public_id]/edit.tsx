import React, { useEffect } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import { alertChanged } from 'redux/alertSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import { nameChanged,
         channelIdChanged,
         channelSecretChanged,
         channelTokenChanged } from 'redux/lineOfficialAccountSlice'
import Unauthorized from 'components/templates/Unauthorized'
import RegisterLineOfficialAccountForm from 'components/templates/RegisterLineOfficialAccountForm'
import { swalWithBootstrapButtons } from 'constants/swalWithBootstrapButtons'

const Edit = () => {
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const router = useRouter()
  const dispatch = useDispatch()

  const name = useSelector((state: RootState) => state.lineOfficialAccount.name)
  const channelId = useSelector((state: RootState) => state.lineOfficialAccount.channelId)
  const channelSecret = useSelector((state: RootState) => state.lineOfficialAccount.channelSecret)
  const channelToken = useSelector((state: RootState) => state.lineOfficialAccount.channelToken)

  const allowUpdateLineOfficialAccount = useSelector((state: RootState) => state.merchantUserPermission.allowUpdateLineOfficialAccount)

  useEffect(() => {
    axios.get(`${process.env.BACKEND_URL}/api/internal/line_official_accounts/${router.query.public_id}`,
    {
      headers: {
        'Session-Id': cookies._square_eight_merchant_session
      }
    }).then((response) => {
      dispatch(nameChanged(response.data.line_official_account.name))
      dispatch(channelIdChanged(response.data.line_official_account.channel_id))
      dispatch(channelSecretChanged(response.data.line_official_account.channel_secret))
      dispatch(channelTokenChanged(response.data.line_official_account.channel_token))
    }).catch((error) => {
      console.log(error)
    })
  }, [cookies._square_eight_merchant_session, router, dispatch])

  const onSubmit = () => {
    axios.post(`${process.env.BACKEND_URL}/api/internal/line_official_accounts/${router.query.public_id}/update`,
    {
      line_official_account: {
        name: name,
        channel_id: channelId,
        channel_secret: channelSecret,
        channel_token: channelToken
      }
    },
    {
      headers: {
        'Session-Id': cookies._square_eight_merchant_session
      }
    }).then(response => {
      router.push('/admin/line_official_account')
      dispatch(alertChanged({message: '登録しました', show: true}))
    }).catch(error => {
      dispatch(alertChanged({message: error, show: true, type: 'danger'}))
    })
  }

  const deleteLineOfficialAccount = () => {
    swalWithBootstrapButtons.fire({
      title: '連携を解除します',
      html: `SquareEightとの連携を解除します。<br />よろしいですか？`,
      icon: 'question',
      confirmButtonText: '解除する',
      cancelButtonText: 'キャンセル',
      showCancelButton: true,
      showCloseButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${process.env.BACKEND_URL}/api/internal/line_official_accounts/${router.query.public_id}`, {
          headers: { 
            'Session-Id': cookies._square_eight_merchant_session
          }
        }).then(response => {
          swalWithBootstrapButtons.fire({
            title: '解除しました',
            icon: 'info'
          })
          location.reload()
        }).catch(error => {
          swalWithBootstrapButtons.fire({
            title: '解除失敗しました',
            icon: 'error'
          })
        })
      }
    })
  }

  return (
    <MerchantUserAdminLayout>
      {allowUpdateLineOfficialAccount === 'Allow' &&
      <Container>
        <Row>
          <Col lg={3}></Col>
          <Col lg={6}>
            <Row>
              <Col sm={9}></Col>
              <Col>
                <Button
                  variant='danger' onClick={deleteLineOfficialAccount}>連携解除</Button>
              </Col>
            </Row>
            <RegisterLineOfficialAccountForm></RegisterLineOfficialAccountForm>
            <Button className='mt20' onClick={onSubmit}>登録する</Button>
          </Col>
        </Row>
      </Container>}
      {allowUpdateLineOfficialAccount === 'Forbid' && <Unauthorized />}
    </MerchantUserAdminLayout>
  )
}

export default Edit
