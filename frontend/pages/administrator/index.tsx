import React from 'react'
import type { NextPage } from 'next'
import WithoutSessionLayout from 'components/templates/WithoutSessionLayout'
import { Container, Card, Row, Col } from 'react-bootstrap'

const Index: NextPage = () => {
  return (
    <WithoutSessionLayout>
      <Container className='mt50 mb50'>
        <Row>
          <Col lg={3} md={3}></Col>
          <Col lg={6}>
            <Card>
              <Card.Header>運営者情報</Card.Header>
              <Card.Body>
                <div>サービス管理人: 池谷祐貴</div>
                <hr/>
                <div><a href='https://jp.linkedin.com/in/%E7%A5%90%E8%B2%B4-%E6%B1%A0%E8%B0%B7-61a31661'>Linkdin</a></div>
                <hr/>
                <div>お問い合わせは<a href='/inquiry'>こちら</a></div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </WithoutSessionLayout>
  )
}

export default Index
