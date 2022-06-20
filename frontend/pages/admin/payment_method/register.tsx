import type { NextPage } from 'next'
import AdminNavbar from '../../../components/templates/AdminNavbarTemplate'
import RegularFooter from '../../../components/organisms/RegularFooter'
import { Container, Card, Button, Row, Col, Form } from 'react-bootstrap'
import { useRouter } from 'next/router'

const Register: NextPage = () => {
  const router = useRouter()

  return (
    <>
      <AdminNavbar></AdminNavbar>
      <br />
      <Container>
        <Row>
          <Col lg={4} md={3}></Col>
          <Col lg={4} md={5}>
            <br />
            <Card>
              <Card.Header>新規クレジットカード登録</Card.Header>
              <Card.Body>
              <Form.Group className='mb-3'>
                <Form.Label>クレジットカード番号</Form.Label>
                <Form.Control />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>有効期限 mm/yy</Form.Label>
                <Row>
                  <Col>
                    <Form.Select>
                      <option value='01'>01</option>
                      <option value='02'>02</option>
                      <option value='03'>03</option>
                      <option value='04'>04</option>
                      <option value='05'>05</option>
                      <option value='06'>06</option>
                      <option value='07'>07</option>
                      <option value='08'>08</option>
                      <option value='09'>09</option>
                      <option value='10'>10</option>
                      <option value='11'>11</option>
                      <option value='12'>12</option>
                    </Form.Select>
                  </Col>
                  <Col>
                    <Form.Select aria-label='yy'>
                      <option value='2022'>2022</option>
                      <option value='2023'>2023</option>
                      <option value='2024'>2024</option>
                    </Form.Select>
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>セキュリティコード</Form.Label>
                <Row>
                  <Col>
                    <Form.Control />
                  </Col>
                </Row>
              </Form.Group>
                <div className='text-center'>
                  <Button variant='primary'
                          onClick={() => router.push('/admin/payment_method/register')}>
                    カードを登録する
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <RegularFooter></RegularFooter>
    </>
  )
}

export default Register
