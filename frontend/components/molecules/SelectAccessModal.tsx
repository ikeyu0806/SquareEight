import React from 'react'
import { Card } from 'react-bootstrap'
import { selectedBlockTypeChanged } from '../../redux/webpageSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { BLOCK_TYPE } from '../../constants/blockType'

const SelectAccessModal = (): JSX.Element => {
  const dispatch = useDispatch()
  const showBlockSample = useSelector((state: RootState) => state.webpage.showBlockSample)
  const selectedBlockType = useSelector((state: RootState) => state.webpage.selectedBlockType)

  return (
    <div onClick={() => dispatch(selectedBlockTypeChanged(BLOCK_TYPE.ACCESS))}>
      <Card>
        <Card.Body>
          <input className='form-check-input mr10'
                 type='radio'
                 onChange={() => console.log('checked')}
                 checked={selectedBlockType === BLOCK_TYPE.ACCESS} />
          <span>アクセス案内</span>
          <div className='mt10'>Google Mapでアクセス案内を設置できます</div>
        </Card.Body>
      </Card>
    </div>
  )
}

export default SelectAccessModal
