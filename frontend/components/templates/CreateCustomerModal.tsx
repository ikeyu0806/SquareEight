import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import CreateCustomerForm from 'components/organisms/CreateCustomerForm'
import { alertChanged } from 'redux/alertSlice'
import { showCreateCustomerModalChanged } from 'redux/customerSlice'

const CreateCustomerModal = (): JSX.Element => {
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const dispatch = useDispatch()
  const showCreateCustomerModal = useSelector((state: RootState) => state.customer.showCreateCustomerModal)
  const firstName = useSelector((state: RootState) => state.customer.firstName)
  const lastName = useSelector((state: RootState) => state.customer.lastName)
  const firstNameKana = useSelector((state: RootState) => state.customer.firstNameKana)
  const lastNameKana = useSelector((state: RootState) => state.customer.lastNameKana)
  const email = useSelector((state: RootState) => state.customer.email)
  const notes = useSelector((state: RootState) => state.customer.notes)
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
        notes: notes,
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
    <Modal show={showCreateCustomerModal} size='lg'>
      <Modal.Header>顧客登録</Modal.Header>
      <Modal.Body>
        <CreateCustomerForm></CreateCustomerForm>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => createCustomer()}>
          登録する
        </Button>
        <Button variant='secondary' onClick={() => dispatch(showCreateCustomerModalChanged(false))}>
          閉じる
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CreateCustomerModal
