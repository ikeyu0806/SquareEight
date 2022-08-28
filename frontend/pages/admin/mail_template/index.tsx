import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { Container, Row, Col, ListGroup, Card, Button, Form } from 'react-bootstrap'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { showCreateMailTemplateModalChanged } from 'redux/mailTemplateSlice'
import { useCookies } from 'react-cookie'
import { useDispatch } from 'react-redux'
import CreateMailTemplateModal from 'components/templates/CreateMailTemplateModal'

const Index: NextPage = () => {
  const dispatch = useDispatch()

  return (
    <MerchantUserAdminLayout>
      <Container>
        <Row>
          <Col lg={2}></Col>
          <Col lg={8}>
            <h3>メールテンプレート</h3>
            <Button onClick={() => dispatch(showCreateMailTemplateModalChanged(true))}>メールテンプレート作成</Button>
          </Col>
        </Row>
      </Container>
      <CreateMailTemplateModal></CreateMailTemplateModal>
    </MerchantUserAdminLayout>
  )
}

export default Index
