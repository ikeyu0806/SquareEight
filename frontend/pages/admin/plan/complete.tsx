import type { NextPage } from 'next'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import { useRouter } from 'next/router'

const Choice: NextPage = () => {
  const router = useRouter()

  return (
    <MerchantUserAdminLayout>
      <Container>
        <Row>
          <Col md={3}></Col>
          <Col md={6}>
            <Card>
              <Card.Body>
                <h4 className='text-center'>購入完了しました</h4>
                <h3 className='mt30 text-center'>
                  {router.query.plan === 'Light' && <>ライトプラン</>}
                  {router.query.plan === 'Standard' && <>スタンダードプラン</>}
                  {router.query.plan === 'Premium' && <>プレミアムプラン</>}
                </h3>
                  
                <h3 className='text-center mt20'>
                  ご請求額: ￥
                  {router.query.plan === 'Light' && 1480}
                  {router.query.plan === 'Standard' && 2980}
                  {router.query.plan === 'Premium' && 6980}
                </h3>
                <div className='text-center'>
                  <a
                    href='/admin/dashboard'
                    className='btn btn-primary mt20'>戻る</a>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </MerchantUserAdminLayout>
  )
}

export default Choice
