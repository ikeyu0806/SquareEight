import React, { useEffect, useState } from 'react'
import { NextPage } from 'next'
import { Container, Row, Col, ListGroup, Button } from 'react-bootstrap'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { LineOfficialAccountParam } from 'interfaces/LineOfficialAccountParam'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { swalWithBootstrapButtons } from 'constants/swalWithBootstrapButtons'
import LineBrandColorButton from 'components/atoms/LineBrandColorButton'
import { useRouter } from 'next/router'
import { showPushMessageModalChanged, publicIdChanged } from 'redux/lineOfficialAccountSlice'
import { useDispatch } from 'react-redux'
import BroadcastLineAccountFriendsModal from 'components/templates/BroadcastLineAccountFriendsModal'

const Index: NextPage = () => {
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const router = useRouter()
  const dispatch = useDispatch()
  const [lineOfficialAccounts, setLineOfficialAccounts] = useState<LineOfficialAccountParam[]>([])

  useEffect(() => {
    axios.get(`${process.env.BACKEND_URL}/api/internal/line_official_accounts`,
    {
      headers: {
        'Session-Id': cookies._square_eight_merchant_session
      }
    }).then((response) => {
      console.log(response.data)
      setLineOfficialAccounts(response.data.line_official_accounts)
    }).catch((error) => {
      console.log(error)
    })
  }, [cookies._square_eight_merchant_session])

  const copyWebhookUrl = (url: string) => {
    navigator.clipboard.writeText(`${process.env.FRONTEND_URL}${url}`)
    .then(() => {
      swalWithBootstrapButtons.fire({
        title: 'コピーしました',
        icon: 'info'
      })
    },(err) => {
      swalWithBootstrapButtons.fire({
        title: 'コピー失敗しました',
        icon: 'error'
      })
    })
  }

  return (
    <MerchantUserAdminLayout>
      <Container>
        <Row>
          <Col lg={2}></Col>
          <Col lg={8}>
            <LineBrandColorButton text='LINE公式アカウントを登録する' onClick={() => router.push('/admin/line_official_account/new')}></LineBrandColorButton>
            <div className='mt20'>公式アカウント一覧</div>
            <ListGroup>
              {lineOfficialAccounts.map((account, i) => {
                return (
                  <ListGroup.Item key={i}>
                    <Row>
                      <Col>
                        <div>アカウント名: {account.name}</div>
                      </Col>
                      <Col>
                        <LineBrandColorButton text='友だち一覧' onClick={() => router.push(`/admin/line_official_account/${account.public_id}/line_user`)} />
                        <div className='mt10'>
                          <LineBrandColorButton
                            text='友だち全員にメッセージを送信'
                            onClick={() => {
                              dispatch(showPushMessageModalChanged(true));
                              dispatch(publicIdChanged(account.public_id))
                            }}/>
                        </div>
                      </Col>
                    </Row>
                    <div className='mt10'>
                      <div>Webhook Url
                        <Button size='sm' variant='info' className='text-white ml10' onClick={() => copyWebhookUrl(account.messaging_api_webhook_url)}>コピー</Button></div>
                        <div className='bg-gray mt10'>{account.messaging_api_webhook_url}
                      </div>
                    </div>
                  </ListGroup.Item>
                )
              })}
            </ListGroup>
          </Col>
        </Row>
      </Container>
      <BroadcastLineAccountFriendsModal />
    </MerchantUserAdminLayout>
  )
}

export default Index
