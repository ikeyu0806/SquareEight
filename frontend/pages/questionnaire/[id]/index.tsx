import MerchantCustomLayout from 'components/templates/MerchantCustomLayout'
import React, { useEffect, useState, useRef, createRef } from 'react'
import type { NextPage } from 'next'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { QuestionnaireMasterItem } from 'interfaces/QuestionnaireMasterItem'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import { FORM_TYPE } from 'constants/formType'
import { Card, Row, Col, Container, Button, Form } from 'react-bootstrap'

const Index: NextPage = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [questionnaireMasterItems, setQuestionnaireMasterItems] = useState<QuestionnaireMasterItem[]>([])

  const questionnaireMasterItemsQuestionRefs = useRef<any>([])
  questionnaireMasterItemsQuestionRefs.current = questionnaireMasterItems.map((_, i) => questionnaireMasterItemsQuestionRefs.current[i] ?? createRef())

  const questionnaireMasterItemsAnswerRefs = useRef<any>([])
  questionnaireMasterItemsAnswerRefs.current = questionnaireMasterItems.map((_, i) => questionnaireMasterItemsAnswerRefs.current[i] ?? createRef())

  useEffect(() => {
    axios.get(`${process.env.BACKEND_URL}/api/internal/questionnaire_masters/${router.query.id}`,
    {
      headers: {
        'Session-Id': cookies._square_eight_merchant_session
      }
    }).then((response) => {
      setTitle(response.data.questionnaire_master.title)
      setDescription(response.data.questionnaire_master.description)
      setQuestionnaireMasterItems(response.data.questionnaire_master.parse_question_form_json)
    }).catch((error) => {
      console.log(error)
    })
  }, [cookies._square_eight_merchant_session, dispatch, router.query.id])

  const onSubmit = () => {
    let answer: any[]
    answer = []
    questionnaireMasterItems.map((questionnaire, i) => {
      switch (questionnaire.formType) {
        case FORM_TYPE.TEXT:
          answer.push({question: questionnaireMasterItemsQuestionRefs.current[i].current.innerText,
                       answer: questionnaireMasterItemsAnswerRefs.current[i].current.value})
          break;
        case FORM_TYPE.SELECT:
          answer.push({question: questionnaireMasterItemsQuestionRefs.current[i].current.innerText,
                       answer: questionnaireMasterItemsAnswerRefs.current[i].current.value})
          break;
        case FORM_TYPE.CHECKBOX:
          answer.push({question: questionnaireMasterItemsQuestionRefs.current[i].current.innerText})
          break;
        case FORM_TYPE.RADIO:
          answer.push({question: questionnaireMasterItemsQuestionRefs.current[i].current.innerText})
          break;
        case FORM_TYPE.DATE:
          answer.push({question: questionnaireMasterItemsQuestionRefs.current[i].current.innerText,
                       answer: questionnaireMasterItemsAnswerRefs.current[i].current.value})
          break;
        case FORM_TYPE.TIME:
          answer.push({question: questionnaireMasterItemsQuestionRefs.current[i].current.innerText,
                       answer: questionnaireMasterItemsAnswerRefs.current[i].current.value})
          break;
        default:
          console.log('invalid block')
      }
    })
    console.log(answer)
  }

  const questionRef = () => {
    console.log("aaaa", questionnaireMasterItemsQuestionRefs.current)
    console.log("child", questionnaireMasterItemsQuestionRefs.current[0].current.innerText)
    console.log("child", questionnaireMasterItemsQuestionRefs.current.innerText)
  }

  const answerRef = () => {
    console.log("aaaa", questionnaireMasterItemsAnswerRefs.current)
    console.log("0!", questionnaireMasterItemsAnswerRefs.current[0].current.value)
    console.log("1", questionnaireMasterItemsAnswerRefs.current[1].current.value)
    console.log("2!", questionnaireMasterItemsAnswerRefs.current[2])
    console.log("2!", questionnaireMasterItemsAnswerRefs.current[2].current.children)
    console.log("2!", questionnaireMasterItemsAnswerRefs.current[2].current.children[0])
    console.log("2!", questionnaireMasterItemsAnswerRefs.current[2].current.children[0].innerText)
    console.log("2!", questionnaireMasterItemsAnswerRefs.current[2].current.children[0].children[0].checked)
    console.log("3", questionnaireMasterItemsAnswerRefs.current[3].current.children[0].children[0].checked)
    console.log("3", questionnaireMasterItemsAnswerRefs.current[3].current.children[0].innerText)
    console.log("4", questionnaireMasterItemsAnswerRefs.current[4].current.value)
    console.log("5", questionnaireMasterItemsAnswerRefs.current[5].current.value)
  }

  return (
    <MerchantCustomLayout>
      <Container>
        <Row>
          <Col lg={3}></Col>
          <Col lg={6}>
            <Card>
              <Card.Header>{title}</Card.Header>
              <Card.Body>
              <Button onClick={() => questionRef()}>質問チェック</Button>
              <Button onClick={() => answerRef()}>回答チェック</Button>
                <div className='mt20'>{description}</div>
                {questionnaireMasterItems.map((item, i) => {
                  switch (item.formType) {
                    case FORM_TYPE.TEXT:
                      return (
                        <>
                          <Form.Label
                            ref={questionnaireMasterItemsQuestionRefs.current[i]}
                            className='mt20'>{item.question}</Form.Label>
                          {item.textFormRowCount && item.textFormRowCount >= 2
                            ? <Form.Control
                                ref={questionnaireMasterItemsAnswerRefs.current[i]}
                                as='textarea'
                                rows={item.textFormRowCount}></Form.Control>
                            : <Form.Control ref={questionnaireMasterItemsAnswerRefs.current[i]}></Form.Control>}
                        </>
                      )
                    case FORM_TYPE.SELECT:
                      return (
                        <>
                          <Form.Label
                            ref={questionnaireMasterItemsQuestionRefs.current[i]}
                            className='mt20'>{item.question}</Form.Label>
                          <Form.Select className='mt10' ref={questionnaireMasterItemsAnswerRefs.current[i]}>
                            <option>選択してください</option>
                            {item.selectFormAnswers && item.selectFormAnswers.map((answer, select_i) => {
                              return (
                                <><option key={select_i}>{answer}</option></>
                              )
                            })}
                          </Form.Select>
                        </>
                      )
                    case FORM_TYPE.CHECKBOX:
                      return (
                        <>
                          <Form.Label
                            ref={questionnaireMasterItemsQuestionRefs.current[i]}
                            className='mt20'>{item.question}</Form.Label>
                          <Form ref={questionnaireMasterItemsAnswerRefs.current[i]}>
                            {item.checkboxAnswers && item.checkboxAnswers.map((answer, checkbox_i) => {
                              return (
                                <>
                                  <Form.Check
                                    type='checkbox'
                                    label={answer}
                                    key={checkbox_i} />
                                </>
                              )
                            })}
                          </Form>
                        </>
                      )
                    case FORM_TYPE.RADIO:
                      return (
                        <>
                          <Form.Label
                            ref={questionnaireMasterItemsQuestionRefs.current[i]}
                            className='mt20'>{item.question}</Form.Label>
                          <Form ref={questionnaireMasterItemsAnswerRefs.current[i]}>
                            {item.radioButtonAnswers && item.radioButtonAnswers.map((answer, radio_i) => {
                              return (
                                <>
                                  <Form.Check
                                    type='radio'
                                    label={answer}
                                    key={radio_i}
                                    name='preview' />
                                </>
                              )
                            })}
                          </Form>
                        </>
                      )
                    case FORM_TYPE.DATE:
                      return (
                        <>
                          <Form.Label
                            ref={questionnaireMasterItemsQuestionRefs.current[i]}
                            className='mt20'>{item.question}</Form.Label>
                          <Form.Control
                            ref={questionnaireMasterItemsAnswerRefs.current[i]}
                            type='date'>
                          </Form.Control>
                        </>
                      )
                    case FORM_TYPE.TIME:
                      return (
                        <>
                          <Form.Label
                            ref={questionnaireMasterItemsQuestionRefs.current[i]}
                            className='mt20'>{item.question}</Form.Label>
                          <Form.Control
                            ref={questionnaireMasterItemsAnswerRefs.current[i]}
                            type='time'>
                          </Form.Control>
                        </>
                      )
                    default:
                      console.log('invalid block')
                  }
                })}
                <div className='mt30 text-center'>
                  <Button onClick={() => onSubmit()}>送信する</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
          </Row>
      </Container>
    </MerchantCustomLayout>
  )
}

export default Index
