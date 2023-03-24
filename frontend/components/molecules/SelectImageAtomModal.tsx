import React from 'react'
import { Card } from 'react-bootstrap'
import { selectedAtomTypeChanged, atomTypeChanged } from 'redux/webpageSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import { ATOM_TYPE } from 'constants/atomType'

const SelectImageAtomModal = (): JSX.Element => {
  const dispatch = useDispatch()
  const showBlockSample = useSelector((state: RootState) => state.webpage.showBlockSample)
  const selectedAtomType = useSelector((state: RootState) => state.webpage.selectedAtomType)

  return (
    <div onClick={() => dispatch(selectedAtomTypeChanged(ATOM_TYPE.IMAGE))}>
      <Card>
        <Card.Body>
          <input className='form-check-input mr10'
                 defaultChecked={selectedAtomType === ATOM_TYPE.IMAGE}
                 type='radio'/>
          <span>画像</span>
          <div className='mt10'>画像を追加します</div>
          {showBlockSample &&
          <>
            <br />
            <hr />
            <img
              className='d-block w-100'
              src='https://square-eight-demo-images.s3.ap-northeast-1.amazonaws.com/bouldering_image1.webp'
              alt='Demo Img'
            />
          </>}
        </Card.Body>
      </Card>
    </div>
  )
}

export default SelectImageAtomModal
