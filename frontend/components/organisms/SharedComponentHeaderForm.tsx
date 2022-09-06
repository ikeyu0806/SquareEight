import React, { useState } from 'react'
import { Form, Row, Col } from 'react-bootstrap'
import { RootState } from 'redux/store'
import { useSelector, useDispatch } from 'react-redux'
import { getBase64 } from 'functions/getBase64'
import { navbarBrandTypeChanged, 
         navbarBrandTextChanged,
         navbarBrandImageChanged,
         navbarBrandImageWidthChanged,
         navbarBrandBackgroundColorChanged,
         navbarBrandVariantColorChanged,
         navbarBrandImageHeightChanged } from 'redux/sharedComponentSlice'

const SharedComponentHeaderForm = (): JSX.Element => {
  const dispatch = useDispatch()
  const [image, setImage] = useState('')
  const navbarBrandType =  useSelector((state: RootState) => state.sharedComponent.navbarBrandType)
  const navbarBrandText =  useSelector((state: RootState) => state.sharedComponent.navbarBrandText)
  const navbarBrandImageWidth =  useSelector((state: RootState) => state.sharedComponent.navbarBrandImageWidth)
  const navbarBrandImageHeight =  useSelector((state: RootState) => state.sharedComponent.navbarBrandImageHeight)

  const colorValues = [ {label: 'White', backgroundColor: 'light', variant: 'light'},
                        {label: 'Black', backgroundColor: 'dark', variant: 'dark'},
                        {label: 'Red', backgroundColor: 'danger', variant: 'dark'},
                        {label: 'Blue', backgroundColor: 'primary', variant: 'dark'},
                        {label: 'Green', backgroundColor: 'success', variant: 'dark'},
                        {label: 'Yellow', backgroundColor: 'warning', variant: 'light'},
                        {label: 'Gray', backgroundColor: 'secondary', variant: 'dark'} ]

  const handleChangeFile = (e: any) => {
    const { files } = e.target
    setImage(window.URL.createObjectURL(files[0]))
    getBase64(files[0]).then(
      data => dispatch(navbarBrandImageChanged(data))
    )
  }

  return (
    <>
      <h3>ヘッダ編集</h3>
      <h4></h4>
      <Form.Check
        type='radio'
        id='brandTypeText'
        name='brandType'
        onChange={() => {dispatch(navbarBrandTypeChanged('text'));console.log("!!")}}
        label='テキスト'></Form.Check>
      <Form.Check
        type='radio'
        id='brandTypeImage'
        onChange={() => dispatch(navbarBrandTypeChanged('image'))}
        name='brandType'
        label='画像'></Form.Check>
      {navbarBrandType === 'text'
        && <Form.Control
            value={navbarBrandText}
            onChange={(e) => dispatch(navbarBrandTextChanged(e.target.value))}
            className='mt20'></Form.Control>}
      {navbarBrandType === 'image' &&
      <>
        <Form.Group className='mt20'>
          <Form.Label>ブランド画像を選択してください</Form.Label>
          <Form.Control type='file' onChange={handleChangeFile} />
        </Form.Group>
        <Row>
          <Col md={3} sm={6}>
            <Form.Label className='mt10'>画像の縦幅</Form.Label>
            <Form.Control
              min={1}
              max={1000}
              value={navbarBrandImageHeight}
              onChange={(e) => dispatch((navbarBrandImageHeightChanged(Number(e.target.value))))}
              type='number'></Form.Control>
          </Col>
          <Col md={3} sm={6}>
            <Form.Label className='mt10'>画像の横幅</Form.Label>
            <Form.Control
            value={navbarBrandImageWidth}
            onChange={(e) => dispatch((navbarBrandImageWidthChanged(Number(e.target.value))))}
              min={1}
              max={1000}
              type='number'></Form.Control>
          </Col>
        </Row>
      </>}
      <Form.Label className='mt30'>カラー設定</Form.Label>
      <br />
      {colorValues.map((json, i) => {
        return (
          <Form.Check
            key={i}
            inline
            type='radio'
            id={json.label + 'brandColor'}
            label={json.label}
            value={json.variant}
            onChange={() =>{
              dispatch(navbarBrandBackgroundColorChanged(json.backgroundColor))
              dispatch(navbarBrandVariantColorChanged(json.variant))
            }}
            name='brandColor' ></Form.Check>
        )
      })}
    </>
  )
}

export default SharedComponentHeaderForm
