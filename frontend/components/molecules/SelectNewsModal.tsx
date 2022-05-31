import React from 'react'
import { Card, ListGroup } from 'react-bootstrap'
import { selectedBlockTypeChanged } from '../../redux/homepageSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { BLOCK_TYPE } from '../../constants/blockType'
const SelectNewsModal = (): JSX.Element => {
  const dispatch = useDispatch()
  const showBlockSample = useSelector((state: RootState) => state.homepage.showBlockSample)
  const selectedBlockType = useSelector((state: RootState) => state.homepage.selectedBlockType)

  return (
    <div onClick={() => dispatch(selectedBlockTypeChanged(BLOCK_TYPE.NEWS))}>
      <Card>
        <Card.Body>
          <input className='form-check-input mr10'
                 type='radio'
                 checked={selectedBlockType === BLOCK_TYPE.NEWS} />
          <span>お知らせ・ ニュース</span>
          <div className='mt10'>お知らせ・ニュースを追加します。投稿内容と公開開始日、終了日は管理画面から設定できます。</div>
          {showBlockSample &&
          <>
            <br />
            <hr />
            <ListGroup>
              <ListGroup.Item>月額課金新プランのお知らせ</ListGroup.Item>
              <ListGroup.Item>レッスン新規プランのお知らせ</ListGroup.Item>
              <ListGroup.Item>臨時休業日のお知らせ</ListGroup.Item>
            </ListGroup>
          </>}
        </Card.Body>
      </Card>
    </div>
  )
}

export default SelectNewsModal
