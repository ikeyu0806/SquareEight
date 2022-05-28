import React, { useState } from 'react'
import { Button, Carousel, Row, Col, Modal, Form } from 'react-bootstrap'
import { showBlockModalChanged, blockTypeChanged, pageContentChanged } from '../../redux/homepageSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { PageContentState } from '../../interfaces/PageContentState'
import { ImageSlideState, ImageSlideChildState } from '../../interfaces/ImageSlideState'

const EditImageSlideBlockModal = (): JSX.Element => {
  const dispatch = useDispatch()

  const [image, setImage] = useState('/images/noimage.jpeg')
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [imageSlideChild, setImageSlideChild] = useState<ImageSlideChildState>({title: title, text: text, image: image})
  const [imageSlide, setImageSlide] = useState<ImageSlideState>()

  const pageContent = useSelector((state: RootState) => state.homepage.pageContent)

  const handleChangeFile = (e: any) => {
    const { files } = e.target
    setImage(window.URL.createObjectURL(files[0]))
  }

  const addImageSlideChild = () => {
    let updateImageSlideChild: ImageSlideChildState[]
    if (imageSlide) {
      updateImageSlideChild = [...imageSlide.imageSlide, { title: title, text: text, image: image }]
      setImageSlide({imageSlide: updateImageSlideChild})
    } else {
      setImageSlide({imageSlide: [{ title: title, text: text, image: image }]})
    }
  }

  const completeEdit = () => {
    let updatePageContentState: PageContentState[]
    if (imageSlide !== undefined) {
      updatePageContentState = [...pageContent, {blockType: 'imageSlide', blockState: imageSlide }]
      dispatch(pageContentChanged(updatePageContentState))
    }
    dispatch(showBlockModalChanged(false))
    dispatch(blockTypeChanged(''))
  }

  return (
    <>
      <Modal.Header> 
        <Modal.Title>
          <span>画像スライドを編集してください</span>
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
        <div className='text-center mt30 mb30'>
          <Button onClick={addImageSlideChild}>スライドを追加</Button>
        </div>
        <h4>プレビュー</h4>
        <Carousel>
          {imageSlide != undefined && imageSlide.imageSlide.map((slide, i) => {
            return (
              <Carousel.Item key={i}>
                <img
                  className='d-block w-100'
                  src={slide.image}
                  alt={slide + String(i)}
                />
                <Carousel.Caption>
                  <h3>{slide.title}</h3>
                  <p>{slide.text}</p>
                </Carousel.Caption>
              </Carousel.Item>
            )
          })}
        </Carousel>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={() => { dispatch(showBlockModalChanged(false)); dispatch(blockTypeChanged(''))}}>閉じる</Button>
        <Button variant='primary' onClick={completeEdit}>編集を終えてブロックを追加</Button>
      </Modal.Footer>
    </>
  )
}

export default EditImageSlideBlockModal
