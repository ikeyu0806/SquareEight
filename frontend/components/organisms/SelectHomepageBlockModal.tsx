import React from 'react'
import { Button, Row, Col, Modal, Form } from 'react-bootstrap'
import { showBlockModalChanged, blockTypeChanged, showBlockSampleChanged } from '../../redux/homepageSlice'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../redux/store'
import SelectExternalLinksModal from '../molecules/SelectExternalLinkModal'
import SelectTextImageModal from '../molecules/SelectTextImageModal'
import SelectImageSlideModal from '../molecules/SelectImageSlideModal'
import SelectNewsModal from '../molecules/SelectNewsModal'
import SelectInquiryModal from '../molecules/SelectInquiryModal'
import SelectAccessModal from '../molecules/SelectAccessModal'
import SelectHeadingModal from '../molecules/SelectHeadingModal'

const SelectHomepageBlockModal = (): JSX.Element => {
  const dispatch = useDispatch()
  const selectedBlockType = useSelector((state: RootState) => state.homepage.selectedBlockType)
  const showBlockSample = useSelector((state: RootState) => state.homepage.showBlockSample)

  return (
    <>
      <Modal.Header> 
        <Modal.Title>
          <span>追加したいブロックを選択してください</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className='mb20'>
          <Form.Check 
            type='switch'
            id='show-sample'
            label='サンプルを表示'
            checked={showBlockSample}
            onChange={() => dispatch(showBlockSampleChanged(!showBlockSample))}
          />
        </Form>
        <Row>
          <Col>
            <SelectHeadingModal></SelectHeadingModal>
            <br />
            <SelectImageSlideModal></SelectImageSlideModal>
            <br />
            <SelectTextImageModal></SelectTextImageModal>
            <br />
            <SelectExternalLinksModal></SelectExternalLinksModal>
            <br />
            <SelectNewsModal></SelectNewsModal>
            <br />
            <SelectInquiryModal></SelectInquiryModal>
            <br />
            <SelectAccessModal></SelectAccessModal>
            <br />
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={() => { dispatch(showBlockModalChanged(false)); dispatch(blockTypeChanged(''))}}>閉じる</Button>
      </Modal.Footer>
    </>
  )
}

export default SelectHomepageBlockModal
