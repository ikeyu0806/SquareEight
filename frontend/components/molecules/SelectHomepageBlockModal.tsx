import React, { useState } from 'react'
import { Button, Container, Card, Row, Col, Modal } from 'react-bootstrap'
import { showBlockModalChanged, blockTypeChanged } from '../../redux/homepageSlice'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../redux/store'

const SelectHomepageBlockModal = (): JSX.Element => {
  const dispatch = useDispatch()
  const showBlockModal = useSelector((state: RootState) => state.homepage.showBlockModal)
  const BLOCKTYPE = {
    TextImage: 'textImage'
  }

  const [selectedBlockedType, setSelectedBlockedType] = useState('')
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
                <input className='form-check-input mr10' type='checkbox' onChange={() => setSelectedBlockedType('textImage')} />
                <span>カスタマイズ</span>
                <div className='mt10'>構成要素を細かく選択してブロックを作成します</div>
              </Card.Body>
            </Card>
            <br />
            <Card>
              <Card.Body>
                <input className='form-check-input mr10' type='checkbox' onChange={() => setSelectedBlockedType('textImage')} />
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
                <input className='form-check-input mr10' type='checkbox' />
                <span>画像スライド</span>
                <div className='mt10'>画像スライドを追加します</div>
              </Card.Body>
            </Card>
            <br />
            <Card>
              <Card.Body>
                <input className='form-check-input mr10' type='checkbox' onChange={() => setSelectedBlockedType('externalLinks')}  />
                <span>ページリンク</span>
                <div className='mt10'>ページリンク集を追加します</div>
              </Card.Body>
            </Card>
            <br />
            <Card>
              <Card.Body>
                <input className='form-check-input mr10' type='checkbox' />
                <span>お知らせ・ ニュース</span>
                <div className='mt10'>画像スライドを追加します</div>
              </Card.Body>
            </Card>
            <br />
            <Card>
              <Card.Body>
                <input className='form-check-input mr10' type='checkbox' />
                <span>お問い合わせフォーム</span>
                <div className='mt10'>お問い合わせフォームを追加します</div>
              </Card.Body>
            </Card>
            <br />
            <Card>
              <Card.Body>
                <input className='form-check-input mr10' type='checkbox' />
                <span>予約ページ一覧</span>
                <div className='mt10'>SmartLessonで作成した予約ページへのリンクを追加します。</div>
              </Card.Body>
            </Card>
            <br />
            <Card>
              <Card.Body>
                <input className='form-check-input mr10' type='checkbox' />
                <span>月額課金プラン一覧</span>
                <div className='mt10'>SmartLessonで作成した月額課金プラン加入ページへのリンクを追加します。</div>
              </Card.Body>
            </Card>
            <br />
            <Card>
              <Card.Body>
                <input className='form-check-input mr10' type='checkbox' />
                <span>回数券一覧</span>
                <div className='mt10'>SmartLessonで作成した回数券購入ページへのリンクを追加します。</div>
              </Card.Body>
            </Card>
            <br />
            <Card>
              <Card.Body>
                <input className='form-check-input mr10' type='checkbox' />
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
        <Button variant='primary' onClick={() => dispatch(blockTypeChanged(selectedBlockedType))}>次へ</Button>
      </Modal.Footer>
    </>
  )
}

export default SelectHomepageBlockModal
