import type { NextPage } from 'next'
import CustomerPageNavbar from 'components/templates/CustomerPageNavbar'
import RegularFooter from '../../components/organisms/RegularFooter'
import { Container, Card, Row, Col, Form, Button } from 'react-bootstrap'

const Index: NextPage = () => {
  return (
    <>
      <CustomerPageNavbar></CustomerPageNavbar>
      <Container className='mt50 mb50'>
        <Row>
          <Col lg={4} md={3}></Col>
            <Col lg={4}>
              <Card>
                <Card.Header>ご登録情報</Card.Header>
                <Card.Body>
                  <table className='table'>
                    <tbody>
                    <tr>
                      <td scope='row'>メールアドレス</td>
                      <td className='text-center'>sample.com</td>
                    </tr>
                    </tbody>
                  </table>
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
