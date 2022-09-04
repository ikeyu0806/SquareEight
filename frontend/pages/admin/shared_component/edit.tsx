import { NextPage } from 'next'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { Container, Navbar, Row, Col, Button } from 'react-bootstrap'

const Edit: NextPage = () => {
  return (
    <MerchantUserAdminLayout>
      <Container className='mb30'>
        <h3 className='mb30'>ページ共通部分編集</h3>
        <div>ページ共通のヘッダ、フッタ、全体の見た目を調整します。</div>
        <div className='mb30'>ここで設定した内容はSquareEightで作成したWebページ、商品購入ページ、予約ページ、アンケートページに反映されます</div>
        <hr/>
        <Button>ヘッダを編集</Button>
        <Button className='ml20'>フッタを編集</Button>
        <hr />

        <h3>プレビュー</h3>
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
        <Container >
          <h3 className='mt30 mb30'>サンプル</h3>
          <Row>
            <Col>
              <div>
                これはサンプルです。これはサンプルです。これはサンプルです。これはサンプルです。
                これはサンプルです。これはサンプルです。これはサンプルです。これはサンプルです。
                これはサンプルです。これはサンプルです。これはサンプルです。これはサンプルです。
                これはサンプルです。これはサンプルです。これはサンプルです。これはサンプルです。
              </div>
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
