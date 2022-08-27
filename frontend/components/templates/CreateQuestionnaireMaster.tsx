import React from 'react'
import PlusCircleIcon from 'components/atoms/PlusCircleIcon'
import RequireBadge from 'components/atoms/RequireBadge'
import { Form } from 'react-bootstrap'
import { FORM_TYPE } from 'constants/formType'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import UpdateQuestionnaireStateIcons from 'components/organisms/UpdateQuestionnaireStateIcons'
import { titleChanged,
         descriptionChanged,
         showAddFormModalChanged } from 'redux/questionnaireMasterSlice'

const CreateQuestionnaireMaster = (): JSX.Element => {
  const dispatch = useDispatch()
  const questionnaireMasterItems = useSelector((state: RootState) => state.questionnaireMaster.questionnaireMasterItems)
  const title = useSelector((state: RootState) => state.questionnaireMaster.title)
  const description = useSelector((state: RootState) => state.questionnaireMaster.description)
  return (
    <>
      <Form.Label>アンケートのタイトル<RequireBadge></RequireBadge></Form.Label>
      <Form.Control
        value={title}
        onChange={(e) => dispatch(titleChanged(e.target.value))}></Form.Control>
      <Form.Label>アンケートの説明</Form.Label>
      <Form.Control
        value={description}
        onChange={(e) => dispatch(descriptionChanged(e.target.value))}
        as='textarea'
        rows={5}></Form.Control>
      <div className='mt20'>お名前、電話番号、メールアドレスの項目は自動で追加されます。</div>
      <Form.Label className='mt20'>お名前</Form.Label>
      <Form.Control disabled></Form.Control>
      <Form.Label className='mt20'>電話番号</Form.Label>
      <Form.Control disabled></Form.Control>
      <Form.Label className='mt20'>メールアドレス</Form.Label>
      <Form.Control disabled></Form.Control>
      {questionnaireMasterItems.map((item, i) => {
        switch (item.formType) {
          case FORM_TYPE.TEXT:
            return (
              <>
                <Form.Label className='mt20'>{item.question}</Form.Label>
                {item.textFormRowCount && item.textFormRowCount >= 2 ? <Form.Control as='textarea' rows={item.textFormRowCount}></Form.Control> : <Form.Control></Form.Control>}
                <UpdateQuestionnaireStateIcons questionId={item.questionId} sortOrder={item.sortOrder}></UpdateQuestionnaireStateIcons>
              </>
            )
          case FORM_TYPE.SELECT:
            return (
              <>
                <Form.Label className='mt20'>{item.question}</Form.Label>
                <Form.Select className='mt10'>
                  <option>選択してください</option>
                  {item.selectFormAnswers && item.selectFormAnswers.map((answer, i) => {
                    return (
                      <><option key={i}>{answer}</option></>
                    )
                  })}
                </Form.Select>
                <UpdateQuestionnaireStateIcons questionId={item.questionId} sortOrder={item.sortOrder}></UpdateQuestionnaireStateIcons>
              </>
            )
          case FORM_TYPE.CHECKBOX:
            return (
              <>
                <Form.Label className='mt20'>{item.question}</Form.Label>
                {item.checkboxAnswers && item.checkboxAnswers.map((answer, i) => {
                  return (
                    <>
                      <Form.Check type='checkbox' label={answer} key={i} />
                    </>
                  )
                })}
                <UpdateQuestionnaireStateIcons questionId={item.questionId} sortOrder={item.sortOrder}></UpdateQuestionnaireStateIcons>
              </>
            )
          case FORM_TYPE.RADIO:
            return (
              <>
                <Form.Label className='mt20'>{item.question}</Form.Label>
                {item.radioButtonAnswers && item.radioButtonAnswers.map((answer, i) => {
                  return (
                    <>
                      <Form.Check type='radio' label={answer} key={i} name='preview' />
                    </>
                  )
                })}
                <UpdateQuestionnaireStateIcons questionId={item.questionId} sortOrder={item.sortOrder}></UpdateQuestionnaireStateIcons>
              </>
            )
          case FORM_TYPE.DATE:
            return (
              <>
                <Form.Label className='mt20'>{item.question}</Form.Label>
                <Form.Control
                  type='date'>
                </Form.Control>
                <UpdateQuestionnaireStateIcons questionId={item.questionId} sortOrder={item.sortOrder}></UpdateQuestionnaireStateIcons>
              </>
            )
          case FORM_TYPE.TIME:
            return (
              <>
                <Form.Label className='mt20'>{item.question}</Form.Label>
                <Form.Control
                  type='time'>
                </Form.Control>
                <UpdateQuestionnaireStateIcons questionId={item.questionId} sortOrder={item.sortOrder}></UpdateQuestionnaireStateIcons>
              </>
            )
          default:
            console.log('invalid block')
        }
      })}
      <div className='text-center mt30 mb30'>
        <span className='mr10'>質問を追加</span>
        <a onClick={() => dispatch(showAddFormModalChanged(true))}><PlusCircleIcon width={40} height={40} fill={'#0000FF'} /></a>
      </div>
    </>
  )
}

export default CreateQuestionnaireMaster
