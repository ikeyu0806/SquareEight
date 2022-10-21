import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { Container, Row, Col, ListGroup, Card, Button, Alert } from 'react-bootstrap'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { useCookies } from 'react-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import { MessageTemplateParam } from 'interfaces/MessageTemplateParam'
import CreateMessageTemplateModal from 'components/templates/CreateMessageTemplateModal'
import EditMessageTemplateModal from 'components/templates/EditMessageTemplateModal'
import SendMessageTemplateModal from 'components/templates/SendMessageTemplateModal'
import axios from 'axios'
import { showEditMessageTemplateModalChanged,
         showCreateMessageTemplateModalChanged,
         showSendMessageTemplateModalChanged,
         publicIdChanged,
         nameChanged,
         titleChanged,
         contentChanged,
         pageLinksChanged,
         pageLinkPaginationStateChanged,
         customersChanged,
         customerGroupsChanged,
         customerPaginationStateChanged } from 'redux/messageTemplateSlice'

const Index: NextPage = () => {
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const [messageTemplates, setMessageTemplates] = useState<MessageTemplateParam[]>()
  const pageLinkPaginationState = useSelector((state: RootState) => state.messageTemplate.pageLinkPaginationState)
  const customerPaginationState = useSelector((state: RootState) => state.messageTemplate.customerPaginationState)
  const servicePlan =  useSelector((state: RootState) => state.currentMerchantUser.servicePlan)

  useEffect(() => {
    axios.get(`${process.env.BACKEND_URL}/api/internal/message_templates`,
    {
      headers: {
        'Session-Id': cookies._square_eight_merchant_session
      }
    }).then((response) => {
      console.log(response.data)
      setMessageTemplates(response.data.message_templates)
      // ページリンク情報更新
      dispatch(pageLinksChanged(response.data.page_links))
      const pageLinksTotalPage = Math.ceil(response.data.page_links.length / pageLinkPaginationState.maxPerPage)
      dispatch(pageLinkPaginationStateChanged(Object.assign({ ...pageLinkPaginationState }, { totalPage: pageLinksTotalPage })))
      // 顧客情報更新
      dispatch(customersChanged(response.data.customers))
      const customersTotalPage = Math.ceil(response.data.customers.length / customerPaginationState.maxPerPage)
      dispatch(customerPaginationStateChanged(Object.assign({ ...customerPaginationState }, { totalPage: customersTotalPage })))
      // 顧客グループ情報更新
      dispatch(customerGroupsChanged(response.data.customer_groups))
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

  const showSendModal = (publicId: string, name: string, title: string, content: string) => {
    dispatch(showSendMessageTemplateModalChanged(true))
    dispatch(publicIdChanged(publicId))
    dispatch(nameChanged(name))
    dispatch(titleChanged(title))
    dispatch(contentChanged(content))
  }

  return (
    <MerchantUserAdminLayout>
      <Container>
        <Row>
          <Col lg={2}></Col>
          <Col lg={8}>
            <h3 className='mb20'>メッセージテンプレート</h3>
            <Button
              className='mb20'
              onClick={() => dispatch(showCreateMessageTemplateModalChanged(true))}>
              メッセージテンプレート作成
            </Button>
            <Card>
              <Card.Header>アンケート一覧</Card.Header>
                <ListGroup variant='flush'>
                {messageTemplates && messageTemplates.map((message, i) => {
                  return (
                    <ListGroup.Item key={i}>
                      <Row>
                        <Col>
                          <div className='text-center'>
                            {message.name}
                          </div>
                        </Col>
                        <Col>
                          <div className='text-center'>
                            メールのタイトル: {message.title}
                          </div>
                        </Col>
                        <Col>
                          <div className='text-center'>
                            <Button onClick={() => showEditModal(message.public_id, message.name, message.title, message.content)}>
                                編集
                              </Button>
                          </div>
                        </Col>
                        <Col>
                          <div className='text-center'>
                            <Button onClick={() => showSendModal(message.public_id, message.name, message.title,message.content)}>
                              メール送信
                            </Button>
                          </div>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )
                })}
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>
      <CreateMessageTemplateModal></CreateMessageTemplateModal>
      <EditMessageTemplateModal></EditMessageTemplateModal>
      <SendMessageTemplateModal></SendMessageTemplateModal>
    </MerchantUserAdminLayout>
  )
}

export default Index
