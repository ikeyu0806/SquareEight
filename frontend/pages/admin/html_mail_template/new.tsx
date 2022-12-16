import React, { useState } from 'react'
import type { NextPage } from 'next'
import { Container, Button, Form, Row, Col } from 'react-bootstrap'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { useRouter } from 'next/router'
import { getBase64 } from 'functions/getBase64'

const New: NextPage = () => {
  const router = useRouter()
  const [imageLink, setImageLink] = useState('')
  const [image, setImage] = useState('/images/noimage.jpeg')
  const [base64Image, setBase64Image] = useState<any>('')
  const [draftText, setDraftText] = useState('')

  const handleChangeFile = (e: any) => {
    const { files } = e.target
    setImage(window.URL.createObjectURL(files[0]))
    getBase64(files[0]).then(
      data => setBase64Image(data)
    )
  }

  return (
    <MerchantUserAdminLayout>
      <Container>
        <Row>
          <Col lg={2}></Col>
          <Col lg={8}>
            <h3 className='mt10'>HTMLメールテンプレート</h3>
            <div className='mt20 mb10'>本文が登録されていません</div>
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
            <Button className='mt20'>本文に画像とテキストを追加</Button>
          </Col>
        </Row>
      </Container>
    </MerchantUserAdminLayout>
  )
}

export default New
