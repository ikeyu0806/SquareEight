import React, { useState, useRef, createRef, ChangeEvent } from 'react'
import { Container, Row, Col, Form, FormControl, Button } from 'react-bootstrap'
import { RootState } from '../../redux/store'
import { useSelector, useDispatch } from 'react-redux'
import TrashIcon from 'components/atoms/TrashIcon'
import { getBase64 } from '../../functions/getBase64'
import { ProductType } from 'interfaces/ProductType'
import { nameChanged,
         descriptionChanged,
         base64ImageChanged,
         inventoryChanged,
         priceChanged,
         taxRateChanged,
         applyProductTypeChanged,
         productTypesChanged,
         showProductTypeFormChanged } from 'redux/productSlice'

const CreateProductTemplate = (): JSX.Element => {
  const dispatch = useDispatch()
  const [image, setImage] = useState('')
  const name = useSelector((state: RootState) => state.product.name)
  const price = useSelector((state: RootState) => state.product.price)
  const description = useSelector((state: RootState) => state.product.description)
  const inventory = useSelector((state: RootState) => state.product.inventory)
  const s3ObjectPublicUrl = useSelector((state: RootState) => state.product.s3ObjectPublicUrl)
  const productTypes = useSelector((state: RootState) => state.product.productTypes)
  const showProductTypeForm = useSelector((state: RootState) => state.product.showProductTypeForm)
  const productTypeNameRefs = useRef<any>([])
  productTypeNameRefs.current = productTypes.map((_, i) => productTypeNameRefs.current[i] ?? createRef())
  const productTypeInventoryRefs = useRef<any>([])
  productTypeInventoryRefs.current = productTypes.map((_, i) => productTypeInventoryRefs.current[i] ?? createRef())

  const handleChangeFile = (e: any) => {
    const { files } = e.target
    setImage(window.URL.createObjectURL(files[0]))
    getBase64(files[0]).then(
      data => dispatch(base64ImageChanged(data))
    )
  }

  const addProductTypeForm = () => {
    let updateProductTypes: ProductType[]
    updateProductTypes = []
    productTypes.map((p, i) => {
      updateProductTypes.push(p)
    })
    updateProductTypes.push({name: '', inventory: 0})
    dispatch(productTypesChanged(updateProductTypes))
  }

  const updateProductTypeName = (event: React.ChangeEvent<HTMLInputElement>, productTypeNameRef: number) => {
    let updateProductType: ProductType
    let updateProductTypes: ProductType[]
    updateProductTypes = []
    updateProductType = {name: '', inventory: 0}
    updateProductType.name = event.target.value
    updateProductType.inventory = productTypes[productTypeNameRef].inventory
    productTypes.map((p, i) => {
      if (i == productTypeNameRef) {
        updateProductTypes.push(updateProductType)
      } else {
        updateProductTypes.push(p)
      }
    })
    dispatch(productTypesChanged(updateProductTypes))
  }

  const updateProductTypeInventory = (event: React.ChangeEvent<HTMLInputElement>, inventoryRef: number) => {
    let updateProductType: ProductType
    let updateProductTypes: ProductType[]
    updateProductTypes = []
    updateProductType = {name: '', inventory: 0}
    updateProductType.inventory = Number(event.target.value)
    updateProductType.name = productTypes[inventoryRef].name
    productTypes.map((p, i) => {
      if (i == inventoryRef) {
        updateProductTypes.push(updateProductType)
      } else {
        updateProductTypes.push(p)
      }
    })
    dispatch(productTypesChanged(updateProductTypes))
  }

  const deleteProductType = (formNum: number) => {
    if (productTypes.length <= 2 ) {
      dispatch(showProductTypeFormChanged(false))
      dispatch(applyProductTypeChanged(false))
      return
    }
    let updateProductTypes: ProductType[]
    updateProductTypes = []
    productTypes.map((p, i) => {
      if (i !== formNum) {
        updateProductTypes.push(p)
      }
    })
    dispatch(productTypesChanged(updateProductTypes))
  }

  const enableProductTypeForm = () => {
    dispatch(showProductTypeFormChanged(true))
    dispatch(applyProductTypeChanged(true))
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
                <Form.Control placeholder=''
                              onChange={(e) => dispatch(nameChanged(e.target.value))}
                              value={name} />
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
              <Form.Group className='mb-3'>
                <Form.Label className='mt10'>イメージ画像</Form.Label>
                <Form.Control type="file" onChange={handleChangeFile} />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>値段（税込）</Form.Label>
                <Form.Control placeholder='値段'
                              min={0}
                              onChange={(e) => dispatch(priceChanged(Number(e.target.value)))}
                              value={String(price)} />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>税率</Form.Label>
                <Form.Select onChange={e => dispatch(taxRateChanged(Number(e.target.value)))}>
                  <option value={10}>10%（標準税率）</option>
                  <option value={8}>8%（軽減税率）</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>在庫と種類</Form.Label>
                {!showProductTypeForm && <Row>
                    <Col>
                      <Form.Control placeholder='在庫'
                                    min={0}
                                    onChange={(e) => dispatch(inventoryChanged(Number(e.target.value)))}
                                    value={String(inventory)} />                  
                      <Button
                        onClick={() => enableProductTypeForm()}
                        className='mt10 text-white'
                        variant='info'>種類を追加する</Button>
                    </Col>
                  </Row>}
                  {showProductTypeForm &&
                    <>
                      {productTypes.map((p, i) => {
                        return (
                          <Row key={i}>
                            <Col sm={6}>
                              <Form.Label>種類</Form.Label>
                              <Form.Control
                                value={p.name}
                                onChange={(e: any) => updateProductTypeName(e, i)}
                                placeholder='Sサイズ'>
                              </Form.Control>
                            </Col>
                            <Col sm={3}>
                              <Form.Label>在庫</Form.Label>
                              <Row>
                                <Col sm={10}>
                                  <Form.Control placeholder='在庫'
                                        value={p.inventory}
                                        min={1}
                                        type='number'
                                        onChange={(e: any) => updateProductTypeInventory(e, i)} />
                                </Col>
                                <Col sm={2}>
                                  <a onClick={() => deleteProductType(i)}><TrashIcon
                                    width={20}
                                    height={20}
                                    fill={'#ff0000'}></TrashIcon></a>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        )
                      })}
                      <Button
                        onClick={() => addProductTypeForm()}
                        className='mt10'
                        variant='info'>種類を追加する</Button>
                    </>
                  }
                  <Col></Col>
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
