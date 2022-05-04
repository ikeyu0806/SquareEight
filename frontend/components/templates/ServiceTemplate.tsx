import React, { useState } from 'react'
import { Container,
         Col,
         Card,
         Button,
         Row } from 'react-bootstrap'

const ServiceTemplate = (): JSX.Element => {
  enum SERVICE {
    HomepageWithReserve = 0,
    Homepage = 1,
    Reserve = 2,
  }
  const [selectedService, setSelectedService] = useState(SERVICE.HomepageWithReserve)

  return (
    <>
      <Container>
        <div className='text-center mt50 mb50'>
          <h2>作成するサービスを選択してください</h2>
        </div>
        <Row>
          <Col onClick={() => setSelectedService(SERVICE.HomepageWithReserve)}>
            <Card border={selectedService === SERVICE.HomepageWithReserve ? 'primary' : ''}>
              <Card.Body>
                <Card.Title>
                <input className='form-check-input mr10' type='checkbox' checked={selectedService === SERVICE.HomepageWithReserve} />
                予約ページ付きホームページ
                </Card.Title>
                <Card.Text>
                予約機能付きホームページを作成します
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col onClick={() => setSelectedService(SERVICE.Homepage)}>
            <Card border={selectedService === SERVICE.Homepage ? 'primary' : ''}>
              <Card.Body>
                <Card.Title>
                <input className='form-check-input mr10' type='checkbox' checked={selectedService === SERVICE.Homepage} />
                ホームページのみ
                </Card.Title>
                <Card.Text>
                ホームページのみ作成したい方はこちら
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col onClick={() => setSelectedService(SERVICE.Reserve)}>
            <Card border={selectedService === SERVICE.Reserve ? 'primary' : ''}>
              <Card.Body>
                <Card.Title>
                <input className='form-check-input mr10' type='checkbox' checked={selectedService === SERVICE.Reserve} />
                予約ページのみ
                </Card.Title>
                <Card.Text>
                予約ページのみ作成したい方はこちら
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <div className='text-center mt30 mb30'>
          <Button variant='primary' size='lg' href={`/introduction/features/${selectedService === SERVICE.HomepageWithReserve ? 'homepage_with_reserve' : selectedService === SERVICE.Homepage ? 'homepage' : 'reserve'}`}>次へ</Button>
        </div>
      </Container>
    </>
  )
}

export default ServiceTemplate
