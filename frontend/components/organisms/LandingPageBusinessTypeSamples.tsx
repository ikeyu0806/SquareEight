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
          <p><span className={homeStyles.section_description}>全業種対応</span></p>
        </div>
        <Container>
          <Row>
            <Col lg={4} md={4}>
              <div className={homeStyles.business_type_content}>
                <div className='font-weight-bold'>ウェルネスビジネス運営</div>
                <div className='mt20'>
                  パーソナルトレーニング / ジム / ヨガスタジオ / ピラティス / フィットネスクラブ /テニススクール / スイミングスクール / ダンススクール / ゴルフスクール / 格闘技 / その他スポーツスクール
                </div>
                <a
                  href='/lp/wellness'
                  className='btn btn-info text-white mt20'>もっとみる</a>
              </div>
            </Col>
            <Col lg={4} md={4}>
              <div className={homeStyles.business_type_content}>
                <div className='font-weight-bold'>美容系ビジネス運営</div>
                <div className='mt20'>美容室 / ヘアサロン / ネイルサロン / まつげサロン / メイクサロン / 医療クリニック</div>
                <a
                  href='/lp/beauty'
                  className='btn btn-info text-white mt20'>もっとみる</a>
              </div>
            </Col>
            <Col lg={4} md={4}>
              <div className={homeStyles.business_type_content}>
                <div className='font-weight-bold'>イベント・セミナー運営</div>
                <div className='mt20'>まちおこしイベント / 留学イベント / サークルイベント / 体験型ゲーム / ショーイベント / パーティー / 会社説明会 / 採用説明会 / 講習会</div>
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
