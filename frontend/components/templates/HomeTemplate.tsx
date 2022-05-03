import React from 'react'
import { Container,
         Navbar,
         Nav,
         NavDropdown,
         Button,
         Row,
         Col,
         Card } from 'react-bootstrap'

const HomeTemplate = (): JSX.Element => {
  return (
    <Container>
      <Navbar collapseOnSelect expand='lg'>
        <Container>
          <Navbar.Brand href='#home'>SmartLesson</Navbar.Brand>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='me-auto'>
              <Nav.Link href='#about'>概要</Nav.Link>
              <Nav.Link href='#features'>機能</Nav.Link>
              <Nav.Link href='#pricing'>料金</Nav.Link>
              <Nav.Link href='#inquiry'>お問い合わせ</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href='#deets'>
                <Button>ログイン</Button>
              </Nav.Link>
              <Nav.Link href='#memes'>
                <Button>無料でお試し</Button>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className='mt20' id='about'>
        <Row>
          <Col>
            <h2>習い事・教室・レッスン運営支援サービス</h2>
            <br />
            <h4>ホームページ作成、予約管理、決済、顧客とのコミュニケーションをサポートします</h4>
          </Col>
          <Col>
            <img src='/images/use_pc_woman.jpg' alt='use_pc_woman'></img>
          </Col>
        </Row>
      </Container>
      <div className='text-center mt50 mb50'>
        <h2>充実の機能であなたのビジネスをサポート</h2>
      </div>

      <div className='text-center mt20 mb20'>
        <h3>ホームページ作成</h3>
      </div>
      <Container id='about'>
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>ホームページ作成</Card.Title>
                <Card.Text>
                  専門知識不要でホームページを作成できます
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>カラーパレット設定</Card.Title>
                <Card.Text>
                  好きな配色を選んでいただければ自動でサイト全体の配色を設定できます
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>独自ドメイン設定</Card.Title>
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
                <Card.Title>オンライン予約</Card.Title>
                <Card.Text>
                  カレンダーから24時間予約受付できます
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>スタッフ</Card.Title>
                <Card.Text>
                  予約枠に担当スタッフを設定できます
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>設備備品</Card.Title>
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
                <Card.Title>クレジットカード決済</Card.Title>
                <Card.Text>
                  レッスンに対する支払いを自動化できます
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>月謝・回数券</Card.Title>
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
                <Card.Title>顧客管理</Card.Title>
                <Card.Text>
                  管理画面から連絡先、受講履歴など顧客情報を管理できます
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>メール送信</Card.Title>
                <Card.Text>
                  顧客にメールを送信できます
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>LINEでのコミュニケーション</Card.Title>
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
export default HomeTemplate
