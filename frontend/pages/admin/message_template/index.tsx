import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { Container, Row, Col, ListGroup, Card, Button, Form } from 'react-bootstrap'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { showCreateMessageTemplateModalChanged } from 'redux/messageTemplateSlice'
import { useCookies } from 'react-cookie'
import { useDispatch } from 'react-redux'
import { MessageTemplateParam } from 'interfaces/MessageTemplateParam'
import CreateMessageTemplateModal from 'components/templates/CreateMessageTemplateModal'
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
                        <Col>{message.name}</Col>
                        <Col></Col>
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
    </MerchantUserAdminLayout>
  )
}

export default Index
