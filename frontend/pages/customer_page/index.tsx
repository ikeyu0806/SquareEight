import type { NextPage } from 'next'
import { Container, Card, Row, Col } from 'react-bootstrap'
import EndUserLoginLayout from 'components/templates/EndUserLoginLayout'
import GoogleIcon from 'components/atoms/GoogleIcon'
import ConnectedTextWithIcon from 'components/molecules/ConnectedTextWithIcon'

const Index: NextPage = () => {
  return (
    <>
      <EndUserLoginLayout>
        <Container className='mt50 mb50'>
          <Row>
            <Col lg={4} md={3}></Col>
              <Col lg={4}>
                <Card>
                  <Card.Header>ご登録情報</Card.Header>
                  <Card.Body>
                    <table className='table'>
                      <tbody>
                        <tr>
                          <td scope='row'>メールアドレス</td>
                          <td className='text-center'>sample.com</td>
                        </tr>
                        <tr>
                          <td scope='row'><GoogleIcon width={20} height={20} className={'mr10'}></GoogleIcon>Google</td>
                          <td className='text-center'>{true ? <ConnectedTextWithIcon></ConnectedTextWithIcon> : '連携なし'}</td>
                        </tr>
                      </tbody>
                    </table>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </EndUserLoginLayout>
    </>
  )
}

export default Index
