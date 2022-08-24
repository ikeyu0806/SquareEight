import React, { useState } from 'react'
import type { NextPage } from 'next'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import PlusCircleIcon from 'components/atoms/PlusCircleIcon'
import { Card, Row, Col, Navbar, Container, Form, Button, Modal } from 'react-bootstrap'
import { FORM_TYPE } from 'constants/formType'

const Master: NextPage = () => {
  const [showModal, setShowModal] = useState(false)
  const [selectedFormType, setSelectedFormType] = useState(String(FORM_TYPE.TEXT))

  return (
    <MerchantUserAdminLayout>
      <Container>
        <Row>
          <Col lg={3}></Col>
          <Col lg={6}>
            <Card>
              <Card.Header>アンケート作成</Card.Header>
              <Card.Body>
                <div className='text-center mt30 mb30'>
                  <span className='mr10'>質問を追加</span>
                  <a onClick={() => setShowModal(true)}><PlusCircleIcon width={40} height={40} fill={'#0000FF'} /></a>
                </div>
                <div className='text-center mt30'>
                  <Button>登録する</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Modal show={showModal}>
        <Modal.Header>質問を追加</Modal.Header>
        <Modal.Body>
          <Form.Label>フォーム種別を選択してください</Form.Label>
          <Form.Check
            type='radio'
            label='テキスト'
            checked={selectedFormType === FORM_TYPE.TEXT}
            onChange={() => setSelectedFormType(FORM_TYPE.TEXT)}
            value={selectedFormType}></Form.Check>
          <Form.Check
            type='radio'
            label='プルダウン'
            checked={selectedFormType === String(FORM_TYPE.SELECT)}
            onChange={() => setSelectedFormType(FORM_TYPE.SELECT)}
            value={selectedFormType}></Form.Check>
          <Form.Check
            type='radio'
            label='チェックボックス'
            checked={selectedFormType === FORM_TYPE.CHECKBOX}
            onChange={() => setSelectedFormType(FORM_TYPE.CHECKBOX)}
            value={selectedFormType}></Form.Check>
          <Form.Check
            type='radio'
            label='ラジオボタン'
            checked={selectedFormType === FORM_TYPE.RADIO}
            onChange={() => setSelectedFormType(FORM_TYPE.RADIO)}
            value={selectedFormType}></Form.Check>
          <Form.Check
            type='radio'
            label='日付'
            checked={selectedFormType === FORM_TYPE.DATE}
            onChange={() => setSelectedFormType(FORM_TYPE.DATE)}
            value={selectedFormType}></Form.Check>
          <Form.Check
            type='radio'
            label='時刻'
            checked={selectedFormType === FORM_TYPE.DATETIME}
            onChange={() => setSelectedFormType(FORM_TYPE.DATETIME)}
            value={selectedFormType}></Form.Check>
          <Form.Label
            className='mt20'>
            質問を入力してください
          </Form.Label>
          <Form.Control
            placeholder='例) 年齢 ご要望 商品の感想'></Form.Control>
          <Form.Label
            className='mt20'>
            回答フォームの行数を入力してください
          </Form.Label>
          <Form.Control
            type='number'></Form.Control>
        </Modal.Body>
        <Modal.Footer>
          <Button>追加する</Button>
          <Button
            onClick={() => setShowModal(false)}
            variant='secondary'>
            閉じる
          </Button>
        </Modal.Footer>
      </Modal>
    </MerchantUserAdminLayout>
  )
}

export default Master
