import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { Container, Row, Col, ListGroup, Card, Button, Form } from 'react-bootstrap'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { showEditMessageTemplateModalChanged,
         showCreateMessageTemplateModalChanged,
         idChanged,
         nameChanged,
         contentChanged } from 'redux/messageTemplateSlice'
import { useCookies } from 'react-cookie'
import { useDispatch } from 'react-redux'
import { MessageTemplateParam } from 'interfaces/MessageTemplateParam'
import CreateMessageTemplateModal from 'components/templates/CreateMessageTemplateModal'
import EditMessageTemplateModal from 'components/templates/EditMessageTemplateModal'
import axios from 'axios'

const Index: NextPage = () => {
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const [messageTemplates, setMessageTemplates] = useState<MessageTemplateParam[]>()

  useEffect(() => {
    axios.get(`${process.env.BACKEND_URL}/api/internal/message_templates`,
    {
      headers: {
        'Session-Id': cookies._square_eight_merchant_session
      }
    }).then((response) => {
      console.log(response.data)
      setMessageTemplates(response.data.message_templates)
    }).catch((error) => {
      console.log(error)
    })
  }, [cookies._square_eight_merchant_session])

  const showEditModal = (id: string, name: string, content: string) => {
    dispatch(showEditMessageTemplateModalChanged(true))
    dispatch(idChanged(id))
    dispatch(nameChanged(name))
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
                            <Button onClick={() => showEditModal(message.id, message.name, message.content)}>
                                編集
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
    </MerchantUserAdminLayout>
  )
}

export default Index
