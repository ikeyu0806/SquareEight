import React, { useState } from 'react'
import { Button, Container, Card, Row, Col, Modal, Form } from 'react-bootstrap'
import { showBlockModalChanged, blockTypeChanged } from '../../redux/homepageSlice'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../redux/store'
import PencilAquareIcon from '../atoms/PencilAquareIcon'

const EditTextImageBlockModal = (): JSX.Element => {
  const [image, setImage] = useState('/images/noimage.jpeg')

  const dispatch = useDispatch()
  const showBlockModal = useSelector((state: RootState) => state.homepage.showBlockModal)
  const BLOCKTYPE = {
    Small: 'small'
  }

  const handleChangeFile = (e: any) => {
    const { files } = e.target
    setImage(window.URL.createObjectURL(files[0]))
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
            <h2>見出し<PencilAquareIcon width={20} height={20} fill={'#0000FF'} /></h2>
            <div>
              本文を入力<PencilAquareIcon width={20} height={20} fill={'#0000FF'} />
            </div>
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
        <Button variant='primary' onClick={() => dispatch(blockTypeChanged(selectedBlockedType))}>編集を終えてブロックを追加</Button>
      </Modal.Footer>
    </>
  )
}

export default EditTextImageBlockModal
