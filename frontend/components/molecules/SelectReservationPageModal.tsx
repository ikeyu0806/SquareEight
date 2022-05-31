import React from 'react'
import { Card, ListGroup } from 'react-bootstrap'
import { selectedBlockTypeChanged } from '../../redux/homepageSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { BLOCK_TYPE } from '../../constants/blockType'

const SelectReservationPageModal = (): JSX.Element => {
  const dispatch = useDispatch()
  const showBlockSample = useSelector((state: RootState) => state.homepage.showBlockSample)
  const selectedBlockType = useSelector((state: RootState) => state.homepage.selectedBlockType)

  return (
    <div onClick={() => dispatch(selectedBlockTypeChanged(BLOCK_TYPE.RESERVATION_PAGE))}>
      <Card>
        <Card.Body>
          <input className='form-check-input mr10'
                 type='radio'
                 checked={selectedBlockType === BLOCK_TYPE.RESERVATION_PAGE} />
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
    </div>
  )
}

export default SelectReservationPageModal
