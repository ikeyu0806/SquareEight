import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import { Container, Table, Button, FormControl, Row, Col, Modal, Form } from 'react-bootstrap'
import { priceChanged,
         reserveIsUnlimitedChanged,
         reserveIntervalNumberChanged,
         reserveIntervalUnitChanged,
         enableReserveCountChanged } from 'redux/monthlyPaymentPlanSlice'

const CreateMonthlyPayment = (): JSX.Element => {
  const dispatch = useDispatch()
  const [showModal, setShowModal] = useState(false)
  const price = useSelector((state: RootState) => state.monthlyPaymentPlan.price)
  const reserveIsUnlimited = useSelector((state: RootState) => state.monthlyPaymentPlan.reserveIsUnlimited)
  const reserveIntervalNumber = useSelector((state: RootState) => state.monthlyPaymentPlan.reserveIntervalNumber)
  const reserveIntervalUnit = useSelector((state: RootState) => state.monthlyPaymentPlan.reserveIntervalUnit)
  const enableReserveCount = useSelector((state: RootState) => state.monthlyPaymentPlan.enableReserveCount)
  return (
    <>
      <Container>
        <div className='text-center mt50 mb50'>
          <h3 className='mb15'>月額課金プラン作成</h3>
          <span></span>
          <br />
        </div>
        <Table bordered>
          <thead>
            <tr>
              <th className=' col-lg-4'>プラン名</th>
              <th className=' col-lg-2'>月額料金</th>
              <th className=' col-lg-5'>予約受付設定</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <FormControl
                  placeholder='週2レッスンプラン 受講し放題プランなど'
                  aria-label='リソース名'
                />
              </td>
              <td>
                <FormControl
                  value={price}
                  onChange={(e) => dispatch(priceChanged(Number(e.target.value)))}
                  placeholder='10000'
                  aria-label='10000'
                />
              </td>
              <td>{reserveIsUnlimited ? '無制限' : String(reserveIntervalNumber) + (reserveIntervalUnit === 'Day' ? '日'  : '週') + 'に' + String(enableReserveCount) + '回予約可能'}
                <a className='link-text' onClick={() => setShowModal(true)}>（変更する）</a>
              </td>
            </tr>
          </tbody>
        </Table>
        <Modal show={showModal} size='lg'>
          <Modal.Header>
            <Modal.Title>予約受付設定</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Label>予約可能数{reserveIsUnlimited}</Form.Label>
              <Form.Check 
                type='radio'
                id='unlimited'
                label='無制限'
                onChange={() => dispatch(reserveIsUnlimitedChanged(!reserveIsUnlimited))}
                checked={reserveIsUnlimited}
              />
              <Form.Check 
                type='radio'
                id='limited'
                label='制限あり'
                onChange={() => dispatch(reserveIsUnlimitedChanged(!reserveIsUnlimited))}
                checked={!reserveIsUnlimited}
              />
            </Form>
            {!reserveIsUnlimited &&
            <Row>
                <Form.Group as={Row} className='mb-3' controlId='formHorizontalEmail'>
                  <Col sm={2}>
                    <Form.Control type='number'
                                  value={reserveIntervalNumber}
                                  onChange={(e) => dispatch(reserveIntervalNumberChanged(Number(e.target.value)))}
                                  placeholder='1' />
                  </Col>
                  <Col xs={2}>
                    <Form.Select onChange={(e) => dispatch(reserveIntervalUnitChanged(e.target.value))}>
                      <option value='Day'>日に</option>
                      <option value='Week'>週間に</option>
                    </Form.Select>
                  </Col>
                  <Col sm={2}>
                    <Form.Control type='number'
                                  value={enableReserveCount}
                                  onChange={(e) => dispatch(enableReserveCountChanged(Number(e.target.value)))} />
                  </Col>
                  <Form.Label column sm={2}>
                    回予約可能
                  </Form.Label>
                </Form.Group>
            </Row>}
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={() => setShowModal(false)}>閉じる</Button>
            <Button variant='primary' onClick={() => setShowModal(false)}>登録する</Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  )
}
export default CreateMonthlyPayment
