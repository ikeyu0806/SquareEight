import React, { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import { Container, Button, Form, Row, Col } from 'react-bootstrap'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { useRouter } from 'next/router'
import { getBase64 } from 'functions/getBase64'
import { ImageWithTextTemplateContent, HtmlMailTemplate } from 'interfaces/HtmlMailTemplate'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import { htmlMailTemplateChanged } from 'redux/htmlMailTemplateSlice'

const New: NextPage = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [imageLink, setImageLink] = useState('')
  const [image, setImage] = useState('/images/noimage.jpeg')
  const [base64Image, setBase64Image] = useState<any>('')
  const [draftText, setDraftText] = useState('')
  const [ImageWithTextTemplateContent, setImageWithTextTemplateContent] = useState<ImageWithTextTemplateContent>()

  const [htmlMailTemplateDraft, setHtmlMailTemplateDraft] = useState<HtmlMailTemplate>()
  const htmlMailTemplate = useSelector((state: RootState) => state.htmlMailTemplate.htmlMailTemplate)

  useEffect(() => {
    switch(router.query.template_type) {
      case 'ImageWithText':
        dispatch(htmlMailTemplateChanged({templateType: 'ImageWithText', content: [], }))
        break
      default:
        console.log('invalid template_type')
    }
  }, [router.query.template_type, dispatch])

  const handleChangeFile = (e: any) => {
    const { files } = e.target
    setImage(window.URL.createObjectURL(files[0]))
    getBase64(files[0]).then(
      data => setBase64Image(data)
    )
  }

  const addTemplateContent = () => {
    let updateHtmlMailTemplate: ImageWithTextTemplateContent[]
    updateHtmlMailTemplate = htmlMailTemplate.content
    let additionalHtmlMailTemplate: ImageWithTextTemplateContent
    additionalHtmlMailTemplate = { text: draftText, image: image, base64Image: base64Image }
    updateHtmlMailTemplate = [...updateHtmlMailTemplate, additionalHtmlMailTemplate]
    dispatch(htmlMailTemplateChanged({content: updateHtmlMailTemplate, templateType: 'ImageWithText'}))
  }

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
            {!htmlMailTemplate.content && <div className='mt20 mb10'>本文が登録されていません</div>}
            {htmlMailTemplate.templateType === 'ImageWithText' && htmlMailTemplate.content.map((c, i) => {
              return (
                <div key={i}>
                  <img
                    className='d-block w-100 mt30'
                    src={c.base64Image}
                    alt='image'
                  />
                  <div>{c.text}</div>
                </div>
              )
            })}
            <hr />
            <Form.Group controlId='formFile' className='mb5 mt10'>
              <Form.Label>画像をアップロード</Form.Label>
              <Form.Control type='file' onChange={handleChangeFile} />
            </Form.Group>
            <div className='mt10'>テキスト</div>
            <Form.Control
              value={draftText}
              onChange={(e) => setDraftText(e.target.value)}
              as='textarea'
              rows={20} />
            <Button
              onClick={addTemplateContent}
              className='mt20'>本文に画像とテキストを追加</Button>

          </Col>
        </Row>
      </Container>
    </MerchantUserAdminLayout>
  )
}

export default New
