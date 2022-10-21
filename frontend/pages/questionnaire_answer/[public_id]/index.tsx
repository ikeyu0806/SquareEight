import MerchantCustomLayout from 'components/templates/MerchantCustomLayout'
import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import { QuestionnaireAnswerParam } from 'interfaces/QuestionnaireAnswerParam'
import { AnswersParam } from 'interfaces/QuestionnaireAnswerParam'
import { CustomerParam } from 'interfaces/CustomerParam'
import { Container, Row, Col, Card } from 'react-bootstrap'

const Index: NextPage = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const [questionnaireAnswer, setQuestionnaireAnswer] = useState<QuestionnaireAnswerParam>()
  const [customer, setCustomer] = useState<CustomerParam>()
  const [answer, setAnswer] = useState<AnswersParam[]>([])

  useEffect(() => {
    axios.get(`${process.env.BACKEND_URL}/api/internal/questionnaire_answers/${router.query.public_id}`,
    {
      headers: {
        'Session-Id': cookies._square_eight_merchant_session
      }
    }).then((response) => {
      console.log(response.data)
      setQuestionnaireAnswer(response.data.questionnaire_answer)
      setCustomer(response.data.customer)
      setAnswer(JSON.parse(response.data.questionnaire_answer.answers_json))
    }).catch((error) => {
      console.log(error)
    })
  }, [cookies._square_eight_merchant_session, dispatch, router.query.public_id])

  return (
    <MerchantCustomLayout>
      <Container>
        <Row>
          <Col lg={3}></Col>
          <Col lg={6}>
            <Card className='mt20'>
              <Card.Header>
                回答を送信しました
              </Card.Header>
              <Card.Body>
                <div>お名前: {customer?.last_name}{customer?.first_name}</div>
                <div className='mt10'>メールアドレス: {customer?.email}</div>
                <div className='mt10'>電話番号: {customer?.phone_number}</div>
                {answer && answer.map((a, i) => {
                  return (
                    <div key={i}>
                      <div className='mt10'>{a.question}: {a.answer}</div>
                    </div>
                  )
                })}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </MerchantCustomLayout>
  )
}

export default Index
