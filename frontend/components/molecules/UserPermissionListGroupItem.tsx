import { Container, Row, Col, ListGroup, Form } from 'react-bootstrap'

interface Props {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  checked: boolean
}

const UserPermissionListGroupItem = ({onChange, checked}: Props): JSX.Element => {
  return (
    <>
      <ListGroup.Item>
        <Row>
          <Col>
            ユーザ閲覧
          </Col>
          <Col>
            <Row>
              <Col sm={2}></Col>
              <Col>
                <Form.Check
                  onChange={onChange}
                  checked={checked}
                  type='switch'></Form.Check>
              </Col>
              <Col>
                <span>有効</span>
              </Col>
              <Col sm={1}></Col>
            </Row>
          </Col>
        </Row>
      </ListGroup.Item>
    </>
  )
}

export default UserPermissionListGroupItem
