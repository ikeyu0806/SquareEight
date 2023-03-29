import homeStyles from 'styles/Home.module.css'
import { Container, Row, Col} from 'react-bootstrap'

const LandingPageBusinessTypeSamples = (): JSX.Element => {
  return (
    <>
      <div>
        <div className='text-center' id='usecase'>
        <p className={homeStyles.section_headline_parent}>
          <span className={homeStyles.section_headline}>こんな場面でお使いになれます!</span>
        </p>
        <div className='text-center mt10'>
          <p><span className={homeStyles.section_description}>全業種対応。<a href='/lp/wellness'>特にウェルネスビジネスにおすすめ</a></span></p>
        </div>
        <Container>
          <Row>
            <Col lg={4} md={4}>
              <div className={homeStyles.business_type_content}>
                <div>ウェルネスビジネス運営</div>
                <a
                  href='/lp/wellness'
                  className='btn btn-info text-white mt20'>もっとみる</a>
              </div>
            </Col>
            <Col lg={4} md={4}>
              <div className={homeStyles.business_type_content}>
                <div>美容系ビジネス運営</div>
                <a
                  href='/lp/beauty'
                  className='btn btn-info text-white mt20'>もっとみる</a>
              </div>
            </Col>
            <Col lg={4} md={4}>
              <div className={homeStyles.business_type_content}>
                <div>イベント・セミナー運営</div>
                <a
                  href='/lp/event'
                  className='btn btn-info text-white mt20'>もっとみる</a>
              </div>
            </Col>
          </Row>
        </Container>
        </div>
      </div>
    </>
  )
}

export default LandingPageBusinessTypeSamples
