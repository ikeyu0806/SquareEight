import React from 'react'
import { Card } from 'react-bootstrap'
import { selectedBlockTypeChanged } from '../../redux/homepageSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { BLOCK_TYPE } from '../../constants/blockType'

const SelectHeadingModal = (): JSX.Element => {
  const dispatch = useDispatch()
  const showBlockSample = useSelector((state: RootState) => state.homepage.showBlockSample)

  return (
    <Card>
    <Card.Body>
      <input className='form-check-input mr10' type='radio' onChange={() => dispatch(selectedBlockTypeChanged(BLOCK_TYPE.HEADING))} />
      <span>見出し</span>
      <div className='mt10'>見出しを追加します。大きさと配置は選択できます</div>
      {showBlockSample && 
        <>
          <br />
          <hr />
          <h1>見出し</h1>
        </>
      }
    </Card.Body>
  </Card>
  )
}

export default SelectHeadingModal
