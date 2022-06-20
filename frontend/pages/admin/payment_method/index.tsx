import type { NextPage } from 'next'
import AdminNavbar from '../../../components/templates/AdminNavbarTemplate'
import RegularFooter from '../../../components/organisms/RegularFooter'
import { Container, Card, Button, Row, Col } from 'react-bootstrap'
import { useRouter } from 'next/router'

const Index: NextPage = () => {
  const router = useRouter()

  return (
    <>
      <AdminNavbar></AdminNavbar>
      <br />
      <Container>
        <Row>
          <Col lg={2} md={3}></Col>
          <Col lg={9} md={8}>
            <h2>決済方法</h2>
            <Card>
              <Card.Header>登録クレジットカード</Card.Header>
              <Card.Body>
                <Card.Text>
                  カードが登録されていません
                </Card.Text>
                <Button variant='primary'
                        onClick={() => router.push('/admin/payment_method/register')}>
                  カードを登録する
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <RegularFooter></RegularFooter>
    </>
  )
}

export default Index
