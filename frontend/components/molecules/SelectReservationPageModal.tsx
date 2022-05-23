import React from 'react'
import { Card, Form, ListGroup } from 'react-bootstrap'
import { selectedBlockTypeChanged } from '../../redux/homepageSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'

const SelectReservationPageModal = (): JSX.Element => {
  const dispatch = useDispatch()
  const showBlockSample = useSelector((state: RootState) => state.homepage.showBlockSample)

  return (
    <Card>
      <Card.Body>
        <input className='form-check-input mr10' type='radio' />
        <span>予約ページ一覧</span>
        <div className='mt10'>SmartLessonで作成した予約ページへのリンクを追加します。</div>
        {showBlockSample &&
        <>
          <br/>
          <hr />
          <h4>予約ページ一覧</h4>
          <ListGroup>
            <ListGroup.Item>ヨガ60分レッスン</ListGroup.Item>
            <ListGroup.Item>キックボクシング60分レッスン</ListGroup.Item>
            <ListGroup.Item>臨時休業日のお知らせ</ListGroup.Item>
          </ListGroup>
        </>}

      </Card.Body>
    </Card>
  )
}

export default SelectReservationPageModal
