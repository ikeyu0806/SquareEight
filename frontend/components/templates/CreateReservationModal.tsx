import { Modal, Button, Form, Row, Col } from 'react-bootstrap'
import { RootState } from 'redux/store'
import { useSelector, useDispatch } from 'react-redux'
import { showRegisterReservationModalChanged } from 'redux/reservationSlice'

const CreateReservationModal = (): JSX.Element => {
  const dispatch = useDispatch()
  const showRegisterReservationModal = useSelector((state: RootState) => state.reservation.showRegisterReservationModal)

  return (

    <Modal show={showRegisterReservationModal}>
      <Modal.Header>予約登録</Modal.Header>
      <Modal.Body>
        <Form.Label>予約メニュー</Form.Label>
        <Form.Select>
          <option value='demo'>demo</option>
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
