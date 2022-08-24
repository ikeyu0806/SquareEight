import React, { useState } from 'react'
import { Form, Button, Modal, Row, Col } from 'react-bootstrap'
import { FORM_TYPE } from 'constants/formType'
import { useDispatch, useSelector } from 'react-redux'
import { questionnaireMasterItem } from 'interfaces/questionnaireMasterItems'
import { RootState } from 'redux/store'
import { showAddFormModalChanged,
         selectedFormTypeChanged,
         textFormRowCountChanged,
         questionChanged,
         selectFormAnswersChanged,
         radioButtonAnswersChanged,
         checkboxAnswersChanged,
         questionnaireMasterItemsChanged } from 'redux/questionnaireMasterSlice'

const AddQuestionnaireFormModal = (): JSX.Element => {
  const dispatch = useDispatch()

  const [currentSelectInput, setCurrentSelectInput] = useState('')
  const [currentCheckboxInput, setCurrentCheckboxInput] = useState('')
  const [currentRadioInput, setCurrentRadioInput] = useState('')

  const showAddFormModal = useSelector((state: RootState) => state.questionnaireMaster.showAddFormModal)
  const selectedFormType = useSelector((state: RootState) => state.questionnaireMaster.selectedFormType)
  const question = useSelector((state: RootState) => state.questionnaireMaster.question)
  const textFormRowCount = useSelector((state: RootState) => state.questionnaireMaster.textFormRowCount)
  const selectFormAnswers = useSelector((state: RootState) => state.questionnaireMaster.selectFormAnswers)
  const checkboxAnswers = useSelector((state: RootState) => state.questionnaireMaster.checkboxAnswers)
  const radioButtonAnswers = useSelector((state: RootState) => state.questionnaireMaster.radioButtonAnswers)

  const addSelectFormAnswers = () => {
    let updateSelectFormAnswers: string[]
    updateSelectFormAnswers = [...selectFormAnswers, currentSelectInput]
    dispatch(selectFormAnswersChanged(updateSelectFormAnswers))
  }

  const addCheckboxAnswers = () => {
    let updateCheckboxAnswers: string[]
    updateCheckboxAnswers = [...checkboxAnswers, currentCheckboxInput]
    dispatch(checkboxAnswersChanged(updateCheckboxAnswers))
  }

  const addRadioAnswers = () => {
    let updateRadioAnswers: string[]
    updateRadioAnswers = [...radioButtonAnswers, currentRadioInput]
    dispatch(radioButtonAnswersChanged(updateRadioAnswers))
  }

  return (
    <>
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
            checked={selectedFormType === FORM_TYPE.TIME}
            onChange={() => dispatch(selectedFormTypeChanged(FORM_TYPE.TIME))}
            value={selectedFormType}></Form.Check>
          <div className='mb20'>
            <Form.Label
              className='mt20'>
              質問を入力してください
            </Form.Label>
            <Form.Control
              value={question}
              onChange={(e) => dispatch(questionChanged(e.target.value))}
              placeholder='例) 年齢 ご要望 商品の感想'></Form.Control>
          </div>
          {selectedFormType === FORM_TYPE.TEXT && <>
          <Form.Label>
            回答フォームの行数を入力してください
          </Form.Label>
          <Form.Control
            value={textFormRowCount}
            onChange={(e) => dispatch(textFormRowCountChanged(Number(e.target.value)))}
            type='number'></Form.Control></>}
          {selectedFormType === FORM_TYPE.SELECT &&
            <>
              <Form.Label>回答を入力してください</Form.Label>
              <Row>
                <Col sm={9}>
                  <Form.Control
                    value={currentSelectInput}
                    onChange={(e) => setCurrentSelectInput(e.target.value)}
                    placeholder='例） 10代 20代'></Form.Control>
                </Col>
                <Col>
                  <Button size='sm'
                          onClick={() => addSelectFormAnswers()}>追加</Button>
                </Col>
              </Row>
              <Form.Select className='mt10'>
              </Form.Select>
            </>}
            {selectedFormType === FORM_TYPE.CHECKBOX &&
            <>
              <Form.Label>回答を入力してください</Form.Label>
              <Row>
                <Col sm={9}>
                  <Form.Control
                    value={currentCheckboxInput}
                    onChange={(e) => setCurrentCheckboxInput(e.target.value)}
                    placeholder='例） 10代 20代'></Form.Control>
                </Col>
                <Col>
                  <Button size='sm'
                          onClick={() => addCheckboxAnswers()}>追加</Button>
                </Col>
              </Row>
            </>}
            {selectedFormType === FORM_TYPE.RADIO &&
            <>
              <Form.Label>回答を入力してください</Form.Label>
              <Row>
                <Col sm={9}>
                  <Form.Control
                    value={currentRadioInput}
                    onChange={(e) => setCurrentRadioInput(e.target.value)}
                    placeholder='例） 10代 20代'></Form.Control>
                </Col>
                <Col>
                  <Button size='sm'
                          onClick={() => addRadioAnswers()}>追加</Button>
                </Col>
              </Row>
            </>}
            {selectedFormType === FORM_TYPE.DATE &&
            <Form.Control
              type='date'>
            </Form.Control>}
            {selectedFormType === FORM_TYPE.TIME &&
            <Form.Control
              type='time'>
            </Form.Control>}
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
    </>
  )
}

export default AddQuestionnaireFormModal
