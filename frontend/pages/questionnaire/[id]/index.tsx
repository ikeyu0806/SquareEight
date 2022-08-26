import MerchantCustomLayout from 'components/templates/MerchantCustomLayout'
import React, { useEffect, useState } from 'react'
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

  useEffect(() => {
    axios.get(`${process.env.BACKEND_URL}/api/internal/questionnaire_masters/${router.query.id}`,
    {
      headers: {
        'Session-Id': cookies._square_eight_merchant_session
      }
    }).then((response) => {
      console.log(response.data)
      setTitle(response.data.questionnaire_master.title)
      setDescription(response.data.questionnaire_master.description)
      setQuestionnaireMasterItems(response.data.questionnaire_master.parse_question_form_json)
    }).catch((error) => {
      console.log(error)
    })
  }, [cookies._square_eight_merchant_session, dispatch, router.query.id])

  return (
    <MerchantCustomLayout>
      <Container>
        <Row>
          <Col lg={3}></Col>
          <Col lg={6}>
            <Card>
              <Card.Header>{title}</Card.Header>
              <Card.Body>
                <div className='mt20'>{description}</div>
                {questionnaireMasterItems.map((item, i) => {
                  switch (item.formType) {
                    case FORM_TYPE.TEXT:
                      return (
                        <>
                          <Form.Label className='mt20'>{item.question}</Form.Label>
                          {item.textFormRowCount && item.textFormRowCount >= 2 ? <Form.Control as='textarea' rows={item.textFormRowCount}></Form.Control> : <Form.Control></Form.Control>}
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
                        </>
                      )
                    case FORM_TYPE.DATE:
                      return (
                        <>
                          <Form.Label className='mt20'>{item.question}</Form.Label>
                          <Form.Control
                            type='date'>
                          </Form.Control>
                        </>
                      )
                    case FORM_TYPE.TIME:
                      return (
                        <>
                          <Form.Label className='mt20'>{item.question}</Form.Label>
                          <Form.Control
                            type='time'>
                          </Form.Control>
                        </>
                      )
                    default:
                      console.log('invalid block')
                  }
                })}
                <div className='mt30 text-center'>
                  <Button>送信する</Button>
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
