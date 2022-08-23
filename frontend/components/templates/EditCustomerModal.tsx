import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import CreateCustomerForm from 'components/organisms/CreateCustomerForm'
import { alertChanged } from 'redux/alertSlice'
import { showCustomerModalChanged } from 'redux/customerSlice'

const EditCustomerModal = (): JSX.Element => {
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const dispatch = useDispatch()
  const customerId = useSelector((state: RootState) => state.customer.customerId)
  const showCustomerModal = useSelector((state: RootState) => state.customer.showCustomerModal)
  const firstName = useSelector((state: RootState) => state.customer.firstName)
  const lastName = useSelector((state: RootState) => state.customer.lastName)
  const firstNameKana = useSelector((state: RootState) => state.customer.firstNameKana)
  const lastNameKana = useSelector((state: RootState) => state.customer.lastNameKana)
  const email = useSelector((state: RootState) => state.customer.email)
  const phoneNumber = useSelector((state: RootState) => state.customer.phoneNumber)

  const createCustomer = () => {
    axios.post(`${process.env.BACKEND_URL}/api/internal/account/${customerId}/customers`,
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
        <CreateCustomerForm></CreateCustomerForm>
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

export default EditCustomerModal
