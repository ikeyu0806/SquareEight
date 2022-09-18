import { useEffect, useState } from 'react'
import { Modal, Button, Form, Row, Col } from 'react-bootstrap'
import { RootState } from 'redux/store'
import { useSelector, useDispatch } from 'react-redux'
import { showRegisterReservationModalChanged } from 'redux/reservationSlice'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { ReserveFrameParam } from 'interfaces/ReserveFrameParam'

const CreateReservationModal = (): JSX.Element => {
  const dispatch = useDispatch()
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
        console.log(response.data)
        setReserveFrames(reserveFrameResponse)
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchReserveFrames()
  }, [cookies._square_eight_merchant_session])

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
        <Form.Label className='mt10'>予約者の名前（姓）</Form.Label>
        <Form.Control></Form.Control>
        <Form.Label className='mt10'>予約者の名前（名）</Form.Label>
        <Form.Control></Form.Control>
        <Form.Label className='mt10'>予約日時</Form.Label>
        <Form.Control type='date'></Form.Control>&nbsp;
        <Row className='mt10'>
          <Col>
            <Form.Control type='time'></Form.Control>
          </Col>
          ~
          <Col>
            <Form.Control type='time'></Form.Control>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button>
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
