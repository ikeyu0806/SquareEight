import React from 'react'
import { Card, ListGroup } from 'react-bootstrap'
import { selectedBlockTypeChanged } from '../../redux/homepageSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { BLOCK_TYPE } from '../../constants/blockType'

const SelectTicketPageModal = (): JSX.Element => {
  const dispatch = useDispatch()
  const showBlockSample = useSelector((state: RootState) => state.homepage.showBlockSample)
  const selectedBlockType = useSelector((state: RootState) => state.homepage.selectedBlockType)

  return (
    <div onClick={() => dispatch(selectedBlockTypeChanged(BLOCK_TYPE.TICKET_PAGE))}>
      <Card>
        <Card.Body>
          <input className='form-check-input mr10'
                 type='radio'
                 checked={selectedBlockType === BLOCK_TYPE.TICKET_PAGE}/>
          <span>回数券一覧</span>
          <div className='mt10'>SmartLessonで作成した回数券購入ページへのリンクを追加します。</div>
          {showBlockSample &&
          <>
            <br/>
            <hr />
            <h4>回数券一覧</h4>
            <ListGroup>
              <ListGroup.Item>レッスン5回受講券</ListGroup.Item>
              <ListGroup.Item>レッスン10回受講券</ListGroup.Item>
              <ListGroup.Item>レッスン100回受講券</ListGroup.Item>
            </ListGroup>
          </>}
        </Card.Body>
      </Card>
    </div>
  )
}

export default SelectTicketPageModal
