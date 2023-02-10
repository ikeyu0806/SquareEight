import React, { useEffect, useState } from 'react'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import axios from 'axios'
import { QuestionnaireAnswerParam } from 'interfaces/QuestionnaireAnswerParam'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import { Container, Row, Col, Card, ListGroup, Button } from 'react-bootstrap'
import Unauthorized from 'components/templates/Unauthorized'
import { RootState } from 'redux/store'
import { useSelector } from 'react-redux'

const Answer = (): JSX.Element => {
  const router = useRouter()
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const [questionnaireAnswers, setQuestionnaireAnswers] = useState<QuestionnaireAnswerParam[]>()
  const allowReadQuestionnaireAnswer = useSelector((state: RootState) => state.merchantUserPermission.allowReadQuestionnaireAnswer)

  useEffect(() => {
    axios.get(`${process.env.BACKEND_URL}/api/internal/accounts/questionnaire_answers`,
    {
      headers: {
        'Session-Id': cookies._square_eight_merchant_session
      }
    }).then((response) => {
      setQuestionnaireAnswers(response.data.answer_contents)
    }).catch((error) => {
      console.log(error)
    })
  }, [cookies._square_eight_merchant_session, router])

  useEffect(() => {
    axios.post(`${process.env.BACKEND_URL}/api/internal/merchant/read_notification_status/read_questionnaire_answers`,
    {},
    {
      headers: {
        'Session-Id': cookies._square_eight_merchant_session
      }
    })
  }, [cookies._square_eight_merchant_session])

  return (
    <MerchantUserAdminLayout>
      <br />
      {allowReadQuestionnaireAnswer === 'Allow' && <Container>
        <h3 className='mb20'>回答一覧</h3>
        {questionnaireAnswers && questionnaireAnswers.map((answer, i) => {
          return (
            <Card key={i} className='mb20'>
              <Card.Body>
                <div>回答者: {answer.customer_name}</div>
                <div>回答日時: {answer.answer_datetime}</div>
                <div className='mt30 mb10'>回答一覧</div>
                {answer.answer && answer.answer.map((a, i) => {
                  return (
                    <div key={i}>
                      <div>{a.question}: {a.answer}</div>
                    </div>

                  )
                })}
              </Card.Body>
            </Card>
          )
        })}
        {questionnaireAnswers && questionnaireAnswers.length === 0 &&
        <div className='text-center font-size-20'>回答がありません</div>}
      </Container>}
      {allowReadQuestionnaireAnswer === 'Forbid' && <Unauthorized />}
    </MerchantUserAdminLayout>
  )
}

export default Answer
