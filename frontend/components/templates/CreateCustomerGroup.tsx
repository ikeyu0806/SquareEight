import { Container, Row, Col, ListGroup } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { RootState } from 'redux/store'

const CreateCustomerGroup = (): JSX.Element => {
  const unselectedCustomers = useSelector((state: RootState) => state.customerGroup.unselectedCustomers)
  const selectedCustomers = useSelector((state: RootState) => state.customerGroup.selectedCustomers)

  return (
    <Container>
      <Row>
        <Col>
          <ListGroup>
            {unselectedCustomers.map((customer, i) => {
              return (
                <ListGroup.Item key={i}>{customer.last_name}{customer.first_name}</ListGroup.Item>
              )
            })}
          </ListGroup>
        </Col>
        <Col>
          <ListGroup>
            {selectedCustomers.map((customer, i) => {
              return (
                <ListGroup.Item key={i}>{customer.last_name}{customer.first_name}</ListGroup.Item>
              )
            })}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  )
}

export default CreateCustomerGroup
