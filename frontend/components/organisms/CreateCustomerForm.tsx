import React from 'react'
import { Form, FormControl } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { RootState } from 'redux/store'
import {  firstNameChanged,
          firstNameKanaChanged,
          lastNameChanged,
          lastNameKanaChanged,
          emailChanged,
          notesChanged,
          phoneNumberChanged } from 'redux/customerSlice'

const CreateCustomerForm = (): JSX.Element => {
  const dispatch = useDispatch()
  const firstName = useSelector((state: RootState) => state.customer.firstName)
  const lastName = useSelector((state: RootState) => state.customer.lastName)
  const firstNameKana = useSelector((state: RootState) => state.customer.firstNameKana)
  const lastNameKana = useSelector((state: RootState) => state.customer.lastNameKana)
  const email = useSelector((state: RootState) => state.customer.email)
  const notes = useSelector((state: RootState) => state.customer.notes)
  const phoneNumber = useSelector((state: RootState) => state.customer.phoneNumber)

  return (
    <>
      <Form.Label className='mt10'>お名前（姓）</Form.Label>
      <FormControl
        value={lastName}
        onChange={(e) => dispatch(lastNameChanged(e.target.value))} />
      <Form.Label className='mt10'>お名前（名）</Form.Label>
      <FormControl
        value={firstName}
        onChange={(e) => dispatch(firstNameChanged(e.target.value))} />
      <Form.Label className='mt10'>お名前カナ（姓）</Form.Label>
      <FormControl
        value={lastNameKana}
        onChange={(e) => dispatch(lastNameKanaChanged(e.target.value))} />
      <Form.Label className='mt10'>お名前カナ（名）</Form.Label>
      <FormControl
        value={firstNameKana}
        onChange={(e) => dispatch(firstNameKanaChanged(e.target.value))} />
      <Form.Label className='mt10'>メールアドレス</Form.Label>
      <FormControl
        value={email}
        onChange={(e) => dispatch(emailChanged(e.target.value))} />
      <Form.Label className='mt10'>携帯電話番号</Form.Label>
      <FormControl
        value={phoneNumber}
        onChange={(e) => dispatch(phoneNumberChanged(e.target.value))} />
      <Form.Label className='mt10'>メモ</Form.Label>
      <FormControl
        as='textarea'
        rows={30}
        value={notes}
        onChange={(e) => dispatch(notesChanged(e.target.value))}></FormControl>
    </>
  )
}

export default CreateCustomerForm
