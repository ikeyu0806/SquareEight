import { Container, Row, Col, ListGroup, Form, Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { RootState } from 'redux/store'

const CreateCustomerGroup = (): JSX.Element => {
  const unselectedCustomers = useSelector((state: RootState) => state.customerGroup.unselectedCustomers)
  const selectedCustomers = useSelector((state: RootState) => state.customerGroup.selectedCustomers)

  return (
    <Container>
      <Row>
        <Col md={1}>
        </Col>
        <Col md={3}>
          <h4 className='mb20'>顧客グループ作成</h4>
          <Form.Label>グループ名</Form.Label>
          <Form.Control></Form.Control>
        </Col>
        <Col md={4}>
        </Col>
        <Col md={2}>
          <Button className='mt10'>保存する</Button>
        </Col>
        <Col md={1}>
        </Col>
      </Row>
      &emsp;
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
                      <Button size='sm'>追加</Button>
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
                      <Button size='sm' variant='danger'>削除</Button>
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
