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
              <div className={homeStyles.business_type_content}>フィットネスジム運営</div>
            </Col>
            <Col lg={4} md={4}>
              <div className={homeStyles.business_type_content}>パーソナルトレーニング</div>
            </Col>
            <Col lg={4} md={4}>
              <div className={homeStyles.business_type_content}>スポーツスクール運営</div>
            </Col>
          </Row>
          <Row>
            <Col lg={4} md={4}>
              <div className={homeStyles.business_type_content}>説明会・イベントページ作成</div>
            </Col>
            <Col lg={4} md={4}>
              <div className={homeStyles.business_type_content}>ヨガ、ピラティススタジオ運営</div>
            </Col>
            <Col lg={4} md={4}>
              <div className={homeStyles.business_type_content}>美容室運営</div>
            </Col>
          </Row>
          <Row>
            <Col lg={4} md={4}>
              <div className={homeStyles.business_type_content}>ネイルサロン運営</div>
            </Col>
            <Col lg={4} md={4}>
              <div className={homeStyles.business_type_content}>アクティビティ・レジャービジネス</div>
            </Col>
            <Col lg={4} md={4}>
              <div className={homeStyles.business_type_content}>オンラインサロン運営</div>
            </Col>
          </Row>
        </Container>
        </div>
      </div>
    </>
  )
}

export default LandingPageBusinessTypeSamples
