import React, { useState } from 'react'
import type { NextPage } from 'next'
import IntroductionNavbar from '../../components/atoms/IntroductionNavbar'
import { Container, Table, Button, FormControl, Row, Col, Modal, Form } from 'react-bootstrap'
import { useRouter } from 'next/router'
import RegularFooter from '../../components/organisms/RegularFooter'

const TIcket: NextPage = () => {
  const router = useRouter()
  const [showModal, setShowModal] = useState(false)
  const [isReserveLimited, setIsReserveLimited] = useState(true)

  return (
    <>
      <IntroductionNavbar />
      <div className='text-center mt50 mb50'>
        <h3 className='mb15'>回数券作成</h3>
        <span></span>
        <br />
      </div>
      <Container>
        <Table bordered>
          <thead>
            <tr>
              <th className=' col-lg-3'>回数券名</th>
              <th className=' col-lg-3'>発行枚数</th>
              <th className=' col-lg-3'>料金</th>
              <th className=' col-lg-3'>有効期限</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <FormControl
                  placeholder='レッスン10回受講券など'
                  aria-label='name'
                />
              </td>
              <td>
                <FormControl
                  placeholder='10'
                  aria-label='10'
                />
              </td>
              <td>
                <FormControl
                  placeholder='10000'
                  aria-label='10000'
                />
              </td>
              <td>
                <Form.Control placeholder='有効期限' type='date' />
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
      <Row>
        <Col></Col>
        <Col>
          <Button variant='outline-primary' size='lg' onClick={() => router.back()}>戻る</Button>
        </Col>
        <Col></Col>
        <Col></Col>
        <Col>
          <Button variant='primary' size='lg' href='/introduction/credit_register'>次へ</Button>
        </Col>
        <Col></Col>
        <Col></Col>
        <Col>
          <Button variant='outline-primary' size='lg' href='/introduction/credit_register'>スキップ</Button>
        </Col>
        <Col></Col>
      </Row>
      <RegularFooter></RegularFooter>
    </>
  )
}

export default TIcket
