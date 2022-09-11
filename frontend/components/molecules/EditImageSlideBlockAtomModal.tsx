import React, { useState } from 'react'
import { Button, Carousel, Row, Col, Modal, Form } from 'react-bootstrap'
import { showBlockModalChanged,
         selectedAtomTypeChanged,
         addAtomSelectedBlockChanged,
         atomTypeChanged,
         pageContentChanged,
         currentMaxSortOrderChanged } from 'redux/webpageSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import { PageContentState, ImageSlide, ImageSlideChild  } from 'interfaces/PageContentState'
import { getBase64 } from 'functions/getBase64'
import { BlockContent } from 'interfaces/PageContentState'
import { ATOM_TYPE } from 'constants/atomType'

const EditImageSlideBlockAtomModal = (): JSX.Element => {
  const dispatch = useDispatch()

  const [image, setImage] = useState('/images/noimage.jpeg')
  const [base64Image, setBase64Image] = useState<any>('')
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [imageSlideTextColor, setImageSlideTextColor] = useState('text-light')
  const [imageSlide, setImageSlide] = useState<ImageSlide>()
  const currentMaxSortOrder = useSelector((state: RootState) => state.webpage.currentMaxSortOrder)
  const addAtomSelectedBlock = useSelector((state: RootState) => state.webpage.addAtomSelectedBlock)
  const selectedBlockID = useSelector((state: RootState) => state.webpage.selectedBlockID)
  const pageContent = useSelector((state: RootState) => state.webpage.pageContent)

  const colorValues = [ {label: 'White', textColorClass: 'text-light'},
                        {label: 'Black', textColorClass: 'text-dark'},
                        {label: 'Red', textColorClass: 'text-danger'},
                        {label: 'Blue', textColorClass: 'text-primary'},
                        {label: 'Green', textColorClass: 'text-success'},
                        {label: 'Yellow', textColorClass: 'text-warning'} ]

  const handleChangeFile = (e: any) => {
    const { files } = e.target
    setImage(window.URL.createObjectURL(files[0]))
    getBase64(files[0]).then(
      data => setBase64Image(data)
    )
  }

  const addImageSlideChild = () => {
    let updateImageSlideChild: ImageSlideChild[]
    if (imageSlide) {
      updateImageSlideChild = [...imageSlide.imageSlide, { title: title, text: text, image: image, base64Image: base64Image, imageSlideTextColor: imageSlideTextColor }]
      setImageSlide({atomType: ATOM_TYPE.IMAGE_SLIDE, imageSlide: updateImageSlideChild})
    } else {
      setImageSlide({atomType: ATOM_TYPE.IMAGE_SLIDE, imageSlide: [{ title: title, text: text, image: image, base64Image: base64Image, imageSlideTextColor: imageSlideTextColor  }]})
    }
  }

  const completeEdit = () => {
    if (addAtomSelectedBlock) {
      addAtomSelectedBlockFunc()
    } else {
      addAtomNewBlockFunc()
    }
  }

  const addAtomSelectedBlockFunc = () => {
    let targetBlockContentState: BlockContent | undefined = pageContent.blockContent.find(content => content.blockID === selectedBlockID)
    if (imageSlide !== undefined) {
      if (targetBlockContentState !== undefined) {
        let updateAtoms: ImageSlide[] = targetBlockContentState.atoms as ImageSlide[]
        updateAtoms = [...updateAtoms, imageSlide]
        let insertBlockContentState: BlockContent = { atoms: updateAtoms, blockID: targetBlockContentState.blockID, sortOrder: targetBlockContentState.sortOrder }
        let filterBlockContents = pageContent.blockContent.filter(content => content.blockID !== insertBlockContentState.blockID)
        let updatePageContentState: PageContentState = { blockContent: [...filterBlockContents, insertBlockContentState] }
        dispatch((pageContentChanged(updatePageContentState)))
        dispatch(showBlockModalChanged(false))
        dispatch(atomTypeChanged(''))
        dispatch(selectedAtomTypeChanged(''))
      }
    }
  }

  const addAtomNewBlockFunc = () => {
    if (imageSlide !== undefined) {
      let blockID = new Date().getTime().toString(16)
      let BlockState: BlockContent
      BlockState = { blockID: blockID, atoms: [imageSlide], sortOrder: currentMaxSortOrder + 1 }
      let updatePageContentState: PageContentState = { blockContent: [...pageContent.blockContent, BlockState] }
      dispatch(pageContentChanged(updatePageContentState))
      dispatch(showBlockModalChanged(false))
      dispatch(atomTypeChanged(''))
      dispatch(selectedAtomTypeChanged(''))
      dispatch(currentMaxSortOrderChanged(currentMaxSortOrder + 1))
    }
  }

  const closeModal = () => {
    dispatch(showBlockModalChanged(false))
    dispatch(selectedAtomTypeChanged(''))
    dispatch(addAtomSelectedBlockChanged(false))
    dispatch(atomTypeChanged(''))
  }

  const execBack = () => {
    dispatch(atomTypeChanged(''))
    dispatch(selectedAtomTypeChanged(''))
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
            <Form.Label className='mt20'>テキストの色</Form.Label>
            <br/>
            {colorValues.map((json, i) => {
              return (
                <Form.Check
                  key={i}
                  inline
                  type='radio'
                  id={json.label + 'brandColor'}
                  label={json.label}
                  value={json.textColorClass}
                  checked={imageSlideTextColor === json.textColorClass}
                  onChange={() =>{
                    setImageSlideTextColor(json.textColorClass)
                  }}
                  name='brandColor' ></Form.Check>
              )
            })}
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
                  <h3 className={imageSlideTextColor}>{slide.title}</h3>
                  <p className={imageSlideTextColor}>{slide.text}</p>
                </Carousel.Caption>
              </Carousel.Item>
            )
          })}
        </Carousel>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={execBack}>戻る</Button>
        <Button variant='secondary' onClick={closeModal}>閉じる</Button>
        <Button variant='primary' onClick={completeEdit}>編集を終えて要素を追加</Button>
      </Modal.Footer>
    </>
  )
}

export default EditImageSlideBlockAtomModal
