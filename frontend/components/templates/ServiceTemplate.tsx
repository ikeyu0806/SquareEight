import React, { useState } from 'react'
import { Container,
         Col,
         Card,
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
      </Container>
    </>
  )
}

export default ServiceTemplate
