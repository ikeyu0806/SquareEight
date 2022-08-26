import React, { useEffect } from 'react'
import type { NextPage } from 'next'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import axios from 'axios'
import { alertChanged } from 'redux/alertSlice'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import CreateQuestionnaireMaster from 'components/templates/CreateQuestionnaireMaster'
import { Card, Row, Col, Container, Button } from 'react-bootstrap'
import AddQuestionnaireFormModal from 'components/organisms/AddQuestionnaireFormModal'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { titleChanged,
         descriptionChanged,
         questionnaireMasterItemsChanged,
         currentMaxSortOrderChanged } from 'redux/questionnaireMasterSlice'

const Edit: NextPage = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const currentMaxSortOrder = useSelector((state: RootState) => state.questionnaireMaster.currentMaxSortOrder)
  const questionnaireMasterItems = useSelector((state: RootState) => state.questionnaireMaster.questionnaireMasterItems)
  const title = useSelector((state: RootState) => state.questionnaireMaster.title)
  const description = useSelector((state: RootState) => state.questionnaireMaster.description)
  const [cookies] = useCookies(['_square_eight_merchant_session'])

  useEffect(() => {
    axios.get(`${process.env.BACKEND_URL}/api/internal/questionnaire_masters/${router.query.id}`,
    {
      headers: {
        'Session-Id': cookies._square_eight_merchant_session
      }
    }).then((response) => {
      dispatch(titleChanged(response.data.questionnaire_master.title))
      dispatch(descriptionChanged(response.data.questionnaire_master.description))
      dispatch(questionnaireMasterItemsChanged(response.data.questionnaire_master.parse_question_form_json))
      dispatch(currentMaxSortOrderChanged(response.data.questionnaire_master.current_max_sort_order))
    }).catch((error) => {
      console.log(error)
    })
  }, [cookies._square_eight_merchant_session, dispatch, router.query.id])

  const validateSubmit = () => {
    if (!title) {
      return true
    }
    return false
  }

  const onSubmit = (id: string) => {
    axios.post(`${process.env.BACKEND_URL}/api/internal/questionnaire_masters/${id}/update`,
    {
      questionnaire_master: {
        id: id,
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
          onClick={() => onSubmit(String(router.query.id))}
          disabled={validateSubmit()}>登録する</Button>
      </div>
    </MerchantUserAdminLayout>
  )
}

export default Edit
