import React from 'react'
import { Card } from 'react-bootstrap'
import { selectedAtomTypeChanged, atomTypeChanged } from '../../redux/webpageSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import { ATOM_TYPE } from 'constants/atomType'


const SelectIframeAtomModal = (): JSX.Element => {
  const dispatch = useDispatch()
  const showBlockSample = useSelector((state: RootState) => state.webpage.showBlockSample)
  const selectedAtomType = useSelector((state: RootState) => state.webpage.selectedAtomType)

  return(
    <div onClick={() => dispatch(selectedAtomTypeChanged(ATOM_TYPE.IFRAME))}>
      <Card>
        <Card.Body>
          <input className='form-check-input mr10'
                 defaultChecked={selectedAtomType === ATOM_TYPE.IFRAME}
                 type='radio'/>
          <span>ページ埋め込み（iframe）</span>
          <div className='mt10'>別ページの埋め込み（iframe）を追加します。</div>
          {showBlockSample && 
            <>
              <iframe src='/' width={600} height={500} />
            </>
          }
        </Card.Body>
      </Card>
    </div>
  )
}

export default SelectIframeAtomModal
