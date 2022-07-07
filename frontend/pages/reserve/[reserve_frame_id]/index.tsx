import type { NextPage } from 'next'
import { Container, Row, Col } from 'react-bootstrap'
import CommonNavbar from 'components/templates/CommonNavbar'

const Index: NextPage = () => {
  return (
    <>
      <Container>
        <CommonNavbar></CommonNavbar>
        <Row className='mt20'>
          <Col lg={3} md={3}></Col>
          <Col>
            <h3>予約ページ詳細</h3>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Index
