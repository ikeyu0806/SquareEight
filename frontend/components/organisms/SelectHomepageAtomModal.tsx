import React from 'react'
import { Button, Row, Col, Modal, Form } from 'react-bootstrap'
import { showBlockModalChanged, blockTypeChanged, showBlockSampleChanged } from 'redux/webpageSlice'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'redux/store'
import SelectHeadingAtomModal from 'components/molecules/SelectWebpageHeadingAtomModal'
import SelectExternalLinksModal from '../molecules/SelectExternalLinkModal'
import SelectImageSlideModal from '../molecules/SelectImageSlideModal'
import SelectHeadingModal from '../molecules/SelectHeadingModal'

const SelectHomepageAtomModal = (): JSX.Element => {
  const dispatch = useDispatch()
  const selectedAtomType = useSelector((state: RootState) => state.webpage.selectedAtomType)
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
            <SelectHeadingAtomModal></SelectHeadingAtomModal>
            <br/>
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

export default SelectHomepageAtomModal
