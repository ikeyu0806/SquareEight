import React from 'react'
import { Form } from 'react-bootstrap'
import { FORM_TYPE } from 'constants/formType'
import { useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import UpdateQuestionnaireStateIcons from 'components/organisms/UpdateQuestionnaireStateIcons'

interface Props {
  showUpdateQuestionnaireStateIcons?: boolean
}

const QuestionnaireMasterRender = ({showUpdateQuestionnaireStateIcons}: Props) => {
  const questionnaireMasterItems = useSelector((state: RootState) => state.questionnaireMaster.questionnaireMasterItems)

  return (
    <>
      {questionnaireMasterItems.map((item, i) => {
        switch (item.formType) {
          case FORM_TYPE.TEXT:
            return (
              <span key={i}>
                <Form.Label className='mt20'>{item.question}</Form.Label>
                {item.textFormRowCount && item.textFormRowCount >= 2 ? <Form.Control as='textarea' rows={item.textFormRowCount}></Form.Control> : <Form.Control></Form.Control>}
                {showUpdateQuestionnaireStateIcons && <UpdateQuestionnaireStateIcons questionId={item.questionId} sortOrder={item.sortOrder} />}
              </span>
            )
          case FORM_TYPE.SELECT:
            return (
              <span key={i}>
                <Form.Label className='mt20'>{item.question}</Form.Label>
                <Form.Select className='mt10'>
                  <option>選択してください</option>
                  {item.selectFormAnswers && item.selectFormAnswers.map((answer, i2) => {
                    return (
                      <option key={1 + i2}>{answer}</option>
                    )
                  })}
                </Form.Select>
                {showUpdateQuestionnaireStateIcons && <UpdateQuestionnaireStateIcons questionId={item.questionId} sortOrder={item.sortOrder} />}
              </span>
            )
          case FORM_TYPE.CHECKBOX:
            return (
              <span key={i}>
                <Form.Label className='mt20'>{item.question}</Form.Label>
                {item.checkboxAnswers && item.checkboxAnswers.map((answer, i2) => {
                  return (
                    <Form.Check type='checkbox' label={answer} key={2 + i2} />
                  )
                })}
                {showUpdateQuestionnaireStateIcons && <UpdateQuestionnaireStateIcons questionId={item.questionId} sortOrder={item.sortOrder} />}
              </span>
            )
          case FORM_TYPE.RADIO:
            return (
              <span key={i}>
                <Form.Label className='mt20'>{item.question}</Form.Label>
                {item.radioButtonAnswers && item.radioButtonAnswers.map((answer, i2) => {
                  return (
                    <Form.Check type='radio' label={answer} key={3 + i2} name='preview' />
                  )
                })}
                {showUpdateQuestionnaireStateIcons && <UpdateQuestionnaireStateIcons questionId={item.questionId} sortOrder={item.sortOrder} />}
              </span>
            )
          case FORM_TYPE.DATE:
            return (
              <span key={i}>
                <Form.Label className='mt20'>{item.question}</Form.Label>
                <Form.Control
                  type='date'>
                </Form.Control>
                {showUpdateQuestionnaireStateIcons && <UpdateQuestionnaireStateIcons questionId={item.questionId} sortOrder={item.sortOrder} />}
              </span>
            )
          case FORM_TYPE.TIME:
            return (
              <span key={i}>
                <Form.Label className='mt20'>{item.question}</Form.Label>
                <Form.Control
                  type='time'>
                </Form.Control>
                {showUpdateQuestionnaireStateIcons && <UpdateQuestionnaireStateIcons questionId={item.questionId} sortOrder={item.sortOrder} />}
              </span>
            )
          default:
            console.log('invalid block')
        }
      })}
    </>
  )
}

export default QuestionnaireMasterRender
