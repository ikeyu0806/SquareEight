import React from 'react'
import { Card } from 'react-bootstrap'
import { selectedAtomTypeChanged, atomTypeChanged } from '../../redux/webpageSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { ATOM_TYPE } from 'constants/atomType'

const SelectTextAtomModal = (): JSX.Element => {
  const dispatch = useDispatch()
  const showBlockSample = useSelector((state: RootState) => state.webpage.showBlockSample)
  const selectedAtomType = useSelector((state: RootState) => state.webpage.selectedAtomType)

  return (
    <div onClick={() => dispatch(selectedAtomTypeChanged(ATOM_TYPE.HEADING))}>
      <Card>
        <Card.Body>
          <input className='form-check-input mr10'
                 checked={selectedAtomType === ATOM_TYPE.TEXT}
                 onChange={() => dispatch(atomTypeChanged(ATOM_TYPE.TEXT))}
                 type='radio'/>
          <span>テキスト</span>
          <div className='mt10'>テキストを追加します。</div>
          {showBlockSample && 
            <>
              <br />
              <hr />
              <div>運営情報</div>
            </>
          }
        </Card.Body>
      </Card>
    </div>
  )
}

export default SelectTextAtomModal
