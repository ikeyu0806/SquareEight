import React from 'react'
import AddQuestionnaireFormModal from 'components/templates/AddQuestionnaireFormModal'
import type { NextPage } from 'next'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import PlusCircleIcon from 'components/atoms/PlusCircleIcon'
import { Card, Row, Col, Navbar, Container, Form, Button, Modal } from 'react-bootstrap'
import { FORM_TYPE } from 'constants/formType'
import { useDispatch, useSelector } from 'react-redux'
import { showAddFormModalChanged, selectedFormTypeChanged } from 'redux/questionnaireMasterSlice'
import { RootState } from 'redux/store'

const Master: NextPage = () => {
  const dispatch = useDispatch()

  return (
    <MerchantUserAdminLayout>
      <Container>
        <Row>
          <Col lg={3}></Col>
          <Col lg={6}>
            <Card>
              <Card.Header>アンケート作成</Card.Header>
              <Card.Body>
                <Form.Label>アンケートのタイトル</Form.Label>
                <Form.Control></Form.Control>
                <Form.Label>アンケートの説明</Form.Label>
                <Form.Control as='textarea' rows={5}></Form.Control>
                <div className='text-center mt30 mb30'>
                  <span className='mr10'>質問を追加</span>
                  <a onClick={() => dispatch(showAddFormModalChanged(true))}><PlusCircleIcon width={40} height={40} fill={'#0000FF'} /></a>
                </div>
                <div className='text-center mt30'>
                  <Button>登録する</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <AddQuestionnaireFormModal></AddQuestionnaireFormModal>
    </MerchantUserAdminLayout>
  )
}

export default Master
