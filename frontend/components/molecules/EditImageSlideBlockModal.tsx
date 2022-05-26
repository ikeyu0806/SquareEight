import React, { useState } from 'react'
import { Button, Carousel, Col, Modal, Form } from 'react-bootstrap'
import { showBlockModalChanged, blockTypeChanged, pageContentChanged } from '../../redux/homepageSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { PageContentState } from '../../interfaces/PageContentState'

const EditImageSlideBlockModal = (): JSX.Element => {
  const dispatch = useDispatch()

  const [image, setImage] = useState('/images/noimage.jpeg')
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [carouselCount, setCarouselCount] = useState(2)

  const pageContent = useSelector((state: RootState) => state.homepage.pageContent)

  const handleChangeFile = (e: any) => {
    const { files } = e.target
    setImage(window.URL.createObjectURL(files[0]))
  }

  const completeEdit = () => {
    let updatePageContentState: PageContentState[]
    updatePageContentState = [...pageContent, {blockType: 'textImage', blockState: { title: title, text: text, image: image }}]
    dispatch(pageContentChanged(updatePageContentState))
    dispatch(showBlockModalChanged(false))
    dispatch(blockTypeChanged(''))
  }

  const [selectedBlockedType, setSelectedBlockedType] = useState('')

  return (
    <>
      <Modal.Header> 
        <Modal.Title>
          <span>画像スライドを編集してください</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Carousel>
          <Carousel.Item>
            <img
              className='d-block w-100'
              src='/images/wait_training.jpg'
              alt='First slide'
            />
            <Carousel.Caption>
              <h3>見出し</h3>
              <p>本文</p>
            </Carousel.Caption>
          </Carousel.Item>    
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
