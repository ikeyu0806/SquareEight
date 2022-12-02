import type { NextPage } from 'next'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { Container, Row, Col, ListGroup, Form } from 'react-bootstrap'

const Permission: NextPage = () => {
  return (
    <MerchantUserAdminLayout>
      <Container>
        <Row>
          <Col lg={4}>
          </Col>
          <Col lg={4}>
            <ListGroup>
              <ListGroup.Item>
                <Row>
                  <Col>
                    ユーザ閲覧
                  </Col>
                  <Col>
                    <Row>
                      <Col sm={2}></Col>
                      <Col>
                        <Form.Check type='switch'></Form.Check>
                      </Col>
                      <Col>
                        <span>有効</span>
                      </Col>
                      <Col sm={1}></Col>
                    </Row>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    ユーザ登録
                  </Col>
                  <Col>
                    <Row>
                      <Col sm={2}></Col>
                      <Col>
                        <Form.Check type='switch'></Form.Check>
                      </Col>
                      <Col>
                        <span>有効</span>
                      </Col>
                      <Col sm={1}></Col>
                    </Row>
                  </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </MerchantUserAdminLayout>
  )
}

export default Permission
