import React from 'react'
import type { NextPage } from 'next'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import axios from 'axios'
import { alertChanged } from 'redux/alertSlice'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import CreateQuestionnaireMaster from 'components/templates/CreateQuestionnaireMaster'
import { Card, Row, Col, Container, Button } from 'react-bootstrap'
import AddQuestionnaireFormModal from 'components/templates/AddQuestionnaireFormModal'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'

const New: NextPage = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const questionnaireMasterItems = useSelector((state: RootState) => state.questionnaireMaster.questionnaireMasterItems)
  const title = useSelector((state: RootState) => state.questionnaireMaster.title)
  const description = useSelector((state: RootState) => state.questionnaireMaster.description)
  const [cookies] = useCookies(['_square_eight_merchant_session'])

  const validateSubmit = () => {
    if (!title) {
      return true
    }
    return false
  }

  const onSubmit = () => {
    axios.post(`${process.env.BACKEND_URL}/api/internal/questionnaire_masters`,
    {
      questionnaire_master: {
        title: title,
        description: description,
        question_form_json: questionnaireMasterItems
      }
    },
    {
      headers: {
        'Session-Id': cookies._square_eight_merchant_session
      }
    }).then(response => {
      dispatch(alertChanged({message: '登録しました', show: true}))
      router.push('/admin/questionnaire/master')
    }).catch(error => {
    })

  }

  return (
    <MerchantUserAdminLayout>
      <Container>
        <Row>
          <Col lg={3}></Col>
          <Col lg={6}>
            <Card>
              <Card.Header>アンケート作成</Card.Header>
              <Card.Body>
                <CreateQuestionnaireMaster></CreateQuestionnaireMaster>
              </Card.Body>
            </Card>
          </Col>
          </Row>
      </Container>
      <AddQuestionnaireFormModal></AddQuestionnaireFormModal>
      <div className='text-center mt30'>
        <Button
          onClick={() => onSubmit()}
          disabled={validateSubmit()}>登録する</Button>
      </div>
      </MerchantUserAdminLayout>

  )
}

export default New
