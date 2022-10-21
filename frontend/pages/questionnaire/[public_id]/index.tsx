import MerchantCustomLayout from 'components/templates/MerchantCustomLayout'
import React, { useEffect, useState, useRef, createRef, useCallback } from 'react'
import type { NextPage } from 'next'
import { useDispatch, useSelector } from 'react-redux'
import {  questionnaireMasterItemsChanged,
          answerChangeDetectStateChanged } from 'redux/questionnaireMasterSlice'
import axios from 'axios'
import QuestionnaireItemAnswerForm from 'components/templates/QuestionnaireItemAnswerForm'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import { RootState } from 'redux/store'
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
  const [publishStatus, setPublishStatus] = useState('')
  const answerChangeDetectState = useSelector((state: RootState) => state.questionnaireMaster.answerChangeDetectState)

  const questionnaireMasterItems = useSelector((state: RootState) => state.questionnaireMaster.questionnaireMasterItems)
  const disableSubmitAnswer = useSelector((state: RootState) => state.questionnaireMaster.disableSubmitAnswer)
  const answersJson = useSelector((state: RootState) => state.questionnaireMaster.answersJson)

  const questionnaireMasterItemsQuestionRefs = useRef<any>([])
  questionnaireMasterItemsQuestionRefs.current = questionnaireMasterItems.map((_, i) => questionnaireMasterItemsQuestionRefs.current[i] ?? createRef())

  const questionnaireMasterItemsAnswerRefs = useRef<any>([])
  questionnaireMasterItemsAnswerRefs.current = questionnaireMasterItems.map((_, i) => questionnaireMasterItemsAnswerRefs.current[i] ?? createRef())

  useEffect(() => {
    axios.get(`${process.env.BACKEND_URL}/api/internal/questionnaire_masters/${router.query.public_id}`,
    {
      headers: {
        'Session-Id': cookies._square_eight_merchant_session
      }
    }).then((response) => {
      console.log(response.data)
      setTitle(response.data.questionnaire_master.title)
      setDescription(response.data.questionnaire_master.description)
      dispatch(questionnaireMasterItemsChanged(response.data.questionnaire_master.parse_question_form_json))
      setPublishStatus(response.data.questionnaire_master.publish_status)
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
  }, [cookies._square_eight_merchant_session, dispatch, router.query.public_id])

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
        axios.post(`${process.env.BACKEND_URL}/api/internal/questionnaire_answers/${router.query.public_id}`,
        {
          questionnaire_answer: {
            last_name: lastName,
            first_name: firstName,
            phone_number: phoneNumber,
            email: email,
            answer: answersJson
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
          router.push(`/questionnaire_answer/${response.data.questionnaire_answer.public_id}`)
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
      &nbsp;
      {publishStatus === 'Unpublish' &&
        <div className='text-center'>非公開です</div>}
        {publishStatus === 'Publish' && 
        <Row>
          <Col lg={3}></Col>
          <Col lg={6}>
            <Card>
              <Card.Header>{title}</Card.Header>
              <Card.Body>
                <div className='mt20'>{description}</div>
                <Form.Label className='mt20'>お名前（姓）</Form.Label>
                <Form.Control
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value)
                    dispatch(answerChangeDetectStateChanged(answerChangeDetectState + 1))
                  }}></Form.Control>
                <Form.Label className='mt20'>お名前（名）</Form.Label>
                <Form.Control
                  value={firstName}
                  onChange={(e) => { 
                    setFirstName(e.target.value)
                    dispatch(answerChangeDetectStateChanged(answerChangeDetectState + 1))
                  }}></Form.Control>
                <Form.Label className='mt20'>電話番号</Form.Label>
                <Form.Control
                  value={phoneNumber}
                  onChange={(e) => {
                    setPhoneNumber(e.target.value)
                    dispatch(answerChangeDetectStateChanged(answerChangeDetectState + 1))
                  }}></Form.Control>
                <Form.Label className='mt20'>メールアドレス</Form.Label>
                <Form.Control
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    dispatch(answerChangeDetectStateChanged(answerChangeDetectState + 1))
                  }}></Form.Control>
                <QuestionnaireItemAnswerForm></QuestionnaireItemAnswerForm>
                <div className='mt30 text-center'>
                  <Button
                    disabled={disableSubmitAnswer}
                    onClick={() => onSubmit()}>
                      送信する
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
          </Row>}
      </Container>
    </MerchantCustomLayout>
  )
}

export default Index
