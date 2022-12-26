import React from 'react'
import { FormControl, Form } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'redux/store'
import { nameChanged, quantityChanged } from 'redux/resourceSlice'
import ResourceLimitAlert from 'components/molecules/ResourceLimitAlert'

const CreateResource = (): JSX.Element => {
  const dispatch = useDispatch()
  const name = useSelector((state: RootState) => state.resource.name)
  const quantity = useSelector((state: RootState) => state.resource.quantity)
  const servicePlan =  useSelector((state: RootState) => state.currentMerchantUser.servicePlan)

  return (
    <>
      <div className='text-center mt50 mb50'>
        <h3 className='mb15'>リソース登録</h3>
        <span>スタッフや設備・備品を登録して予約者数を制限することができます。</span>
        <br />
      </div>  
      <Form.Label>リソース名</Form.Label>
      <FormControl
        value={name}
        onChange={(e) => dispatch(nameChanged(e.target.value))}
        placeholder=''
        aria-label='リソース名' />
      <Form.Label className='mt10'>予約受付数</Form.Label>
      <FormControl
        value={quantity}
        type='number'
        onChange={(e) => dispatch(quantityChanged(Number(e.target.value)))}
        placeholder=''
        aria-label='月額料金' />
    </>
  )
}

export default CreateResource
