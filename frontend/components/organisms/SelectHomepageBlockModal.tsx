import React from 'react'
import { Button, Row, Col, Modal, Form } from 'react-bootstrap'
import { showBlockModalChanged, blockTypeChanged, showBlockSampleChanged } from '../../redux/webpageSlice'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../redux/store'
import SelectExternalLinksModal from '../molecules/SelectExternalLinkModal'
import SelectImageSlideModal from '../molecules/SelectImageSlideModal'
import SelectHeadingModal from '../molecules/SelectHeadingModal'

const SelectHomepageBlockModal = (): JSX.Element => {
  const dispatch = useDispatch()
  const selectedBlockType = useSelector((state: RootState) => state.webpage.selectedBlockType)
  const showBlockSample = useSelector((state: RootState) => state.webpage.showBlockSample)

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
            <SelectExternalLinksModal></SelectExternalLinksModal>
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
