import homeStyles from 'styles/Home.module.css'
import { Container,
  Navbar,
  Nav,
  Alert,
  Card,
  Row,
  Col,
  Table } from 'react-bootstrap'
  
  const LandingPageServiceOverview = (): JSX.Element => {
  return (
    <>
      <div>
        &thinsp;
        <div className='text-center' id='features'>
        <p className={homeStyles.section_headline_parent}>
          <span className={homeStyles.section_headline}>機能一覧</span>
        </p>
          <Container>
            <Row>
              <Col lg={4} md={4}>
                <div className={homeStyles.function_content}>店舗ホームページ作成</div>
              </Col>
              <Col lg={4} md={4}>
                <div className={homeStyles.function_content}>予約メニュー作成</div>
              </Col>
              <Col lg={4} md={4}>
                <div className={homeStyles.function_content}>EC機能</div>
              </Col>
            </Row>
            <Row>
              <Col lg={4} md={4}>
                <div className={homeStyles.function_content}>回数券作成</div>
              </Col>
              <Col lg={4} md={4}>
                <div className={homeStyles.function_content}>月額サブスクリプション作成</div>
              </Col>
              <Col lg={4} md={4}>
                <div className={homeStyles.function_content}>Webページ作成</div>
              </Col>
            </Row>
            <Row>
              <Col lg={4} md={4}>
                <div className={homeStyles.function_content}>オンラインアンケート作成</div>
              </Col>
              <Col lg={4} md={4}>
                <div className={homeStyles.function_content}>顧客管理</div>
              </Col>
              <Col lg={4} md={4}>
                <div className={homeStyles.function_content}>メルマガ配信</div>
              </Col>
            </Row>
            <Row>
              <Col lg={4} md={4}>
                <div className={homeStyles.function_content}>複数管理ユーザ登録</div>
              </Col>
              <Col lg={4} md={4}>
                <div className={homeStyles.function_content}>管理ユーザへの権限設定</div>
              </Col>
              <Col lg={4} md={4}>
                <div className={homeStyles.function_content}>LINE公式アカウント連携</div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  )
}

export default LandingPageServiceOverview
