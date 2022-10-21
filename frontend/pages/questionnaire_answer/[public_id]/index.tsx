import MerchantCustomLayout from 'components/templates/MerchantCustomLayout'
import React, { useEffect, useState, useRef, createRef } from 'react'
import type { NextPage } from 'next'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import { QuestionnaireAnswerParam } from 'interfaces/QuestionnaireAnswerParam'
import { AnswersParam } from 'interfaces/QuestionnaireAnswerParam'
import { Container } from 'react-bootstrap'

const Index: NextPage = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const [questionnaireAnswer, setQuestionnaireAnswer] = useState<QuestionnaireAnswerParam>()
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
      setAnswer(JSON.parse(response.data.questionnaire_answer.answers_json))
    }).catch((error) => {
      console.log(error)
    })
  }, [cookies._square_eight_merchant_session, dispatch, router.query.public_id])

  return (
    <MerchantCustomLayout>
      <Container>
        <div></div>
        {answer && answer.map((a, i) => {
          return (
            <div key={i}>
              <div>{a.question}: {a.answer}</div>
            </div>
          )
        })}
      </Container>
    </MerchantCustomLayout>
  )
}

export default Index
