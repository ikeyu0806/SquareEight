import type { NextPage } from 'next'
import React from 'react'
import { Container, Navbar, Row, Col } from 'react-bootstrap'
import companyStyles from 'styles/Company.module.css'

const Index: NextPage = () => {
  return (
    <>
      <Navbar collapseOnSelect expand='lg' bg='light'>
        <Container>
          <Navbar.Brand href='/' className='font-weight-bold'>
            {/* <SquareEightLogo width={96} height={35} />
             */}
            SquareEight
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Container>
        <div className='mt20'>
          <Row>
            <Col>
              <div className={companyStyles.company_overview_text}>会社概要</div>
            </Col>
            <Col>
              <Row>
                <Col lg={3}>
                  <div className={companyStyles.strong_text}>会社名</div>
                </Col>
                <Col lg={9}>
                  <div className={companyStyles.content_text}>株式会社SquareEight</div>
                </Col>
              </Row>
              <hr />
              <Row>
                <Col lg={3}>
                  <div className={companyStyles.strong_text}>事業内容</div>
                </Col>
                <Col lg={9}>
                  <div className={companyStyles.content_text}>クラウドサービス「SquareEight」の開発・運営</div>
                </Col>
              </Row>
              <hr />
              <Row>
                <Col lg={3}>
                  <div className={companyStyles.strong_text}>代表者</div>
                </Col>
                <Col lg={9}>
                  <div className={companyStyles.content_text}>代表取締役 池谷祐貴</div>
                </Col>
              </Row>
              <hr />
              <Row>
                <Col lg={3}>
                  <div className={companyStyles.strong_text}>住所</div>
                </Col>
                <Col lg={9}>
                  <div className={companyStyles.content_text}>
                    〒150-0043
                  </div>
                  <div className={companyStyles.content_text}>
                    東京都渋谷区道玄坂1丁目10番8号渋谷道玄坂東急ビル2F-C
                  </div>
                </Col>
              </Row>
              <hr />
            </Col>
          </Row>
        </div>
      </Container>
    </>
  )
}

export default Index
