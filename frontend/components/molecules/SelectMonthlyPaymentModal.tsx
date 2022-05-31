import React from 'react'
import { Card, ListGroup } from 'react-bootstrap'
import { selectedBlockTypeChanged } from '../../redux/homepageSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { BLOCK_TYPE } from '../../constants/blockType'

const SelectMonthlyPaymentModal = (): JSX.Element => {
  const dispatch = useDispatch()
  const showBlockSample = useSelector((state: RootState) => state.homepage.showBlockSample)
  const selectedBlockType = useSelector((state: RootState) => state.homepage.selectedBlockType)

  return (
    <div onClick={() => dispatch(selectedBlockTypeChanged(BLOCK_TYPE.MONTHLY_PAYMENT))}>
      <Card>
        <Card.Body>
          <input className='form-check-input mr10'
                 type='radio'
                 checked={selectedBlockType === BLOCK_TYPE.MONTHLY_PAYMENT} />
          <span>月額課金プラン一覧</span>
          <div className='mt10'>SmartLessonで作成した月額課金プラン加入ページへのリンクを追加します。</div>
          {showBlockSample &&
          <>
            <br/>
            <hr />
            <h4>月額課金プラン一覧</h4>
            <ListGroup>
              <ListGroup.Item>受講し放題プラン</ListGroup.Item>
              <ListGroup.Item>隔週受講プラン</ListGroup.Item>
              <ListGroup.Item>週１受講プラン</ListGroup.Item>
            </ListGroup>
          </>}
        </Card.Body>
      </Card>
    </div>
  )
}

export default SelectMonthlyPaymentModal
