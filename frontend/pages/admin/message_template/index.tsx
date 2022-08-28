import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { Container, Row, Col, ListGroup, Card, Button, Form } from 'react-bootstrap'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { showCreateMessageTemplateModalChanged } from 'redux/messageTemplateSlice'
import { useCookies } from 'react-cookie'
import { useDispatch } from 'react-redux'
import CreateMessageTemplateModal from 'components/templates/CreateMessageTemplateModal'

const Index: NextPage = () => {
  const dispatch = useDispatch()

  return (
    <MerchantUserAdminLayout>
      <Container>
        <Row>
          <Col lg={2}></Col>
          <Col lg={8}>
            <h3>メッセージテンプレート</h3>
            <Button onClick={() => dispatch(showCreateMessageTemplateModalChanged(true))}>メッセージテンプレート作成</Button>
          </Col>
        </Row>
      </Container>
      <CreateMessageTemplateModal></CreateMessageTemplateModal>
    </MerchantUserAdminLayout>
  )
}

export default Index
