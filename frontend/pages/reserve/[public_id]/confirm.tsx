import type { NextPage } from 'next'
import { Container, Button, Row, Col, Card } from 'react-bootstrap'

const PaymentMethod: NextPage = () => {
  return (
    <>
      <Container>
        <div className='text-center mt50 mb50'>
          <h2>以下の内容で仮予約します。内容を確認してください</h2>
        </div>
        <Row>
          <Col></Col>
          <Col>
            <Card>
              <Card.Header>ご予約内容</Card.Header>
              <Card.Body>
                <h4>陶芸教室60分</h4>
                <br />
                <div>
                  内容の説明内容の説明内容の説明内容の説明内容の説明内容の説明
                </div>
                <div className='mt30'>
                お支払い方法: 現地払い 5000円
                </div>
                <br />
                <div>
                  キャンセル: 当日の3時間前まで
                </div>
                <div className='text-center mt30'>
                  <Button>
                    予約を確定する
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col></Col>
        </Row>
        <Row>
          <Col></Col>
          <Col>
            <Button variant='outline-primary'>
              戻る
            </Button>
          </Col>
          <Col></Col>
          <Col></Col>
          <Col></Col>
          <Col></Col>
          <Col>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </>
  )
}
  
export default PaymentMethod
