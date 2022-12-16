import React, { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import { Container, Button, Form, Row, Col } from 'react-bootstrap'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { useRouter } from 'next/router'
import { getBase64 } from 'functions/getBase64'
import { ImageWithTextTemplateContent, HtmlMailTemplate } from 'interfaces/HtmlMailTemplate'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import { htmlMailTemplateChanged, currentMaxSortOrderChanged } from 'redux/htmlMailTemplateSlice'
import UpdateHtmlMailBlockStateIcons from 'components/organisms/UpdateHtmlMailBlockStateIcons'
import CreateImageWithTextHtmlTemplate from 'components/templates/CreateImageWithTextHtmlTemplate'

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
  const currentMaxSortOrder = useSelector((state: RootState) => state.htmlMailTemplate.currentMaxSortOrder)

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
    let blockID = new Date().getTime().toString(16)
    let updateHtmlMailTemplate: ImageWithTextTemplateContent[]
    dispatch(currentMaxSortOrderChanged(currentMaxSortOrder + 1))
    updateHtmlMailTemplate = htmlMailTemplate.content
    let additionalHtmlMailTemplate: ImageWithTextTemplateContent
    additionalHtmlMailTemplate = { text: draftText, image: image, base64Image: base64Image, blockID: blockID, sortOrder: currentMaxSortOrder }
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
            {htmlMailTemplate.content.length === 0 && <div className='mt20 mb10'>本文が登録されていません</div>}
            {htmlMailTemplate.templateType === 'ImageWithText'
              && <CreateImageWithTextHtmlTemplate />}
          </Col>
        </Row>
      </Container>
    </MerchantUserAdminLayout>
  )
}

export default New
