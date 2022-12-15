import type { NextPage } from 'next'
import { Container, Card, Row, Col } from 'react-bootstrap'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import CheckIcon from 'components/atoms/CheckIcon'

const New: NextPage = () => {
  return (
    <MerchantUserAdminLayout>
      <Container>
        <Row>
          <Col lg={2}></Col>
          <Col lg={8}>
            <h4>HTMLメールテンプレート作成</h4>
            <div className='mt20 mb20'>テンプレートタイプを選択してください</div>
            <Row>
              <Col>
                <Card style={{ borderWidth: '3px', borderColor: '#00ff00' }}>
                  <Card.Header className='d-flex justify-content-between align-items-center'>
                    <span>トップ画像+テキスト</span>
                    <CheckIcon width={20} height={20} fill={'#00ff00'}></CheckIcon>
                  </Card.Header>
                  <Card.Body>                  
                    <Card.Img variant='top' src='/images/t-shirt.jpg' />
                    <div>
                      テキスト本文テキスト本文テキスト本文テキスト本文テキスト本文テキスト本文テキスト本文
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card>
                  <Card.Header>画像・テキストリスト</Card.Header>
                  <Card.Body>
                    <Row>
                      <Col>
                        <Card.Img variant='top' src='/images/t-shirt.jpg' />
                      </Col>
                      <Col>
                        <div>
                          商品Aのご紹介
                        </div>
                      </Col>
                    </Row>
                    &nbsp;
                    <Row>
                      <Col>
                        <Card.Img variant='top' src='/images/t-shirt.jpg' />
                      </Col>
                      <Col>
                        <div>
                          商品Bのご紹介
                        </div>
                      </Col>
                    </Row>    
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </MerchantUserAdminLayout>
  )
}

export default New
