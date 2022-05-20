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
                <span>テキスト+画像</span>
              </Card.Body>
            </Card>
            <br />
            <Card>
              <Card.Body>
                <input className='form-check-input mr10' type='checkbox' />
                <span>画像スライド</span>
              </Card.Body>
            </Card>
            <br />
            <Card>
              <Card.Body>
                <input className='form-check-input mr10' type='checkbox' onChange={() => setSelectedBlockedType('externalLinks')}  />
                <span>外部ページリンク</span>
              </Card.Body>
            </Card>
            <br />
            <Card>
              <Card.Body>
                <input className='form-check-input mr10' type='checkbox' />
                <span>お知らせ・ ニュース</span>
              </Card.Body>
            </Card>
            <br />
            <Card>
              <Card.Body>
                <input className='form-check-input mr10' type='checkbox' />
                <span>お問い合わせフォーム</span>
              </Card.Body>
            </Card>
            <br />
            <Card>
              <Card.Body>
                <input className='form-check-input mr10' type='checkbox' />
                <span>予約ページ一覧</span>
              </Card.Body>
            </Card>
            <br />
            <Card>
              <Card.Body>
                <input className='form-check-input mr10' type='checkbox' />
                <span>アクセス案内、地図の設置</span>
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
