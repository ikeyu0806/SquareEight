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
import { messageTemplatesChanged } from 'redux/accountSlice'
import { useDispatch, useSelector } from 'react-redux'
import BroadcastLineAccountFriendsModal from 'components/templates/BroadcastLineAccountFriendsModal'
import { RootState } from 'redux/store'
import Unauthorized from 'components/templates/Unauthorized'
import { sendTargetTypeChanged } from 'redux/sendLineScheduleSlice'
import { selectedLineOfficialAccountPublicIdChanged } from 'redux/sendLineScheduleSlice'

const Index: NextPage = () => {
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const router = useRouter()
  const dispatch = useDispatch()
  const [lineOfficialAccounts, setLineOfficialAccounts] = useState<LineOfficialAccountParam[]>([])
  const allowReadLineOfficialAccount = useSelector((state: RootState) => state.merchantUserPermission.allowReadLineOfficialAccount)

  useEffect(() => {
    axios.get(`${process.env.BACKEND_URL}/api/internal/line_official_accounts`,
    {
      headers: {
        'Session-Id': cookies._square_eight_merchant_session
      }
    }).then((response) => {
      dispatch(sendTargetTypeChanged('lineOfficialAccountAllUser'))
      setLineOfficialAccounts(response.data.line_official_accounts)
      dispatch(messageTemplatesChanged(response.data.message_templates))
    }).catch((error) => {
      console.log(error)
    })
  }, [cookies._square_eight_merchant_session, dispatch])

  const copyWebhookUrl = (url: string) => {
    navigator.clipboard.writeText(`${url}`)
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
      <br />
      {allowReadLineOfficialAccount === 'Allow' && <Container>
        <Row>
          <Col lg={2}></Col>
          <Col lg={8}>
            <LineBrandColorButton text='LINE公式アカウントを登録する' onClick={() => router.push('/admin/line_official_account/new')}></LineBrandColorButton>
            <a target='_blank' rel='noreferrer'
              className='ml10'
              href='https://square-eight-method.net/2023/01/07/%e3%80%90squareeight%e3%80%91line%e5%85%ac%e5%bc%8f%e3%82%a2%e3%82%ab%e3%82%a6%e3%83%b3%e3%83%88%e3%81%a8%e3%81%ae%e9%80%a3%e6%90%ba%e6%89%8b%e9%a0%86/'>
                登録手順はこちら
            </a>
            <div className='mt20'>公式アカウント一覧</div>
            <div className='mt10 mb10'>※友だち一覧にはSquareEightと連携後に友だち追加かメッセージのやり取りがあったユーザのみ表示されます。</div>
            <ListGroup>
              {lineOfficialAccounts.map((account, i) => {
                return (
                  <ListGroup.Item key={i}>
                    <Row>
                      <Col>
                        <div>アカウント名: {account.name}</div>
                        <a href={`/admin/line_official_account/${account.public_id}/edit`} 
                           className='btn btn-primary mt10'>編集</a>
                      </Col>
                      <Col>
                        {(account.channel_id && account.channel_secret && account.channel_token) &&
                        <>
                          <LineBrandColorButton text='友だち一覧' onClick={() => router.push(`/admin/line_official_account/${account.public_id}/line_user`)} />
                          <div className='mt10'>
                            <LineBrandColorButton
                              text='友だち全員にメッセージを送信'
                              onClick={() => {
                                dispatch(showPushMessageModalChanged(true));
                                dispatch(publicIdChanged(account.public_id))
                                dispatch(selectedLineOfficialAccountPublicIdChanged(account.public_id))
                              }}/>
                          </div>
                        </>}
                        {!account.channel_id && <div className='color-red'>Channel IDが未登録です</div>}
                        {!account.channel_secret && <div className='color-red'>Channel secretが未登録です</div>}
                        {!account.channel_token && <div className='color-red'>Channel tokenが未登録です</div>}
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
      </Container>}
      {allowReadLineOfficialAccount === 'Forbid' && <Unauthorized />}
      <BroadcastLineAccountFriendsModal />
    </MerchantUserAdminLayout>
  )
}

export default Index
