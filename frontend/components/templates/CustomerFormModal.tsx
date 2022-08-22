import React from 'react'
import { Modal, Button, Form, FormControl } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'
import { alertChanged } from 'redux/alertSlice'
import { showCustomerModalChanged,
         firstNameChanged,
         firstNameKanaChanged,
         lastNameChanged,
         lastNameKanaChanged,
         emailChanged,
         phoneNumberChanged } from 'redux/customerSlice'

const CustomerFormModal = (): JSX.Element => {
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const dispatch = useDispatch()
  const router = useRouter()
  const showCustomerModal = useSelector((state: RootState) => state.customer.showCustomerModal)
  const firstName = useSelector((state: RootState) => state.customer.firstName)
  const lastName = useSelector((state: RootState) => state.customer.lastName)
  const firstNameKana = useSelector((state: RootState) => state.customer.firstNameKana)
  const lastNameKana = useSelector((state: RootState) => state.customer.lastNameKana)
  const email = useSelector((state: RootState) => state.customer.email)
  const phoneNumber = useSelector((state: RootState) => state.customer.phoneNumber)

  const createCustomer = () => {
    axios.post(`${process.env.BACKEND_URL}/api/internal/account/customers`,
    {
      customer: {
        first_name: firstName,
        last_name: lastName,
        first_name_kana: firstNameKana,
        last_name_kana: lastNameKana,
        email: email,
        phone_number: phoneNumber
      }
    },
    {
      headers: {
        'Session-Id': cookies._square_eight_merchant_session
      }
    }).then(response => {
      dispatch(alertChanged({message: '登録しました', show: true}))
      location.reload()
    }).catch(error => {
    })
  }

  return (
    <Modal show={showCustomerModal} size='lg'>
      <Modal.Header>顧客登録</Modal.Header>
      <Modal.Body>
        <Form.Label>お名前（姓）</Form.Label>
        <FormControl
          value={lastName}
          onChange={(e) => dispatch(lastNameChanged(e.target.value))} />
        <Form.Label>お名前（名）</Form.Label>
        <FormControl
          value={firstName}
          onChange={(e) => dispatch(firstNameChanged(e.target.value))} />
        <Form.Label>お名前カナ（姓）</Form.Label>
        <FormControl
          value={lastNameKana}
          onChange={(e) => dispatch(lastNameKanaChanged(e.target.value))} />
        <Form.Label>お名前カナ（名）</Form.Label>
        <FormControl
          value={firstNameKana}
          onChange={(e) => dispatch(firstNameKanaChanged(e.target.value))} />
        <Form.Label>メールアドレス</Form.Label>
        <FormControl
          value={email}
          onChange={(e) => dispatch(emailChanged(e.target.value))} />
        <Form.Label>携帯電話番号</Form.Label>
        <FormControl
          value={phoneNumber}
          onChange={(e) => dispatch(phoneNumberChanged(e.target.value))} />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => createCustomer()}>
          登録する
        </Button>
        <Button variant='secondary' onClick={() => dispatch(showCustomerModalChanged(false))}>
          閉じる
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CustomerFormModal
