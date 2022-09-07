import MerchantCustomLayout from 'components/templates/MerchantCustomLayout'
import React, { useEffect, useState, useRef, createRef } from 'react'
import type { NextPage } from 'next'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { QuestionnaireMasterItem } from 'interfaces/QuestionnaireMasterItem'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import { FORM_TYPE } from 'constants/formType'
import { alertChanged } from 'redux/alertSlice'
import { swalWithBootstrapButtons } from 'constants/swalWithBootstrapButtons'
import { Card, Row, Col, Container, Button, Form } from 'react-bootstrap'
import {  navbarBrandTextChanged,
          navbarBrandTypeChanged,
          navbarBrandImageChanged,
          navbarBrandImageWidthChanged,
          navbarBrandImageHeightChanged,
          navbarBrandBackgroundColorChanged,
          navbarBrandVariantColorChanged,
          footerCopyRightTextChanged } from 'redux/sharedComponentSlice'

const Index: NextPage = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [lastName, setLastName] = useState('')
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
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
      console.log(response.data)
      setTitle(response.data.questionnaire_master.title)
      setDescription(response.data.questionnaire_master.description)
      setQuestionnaireMasterItems(response.data.questionnaire_master.parse_question_form_json)
      dispatch((navbarBrandTextChanged(response.data.shared_component.navbar_brand_text)))
      dispatch((navbarBrandTypeChanged(response.data.shared_component.navbar_brand_type)))
      dispatch((navbarBrandImageChanged(response.data.shared_component.navbar_brand_image_s3_object_public_url)))
      dispatch((navbarBrandImageWidthChanged(response.data.shared_component.nabvar_brand_image_width)))
      dispatch((navbarBrandImageHeightChanged(response.data.shared_component.nabvar_brand_image_height)))
      dispatch((navbarBrandBackgroundColorChanged(response.data.shared_component.navbar_brand_background_color)))
      dispatch((navbarBrandVariantColorChanged(response.data.shared_component.navbar_brand_variant_color)))
      dispatch((footerCopyRightTextChanged(response.data.shared_component.footer_copyright_text)))
    }).catch((error) => {
      console.log(error)
    })
  }, [cookies._square_eight_merchant_session, dispatch, router.query.id])

  const onSubmit = () => {
    let answer: any[]
    answer = []
    let enableSubmit = true

    let requireAnswers = []
  
    if (lastName === '') {
      enableSubmit = false
      requireAnswers.push('お名前(姓)')
    }
    if (firstName === '') {
      enableSubmit = false
      requireAnswers.push('お名前(名)')
    }
    if (phoneNumber === '') {
      enableSubmit = false
      requireAnswers.push('電話番号')
    }
    if (email === '') { 
      enableSubmit = false
      requireAnswers.push('メールアドレス')
    }

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
      swalWithBootstrapButtons.fire({
        title: '入力されていない項目があります',
        text: requireAnswers.join(','),
        icon: 'error'
      })
      return
    }

    swalWithBootstrapButtons.fire({
      title: '回答を送信します',
      text: 'よろしいですか？',
      icon: 'question',
      confirmButtonText: '送信する',
      cancelButtonText: 'キャンセル',
      showCancelButton: true,
      showCloseButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        axios.post(`${process.env.BACKEND_URL}/api/internal/questionnaire_answers/${router.query.id}`,
        {
          questionnaire_answer: {
            last_name: lastName,
            first_name: firstName,
            phone_number: phoneNumber,
            email: email,
            answer: answer
          }
        },
        {
          headers: {
          }
        }).then(response => {
          swalWithBootstrapButtons.fire({
            title: '送信しました',
            icon: 'info'
          })
          location.reload()
        }).catch(error => {
          swalWithBootstrapButtons.fire({
            title: '送信失敗しました',
            icon: 'error'
          })
        })
      }
    })
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
                <div className='mt20'>{description}</div>
                <Form.Label className='mt20'>お名前（姓）</Form.Label>
                <Form.Control value={lastName} onChange={(e) => setLastName(e.target.value)}></Form.Control>
                <Form.Label className='mt20'>お名前（名）</Form.Label>
                <Form.Control value={firstName} onChange={(e) => setFirstName(e.target.value)}></Form.Control>
                <Form.Label className='mt20'>電話番号</Form.Label>
                <Form.Control value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}></Form.Control>
                <Form.Label className='mt20'>メールアドレス</Form.Label>
                <Form.Control value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
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
