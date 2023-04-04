import homeStyles from 'styles/Home.module.css'
import { Container, Row, Col } from 'react-bootstrap'

const LandingPageFunctionList = (): JSX.Element => {
  return (
    <>
      <div className={homeStyles.function_list}>
        <Row>
          <Col lg={2}></Col>
          <Col lg={8}>
            <div>
              高機能予約システム / オンラインショップ開設 / 店舗ミニページ / クレジットカード決済 / 顧客管理・会員管理 / 月謝・サブスクリプション支払い導入 / 回数券作成 / オンラインアンケート作成 / メールマガジン発行 / LINE公式アカウント連携
            </div>
          </Col>
          <Col xs={2}></Col>
        </Row>
      </div>
    </>
  )
}

export default LandingPageFunctionList
