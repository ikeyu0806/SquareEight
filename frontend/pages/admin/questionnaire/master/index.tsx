import React, { useEffect, useState } from 'react'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import axios from 'axios'
import { QuestionnaireMasterParam } from 'interfaces/QuestionnaireMasterParam'
import { useCookies } from 'react-cookie'
import { Container, Row, Col, Card, ListGroup, Button } from 'react-bootstrap'
import PublishStatusBadge from 'components/atoms/PublishStatusBadge'
import { useSelector } from 'react-redux'
import { RootState } from 'redux/store'

const Index = (): JSX.Element => {
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const [questionnaireMasters, setQuestionnaireMasters] = useState<QuestionnaireMasterParam[]>()
  const allowReadQuestionnaireMaster = useSelector((state: RootState) => state.merchantUserPermission.allowReadQuestionnaireMaster)
  const allowUpdateQuestionnaireMaster = useSelector((state: RootState) => state.merchantUserPermission.allowUpdateQuestionnaireMaster)

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
      {allowReadQuestionnaireMaster === 'Allow' && <Container>
        <Row>
          <Col lg={2}></Col>
          <Col lg={8}>
            <a className='btn btn-primary mb20' href='/admin/questionnaire/master/new'>アンケート作成</a>
            <Card>
              <Card.Header>アンケート一覧</Card.Header>
              <ListGroup variant='flush'>
                {questionnaireMasters && questionnaireMasters.map((questionare, i) => {
                  return (
                    <ListGroup.Item key={i}>
                      <Row>
                        <Col sm={4}>
                          {questionare.title}
                          <PublishStatusBadge publishStatus={questionare.publish_status} />
                        </Col>
                        <Col sm={3}>
                        <a className='btn btn-primary'
                             target='_blank'
                             rel='noreferrer'
                             href={`/questionnaire/${questionare.public_id}`}>プレビュー</a>
                        </Col>
                        {allowUpdateQuestionnaireMaster === 'Allow' && <Col sm={2}>
                        <a className='btn btn-primary ml30'
                             href={`/admin/questionnaire/master/${questionare.public_id}/edit`}>編集</a>
                        </Col>}
                        <Col sm={3}>    
                          <a className='btn btn-primary ml30'
                             href={`/admin/questionnaire/master/${questionare.public_id}/answer`}>回答一覧</a>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )
                })}
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>}
    </MerchantUserAdminLayout>
  )
}

export default Index
