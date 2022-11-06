import React from 'react'
import { Card } from 'react-bootstrap'
import { selectedAtomTypeChanged } from '../../redux/webpageSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import { ATOM_TYPE } from 'constants/atomType'


const SelectHTMLAtomModal = (): JSX.Element => {
  const dispatch = useDispatch()
  const showBlockSample = useSelector((state: RootState) => state.webpage.showBlockSample)
  const selectedAtomType = useSelector((state: RootState) => state.webpage.selectedAtomType)

  return(
    <div onClick={() => dispatch(selectedAtomTypeChanged(ATOM_TYPE.HTML))}>
      <Card>
        <Card.Body>
          <input className='form-check-input mr10'
                 defaultChecked={selectedAtomType === ATOM_TYPE.HTML}
                 type='radio'/>
          <span>HTML埋め込み</span>
          <div className='mt10'>HTMLを直接埋め込んでコンテンツを表示できます</div>
        </Card.Body>
      </Card>
    </div>
  )
}

export default SelectHTMLAtomModal
