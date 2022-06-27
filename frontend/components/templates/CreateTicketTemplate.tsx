import React from 'react'
import { Container, Row, Col, Form } from 'react-bootstrap'
import { RootState } from '../../redux/store'
import { useSelector, useDispatch } from 'react-redux'
import { nameChanged, issueNumberChanged, priceChanged } from 'redux/ticketMasterSlice'

const CreateTicketTemplate = (): JSX.Element => {
  const dispatch = useDispatch()

  const name = useSelector((state: RootState) => state.ticketMaster.name)
  const issueNumber = useSelector((state: RootState) => state.ticketMaster.issueNumber)
  const price = useSelector((state: RootState) => state.ticketMaster.price)

  return (
    <>
      <Container>
        <Row>
          <Col lg={3} md={3}></Col>
          <Col lg={6} md={6}>
            <h2 className='mt30'>回数券を作成します</h2>
            <div className='mt20 mb20'>
              <Form.Group className='mb-3'>
                <Form.Label>表示名</Form.Label>
                <Form.Control placeholder='レッスン10回受講券など'
                              onChange={(e) => dispatch(nameChanged(e.target.value))}
                              value={name} />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>発行枚数</Form.Label>
                <Form.Control placeholder='発行枚数'
                              type='number'
                              onChange={(e) => dispatch(issueNumberChanged(Number(e.target.value)))}
                              value={issueNumber} />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>値段</Form.Label>
                <Form.Control placeholder='値段'
                              type='number'
                              onChange={(e) => dispatch(priceChanged(Number(e.target.value)))}
                              value={price} />
              </Form.Group>
            </div>
          </Col>
          <Col>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default CreateTicketTemplate
