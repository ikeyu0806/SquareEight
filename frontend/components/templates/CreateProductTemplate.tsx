import React, { useState } from 'react'
import { Container, Row, Col, Form, FormControl } from 'react-bootstrap'
import { RootState } from '../../redux/store'
import { useSelector, useDispatch } from 'react-redux'
import { getBase64 } from '../../functions/getBase64'
import { nameChanged,
         descriptionChanged,
         base64ImageChanged,
         s3ObjectPublicUrlChanged,
         inventoryChanged,
         priceChanged,
         taxRateChanged,
         productTypesChanged } from 'redux/productSlice'

const CreateProductTemplate = (): JSX.Element => {
  const dispatch = useDispatch()
  const [image, setImage] = useState('')
  const name = useSelector((state: RootState) => state.product.name)
  const price = useSelector((state: RootState) => state.product.price)
  const description = useSelector((state: RootState) => state.product.description)
  const taxRate = useSelector((state: RootState) => state.product.taxRate)
  const inventory = useSelector((state: RootState) => state.product.inventory)
  const base64Image = useSelector((state: RootState) => state.product.base64Image)
  const s3ObjectPublicUrl = useSelector((state: RootState) => state.product.s3ObjectPublicUrl)
  const productTypes = useSelector((state: RootState) => state.product.productTypes)

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
            <h2 className='mt30'>物販商品を作成します</h2>
            <div className='mt20 mb20'>
              <Form.Group className='mb-3'>
                <Form.Label>商品名</Form.Label>
                <Form.Control placeholder='レッスン10回受講券など'
                              onChange={(e) => dispatch(nameChanged(e.target.value))}
                              value={name} />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>値段</Form.Label>
                <Form.Control placeholder='値段'
                              min={1}
                              type='number'
                              onChange={(e) => dispatch(priceChanged(Number(e.target.value)))}
                              value={price} />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label className='mt10'>商品の説明</Form.Label>
                <FormControl
                  value={description}
                  onChange={(e) => dispatch(descriptionChanged(e.target.value))}
                  as='textarea'
                  rows={20}
                  placeholder=''
                  aria-label='' />
              </Form.Group>
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
                <Form.Control type="file" onChange={handleChangeFile} />
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

export default CreateProductTemplate
