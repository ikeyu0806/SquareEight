import React, { useEffect, useRef, createRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { disableSubmitAnswerChanged, answerChangeDetectStateChanged } from 'redux/questionnaireMasterSlice'
import { RootState } from 'redux/store'
import { FORM_TYPE } from 'constants/formType'
import { Form } from 'react-bootstrap'

const QuestionnaireItemAnswerForm = () => {
  const dispatch = useDispatch()
  const questionnaireMasterItems = useSelector((state: RootState) => state.questionnaireMaster.questionnaireMasterItems)
  const answerChangeDetectState = useSelector((state: RootState) => state.questionnaireMaster.answerChangeDetectState)

  const questionnaireMasterItemsQuestionRefs = useRef<any>([])
  questionnaireMasterItemsQuestionRefs.current = questionnaireMasterItems.map((_, i) => questionnaireMasterItemsQuestionRefs.current[i] ?? createRef())

  const questionnaireMasterItemsAnswerRefs = useRef<any>([])
  questionnaireMasterItemsAnswerRefs.current = questionnaireMasterItems.map((_, i) => questionnaireMasterItemsAnswerRefs.current[i] ?? createRef())


  useEffect(() => {
    let answer: any[] = []
    let enableSubmit = true
    let requireAnswers: any[] = []

    questionnaireMasterItems.map((questionnaire, i) => {
      switch (questionnaire.formType) {
        case FORM_TYPE.TEXT:
          const textQuestion = questionnaireMasterItemsQuestionRefs.current[i].current.innerText
          const textAnswer = questionnaireMasterItemsAnswerRefs.current[i].current.value
          answer.push({question: textQuestion,
                       answer: textAnswer})
          if (textAnswer === '') {
            enableSubmit = false
            requireAnswers.push(textQuestion)
          }
          break;
        case FORM_TYPE.SELECT:
          const selectQuestion = questionnaireMasterItemsQuestionRefs.current[i].current.innerText
          const selectAnswer = questionnaireMasterItemsAnswerRefs.current[i].current.value
          answer.push({question: selectQuestion,
                       answer: selectAnswer})
          if (selectQuestion === '選択してください') {
            enableSubmit = false
            requireAnswers.push(selectQuestion)
          }
          break;
        case FORM_TYPE.CHECKBOX:
          let checkbox_answer_array: any[]
          checkbox_answer_array = []
          let checkbox_doms = questionnaireMasterItemsAnswerRefs.current[i].current.children
          let isCheckBoxCheckFlg = false
          Array.prototype.map.call(checkbox_doms, function(item) {
            if (item.children[0].checked) {
              isCheckBoxCheckFlg = true
              checkbox_answer_array.push(item.innerText)
            }
          })
          const checkboxQuestion = questionnaireMasterItemsQuestionRefs.current[i].current.innerText
          if (!isCheckBoxCheckFlg) {
            isCheckBoxCheckFlg = true
            requireAnswers.push(checkboxQuestion)
          }
          answer.push({question: checkboxQuestion,
                       answer: checkbox_answer_array.join(',')})
          break;
        case FORM_TYPE.RADIO:
          let radio_answer_array: any[]
          radio_answer_array = []
          let radio_doms = questionnaireMasterItemsAnswerRefs.current[i].current.children
          let isCheckRadioFlg = false
          Array.prototype.map.call(radio_doms, function(item) {
            if (item.children[0].checked) {
              isCheckRadioFlg = true
              radio_answer_array.push(item.innerText)
            }
          })
          const radioQuestion = questionnaireMasterItemsQuestionRefs.current[i].current.innerText
          if (!isCheckRadioFlg) {
            enableSubmit = false
            requireAnswers.push(radioQuestion)
          }
          answer.push({question: radioQuestion,
                       answer: radio_answer_array.join(',')})
          break;
        case FORM_TYPE.DATE:
          const dateQuestion = questionnaireMasterItemsQuestionRefs.current[i].current.innerText
          const dateAnswer = questionnaireMasterItemsAnswerRefs.current[i].current.value
          answer.push({question: dateQuestion,
                       answer: dateAnswer})
          if (dateAnswer === '') {
            enableSubmit = false
            requireAnswers.push(dateQuestion)
          }
          break;
        case FORM_TYPE.TIME:
          const timeQuestion = questionnaireMasterItemsQuestionRefs.current[i].current.innerText
          const timeAnswer = questionnaireMasterItemsAnswerRefs.current[i].current.value
          answer.push({question: timeQuestion,
                       answer: timeAnswer})
          if (timeAnswer === '') {
            enableSubmit = false
            requireAnswers.push(timeQuestion)
          }
          break;
        default:
          console.log('invalid block')
      }
    })

    if (!enableSubmit) {
      dispatch((disableSubmitAnswerChanged(true)))
    } else {
      dispatch((disableSubmitAnswerChanged(false)))
    }
  }, [dispatch, questionnaireMasterItemsAnswerRefs, questionnaireMasterItems, answerChangeDetectState])

  return (
    <>
      {questionnaireMasterItems.map((item, i) => {
        switch (item.formType) {
          case FORM_TYPE.TEXT:
            return (
              <span key={i}>
                <Form.Label
                  ref={questionnaireMasterItemsQuestionRefs.current[i]}
                  className='mt20'>{item.question}</Form.Label>
                  {item.textFormRowCount && item.textFormRowCount >= 2
                    ? <Form.Control
                        onChange={() => dispatch(answerChangeDetectStateChanged(answerChangeDetectState + 1))}
                        ref={questionnaireMasterItemsAnswerRefs.current[i]}
                        as='textarea'
                        rows={item.textFormRowCount}></Form.Control>
                    : <Form.Control
                        onChange={() => dispatch(answerChangeDetectStateChanged(answerChangeDetectState + 1))}
                        ref={questionnaireMasterItemsAnswerRefs.current[i]}></Form.Control>}
              </span>
            )
          case FORM_TYPE.SELECT:
            return (
              <span key={i}>
                <Form.Label
                  ref={questionnaireMasterItemsQuestionRefs.current[i]}
                  className='mt20'>{item.question}</Form.Label>
                <Form.Select
                  onChange={() => dispatch(answerChangeDetectStateChanged(answerChangeDetectState + 1))}
                  className='mt10'
                  ref={questionnaireMasterItemsAnswerRefs.current[i]}>
                  <option>選択してください</option>
                  {item.selectFormAnswers && item.selectFormAnswers.map((answer, select_i) => {
                    return (
                      <option key={select_i}>{answer}</option>
                    )
                  })}
                </Form.Select>
              </span>
            )
          case FORM_TYPE.CHECKBOX:
            return (
              <span key={i}>
                <Form.Label
                  ref={questionnaireMasterItemsQuestionRefs.current[i]}
                  className='mt20'>{item.question}</Form.Label>
                <Form ref={questionnaireMasterItemsAnswerRefs.current[i]}>
                  {item.checkboxAnswers && item.checkboxAnswers.map((answer, checkbox_i) => {
                    return (
                      <Form.Check
                        onChange={() => dispatch(answerChangeDetectStateChanged(answerChangeDetectState + 1))}
                        id={1 + checkbox_i + 'checkAnswer'}
                        type='checkbox'
                        label={answer}
                        key={1 + checkbox_i} />
                    )
                  })}
                </Form>
              </span>
            )
          case FORM_TYPE.RADIO:
            return (
              <span key={i}>
                <Form.Label
                  ref={questionnaireMasterItemsQuestionRefs.current[i]}
                  className='mt20'>{item.question}</Form.Label>
                <Form ref={questionnaireMasterItemsAnswerRefs.current[i]}>
                  {item.radioButtonAnswers && item.radioButtonAnswers.map((answer, radio_i) => {
                    return (
                      <Form.Check
                        onChange={() => dispatch(answerChangeDetectStateChanged(answerChangeDetectState + 1))}
                        id={2 + radio_i + 'radioAnswer'}
                        type='radio'
                        label={answer}
                        key={2 + radio_i}
                        name='preview' />
                    )
                  })}
                </Form>
              </span>
            )
          case FORM_TYPE.DATE:
            return (
              <span key={i}>
                <Form.Label
                  ref={questionnaireMasterItemsQuestionRefs.current[i]}
                  className='mt20'>{item.question}</Form.Label>
                <Form.Control
                  onChange={() => dispatch(answerChangeDetectStateChanged(answerChangeDetectState + 1))}
                  ref={questionnaireMasterItemsAnswerRefs.current[i]}
                  type='date'>
                </Form.Control>
              </span>
            )
          case FORM_TYPE.TIME:
            return (
              <span key={i}>
                <Form.Label
                  ref={questionnaireMasterItemsQuestionRefs.current[i]}
                  className='mt20'>{item.question}</Form.Label>
                <Form.Control
                  onChange={() => dispatch(answerChangeDetectStateChanged(answerChangeDetectState + 1))}
                  ref={questionnaireMasterItemsAnswerRefs.current[i]}
                  type='time'>
                </Form.Control>
              </span>
            )
          default:
            console.log('invalid block')
        }
      })}
    </>
  )
}

export default QuestionnaireItemAnswerForm
