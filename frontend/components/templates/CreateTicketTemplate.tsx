import React, { useState } from 'react'
import { Container, Row, Col, Form, FormControl } from 'react-bootstrap'
import { RootState } from '../../redux/store'
import { useSelector, useDispatch } from 'react-redux'
import { getBase64 } from '../../functions/getBase64'
import { nameChanged,
         issueNumberChanged,
         priceChanged,
         effectiveMonthChanged,
         descriptionChanged,
         publishStatusChanged,
         base64ImageChanged } from 'redux/ticketMasterSlice'

const CreateTicketTemplate = (): JSX.Element => {
  const dispatch = useDispatch()
  const [image, setImage] = useState('')
  const name = useSelector((state: RootState) => state.ticketMaster.name)
  const issueNumber = useSelector((state: RootState) => state.ticketMaster.issueNumber)
  const price = useSelector((state: RootState) => state.ticketMaster.price)
  const effectiveMonth = useSelector((state: RootState) => state.ticketMaster.effectiveMonth)
  const description = useSelector((state: RootState) => state.ticketMaster.description)
  const s3ObjectPublicUrl = useSelector((state: RootState) => state.monthlyPaymentPlan.s3ObjectPublicUrl)

  const handleChangeFile = (e: any) => {
    const { files } = e.target
    setImage(window.URL.createObjectURL(files[0]))
    getBase64(files[0]).then(
      data => dispatch(base64ImageChanged(data))
    )
  }

  return (
    <>
      <Container>
        <Row>
          <Col lg={3} md={3}></Col>
          <Col lg={6} md={6}>
            <h2 className='mt30'>回数券を作成します</h2>
            <div className='mt20 mb20'>
              <Form.Group className='mb-3'>
                <Form.Label>表示名</Form.Label>
                <Form.Control placeholder='レッスン10回受講券など'
                              onChange={(e) => dispatch(nameChanged(e.target.value))}
                              value={name} />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>発行枚数</Form.Label>
                <Form.Control placeholder='発行枚数'
                              onChange={(e) => dispatch(issueNumberChanged(Number(e.target.value)))}
                              value={String(issueNumber)} />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>値段</Form.Label>
                <Form.Control placeholder='値段'
                              onChange={(e) => dispatch(priceChanged(Number(e.target.value)))}
                              value={String(price)} />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>有効月数</Form.Label>
                <Form.Control placeholder='有効月数'
                              type='number'
                              onChange={(e) => dispatch(effectiveMonthChanged(Number(e.target.value)))}
                              value={effectiveMonth} />
              </Form.Group>
              <Form.Group className='mb-3'>
              <Form.Label className='mt10'>回数券の説明</Form.Label>
              <FormControl
                value={description}
                onChange={(e) => dispatch(descriptionChanged(e.target.value))}
                as='textarea'
                rows={20}
                placeholder=''
                aria-label='' />
              </Form.Group>
              <Row>
                <Col>
                  <Form.Group className='mb-3'>
                    <Form.Label>公開設定</Form.Label>
                    <Form.Select placeholder='メニュー名' onChange={(e) => dispatch(publishStatusChanged(e.target.value))}>
                      <option value='Unpublish'>非公開</option>
                      <option value='Publish'>公開</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col>
                </Col>
                <Col>
                </Col>
              </Row>
              {image && <img
                className='d-block w-100 mt30'
                src={image}
                alt='image'
              />}
              {s3ObjectPublicUrl && !image && <img
                className='d-block w-100 mt30'
                src={s3ObjectPublicUrl}
                alt='image'
              />}
              <Form.Group>
                <Form.Label className='mt10'>イメージ画像</Form.Label>
                <Form.Control type='file' onChange={handleChangeFile} />
              </Form.Group>
            </div>
          </Col>
          <Col>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default CreateTicketTemplate
