import { Modal, Button, Row, Col, Table } from 'react-bootstrap'
import { RootState } from 'redux/store'
import { useSelector, useDispatch } from 'react-redux'
import { showPaymentIntentModalChanged } from 'redux/stripePaymentIntentSlice'
import paymentIntentStyles from 'styles/PaymentIntent.module.css'

const PaymentIntentModal = () => {
  const dispatch = useDispatch()
  const showPaymentIntentModal =  useSelector((state: RootState) => state.stripePaymentIntent.showPaymentIntentModal)
  const selectedStripePaymentIntent =  useSelector((state: RootState) => state.stripePaymentIntent.selectedStripePaymentIntent)

  return (
    <Modal show={showPaymentIntentModal} size='lg'>
      <Modal.Body>
        <div className='text-center font-weight-bold font-size-25'>領収書</div>
        <Row>
          <Col sm={7}>
            <div>{selectedStripePaymentIntent.customer_fullname}様</div>
          </Col>
          <Col sm={4}>
            <div>発行日: {selectedStripePaymentIntent.order_date}</div>
          </Col>
        </Row>
        <div className='mt30'>下記正に領収いたしました</div>
        <br />
        <Row>
          <Col>
            <Table bordered>
              <tr>
                <td className={paymentIntentStyles.invoice_caption}>金額</td>
                <td className={paymentIntentStyles.invoice_content}>{selectedStripePaymentIntent.amount}円（税込）</td>
              </tr>
            </Table>
          </Col>
          <Col>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={() => dispatch(showPaymentIntentModalChanged(false))}>閉じる</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default PaymentIntentModal
