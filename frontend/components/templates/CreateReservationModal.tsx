import { useEffect, useState } from 'react'
import { Modal, Button, Form, Row, Col } from 'react-bootstrap'
import { RootState } from 'redux/store'
import { useSelector, useDispatch } from 'react-redux'
import { showRegisterReservationModalChanged } from 'redux/reservationSlice'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { ReserveFrameParam } from 'interfaces/ReserveFrameParam'
import { CustomerParam } from 'interfaces/CustomerParam'
import { swalWithBootstrapButtons } from 'constants/swalWithBootstrapButtons'
import CreateCustomerForm from 'components/organisms/CreateCustomerForm'
import {  customerIdChanged,
          firstNameChanged,
          firstNameKanaChanged,
          lastNameChanged,
          lastNameKanaChanged,
          emailChanged,
          notesChanged,
          phoneNumberChanged } from 'redux/customerSlice'
import {  reserveFrameIdChanged,
          reservationDateChanged,
          startTimeChanged,
          endTimeChanged,
          numberOfPeopleChanged } from 'redux/reservationSlice'

const CreateReservationModal = (): JSX.Element => {
  const dispatch = useDispatch()
  // Reservation
  const reserveFrameId = useSelector((state: RootState) => state.reservation.reserveFrameId)
  const reservationDate = useSelector((state: RootState) => state.reservation.reservationDate)
  const startTime = useSelector((state: RootState) => state.reservation.startTime)
  const endTime = useSelector((state: RootState) => state.reservation.endTime)
  const numberOfPeople = useSelector((state: RootState) => state.reservation.numberOfPeople)
  const showRegisterReservationModal = useSelector((state: RootState) => state.reservation.showRegisterReservationModal)
  // Customer
  const customerId = useSelector((state: RootState) => state.customer.customerId)
  const firstName = useSelector((state: RootState) => state.customer.firstName)
  const lastName = useSelector((state: RootState) => state.customer.lastName)
  const firstNameKana = useSelector((state: RootState) => state.customer.firstNameKana)
  const lastNameKana = useSelector((state: RootState) => state.customer.lastNameKana)
  const email = useSelector((state: RootState) => state.customer.email)
  const notes = useSelector((state: RootState) => state.customer.notes)
  const phoneNumber = useSelector((state: RootState) => state.customer.phoneNumber)

  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const [reserveFrames, setReserveFrames] = useState<ReserveFrameParam[]>([])
  const [customers, setCustomers] = useState<CustomerParam[]>([])
  const [isSelectCustomer, setIsSelectCustomer] = useState(false)

  useEffect(() => {
    const fetchReserveFrames = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/reservations/register_reservation_info`, {
          headers: { 
            'Session-Id': cookies._square_eight_merchant_session
          },
        }
      )
      .then(function (response) {
        const reserveFrameResponse: ReserveFrameParam[] = response.data.reserve_frames
        const customerResponse: CustomerParam[] = response.data.customers
        setReserveFrames(reserveFrameResponse)
        setCustomers(customerResponse)
        dispatch(reserveFrameIdChanged(Number(reserveFrameResponse[0].id)))
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchReserveFrames()
  }, [cookies._square_eight_merchant_session, dispatch])

  const onSubmit = () => {
    axios.post(`${process.env.BACKEND_URL}/api/internal/reservations/register_by_merchant_control`,
    {
      reservations: {
        reserve_frame_id: reserveFrameId,
        reservation_date: reservationDate,
        start_time: startTime,
        end_time: endTime,
        number_of_people: numberOfPeople,
        customer_id: customerId,
        first_name: firstName,
        last_name: lastName,
        first_name_kana: firstNameKana,
        last_name_kana: lastNameKana,
        email: email,
        notes: notes,
        phone_number: phoneNumber,
        is_select_customer: isSelectCustomer
      }
    },
    {
      headers: {
        'Session-Id': cookies._square_eight_merchant_session
      }
    }).then(response => {
      swalWithBootstrapButtons.fire({
        title: '送信しました',
        icon: 'info'
      }).then((result) => {
        location.reload()
      })
    }).catch(error => {
      swalWithBootstrapButtons.fire({
        title: '送信失敗しました',
        icon: 'error'
      })
    })
  }

  const validateOnSubmit = () => {
    if (!reservationDate || !startTime || !endTime) {
      return true
    }
    return false
  }

  const insertCustomerForm = (customerId: string) => {
    let customer: CustomerParam
    customer = customers.find(c => c.id === Number(customerId)) as CustomerParam
    dispatch(customerIdChanged(customer.id))
    dispatch(firstNameChanged(customer.first_name || ''))
    dispatch(firstNameKanaChanged(customer.first_name_kana || ''))
    dispatch(lastNameChanged(customer.last_name || ''))
    dispatch(lastNameKanaChanged(customer.last_name_kana || ''))
    dispatch(emailChanged(customer.email || ''))
    dispatch(notesChanged(customer.notes || ''))
    dispatch(phoneNumberChanged(customer.phone_number || ''))
  }

  const checkSelectCustomer = () => {
    setIsSelectCustomer(true)
    let customer: CustomerParam
    customer = customers[0]
    dispatch(customerIdChanged(customer.id))
    dispatch(firstNameChanged(customer.first_name || ''))
    dispatch(firstNameKanaChanged(customer.first_name_kana || ''))
    dispatch(lastNameChanged(customer.last_name || ''))
    dispatch(lastNameKanaChanged(customer.last_name_kana || ''))
    dispatch(emailChanged(customer.email || ''))
    dispatch(notesChanged(customer.notes || ''))
    dispatch(phoneNumberChanged(customer.phone_number || ''))
  }

  return (

    <Modal show={showRegisterReservationModal}>
      <Modal.Header>予約登録</Modal.Header>
      <Modal.Body>
        <Form.Label>予約メニューを選択してください</Form.Label>
        <Form.Select>
          {reserveFrames.map((reserveFrame, i) => {
            return (
              <option value={reserveFrame.id} key={i}>{reserveFrame.title}</option>
            )
          })}
        </Form.Select>
        <hr/>
        <Form.Label>予約代表者の顧客情報を入力してください</Form.Label>
        <Form.Check
          className='mt10'
          type='radio'
          name='isSelectCustomer'
          onChange={() => setIsSelectCustomer(false)}
          checked={isSelectCustomer === false}
          label='新規に顧客を登録する'
          id='newCustomerCheck' />
        <Form.Check
          type='radio'
          name='isSelectCustomer'
          onChange={() => checkSelectCustomer()}
          checked={isSelectCustomer === true}
          label='登録済みの顧客から選択する'
          id='selectCustomerCheck' />
        {isSelectCustomer &&
        <>
          <Form.Label className='mt10'>顧客を選択してください</Form.Label>
          <Form.Select onChange={(e) => insertCustomerForm(e.target.value)}>
            {customers.map((customer, i) => {
              return (
                <option
                  value={customer.id}
                  key={i}>{customer.full_name}</option>
              )
            })}
          </Form.Select>
        </>}
        <CreateCustomerForm></CreateCustomerForm>
        <hr />
        <Form.Label className='mt10'>予約人数</Form.Label>
        <Form.Control
          value={numberOfPeople}
          onChange={(e) => dispatch(numberOfPeopleChanged(Number(e.target.value)))}
          type='number'></Form.Control>
        <hr />
        <Form.Label className='mt10'>予約日時</Form.Label>
        <Form.Control
          value={reservationDate}
          onChange={(e) => dispatch(reservationDateChanged(e.target.value))}
          type='date'></Form.Control>&nbsp;
        <Row className='mt10'>
          <Col>
            <Form.Control
              value={startTime}
              onChange={(e) => dispatch(startTimeChanged(e.target.value))}
              type='time'></Form.Control>
          </Col>
          ~
          <Col>
            <Form.Control
              value={endTime}
              onChange={(e) => dispatch(endTimeChanged(e.target.value))}
              type='time'></Form.Control>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button
          disabled={validateOnSubmit()}
          onClick={() => onSubmit()}>
          登録する
        </Button>
        <Button
          variant='secondary'
          onClick={() => dispatch(showRegisterReservationModalChanged(false))}>
          閉じる
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
export default CreateReservationModal
