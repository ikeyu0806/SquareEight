import React from 'react'
import { Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import { nameChanged,
         channelIdChanged,
         channelSecretChanged,
         channelTokenChanged } from 'redux/lineOfficialAccountSlice'

const RegisterLineOfficialAccountForm = () => {
  const dispatch = useDispatch()
  const name = useSelector((state: RootState) => state.lineOfficialAccount.name)
  const channelId = useSelector((state: RootState) => state.lineOfficialAccount.channelId)
  const channelSecret = useSelector((state: RootState) => state.lineOfficialAccount.channelSecret)
  const channelToken = useSelector((state: RootState) => state.lineOfficialAccount.channelToken)

  return (
    <>
      <div className='mt20'>公式アカウント名</div>
      <Form.Control
        value={name}
        onChange={(e) => dispatch(nameChanged(e.target.value))}></Form.Control>
      <div className='mt20'>LINE公式アカウントのChannel情報を登録してください</div>
      <div className='mt5'>Channel ID</div>
      <Form.Control
        value={channelId}
        onChange={(e) => dispatch(channelIdChanged(e.target.value))}></Form.Control>
      <div className='mt5'>Channel secret</div>
      <Form.Control
        value={channelSecret}
        onChange={(e) => dispatch(channelSecretChanged(e.target.value))}></Form.Control>
      <div className='mt5'>Channel token</div>
      <Form.Control
        value={channelToken}
        as='textarea'
        rows={4}
        onChange={(e) => dispatch(channelTokenChanged(e.target.value))}></Form.Control>
    </>
  )
}

export default RegisterLineOfficialAccountForm
