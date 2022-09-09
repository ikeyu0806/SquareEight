import React, { useState } from 'react'
import { Button, Row, Col, Modal, Form } from 'react-bootstrap'
import { showBlockModalChanged,
         selectedAtomTypeChanged,
         addAtomSelectedBlockChanged,
         atomTypeChanged,
         pageContentChanged,
         currentMaxSortOrderChanged } from 'redux/webpageSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import { PageContentState, ImageAtom  } from 'interfaces/PageContentState'
import { getBase64 } from 'functions/getBase64'
import { BlockContent } from 'interfaces/PageContentState'
import { ATOM_TYPE } from 'constants/atomType'

const EditImageBlockAtomModal = (): JSX.Element => {
  const dispatch = useDispatch()

  const [image, setImage] = useState('/images/noimage.jpeg')
  const [base64Image, setBase64Image] = useState<any>('')
  const [imageLink, setImageLink] = useState('')
  const [imageAtom, setImageAtom] = useState<ImageAtom>()
  const currentMaxSortOrder = useSelector((state: RootState) => state.webpage.currentMaxSortOrder)
  const addAtomSelectedBlock = useSelector((state: RootState) => state.webpage.addAtomSelectedBlock)
  const selectedBlockID = useSelector((state: RootState) => state.webpage.selectedBlockID)
  const pageContent = useSelector((state: RootState) => state.webpage.pageContent)

  const handleChangeFile = (e: any) => {
    const { files } = e.target
    setImage(window.URL.createObjectURL(files[0]))
    getBase64(files[0]).then(
      data => setBase64Image(data)
    )
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
    if (targetBlockContentState !== undefined) {
      let updateAtoms: ImageAtom[] = targetBlockContentState.atoms as ImageAtom[]
      updateAtoms = [...updateAtoms, {atomType: 'image', url: imageLink, image: image, base64Image: base64Image}]
      let insertBlockContentState: BlockContent = { atoms: updateAtoms, blockID: targetBlockContentState.blockID, sortOrder: targetBlockContentState.sortOrder }
      let filterBlockContents = pageContent.blockContent.filter(content => content.blockID !== insertBlockContentState.blockID)
      let updatePageContentState: PageContentState = { blockContent: [...filterBlockContents, insertBlockContentState] }
      dispatch((pageContentChanged(updatePageContentState)))
      dispatch(showBlockModalChanged(false))
      dispatch(atomTypeChanged(''))
      dispatch(selectedAtomTypeChanged(''))
    }
  }

  const addAtomNewBlockFunc = () => {
    let blockID = new Date().getTime().toString(16)
    let BlockState: BlockContent
    BlockState = { blockID: blockID, atoms: [{atomType: 'image', url: imageLink, image: image, base64Image: base64Image}], sortOrder: currentMaxSortOrder + 1 }
    let updatePageContentState: PageContentState = { blockContent: [...pageContent.blockContent, BlockState] }
    dispatch(pageContentChanged(updatePageContentState))
    dispatch(showBlockModalChanged(false))
    dispatch(atomTypeChanged(''))
    dispatch(selectedAtomTypeChanged(''))
    dispatch(currentMaxSortOrderChanged(currentMaxSortOrder + 1))
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
          <span>画像を編集してください</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={2} sm={0}></Col>
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
            <Form.Group controlId='formFile' className='mb5 mt10'>
              <Form.Label>リンクを追加</Form.Label>
              <Form.Control type='text' onChange={(e) => setImageLink(e.target.value)} />
            </Form.Group>
          </Col>
          <Col md={2} sm={0}></Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={execBack}>戻る</Button>
        <Button variant='secondary' onClick={closeModal}>閉じる</Button>
        <Button variant='primary' onClick={completeEdit}>編集を終えて要素を追加</Button>
      </Modal.Footer>
    </>
  )
}

export default EditImageBlockAtomModal
