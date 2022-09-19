import { useEffect, useState } from 'react'
import { Modal, Button, Form, Row, Col } from 'react-bootstrap'
import { RootState } from 'redux/store'
import { useSelector, useDispatch } from 'react-redux'
import { showRegisterReservationModalChanged } from 'redux/reservationSlice'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { ReserveFrameParam } from 'interfaces/ReserveFrameParam'
import { swalWithBootstrapButtons } from 'constants/swalWithBootstrapButtons'
import { reserveFrameIdChanged,
         reservationDateChanged,
         startTimeChanged,
         endTimeChanged,
         numberOfPeopleChanged,
         representativeFirstNameChanged,
         representativeLastNameChanged } from 'redux/reservationSlice'

const CreateReservationModal = (): JSX.Element => {
  const dispatch = useDispatch()
  const reserveFrameId = useSelector((state: RootState) => state.reservation.reserveFrameId)
  const reservationDate = useSelector((state: RootState) => state.reservation.reservationDate)
  const startTime = useSelector((state: RootState) => state.reservation.startTime)
  const endTime = useSelector((state: RootState) => state.reservation.endTime)
  const numberOfPeople = useSelector((state: RootState) => state.reservation.numberOfPeople)
  const representativeFirstName = useSelector((state: RootState) => state.reservation.representativeFirstName)
  const representativeLastName = useSelector((state: RootState) => state.reservation.representativeLastName)
  const showRegisterReservationModal = useSelector((state: RootState) => state.reservation.showRegisterReservationModal)
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const [reserveFrames, setReserveFrames] = useState<ReserveFrameParam[]>([])

  useEffect(() => {
    const fetchReserveFrames = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/reserve_frames`, {
          headers: { 
            'Session-Id': cookies._square_eight_merchant_session
          },
        }
      )
      .then(function (response) {
        const reserveFrameResponse: ReserveFrameParam[] = response.data.reserve_frames
        setReserveFrames(reserveFrameResponse)
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
        first_name: representativeFirstName,
        last_name: representativeLastName,
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

  return (

    <Modal show={showRegisterReservationModal}>
      <Modal.Header>予約登録</Modal.Header>
      <Modal.Body>
        <Form.Label>予約メニュー</Form.Label>
        <Form.Select>
          {reserveFrames.map((reserveFrame, i) => {
            return (
              <option value={reserveFrame.id} key={i}>{reserveFrame.title}</option>
            )
          })}
        </Form.Select>
        <Form.Label className='mt10'>予約代表者の名前（姓）</Form.Label>
        <Form.Control
          value={representativeLastName}
          onChange={(e) => dispatch(representativeLastNameChanged(e.target.value))}></Form.Control>
        <Form.Label className='mt10'>予約代表者の名前（名）</Form.Label>
        <Form.Control
          value={representativeFirstName}
          onChange={(e) => dispatch(representativeFirstNameChanged(e.target.value))}></Form.Control>
        <Form.Label className='mt10'>予約人数</Form.Label>
        <Form.Control
          value={numberOfPeople}
          onChange={(e) => dispatch(numberOfPeopleChanged(Number(e.target.value)))}
          type='number'></Form.Control>
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
        <Button onClick={() => onSubmit()}>
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
