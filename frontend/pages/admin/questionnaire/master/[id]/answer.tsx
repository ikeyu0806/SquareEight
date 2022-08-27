import React, { useEffect, useState } from 'react'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import axios from 'axios'
import { QuestionnaireMasterParam } from 'interfaces/QuestionnaireMasterParam'
import { QuestionnaireAnswerParam } from 'interfaces/QuestionnaireAnswerParam'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import { Container, Row, Col, Card, ListGroup, Button } from 'react-bootstrap'

const Answer = (): JSX.Element => {
  const router = useRouter()
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const [questionnaireMaster, setQuestionnaireMaster] = useState<QuestionnaireMasterParam>()
  const [questionnaireAnswers, setQuestionnaireAnswers] = useState<QuestionnaireAnswerParam[]>()

  useEffect(() => {
    axios.get(`${process.env.BACKEND_URL}/api/internal/questionnaire_masters/${router.query.id}/answers`,
    {
      headers: {
        'Session-Id': cookies._square_eight_merchant_session
      }
    }).then((response) => {
      setQuestionnaireMaster(response.data.questionnaire_master)
      setQuestionnaireAnswers(response.data.answer_contents)
    }).catch((error) => {
      console.log(error)
    })
  }, [cookies._square_eight_merchant_session, router])

  return (
    <MerchantUserAdminLayout>
      <Container>
        <h3 className='mb20'>{questionnaireMaster?.title}回答一覧</h3>
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
      </Container>
    </MerchantUserAdminLayout>
  )
}

export default Answer
