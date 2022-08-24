import React, { useState } from 'react'
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
  const showAddFormModal = useSelector((state: RootState) => state.questionnaireMaster.showAddFormModal)
  const selectedFormType = useSelector((state: RootState) => state.questionnaireMaster.selectedFormType)

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
      <Modal show={showAddFormModal}>
        <Modal.Header>質問を追加</Modal.Header>
        <Modal.Body>
          <Form.Label>フォーム種別を選択してください</Form.Label>
          <Form.Check
            type='radio'
            label='テキスト'
            checked={selectedFormType === FORM_TYPE.TEXT}
            onChange={() => dispatch(selectedFormTypeChanged(FORM_TYPE.TEXT))}
            value={selectedFormType}></Form.Check>
          <Form.Check
            type='radio'
            label='プルダウン'
            checked={selectedFormType === String(FORM_TYPE.SELECT)}
            onChange={() => dispatch(selectedFormTypeChanged(FORM_TYPE.SELECT))}
            value={selectedFormType}></Form.Check>
          <Form.Check
            type='radio'
            label='チェックボックス'
            checked={selectedFormType === FORM_TYPE.CHECKBOX}
            onChange={() => dispatch(selectedFormTypeChanged(FORM_TYPE.CHECKBOX))}
            value={selectedFormType}></Form.Check>
          <Form.Check
            type='radio'
            label='ラジオボタン'
            checked={selectedFormType === FORM_TYPE.RADIO}
            onChange={() => dispatch(selectedFormTypeChanged(FORM_TYPE.RADIO))}
            value={selectedFormType}></Form.Check>
          <Form.Check
            type='radio'
            label='日付'
            checked={selectedFormType === FORM_TYPE.DATE}
            onChange={() => dispatch(selectedFormTypeChanged(FORM_TYPE.DATE))}
            value={selectedFormType}></Form.Check>
          <Form.Check
            type='radio'
            label='時刻'
            checked={selectedFormType === FORM_TYPE.DATETIME}
            onChange={() => dispatch(selectedFormTypeChanged(FORM_TYPE.DATETIME))}
            value={selectedFormType}></Form.Check>
          {selectedFormType === FORM_TYPE.TEXT && <><Form.Label
            className='mt20'>
            質問を入力してください
          </Form.Label>
          <Form.Control
            placeholder='例) 年齢 ご要望 商品の感想'></Form.Control>
          <Form.Label
            className='mt20'>
            回答フォームの行数を入力してください
          </Form.Label></>}
          <Form.Control
            type='number'></Form.Control>
        </Modal.Body>
        <Modal.Footer>
          <Button>追加する</Button>
          <Button
            onClick={() => dispatch(showAddFormModalChanged(false))}
            variant='secondary'>
            閉じる
          </Button>
        </Modal.Footer>
      </Modal>
    </MerchantUserAdminLayout>
  )
}

export default Master
