import React, { useState } from 'react'
import { Button, Carousel, Card, Row, Col, Modal, ListGroup, Form } from 'react-bootstrap'
import { showBlockModalChanged, blockTypeChanged, selectedBlockTypeChanged, showBlockSampleChanged } from '../../redux/homepageSlice'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../redux/store'
import SelectExternalLinksModal from '../molecules/SelectEcternalLinkModal'
import SelectTextImageModal from '../molecules/SelectTextImageModal'
import SelectImageSlideModal from '../molecules/SelectImageSlideModal'
import SelectNewsModal from '../molecules/SelectNewsModal'
import SelectInquiryModal from '../molecules/SelectInquiryModal'
import SelectReservationPageModal from '../molecules/SelectReservationPageModal'
import SelectMonthlyPaymentModal from '../molecules/SelectMonthlyPaymentModal'
import SelectTicketPageModal from '../molecules/SelectTicketPageModal'
import SelectAccessModal from '../molecules/SelectAccessModal'

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
            <Card>
              <Card.Body>
                <input className='form-check-input mr10' type='radio' onChange={() => dispatch(selectedBlockTypeChanged('custom'))} />
                <span>カスタマイズ</span>
                <div className='mt10'>構成要素を細かく選択してブロックを作成します</div>
              </Card.Body>
            </Card>
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
            <SelectReservationPageModal></SelectReservationPageModal>
            <br />
            <SelectMonthlyPaymentModal></SelectMonthlyPaymentModal>
            <br />
            <SelectTicketPageModal></SelectTicketPageModal>
            <br />
            <SelectAccessModal></SelectAccessModal>
            <br />
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={() => { dispatch(showBlockModalChanged(false)); dispatch(blockTypeChanged(''))}}>閉じる</Button>
        <Button variant='primary' onClick={() => dispatch(blockTypeChanged(selectedBlockType))}>次へ</Button>
      </Modal.Footer>
    </>
  )
}

export default SelectHomepageBlockModal
