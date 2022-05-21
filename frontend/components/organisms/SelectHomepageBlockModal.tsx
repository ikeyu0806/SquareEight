import React, { useState } from 'react'
import { Button, Carousel, Card, Row, Col, Modal, ListGroup, Form } from 'react-bootstrap'
import { showBlockModalChanged, blockTypeChanged, selectedBlockTypeChanged } from '../../redux/homepageSlice'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../redux/store'

const SelectHomepageBlockModal = (): JSX.Element => {
  const dispatch = useDispatch()
  const selectedBlockType = useSelector((state: RootState) => state.homepage.selectedBlockType)
  const showBlockModal = useSelector((state: RootState) => state.homepage.showBlockModal)
  const BLOCKTYPE = {
    TextImage: 'textImage'
  }

  return (
    <>
      <Modal.Header> 
        <Modal.Title>
          <span>追加したいブロックを選択してください</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
            <Card>
              <Card.Body>
                <input className='form-check-input mr10' type='radio'onChange={() => dispatch(selectedBlockTypeChanged('textImage'))} />
                <span>テキスト+画像</span>
                <div className='mt10'>テキストと画像で構成されたブロックを追加します。画像にはページリンクを設定できます</div>
                <br />
                <hr />
                <Row>
                  <Col>
                    <h2>見出し</h2>
                    <div>
                      本文
                    </div>
                  </Col>
                  <Col>
                  <img
                    className='d-block w-100'
                    src='/images/classroom.jpg'
                    alt='image'
                  />
                  </Col>
                </Row>
              </Card.Body>
            </Card>
            <br />
            <Card>
              <Card.Body>
                <input className='form-check-input mr10' type='radio' />
                <span>画像スライド</span>
                <div className='mt10'>画像スライドを追加します</div>
                <br />
                <hr />
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
                  <Carousel.Item>
                    <img
                      className='d-block w-100'
                      src='/images/meeting.jpg'
                      alt='Second slide'
                    />

                    <Carousel.Caption>
                      <h3>見出し</h3>
                      <p>本文</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      className='d-block w-100'
                      src='/images/classroom.jpg'
                      alt='Third slide'
                    />

                    <Carousel.Caption>
                      <h3>見出し</h3>
                      <p>本文</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                </Carousel>
              </Card.Body>
            </Card>
            <br />
            <Card>
              <Card.Body>
                <input className='form-check-input mr10' type='radio' onChange={() => dispatch(selectedBlockTypeChanged('externalLink'))} />
                <span>ページリンク</span>
                <div className='mt10'>ページリンク集を追加します。SmartLessonで作成したページの他、外部サイトのリンクも設定できます。</div>
                <br />
                <hr />
                <h4>店舗案内</h4>
                <ListGroup>
                  <ListGroup.Item>施設案内</ListGroup.Item>
                  <ListGroup.Item>資料請求</ListGroup.Item>
                  <ListGroup.Item>運営企業情報</ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
            <br />
            <Card>
              <Card.Body>
                <input className='form-check-input mr10' type='radio' />
                <span>お知らせ・ ニュース</span>
                <div className='mt10'>お知らせ・ニュースを追加します。投稿内容と公開開始日、終了日は管理画面から設定できます。</div>
                <br />
                <hr />
                <h4>店舗からのお知らせ</h4>
                <ListGroup>
                  <ListGroup.Item>月額課金新プランのお知らせ</ListGroup.Item>
                  <ListGroup.Item>レッスン新規プランのお知らせ</ListGroup.Item>
                  <ListGroup.Item>臨時休業日のお知らせ</ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
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
