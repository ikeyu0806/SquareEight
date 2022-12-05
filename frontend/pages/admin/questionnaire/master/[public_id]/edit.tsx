import React, { useEffect } from 'react'
import type { NextPage } from 'next'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import axios from 'axios'
import { alertChanged } from 'redux/alertSlice'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import { swalWithBootstrapButtons } from 'constants/swalWithBootstrapButtons'
import CreateQuestionnaireMaster from 'components/templates/CreateQuestionnaireMaster'
import { Card, Row, Col, Container, Button } from 'react-bootstrap'
import AddQuestionnaireFormModal from 'components/organisms/AddQuestionnaireFormModal'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import Unauauthorized from 'components/templates/Unauauthorized'
import { titleChanged,
         descriptionChanged,
         questionnaireMasterItemsChanged,
         currentMaxSortOrderChanged } from 'redux/questionnaireMasterSlice'

const Edit: NextPage = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const questionnaireMasterItems = useSelector((state: RootState) => state.questionnaireMaster.questionnaireMasterItems)
  const title = useSelector((state: RootState) => state.questionnaireMaster.title)
  const description = useSelector((state: RootState) => state.questionnaireMaster.description)
  const publishStatus = useSelector((state: RootState) => state.questionnaireMaster.publishStatus)
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const allowUpdateQuestionnaireMaster = useSelector((state: RootState) => state.merchantUserPermission.allowUpdateQuestionnaireMaster)

  useEffect(() => {
    axios.get(`${process.env.BACKEND_URL}/api/internal/questionnaire_masters/${router.query.public_id}/edit_info`,
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
  }, [cookies._square_eight_merchant_session, dispatch, router.query.public_id])

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
        publish_status: publishStatus,
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

  const execDelete = () => {
    swalWithBootstrapButtons.fire({
      title: '削除します',
      html: `${title}を削除します。<br />よろしいですか？`,
      icon: 'question',
      confirmButtonText: '削除する',
      cancelButtonText: 'キャンセル',
      showCancelButton: true,
      showCloseButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${process.env.BACKEND_URL}/api/internal/questionnaire_masters/${router.query.public_id}`, {
          headers: { 
            'Session-Id': cookies._square_eight_merchant_session
          }
        }).then(response => {
          swalWithBootstrapButtons.fire({
            title: '削除しました',
            icon: 'info'
          })
          router.push('/admin/questionnaire/master')
        }).catch(error => {
          swalWithBootstrapButtons.fire({
            title: '削除失敗しました',
            icon: 'error'
          })
        })
      }
    })
  }

  return (
    <MerchantUserAdminLayout>
      {allowUpdateQuestionnaireMaster === 'Allow' && <>
        <Container>
          <Row>
            <Col lg={3}></Col>
            <Col lg={6}>
              <Row>
                <Col sm={8}></Col>
                <Col>
                  <Button
                    onClick={() => execDelete()}
                    variant='danger'>
                    アンケートを削除
                  </Button>
                </Col>
              </Row>
              &emsp;
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
            onClick={() => onSubmit(String(router.query.public_id))}
            disabled={validateSubmit()}>登録する</Button>
        </div>
      </>}
      {allowUpdateQuestionnaireMaster === 'Forbid' && <Unauauthorized />}
    </MerchantUserAdminLayout>
  )
}

export default Edit
