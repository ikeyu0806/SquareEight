import React from 'react'
import { Card } from 'react-bootstrap'
import { selectedBlockTypeChanged, blockTypeChanged } from '../../redux/homepageSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { BLOCK_TYPE } from '../../constants/blockType'

const SelectHeadingModal = (): JSX.Element => {
  const dispatch = useDispatch()
  const showBlockSample = useSelector((state: RootState) => state.homepage.showBlockSample)
  const selectedBlockType = useSelector((state: RootState) => state.homepage.selectedBlockType)

  return (
    <div onClick={() => dispatch(selectedBlockTypeChanged(BLOCK_TYPE.HEADING))}>
      <Card>
        <Card.Body>
          <input className='form-check-input mr10'
                 checked={selectedBlockType === BLOCK_TYPE.HEADING}
                 onChange={() => dispatch(blockTypeChanged(BLOCK_TYPE.HEADING))}
                 type='radio'/>
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
    </div>
  )
}

export default SelectHeadingModal
