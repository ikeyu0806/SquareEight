import React, { useState } from 'react'
import { Button, Carousel, Card, Row, Col, Modal, ListGroup, Form } from 'react-bootstrap'
import { showBlockModalChanged, blockTypeChanged, selectedBlockTypeChanged, showBlockSampleChanged } from '../../redux/homepageSlice'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../redux/store'
import SelectExternalLinksModal from '../molecules/SelectEcternalLinkModal'
import SelectTextImageModal from '../molecules/SelectTextImageModal'
import SelectImageSlideModal from '../molecules/SelectImageSlideModal'
import SelectNewsModal from '../molecules/SelectNewsModal'

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
            <SelectTextImageModal></SelectTextImageModal>
            <br />
            <SelectImageSlideModal></SelectImageSlideModal>
            <br />
            <SelectExternalLinksModal></SelectExternalLinksModal>
            <br />
            <SelectNewsModal></SelectNewsModal>
            <br />
            <Card>
              <Card.Body>
                <input className='form-check-input mr10' type='radio' />
                <span>お問い合わせフォーム</span>
                <div className='mt10'>お問い合わせフォームを追加します。</div>
                <br />
                <hr />
                <Form>
                  <Form.Group className='mb-3' controlId='formBasicEmail'>
                    <Form.Label>メールアドレス</Form.Label>
                    <Form.Control type='email' disabled />
                    <Form.Text className='text-muted'>
                    </Form.Text>
                  </Form.Group>

                  <Form.Group className='mb-3' controlId='formBasicPassword'>
                    <Form.Label>お問い合わせ内容</Form.Label>
                    <Form.Control as='textarea' rows={10} disabled />
                  </Form.Group>
                  <Button variant='primary' type='submit' disabled>
                    送信
                  </Button>
                </Form>
              </Card.Body>
            </Card>
            <br />
            <Card>
              <Card.Body>
                <input className='form-check-input mr10' type='radio' />
                <span>予約ページ一覧</span>
                <div className='mt10'>SmartLessonで作成した予約ページへのリンクを追加します。</div>
                <br/>
                <hr />
                <h4>予約ページ一覧</h4>
                <ListGroup>
                  <ListGroup.Item>ヨガ60分レッスン</ListGroup.Item>
                  <ListGroup.Item>キックボクシング60分レッスン</ListGroup.Item>
                  <ListGroup.Item>臨時休業日のお知らせ</ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
            <br />
            <Card>
              <Card.Body>
                <input className='form-check-input mr10' type='radio' />
                <span>月額課金プラン一覧</span>
                <div className='mt10'>SmartLessonで作成した月額課金プラン加入ページへのリンクを追加します。</div>
                <br/>
                <hr />
                <h4>月額課金プラン一覧</h4>
                <ListGroup>
                  <ListGroup.Item>受講し放題プラン</ListGroup.Item>
                  <ListGroup.Item>隔週受講プラン</ListGroup.Item>
                  <ListGroup.Item>週１受講プラン</ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
            <br />
            <Card>
              <Card.Body>
                <input className='form-check-input mr10' type='radio' />
                <span>回数券一覧</span>
                <div className='mt10'>SmartLessonで作成した回数券購入ページへのリンクを追加します。</div>
                <br/>
                <hr />
                <h4>回数券一覧</h4>
                <ListGroup>
                  <ListGroup.Item>レッスン5回受講券</ListGroup.Item>
                  <ListGroup.Item>レッスン10回受講券</ListGroup.Item>
                  <ListGroup.Item>レッスン100回受講券</ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
            <br />
            <Card>
              <Card.Body>
                <input className='form-check-input mr10' type='radio' />
                <span>アクセス案内</span>
                <div className='mt10'>Google Mapでアクセス案内を設置できます</div>
              </Card.Body>
            </Card>
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
