import React, { useEffect, useState } from 'react'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import axios from 'axios'
import { QuestionnaireAnswerParam } from 'interfaces/QuestionnaireAnswerParam'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import { Container, Row, Col, Card, ListGroup, Button } from 'react-bootstrap'

const Answer = (): JSX.Element => {
  const router = useRouter()
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const [questionnaireAnswers, setQuestionnaireAnswers] = useState<QuestionnaireAnswerParam[]>()

  useEffect(() => {
    axios.get(`${process.env.BACKEND_URL}/api/internal/questionnaire_masters/${router.query.id}/answers`,
    {
      headers: {
        'Session-Id': cookies._square_eight_merchant_session
      }
    }).then((response) => {
      console.log(response.data)
      setQuestionnaireAnswers(response.data.answers)
    }).catch((error) => {
      console.log(error)
    })
  }, [cookies._square_eight_merchant_session, router])

  return (
    <MerchantUserAdminLayout>
    </MerchantUserAdminLayout>
  )
}

export default Answer
