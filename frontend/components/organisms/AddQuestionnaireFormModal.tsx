import React, { useState } from 'react'
import { Form, Button, Modal, Row, Col } from 'react-bootstrap'
import { FORM_TYPE } from 'constants/formType'
import { useDispatch, useSelector } from 'react-redux'
import { QuestionnaireMasterItem } from 'interfaces/QuestionnaireMasterItem'
import { RootState } from 'redux/store'
import { showAddFormModalChanged,
         selectedFormTypeChanged,
         textFormRowCountChanged,
         questionChanged,
         selectFormAnswersChanged,
         radioButtonAnswersChanged,
         checkboxAnswersChanged,
         currentMaxSortOrderChanged,
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
  const questionnaireMasterItems = useSelector((state: RootState) => state.questionnaireMaster.questionnaireMasterItems)
  const currentMaxSortOrder = useSelector((state: RootState) => state.questionnaireMaster.currentMaxSortOrder)
  
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

  const onSubmit = () => {
    let updateQuestionnaireMasterItems: QuestionnaireMasterItem[]
    updateQuestionnaireMasterItems = [...questionnaireMasterItems, { question: question,
                                                                     formType: selectedFormType,
                                                                     textFormRowCount: textFormRowCount,
                                                                     selectFormAnswers: selectFormAnswers,
                                                                     radioButtonAnswers: radioButtonAnswers,
                                                                     checkboxAnswers: checkboxAnswers,
                                                                     questionId: new Date().getTime().toString(16),
                                                                     sortOrder: currentMaxSortOrder + 1 }]
    dispatch(questionnaireMasterItemsChanged(updateQuestionnaireMasterItems))
    dispatch(showAddFormModalChanged(false))
    dispatch(currentMaxSortOrderChanged(currentMaxSortOrder + 1))
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
            checked={selectedFormType === FORM_TYPE.SELECT}
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
            min={1}
            onChange={(e) => dispatch(textFormRowCountChanged(Number(e.target.value)))}
            type='number'></Form.Control>
          <Form.Label className='mt20'>プレビュー</Form.Label>
          {textFormRowCount >= 2 ? <Form.Control as='textarea' rows={textFormRowCount}></Form.Control> : <Form.Control></Form.Control>}
          </>}
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
              <Form.Label className='mt20'>プレビュー</Form.Label>
              <Form.Select className='mt10'>
                <option>選択してください</option>
                {selectFormAnswers.map((answer, i) => {
                  return (
                    <option key={i}>{answer}</option>
                  )
                })}
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
              <Form.Label className='mt20'>プレビュー</Form.Label>
              {checkboxAnswers.map((answer, i) => {
                return (
                  <Form.Check type='checkbox' label={answer} key={i} />
                )
              })}
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
              <Form.Label className='mt20'>プレビュー</Form.Label>
              {radioButtonAnswers.map((answer, i) => {
                return (
                  <Form.Check type='radio' label={answer} key={i} name='preview' />
                )
              })}
            </>}
            {selectedFormType === FORM_TYPE.DATE &&
            <>
              <Form.Label className='mt20'>プレビュー</Form.Label>
              <Form.Control
                type='date'>
              </Form.Control>
            </>}
            {selectedFormType === FORM_TYPE.TIME &&
            <>
              <Form.Label className='mt20'>プレビュー</Form.Label>
              <Form.Control
                type='time'>
              </Form.Control>
            </>}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => onSubmit()}>追加する</Button>
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
