import React from 'react'
import { Button, Row, Col, Modal, Form } from 'react-bootstrap'
import { showBlockModalChanged, blockTypeChanged, showBlockSampleChanged } from 'redux/webpageSlice'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'redux/store'
import SelectHeadingAtomModal from 'components/molecules/SelectHeadingAtomModal'
import SelectTextAtomModal from 'components/molecules/SelectTextAtomModal'
import SelectImageSlideAtomModal from 'components/molecules/SelectImageSlideAtomModal'
import SelectExternalLinkAtomModal from 'components/molecules/SelectExternalLinkAtomModal'

const SelectHomepageAtomModal = (): JSX.Element => {
  const dispatch = useDispatch()
  const selectedAtomType = useSelector((state: RootState) => state.webpage.selectedAtomType)
  const showBlockSample = useSelector((state: RootState) => state.webpage.showBlockSample)

  return (
    <>
      <Modal.Header> 
        <Modal.Title>
          <span>追加したい要素を選択してください</span>
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
            <br />
            <SelectTextAtomModal></SelectTextAtomModal>
            <br/>
            <SelectExternalLinkAtomModal></SelectExternalLinkAtomModal>
            <br />
            <SelectImageSlideAtomModal></SelectImageSlideAtomModal>
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
