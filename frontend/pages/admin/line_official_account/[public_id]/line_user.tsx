import React, { useEffect, useState } from 'react'
import { NextPage } from 'next'
import { Container, Row, Col, ListGroup } from 'react-bootstrap'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import PushIndividualLineMessageModal from 'components/templates/PushIndividualLineMessageModal'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'
import { LineUserParam } from 'interfaces/LineUserParam'
import lineUserStyles from 'styles/LineUser.module.css'
import { showPushMessageModalChanged, publicIdChanged } from 'redux/lineOfficialAccountSlice'
import { messageTemplatesChanged } from 'redux/accountSlice'
import { lineUserPublicIdChanged } from 'redux/lineUserSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import LineBrandColorButton from 'components/atoms/LineBrandColorButton'
import { sendTargetTypeChanged } from 'redux/sendLineScheduleSlice'
import { selectedLineUserChanged, selectedLineOfficialAccountPublicIdChanged } from 'redux/sendLineScheduleSlice'

const LineUser: NextPage = () => {
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const router = useRouter()
  const dispatch = useDispatch()
  const [lineUsers, setLineUsers] = useState<LineUserParam[]>([])
  const allowConnectLineUser = useSelector((state: RootState) => state.merchantUserPermission.allowConnectLineUser)
  const allowSendLineMessage = useSelector((state: RootState) => state.merchantUserPermission.allowSendLineMessage)
  const allowReadLineUser = useSelector((state: RootState) => state.merchantUserPermission.allowReadLineUser)

  useEffect(() => {
    axios.get(`${process.env.BACKEND_URL}/api/internal/line_official_accounts/${router.query.public_id}/line_users`,
    {
      headers: {
        'Session-Id': cookies._square_eight_merchant_session
      }
    }).then((response) => {
      console.log(response.data)
      dispatch(sendTargetTypeChanged('lineUser'))
      dispatch(selectedLineOfficialAccountPublicIdChanged(String(router.query.public_id)))
      setLineUsers(response.data.line_users)
      dispatch(publicIdChanged(String(router.query.public_id)))
      dispatch(messageTemplatesChanged(response.data.message_templates))
    }).catch((error) => {
      console.log(error)
    })
  }, [cookies._square_eight_merchant_session, router.query.public_id, dispatch])

  const clickSendMessageButton = (lineUser: LineUserParam) => {
    dispatch(showPushMessageModalChanged(true))
    dispatch(lineUserPublicIdChanged(lineUser.public_id))
    dispatch(selectedLineUserChanged(lineUser))
  }

  return (
    <MerchantUserAdminLayout>
      {allowReadLineUser === 'Allow' &&
      <Container>
        <Row>
          <Col lg={3}></Col>
          <Col lg={6}>
            <h3 className='mb20'>友だち一覧</h3>
            <ListGroup>
              {lineUsers.map((line_user, i) => {
                return (
                  <ListGroup.Item key={i}>
                    <Row>
                      {allowConnectLineUser === 'Allow' && <Col>
                        <img
                          className={lineUserStyles.line_picture_url}
                          src={line_user.line_picture_url}
                          alt='line_picture_url' />
                        <span className='ml10'>{line_user.line_display_name}</span>
                      </Col>}
                      {allowSendLineMessage === 'Allow' &&
                      <Col>
                        <LineBrandColorButton
                          text='メッセージを送る'
                          onClick={() => clickSendMessageButton(line_user)}
                        ></LineBrandColorButton>
                      </Col>}
                    </Row>
                  </ListGroup.Item>
                )
              })}
            </ListGroup>
          </Col>
        </Row>
      </Container>}
      <PushIndividualLineMessageModal></PushIndividualLineMessageModal>
    </MerchantUserAdminLayout>
  )
}

export default LineUser
