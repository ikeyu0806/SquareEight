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

const New: NextPage = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const name = useSelector((state: RootState) => state.htmlMailTemplate.name)
  const mailTitle = useSelector((state: RootState) => state.htmlMailTemplate.mailTitle)
  const htmlMailTemplate = useSelector((state: RootState) => state.htmlMailTemplate.htmlMailTemplate)
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const allowCreateHtmlMailTemplate = useSelector((state: RootState) => state.merchantUserPermission.allowCreateHtmlMailTemplate)

  useEffect(() => {
    dispatch(htmlMailTemplateChanged({templateType: String(router.query.template_type), content: [], }))
  }, [router.query.template_type, dispatch])

  const onSubmit = () => {
    axios.post(`${process.env.BACKEND_URL}/api/internal/html_mail_templates`,
    {
      html_mail_templates: {
        name: name,
        mail_title: mailTitle,
        template_type: router.query.template_type,
        content: htmlMailTemplate.content
      }
    },
    {
      headers: {
        'Session-Id': cookies._square_eight_merchant_session
      }
    }).then(response => {
      dispatch(alertChanged({message: '保存しました', show: true}))
      router.push(`/admin/html_mail_template/${response.data.html_mail_template.public_id}/edit`)
    }).catch(error => {
      dispatch(alertChanged({message: error, show: true, type: 'danger'}))
    })
  }

  return (
    <MerchantUserAdminLayout>
      <br />
      {allowCreateHtmlMailTemplate === 'Allow' && <Container>
        <Row>
          <Col lg={2}></Col>
          <Col lg={8}>
            <a href='/admin/html_mail_template' className='btn btn-primary'>テンプレート一覧に戻る</a>
            <h3 className='mt20'>HTMLメールテンプレート作成</h3>
            <Row>
              <Col lg={8}>
              </Col>
              <Col>
                <Button onClick={onSubmit}>保存する</Button>
              </Col>
            </Row>
            <div className='mb10'>テンプレート名<RequireBadge /></div>
            <Form.Control
              onChange={(e) => dispatch(nameChanged(e.target.value))}></Form.Control>
            <div className='mb10'>メールタイトル<RequireBadge /></div>
            <Form.Control
              onChange={(e) => dispatch(mailTitleChanged(e.target.value))}></Form.Control>
            {htmlMailTemplate.content?.length !== 0 && <hr />}
            {router.query.template_type === 'ImageWithText'
              && <CreateImageWithTextHtmlTemplate />}
            {router.query.template_type === 'ImageWithTextList'
              && <CreateImageWithTextListHtmlTemplate />}
          </Col>
        </Row>
      </Container>}
      {allowCreateHtmlMailTemplate === 'Forbid' && <Unauthorized></Unauthorized>}
    </MerchantUserAdminLayout>
  )
}

export default New
