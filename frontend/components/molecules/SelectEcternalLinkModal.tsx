import React from 'react'
import { Card, ListGroup } from 'react-bootstrap'
import { selectedBlockTypeChanged } from '../../redux/homepageSlice'
import { useDispatch } from 'react-redux'

const SelectExternalLinksModal = (): JSX.Element => {
  const dispatch = useDispatch()
  return (
    <Card>
    <Card.Body>
      <input className='form-check-input mr10' type='radio' onChange={() => dispatch(selectedBlockTypeChanged('externalLinks'))} />
      <span>ページリンク</span>
      <div className='mt10'>ページリンク集を追加します。SmartLessonで作成したページの他、外部サイトのリンクも設定できます。</div>
      <br />
      <hr />
      <h4>
        店舗案内
      </h4>
      <ListGroup>
        <ListGroup.Item action href="https://google.com">施設案内</ListGroup.Item>
        <ListGroup.Item>資料請求</ListGroup.Item>
        <ListGroup.Item>運営企業情報</ListGroup.Item>
      </ListGroup>
    </Card.Body>
  </Card>
  )
}

export default SelectExternalLinksModal
