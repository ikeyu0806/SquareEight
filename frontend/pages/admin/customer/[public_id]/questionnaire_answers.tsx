import React, { useEffect, useState } from 'react'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import axios from 'axios'
import { QuestionnaireAnswerParam } from 'interfaces/QuestionnaireAnswerParam'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import { Container, Card } from 'react-bootstrap'
import Unauauthorized from 'components/templates/Unauauthorized'
import { useSelector } from 'react-redux'
import { RootState } from 'redux/store'

const QuestionnaireAnswer = (): JSX.Element => {
  const router = useRouter()
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const [questionnaireAnswers, setQuestionnaireAnswers] = useState<QuestionnaireAnswerParam[]>()
  const allowReadQuestionnaireAnswer = useSelector((state: RootState) => state.merchantUserPermission.allowReadQuestionnaireAnswer)

  useEffect(() => {
    axios.get(`${process.env.BACKEND_URL}/api/internal/customers/${router.query.public_id}/questionnaire_answers`,
    {
      headers: {
        'Session-Id': cookies._square_eight_merchant_session
      }
    }).then((response) => {
      console.log(response.data)
      setQuestionnaireAnswers(response.data.answer_contents)
    }).catch((error) => {
      console.log(error)
    })
  }, [cookies._square_eight_merchant_session, router])

  return (
    <MerchantUserAdminLayout>
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
      </Container>}
      {allowReadQuestionnaireAnswer === 'Forbid' && <Unauauthorized />}
    </MerchantUserAdminLayout>
  )
}

export default QuestionnaireAnswer
