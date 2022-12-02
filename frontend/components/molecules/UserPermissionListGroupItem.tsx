import { Container, Row, Col, ListGroup, Form } from 'react-bootstrap'

interface Props {
  text: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  checked: boolean
}

const UserPermissionListGroupItem = ({text, onChange, checked}: Props): JSX.Element => {
  return (
    <>
      <ListGroup.Item>
        <Row>
          <Col lg={7} md={8}>
            {text}
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
                <span>{checked ? '有効' : '無効'}</span>
              </Col>
              <Col sm={2}></Col>
            </Row>
          </Col>
        </Row>
      </ListGroup.Item>
    </>
  )
}

export default UserPermissionListGroupItem
