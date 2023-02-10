import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { Container, Row, Col, ListGroup, Table, Button } from 'react-bootstrap'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { useCookies } from 'react-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import { MessageTemplateParam } from 'interfaces/MessageTemplateParam'
import CreateMessageTemplateModal from 'components/templates/CreateMessageTemplateModal'
import EditMessageTemplateModal from 'components/templates/EditMessageTemplateModal'
import axios from 'axios'
import Unauthorized from 'components/templates/Unauthorized'
import SendMessageTemplateModal from 'components/templates/SendMessageTemplateModal'
import { customerPublicIdChanged } from 'redux/customerSlice'
import SendMailLimitAlert from 'components/atoms/SendMailLimitAlert'
import { selectedMessageTemplateChanged,
         showSendMessageTemplateModalChanged,
         messageTemplateTypeChanged } from 'redux/sendMailSlice'
import { showEditMessageTemplateModalChanged,
         showCreateMessageTemplateModalChanged,
         publicIdChanged,
         nameChanged,
         titleChanged,
         contentChanged,
         pageLinksChanged } from 'redux/messageTemplateSlice'
import { customersChanged, customerGroupsChanged } from 'redux/sendMailSlice'

const Index: NextPage = () => {
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const [messageTemplates, setMessageTemplates] = useState<MessageTemplateParam[]>()
  const allowReadMessageTemplate = useSelector((state: RootState) => state.merchantUserPermission.allowReadMessageTemplate)
  const allowCreateMessageTemplate = useSelector((state: RootState) => state.merchantUserPermission.allowCreateMessageTemplate)
  const allowUpdateMessageTemplate = useSelector((state: RootState) => state.merchantUserPermission.allowUpdateMessageTemplate)

  useEffect(() => {
    axios.get(`${process.env.BACKEND_URL}/api/internal/message_templates`,
    {
      headers: {
        'Session-Id': cookies._square_eight_merchant_session
      }
    }).then((response) => {
      console.log(response.data)
      dispatch(messageTemplateTypeChanged('messageTemplate'))
      setMessageTemplates(response.data.message_templates)
      // 顧客情報更新
      dispatch(customersChanged(response.data.customers))
      // 顧客グループ情報更新
      dispatch(customerGroupsChanged(response.data.customer_groups))
      dispatch(customerPublicIdChanged(response.data.customers[0].public_id))
      dispatch(publicIdChanged(response.data.customer_groups[0].public_id))
      dispatch(pageLinksChanged(response.data.page_links))
    }).catch((error) => {
      console.log(error)
    })
  }, [cookies._square_eight_merchant_session, dispatch])

  const showEditModal = (publicId: string, name: string, title: string, content: string) => {
    dispatch(showEditMessageTemplateModalChanged(true))
    dispatch(publicIdChanged(publicId))
    dispatch(nameChanged(name))
    dispatch(titleChanged(title))
    dispatch(contentChanged(content))
  }

  return (
    <MerchantUserAdminLayout>
      <SendMailLimitAlert />
      <br />
      {allowReadMessageTemplate === 'Allow' &&
      <Container>
        <h3 className='mb20'>メッセージテンプレート</h3>
        {allowCreateMessageTemplate === 'Allow' && <Button
          className='mb20'
          onClick={() => dispatch(showCreateMessageTemplateModalChanged(true))}>
          メッセージテンプレート作成
        </Button>}
        <Table bordered>
          <thead>
            <tr>
              <th>テンプレート名</th>
              <th>メールタイトル</th>
              <th>編集</th>
              <th>メール送信</th>
            </tr>
          </thead>
          <tbody>
            {messageTemplates && messageTemplates.map((message, i) => {
              return (
                <tr key={i}>
                  <td>{message.name}</td>
                  <td>{message.title}</td>
                  <td>
                    {allowUpdateMessageTemplate === 'Allow' && <Col>
                      <div className='text-center'>
                        <Button onClick={() => showEditModal(message.public_id, message.name, message.title, message.content)}>
                            編集
                        </Button>
                      </div>
                    </Col>}
                  </td>
                  <td className='text-center'>
                    <Button onClick={() => {
                      dispatch(selectedMessageTemplateChanged(message))
                      dispatch(showSendMessageTemplateModalChanged(true))
                      dispatch(titleChanged(message.title))
                      dispatch(contentChanged(message.content))
                    }}>送信</Button>
                  </td>
                </tr>
                )
              })}
          </tbody>
        </Table>
      </Container>}
      {allowReadMessageTemplate === 'Forbid' && <Unauthorized />}
      <CreateMessageTemplateModal></CreateMessageTemplateModal>
      <EditMessageTemplateModal></EditMessageTemplateModal>
      <SendMessageTemplateModal></SendMessageTemplateModal>
    </MerchantUserAdminLayout>
  )
}

export default Index
