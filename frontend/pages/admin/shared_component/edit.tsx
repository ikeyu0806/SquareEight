import { NextPage } from 'next'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { Container, Navbar, Row, Col } from 'react-bootstrap'

const Edit: NextPage = () => {
  return (
    <MerchantUserAdminLayout>
      <Container className='mb30'>
        <h3>ページ共通部分編集</h3>
        <hr />
        <Navbar bg='dark' variant='dark' expand='lg'>
          <Container>
            <Navbar.Brand href='/'>
              <span className='font-weight-bold'>
              SquareEight
              </span>
            </Navbar.Brand>
          </Container>
        </Navbar>
        <Container>
          <h3 className='mt30 mb30'>サンプル</h3>
          <Row>
            <Col>
              <div>これはサンプルです。これはサンプルです。これはサンプルです。これはサンプルです。</div>
            </Col>
            <Col>
              <img src='/images/classroom.jpg' alt='sample' width='100%'></img>
            </Col>
          </Row>
        </Container>
        <footer className='content text-center'>
          <hr />
          <p className='footer-margin'>Copyright SquareEight {new Date().getFullYear()}</p>
        </footer>
      </Container>
    </MerchantUserAdminLayout>
  )
}

export default Edit
