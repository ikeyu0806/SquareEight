import React, { useEffect, useState } from 'react'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import axios from 'axios'
import { QuestionnaireMasterParam } from 'interfaces/QuestionnaireMasterParam'
import { useCookies } from 'react-cookie'
import { Container, Row, Col, Card, ListGroup, Button } from 'react-bootstrap'

const Index = (): JSX.Element => {
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const [questionnaireMasters, setQuestionnaireMasters] = useState<QuestionnaireMasterParam[]>()

  useEffect(() => {
    axios.get(`${process.env.BACKEND_URL}/api/internal/questionnaire_masters`,
    {
      headers: {
        'Session-Id': cookies._square_eight_merchant_session
      }
    }).then((response) => {
      setQuestionnaireMasters(response.data.questionnaire_masters)
    }).catch((error) => {
      console.log(error)
    })
  }, [cookies._square_eight_merchant_session])


  return (
    <MerchantUserAdminLayout>
      <Container>
        <Row>
          <Col lg={3}></Col>
          <Col lg={6}>
            <Card>
              <Card.Header>アンケート一覧</Card.Header>
              <ListGroup variant='flush'>
                {questionnaireMasters && questionnaireMasters.map((questionare, i) => {
                  return (
                    <ListGroup.Item key={i}>
                      <Row>
                        <Col>{questionare.title}</Col>
                        <Col></Col>
                        <Col><Button>編集</Button></Col>
                      </Row>
                    </ListGroup.Item>
                  )
                })}
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>
    </MerchantUserAdminLayout>
  )
}

export default Index
