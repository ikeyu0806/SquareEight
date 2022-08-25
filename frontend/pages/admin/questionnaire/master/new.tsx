import React from 'react'
import AddQuestionnaireFormModal from 'components/templates/AddQuestionnaireFormModal'
import type { NextPage } from 'next'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import PlusCircleIcon from 'components/atoms/PlusCircleIcon'
import RequireBadge from 'components/atoms/RequireBadge'
import { Card, Row, Col, Container, Form, Button } from 'react-bootstrap'
import { FORM_TYPE } from 'constants/formType'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import axios from 'axios'
import { alertChanged } from 'redux/alertSlice'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import { titleChanged,
         descriptionChanged,
         showAddFormModalChanged } from 'redux/questionnaireMasterSlice'

const New: NextPage = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const questionnaireMasterItems = useSelector((state: RootState) => state.questionnaireMaster.questionnaireMasterItems)
  const title = useSelector((state: RootState) => state.questionnaireMaster.title)
  const description = useSelector((state: RootState) => state.questionnaireMaster.description)
  const [cookies] = useCookies(['_square_eight_merchant_session'])

  const validateSubmit = () => {
    if (!title) {
      return true
    }
    return false
  }

  const onSubmit = () => {
    axios.post(`${process.env.BACKEND_URL}/api/internal/questionnaire_masters`,
    {
      questionnaire_master: {
        title: title,
        description: description,
        question_form_json: questionnaireMasterItems
      }
    },
    {
      headers: {
        'Session-Id': cookies._square_eight_merchant_session
      }
    }).then(response => {
      dispatch(alertChanged({message: '登録しました', show: true}))
      router.push('/admin/questionnaire/master')
    }).catch(error => {
    })

  }

  return (
    <MerchantUserAdminLayout>
      <Container>
        <Row>
          <Col lg={3}></Col>
          <Col lg={6}>
            <Card>
              <Card.Header>アンケート作成</Card.Header>
              <Card.Body>
                <Form.Label>アンケートのタイトル<RequireBadge></RequireBadge></Form.Label>
                <Form.Control onChange={(e) => dispatch(titleChanged(e.target.value))}></Form.Control>
                <Form.Label>アンケートの説明</Form.Label>
                <Form.Control
                  onChange={(e) => dispatch(descriptionChanged(e.target.value))}
                  as='textarea'
                  rows={5}></Form.Control>

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
                      return (<></>)
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
                <div className='text-center mt30 mb30'>
                  <span className='mr10'>質問を追加</span>
                  <a onClick={() => dispatch(showAddFormModalChanged(true))}><PlusCircleIcon width={40} height={40} fill={'#0000FF'} /></a>
                </div>
                <div className='text-center mt30'>
                  <Button
                    onClick={() => onSubmit()}
                    disabled={validateSubmit()}>登録する</Button>
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

export default New
