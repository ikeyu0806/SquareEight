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

const New: NextPage = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const name = useSelector((state: RootState) => state.htmlMailTemplate.name)
  const mailTitle = useSelector((state: RootState) => state.htmlMailTemplate.mailTitle)
  const htmlMailTemplate = useSelector((state: RootState) => state.htmlMailTemplate.htmlMailTemplate)

  useEffect(() => {
    switch(router.query.template_type) {
      case 'ImageWithText':
        dispatch(htmlMailTemplateChanged({templateType: 'ImageWithText', content: [], }))
        break
      case 'ImageWithTextList':
        dispatch(htmlMailTemplateChanged({templateType: 'ImageWithTextList', content: [], }))
        break
      default:
        dispatch(htmlMailTemplateChanged({templateType: 'ImageWithText', content: [], }))
    }
  }, [router.query.template_type, dispatch])

  return (
    <MerchantUserAdminLayout>
      <Container>
        <Row>
          <Col lg={2}></Col>
          <Col lg={8}>
            <h3 className='mt10'>HTMLメールテンプレート作成</h3>
            <Row>
              <Col lg={8}></Col>
              <Col>
                <Button>登録を完了する</Button>
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
      </Container>
    </MerchantUserAdminLayout>
  )
}

export default New
