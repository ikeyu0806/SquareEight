import type { NextPage } from 'next'
import { Container, Row, Col, Card } from 'react-bootstrap'
import ProductPurchaseLayout from 'components/templates/ProductPurchaseLayout'
import { useSelector } from 'react-redux'
import { RootState } from 'redux/store'

const Payment: NextPage = () => {
  const currentEndUserLogintStatus = useSelector((state: RootState) => state.currentEndUser.loginStatus)

  return (
    <>
      <ProductPurchaseLayout>
        <Container>
          <Row>
            <Col lg={3} md={3}></Col>
            <Col lg={6} md={6}>
              <Card>
                <Card.Header>回数券購入</Card.Header>
                <Card.Body>
                {currentEndUserLogintStatus === 'Logout'
                  ? <div>ログインしてください</div>
                  : <></>
                }
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </ProductPurchaseLayout>
    </>
  )
}

export default Payment
