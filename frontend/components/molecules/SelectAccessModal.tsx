import React from 'react'
import { Card, Form, Button } from 'react-bootstrap'
import { selectedBlockTypeChanged } from '../../redux/homepageSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'

const SelectAccessModal = (): JSX.Element => {
  const dispatch = useDispatch()
  const showBlockSample = useSelector((state: RootState) => state.homepage.showBlockSample)

  return (
    <Card>
      <Card.Body>
        <input className='form-check-input mr10' type='radio' />
        <span>アクセス案内</span>
        <div className='mt10'>Google Mapでアクセス案内を設置できます</div>
      </Card.Body>
    </Card>
  )
}

export default SelectAccessModal
