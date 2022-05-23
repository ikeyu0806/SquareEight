import React, { useState } from 'react'
import { Button, Row, Col, Modal, Form } from 'react-bootstrap'
import { showBlockModalChanged, blockTypeChanged } from '../../redux/homepageSlice'
import { useDispatch } from 'react-redux'

const EditTextImageBlockModal = (): JSX.Element => {
  const [image, setImage] = useState('/images/noimage.jpeg')
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')

  const dispatch = useDispatch()

  const handleChangeFile = (e: any) => {
    const { files } = e.target
    setImage(window.URL.createObjectURL(files[0]))
  }

  const completeEdit = () => {
    dispatch(blockTypeChanged(''))
  }

  const [selectedBlockedType, setSelectedBlockedType] = useState('')

  return (
    <>
      <Modal.Header> 
        <Modal.Title>
          <span>テキストと画像を編集してください</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col>
            <Form>
              <Form.Group>
                <Form.Label>見出し</Form.Label>
                <Form.Control onChange={(e) => setTitle(e.target.value)}></Form.Control>
                <Form.Label>本文</Form.Label>
                <Form.Control as='textarea' rows={10} onChange={(e) => setText(e.target.value)}></Form.Control>
              </Form.Group>
            </Form>
          </Col>
          <Col>
          <img
            className='d-block w-100'
            src={image}
            alt='image'
          />
            <Form.Group controlId='formFile' className='mb5 mt10'>
              <Form.Label>画像をアップロード</Form.Label>
              <Form.Control type='file' onChange={handleChangeFile} />
            </Form.Group>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={() => { dispatch(showBlockModalChanged(false)); dispatch(blockTypeChanged(''))}}>閉じる</Button>
        <Button variant='primary' onClick={completeEdit}>編集を終えてブロックを追加</Button>
      </Modal.Footer>
    </>
  )
}

export default EditTextImageBlockModal
