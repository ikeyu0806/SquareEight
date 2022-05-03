import React from 'react'
import { Container,
         Row,
         Col,
         Card } from 'react-bootstrap'

const Features = (): JSX.Element => {
  return (
    <Container>
      <div className='text-center mt20 mb20'>
        <h3>ホームページ作成</h3>
      </div>
      <Container>
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>
                  <input className='form-check-input mr10' type='checkbox' />
                  ホームページ作成
                </Card.Title>
                <Card.Text>
                  専門知識不要でホームページを作成できます
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>
                <input className='form-check-input mr10' type='checkbox' />
                  カラーパレット設定
                </Card.Title>
                <Card.Text>
                  好きな配色を選んでいただければ自動でサイト全体の配色を設定できます
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>
                  <input className='form-check-input mr10' type='checkbox' />
                  独自ドメイン設定
                </Card.Title>
                <Card.Text>
                  独自ドメインを設定できます
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <div className='text-center mt40 mb20'>
        <h3>予約管理</h3>
      </div>
      <Container id='about' className='mt20'>
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>
                  <input className='form-check-input mr10' type='checkbox' />
                  オンライン予約
                </Card.Title>
                <Card.Text>
                  カレンダーから24時間予約受付できます
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>
                  <input className='form-check-input mr10' type='checkbox' />
                  スタッフ
                </Card.Title>
                <Card.Text>
                  予約枠に担当スタッフを設定できます
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>
                  <input className='form-check-input mr10' type='checkbox' />
                  設備備品
                </Card.Title>
                <Card.Text>
                  設備備品によって予約枠の上限を設定できます
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <div className='text-center mt40 mb20'>
        <h3>オンライン決済</h3>
      </div>
      <Container id='about' className='mt20'>
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>
                  <input className='form-check-input mr10' type='checkbox' />
                  クレジットカード決済
                </Card.Title>
                <Card.Text>
                  レッスンに対する支払いを自動化できます
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>
                  <input className='form-check-input mr10' type='checkbox' />
                  月謝・回数券
                </Card.Title>
                <Card.Text>
                  月謝・回数券を作成できます
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col></Col>
        </Row>
      </Container>

      <div className='text-center mt40 mb20'>
        <h3>顧客管理</h3>
      </div>
      <Container id='about' className='mt20'>
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>
                  <input className='form-check-input mr10' type='checkbox' />
                  顧客管理
                </Card.Title>
                <Card.Text>
                  管理画面から連絡先、受講履歴など顧客情報を管理できます
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>
                  <input className='form-check-input mr10' type='checkbox' />
                  メール送信
                </Card.Title>
                <Card.Text>
                  顧客にメールを送信できます
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>
                  <input className='form-check-input mr10' type='checkbox' />
                  LINEでのコミュニケーション
                </Card.Title>
                <Card.Text>
                  専用のLINEアカウントを作成し顧客とコミュニケーションを取ることができます
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

    </Container>
  )
}

export default Features
