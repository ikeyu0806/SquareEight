import { Container, Row, Col, ListGroup, Form, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'redux/store'
import { CustomerParam } from 'interfaces/CustomerParam'
import { selectedCustomersChanged,
         unselectedCustomersChanged } from 'redux/customerGroupSlice'

const CreateCustomerGroup = (): JSX.Element => {
  const dispatch = useDispatch()
  const name = useSelector((state: RootState) => state.customerGroup.name)
  const unselectedCustomers = useSelector((state: RootState) => state.customerGroup.unselectedCustomers)
  const selectedCustomers = useSelector((state: RootState) => state.customerGroup.selectedCustomers)

  const addSelectedCustomers = (customer: CustomerParam) => {
    let updateSelectedCustomers = [...selectedCustomers, customer]
    dispatch(selectedCustomersChanged(updateSelectedCustomers))
    let updateUnselectedCustomers = unselectedCustomers.filter(c => c.id !== customer.id)
    dispatch(unselectedCustomersChanged(updateUnselectedCustomers))
  }

  const addUnselectedCustomers = (customer: CustomerParam) => {
    let updateUnselectedCustomers = [...unselectedCustomers, customer]
    dispatch(unselectedCustomersChanged(updateUnselectedCustomers))
    let updateSelectedCustomers = selectedCustomers.filter(c => c.id !== customer.id)
    dispatch(selectedCustomersChanged(updateSelectedCustomers))
  }

  return (
    <Container>
      <Row>
        <Col md={1}></Col>
        <Col md={5}>
          <div>未選択顧客</div>
          <ListGroup>
            {unselectedCustomers.map((customer, i) => {
              return (
                <ListGroup.Item key={i}>
                  <Row>
                    <Col>
                      <div>{customer.last_name}{customer.first_name}</div>
                      <div>{customer.last_name_kana}{customer.first_name_kana}</div>
                      <div>{customer.email}</div>
                      <div>{customer.phone_number}</div>
                    </Col>
                    <Col>
                      <Button
                        onClick={() => addSelectedCustomers(customer)}
                        size='sm'>追加</Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )
            })}
          </ListGroup>
        </Col>
        <Col md={5}>
          <div>選択済み顧客</div>
          <ListGroup>
            {selectedCustomers.map((customer, i) => {
              return (
                <ListGroup.Item key={i}>
                  <Row>
                    <Col>
                      <div>{customer.last_name}{customer.first_name}</div>
                      <div>{customer.last_name_kana}{customer.first_name_kana}</div>
                      <div>{customer.email}</div>
                      <div>{customer.phone_number}</div>
                    </Col>
                    <Col>
                      <Button
                        onClick={() => addUnselectedCustomers(customer)}
                        size='sm'
                        variant='danger'>削除</Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )
            })}
          </ListGroup>
        </Col>
        <Col md={1}></Col>
      </Row>
    </Container>
  )
}

export default CreateCustomerGroup
