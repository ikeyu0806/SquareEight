import homeStyles from 'styles/Home.module.css'
import { Row, Col} from 'react-bootstrap'

const LandingPageBenefit = (): JSX.Element => {
  return (
    <>
      <p className={homeStyles.section_headline_parent} id='benefit'>
        <span className={homeStyles.section_headline}>
          機能・ 導入効果
        </span>
      </p>
      <Row>
        <Col lg={6} className='mb20'>
          <div className={homeStyles.benefit_box}>
            <div className='font-size-25'>
              <div className={homeStyles.benefit_headline}>
                高機能・高価格な予約ページ作成
              </div>
            </div>
            <div className={homeStyles.benefit_text}>
              <br />他社予約サービスではスタンダードプランで月額2万、予約1件につき￥3000など高額な運用費用がかかります。
              <br /><br />当サービスは多機能予約システムを無料からご利用可能！
            </div>
          </div>
        </Col>
        <Col lg={6} className='mb20'>
          <div className={homeStyles.benefit_box}>
            <div className='font-size-25'>
              <div className={homeStyles.benefit_headline}>
              支払いの月額サブスクリプション・回数券対応
              </div>
            </div>
            <div className={homeStyles.benefit_text}>
              <br />お支払いにクレジットカード決済の他、月額サブスクリプション・回数券を導入でき売り上げを安定させることができます。
              <br /><br />新規ユーザの獲得にも効果的です。
            </div>
          </div>
        </Col>
      </Row>
      <div className='mt20'></div>
      <Row>
        <Col lg={6} className='mb20'>
          <div className={homeStyles.benefit_box}>
            <div className='font-size-25'>
              <div className={homeStyles.benefit_headline}>
                アンケート・メッセージ機能による顧客フォロー
              </div>
            </div>
            <div className={homeStyles.benefit_text}>
              <br />予約や物販をご利用いただいた顧客にアンケートやメルマガ、LINEメッセージでアフターフォローできます。
              <br /><br /><br />
            </div>
          </div>
        </Col>
        <Col lg={6} className='mb20'>
          <div className={homeStyles.benefit_box}>
            <div className='font-size-25'>
              <div className={homeStyles.benefit_headline}>
                予約・ECシステムの一元化
              </div>
            </div>
            <div className={homeStyles.benefit_text}>
              <br />オンラインショップ開設サービス、予約システム、アンケートシステムと別々に契約されるケースが多いです。
              <br />当サービスは1つでそれら全ての機能をオールインワンで提供しており顧客情報も一元管理できます。
            </div>
          </div>
        </Col>
      </Row>
    </>
  )
}

export default LandingPageBenefit
