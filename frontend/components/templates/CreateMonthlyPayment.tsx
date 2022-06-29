import React, { useState } from 'react'
import { Container, Table, Button, FormControl, Row, Col, Modal, Form } from 'react-bootstrap'

const CreateMonthlyPayment = (): JSX.Element => {
  const [showModal, setShowModal] = useState(false)
  const [isReserveLimited, setIsReserveLimited] = useState(true)

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
                  placeholder='10000'
                  aria-label='10000'
                />
              </td>
              <td>1ヶ月間予約し放題
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
              <Form.Label>予約可能数</Form.Label>
              <Form.Check 
                type='radio'
                id='unlimited'
                label='無制限'
                onChange={() => setIsReserveLimited(!isReserveLimited)}
                checked={isReserveLimited}
              />
              <Form.Check 
                type='radio'
                id='limited'
                label='制限あり'
                onChange={() => setIsReserveLimited(!isReserveLimited)}
                checked={!isReserveLimited}
              />
            </Form>
            {!isReserveLimited && <Row>
              <Col>
                <Form.Group as={Row} className='mb-3' controlId='formHorizontalEmail'>
                  <Col sm={2}>
                    <Form.Control type='number' placeholder='1' />
                  </Col>
                  <Col>
                    <Form.Select>
                      <option value='00'>日</option>
                      <option value='01'>週</option>
                    </Form.Select>
                  </Col>
                  <Form.Label column sm={2}>
                    に
                  </Form.Label>
                  <Col sm={2}>
                    <Form.Control type='number' />
                  </Col>
                  <Form.Label column sm={2}>
                    回予約可能
                  </Form.Label>
                </Form.Group>        
              </Col>
            </Row>}
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={() => setShowModal(false)}>閉じる</Button>
            <Button variant='primary'>登録する</Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  )
}
export default CreateMonthlyPayment
