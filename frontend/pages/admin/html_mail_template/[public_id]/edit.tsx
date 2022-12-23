import React, { useEffect } from 'react'
import RequireBadge from 'components/atoms/RequireBadge'
import type { NextPage } from 'next'
import { Container, Button, Row, Col, Form } from 'react-bootstrap'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import { nameChanged, mailTitleChanged, htmlMailTemplateChanged } from 'redux/htmlMailTemplateSlice'
import CreateImageWithTextHtmlTemplate from 'components/templates/CreateImageWithTextHtmlTemplate'
import CreateImageWithTextListHtmlTemplate from 'components/templates/CreateImageWithTextListHtmlTemplate'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { alertChanged } from 'redux/alertSlice'
import Unauthorized from 'components/templates/Unauthorized'

const Edit: NextPage = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const name = useSelector((state: RootState) => state.htmlMailTemplate.name)
  const mailTitle = useSelector((state: RootState) => state.htmlMailTemplate.mailTitle)
  const htmlMailTemplate = useSelector((state: RootState) => state.htmlMailTemplate.htmlMailTemplate)
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const allowUpdateHtmlMailTemplate = useSelector((state: RootState) => state.merchantUserPermission.allowUpdateHtmlMailTemplate)

  useEffect(() => {
    axios.get(`${process.env.BACKEND_URL}/api/internal/html_mail_templates/${router.query.public_id}`,
    {
      headers: {
        'Session-Id': cookies._square_eight_merchant_session
      }
    }).then((response) => {
      console.log(response.data)
      dispatch(nameChanged(response.data.html_mail_template.name))
      dispatch(mailTitleChanged(response.data.html_mail_template.mail_title))
      dispatch(htmlMailTemplateChanged({templateType: response.data.html_mail_template.template_type, content: response.data.content}))
    }).catch((error) => {
      console.log(error)
    })
  }, [cookies._square_eight_merchant_session, router, dispatch])

  const onSubmit = () => {
    axios.post(`${process.env.BACKEND_URL}/api/internal/html_mail_templates/${router.query.public_id}/update`,
    {
      html_mail_templates: {
        name: name,
        mail_title: mailTitle,
        template_type: htmlMailTemplate.templateType,
        content: htmlMailTemplate.content
      }
    },
    {
      headers: {
        'Session-Id': cookies._square_eight_merchant_session
      }
    }).then(response => {
      dispatch(alertChanged({message: '保存しました', show: true}))
    }).catch(error => {
      dispatch(alertChanged({message: error, show: true, type: 'danger'}))
    })
  }

  return (
    <MerchantUserAdminLayout>
      {allowUpdateHtmlMailTemplate === 'Allow' && <Container>
        <Row>
          <Col lg={2}></Col>
          <Col lg={8}>
            <a href='/admin/html_mail_template' className='btn btn-primary'>テンプレート一覧に戻る</a>
            <h3 className='mt20'>HTMLメールテンプレート作成</h3>
            <Row>
              <Col lg={8}></Col>
              <Col>
                <Button onClick={onSubmit}>保存する</Button>
              </Col>
            </Row>
            <div className='mb10'>テンプレート名<RequireBadge /></div>
            <Form.Control
              value={name}
              onChange={(e) => dispatch(nameChanged(e.target.value))}></Form.Control>
            <div className='mb10'>メールタイトル<RequireBadge /></div>
            <Form.Control
              value={mailTitle}
              onChange={(e) => dispatch(mailTitleChanged(e.target.value))}></Form.Control>
            {htmlMailTemplate.content?.length !== 0 && <hr />}
            {htmlMailTemplate.templateType === 'ImageWithText'
              && <CreateImageWithTextHtmlTemplate />}
            {htmlMailTemplate.templateType === 'ImageWithTextList'
              && <CreateImageWithTextListHtmlTemplate />}
          </Col>
        </Row>
      </Container>}
      {allowUpdateHtmlMailTemplate === 'Forbid' && <Unauthorized></Unauthorized>}
    </MerchantUserAdminLayout>
  )
}

export default Edit
