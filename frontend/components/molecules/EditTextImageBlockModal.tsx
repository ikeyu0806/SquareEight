import React, { useState } from 'react'
import { Button, Row, Col, Modal, Form } from 'react-bootstrap'
import { showBlockModalChanged, blockTypeChanged, pageContentChanged, currentMaxSortOrderChanged } from '../../redux/homepageSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { PageContentState } from '../../interfaces/PageContentState'
import { Buffer } from 'buffer'

const EditTextImageBlockModal = (): JSX.Element => {
  const dispatch = useDispatch()

  const [image, setImage] = useState('/images/noimage.jpeg')
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [base64Image, setBase64image] = useState<any>()
  const currentMaxSortOrder = useSelector((state: RootState) => state.homepage.currentMaxSortOrder)
  const pageContent = useSelector((state: RootState) => state.homepage.pageContent)


  const handleChangeFile = (e: any) => {
    const { files } = e.target
    setImage(window.URL.createObjectURL(files[0]))
    getBase64(files[0]).then(
      data => setBase64image(data)
    )
  }

  const getBase64 = (file: any)  => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = error => reject(error)
    })
  }

  const completeEdit = () => {
    let updatePageContentState: PageContentState[]
    updatePageContentState = [...pageContent, { blockID: new Date().getTime().toString(16),
                                                blockType: 'textImage',
                                                blockState: { title: title, text: text, image: image, base64Image: base64Image },
                                                sortOrder: currentMaxSortOrder + 1 }]
    dispatch(pageContentChanged(updatePageContentState.sort(function(a, b) { return a.sortOrder < b.sortOrder ? -1 : 1 })))
    dispatch(showBlockModalChanged(false))
    dispatch(blockTypeChanged(''))
    dispatch(currentMaxSortOrderChanged(currentMaxSortOrder + 1))
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
