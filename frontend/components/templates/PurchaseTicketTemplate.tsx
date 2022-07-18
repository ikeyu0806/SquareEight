import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { RootState } from '../../redux/store'
import { useSelector } from 'react-redux'

const PurchaseTicketTemplate = (): JSX.Element => {
  const name = useSelector((state: RootState) => state.ticketMaster.name)
  const issueNumber = useSelector((state: RootState) => state.ticketMaster.issueNumber)
  const price = useSelector((state: RootState) => state.ticketMaster.price)
  const description = useSelector((state: RootState) => state.ticketMaster.description)

  return (
    <>
      <Container>
        <Row>
          <Col lg={3} md={3}></Col>
          <Col lg={6} md={6}>
            <Card>
              <Card.Header>回数券購入</Card.Header>
              <Card.Body>
                <h3>{name}</h3>
                <div>{issueNumber}枚</div>
                <div>{price}円</div>
                <div>{description}</div>
                <div>
                  <a className='btn btn-primary mt30' href='/ticket/payment'>購入に進む</a>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default PurchaseTicketTemplate
