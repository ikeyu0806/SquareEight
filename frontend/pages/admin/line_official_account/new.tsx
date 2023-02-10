import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import { alertChanged } from 'redux/alertSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import Unauthorized from 'components/templates/Unauthorized'
import RegisterLineOfficialAccountForm from 'components/templates/RegisterLineOfficialAccountForm'

const New = () => {
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const router = useRouter()
  const dispatch = useDispatch()

  const name = useSelector((state: RootState) => state.lineOfficialAccount.name)
  const channelId = useSelector((state: RootState) => state.lineOfficialAccount.channelId)
  const channelSecret = useSelector((state: RootState) => state.lineOfficialAccount.channelSecret)
  const channelToken = useSelector((state: RootState) => state.lineOfficialAccount.channelToken)

  const allowUpdateLineOfficialAccount = useSelector((state: RootState) => state.merchantUserPermission.allowUpdateLineOfficialAccount)

  const onSubmit = () => {
    axios.post(`${process.env.BACKEND_URL}/api/internal/line_official_accounts/register_message_api_channel`,
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

  return (
    <MerchantUserAdminLayout>
      <br />
      {allowUpdateLineOfficialAccount === 'Allow' &&
      <Container>
        <Row>
          <Col lg={3}></Col>
          <Col lg={6}>
            <RegisterLineOfficialAccountForm></RegisterLineOfficialAccountForm>
            <Button className='mt20' onClick={onSubmit}>登録する</Button>
          </Col>
        </Row>
      </Container>}
      {allowUpdateLineOfficialAccount === 'Forbid' && <Unauthorized />}
    </MerchantUserAdminLayout>
  )
}

export default New
