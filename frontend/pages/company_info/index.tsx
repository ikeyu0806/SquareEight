import type { NextPage } from 'next'
import React from 'react'
import { Container, Navbar, Row, Col } from 'react-bootstrap'
import companyStyles from 'styles/Company.module.css'
import RegularFooter from 'components/organisms/RegularFooter'

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
            <Col md={6}>
              <div className={companyStyles.company_overview_text}>会社概要</div>
            </Col>
            <Col md={6}>
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
        <hr />
        <div className='mt20'>
          <Row>
            <Col md={6}>
              <div className={companyStyles.company_overview_text}>サービス</div>
            </Col>
            <Col md={6}>
              <img
                className={companyStyles.service_top_image}
                src='/images/service_top_image.png'
                alt='Saas Top Image' />
              <div className={companyStyles.service_description}>
                高機能な予約受付や顧客管理を高価格で提供するクラウドサービス。
              </div>
              <div className={companyStyles.service_description}>
                管理画面から入力した情報を元にWebページ、予約ページ、商品販売ページ、アンケートページを作成。
              </div>
              <div className={companyStyles.service_description}>
                メールやLINEでアフターフォローできます。
              </div>
            </Col>
          </Row>
        </div>
      </Container>
      <hr />
      <RegularFooter></RegularFooter>
    </>
  )
}

export default Index
