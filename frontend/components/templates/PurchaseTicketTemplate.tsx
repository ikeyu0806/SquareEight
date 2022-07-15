import React from 'react'
import { Container, Row, Col, Form } from 'react-bootstrap'
import { RootState } from '../../redux/store'
import { useSelector, useDispatch } from 'react-redux'
import { nameChanged, issueNumberChanged, priceChanged } from 'redux/ticketMasterSlice'

const PurchaseTicketTemplate = (): JSX.Element => {
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
            <h2 className='mt30'>回数券購入</h2>
            <div className='mt20 mb20'>
              <h3>{name}</h3>
              <div>{issueNumber}枚</div>
              <div>{price}円</div>
            </div>
          </Col>
          <Col>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default PurchaseTicketTemplate
