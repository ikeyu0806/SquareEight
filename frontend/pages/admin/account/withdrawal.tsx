import { NextPage } from 'next'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { Container, Button, Row, Col, Card } from 'react-bootstrap'

const Withdrawal: NextPage = () => {
  return (
    <MerchantUserAdminLayout>
      <Container>
        <Row>
          <Col md={3}></Col>
          <Col md={6}>
            <Card>
              <Card.Header><div>サービス退会</div></Card.Header>
              <Card.Body>
                <div className='text-center'>
                  <h3>サービスを退会します</h3>
                  <div>退会をするとSquareEightのデータは復旧できなくなります。</div>
                  <div>プランをフリープランに変更し、作成したページを削除、</div>
                  <div>もしくは非公開にしてアカウントを残すことをお勧めします。</div>

                  <div className='mt20 mb20'>以上を確認した上で退会する場合は退会処理を実行してください。</div>
                  <Button className='mt30' variant='danger'>退会する</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
       
      </Container>
    </MerchantUserAdminLayout>
  )
}

export default Withdrawal
