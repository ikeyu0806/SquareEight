import homeStyles from 'styles/Home.module.css'
import { brandGrayRgb } from 'constants/brandColors'
import DownArrawIcon from 'components/atoms/DownArrawIcon'
import { Row, Col, Table } from 'react-bootstrap'

const LandingPageServiceOverview = (): JSX.Element => {
  return (
      <>
            <p className={homeStyles.section_headline_parent} id='about'>
              <span className={homeStyles.section_headline}>サービス概要</span>
            </p>
            <Row>
              <div className='text-center'>
                <p><span className={homeStyles.section_description}>01.ビジネスアカウントご登録後に管理画面から必要な情報を入力</span></p>
              </div>
              <Col lg={2}></Col>
              <Col lg={8}>
                <Table bordered className={homeStyles.plan_table_parent}>
                  <thead style={{backgroundColor: '#5BA5BD'}}>
                    <tr className='text-white'>
                      <th>作成するページ</th>
                      <th colSpan={2}>設定項目</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td
                        className={homeStyles.plan_table_text}
                        rowSpan={3}>店舗紹介</td>
                      <td className={homeStyles.plan_table_text}>説明文</td>
                      <td className={homeStyles.plan_table_text}>イメージ画像</td>
                    </tr>
                    <tr>
                      <td className={homeStyles.plan_table_text}>営業時間</td>
                      <td className={homeStyles.plan_table_text}>電話番号</td>
                    </tr>
                    <tr>
                      <td className={homeStyles.plan_table_text}>住所</td>
                      <td className={homeStyles.plan_table_text}>アクセス案内</td>
                    </tr>
                    <tr>
                      <td
                        className={homeStyles.plan_table_text}
                        rowSpan={5}>予約ページ</td>
                      <td className={homeStyles.plan_table_text}>説明文</td>
                      <td className={homeStyles.plan_table_text}>イメージ画像</td>
                    </tr>
                    <tr>
                      <td className={homeStyles.plan_table_text}>日、周、月ごと繰り返し設定</td>
                      <td className={homeStyles.plan_table_text}>予約受付時間</td>
                    </tr>
                    <tr>
                      <td className={homeStyles.plan_table_text}>お支払い設定</td>
                      <td className={homeStyles.plan_table_text}>キャンセル受付設定</td>
                    </tr>
                    <tr>
                      <td className={homeStyles.plan_table_text}>繰り返し範囲外予約受付日時</td>
                      <td className={homeStyles.plan_table_text}>予約受付不可日時設定</td>
                    </tr>
                    <tr>
                      <td className={homeStyles.plan_table_text}>スタッフ、設備備品設定</td>
                      <td className={homeStyles.plan_table_text}>アンケート設定</td>
                    </tr>
                    <tr>
                      <td
                        className={homeStyles.plan_table_text}
                        rowSpan={4}>商品</td>
                      <td className={homeStyles.plan_table_text}>説明文</td>
                      <td className={homeStyles.plan_table_text}>イメージ画像</td>
                    </tr>
                    <tr>
                      <td className={homeStyles.plan_table_text}>値段</td>
                      <td className={homeStyles.plan_table_text}>税率</td>
                    </tr>
                    <tr>
                      <td className={homeStyles.plan_table_text}>在庫設定</td>
                      <td className={homeStyles.plan_table_text}>Sサイズ、Mサイズなどの種別</td>
                    </tr>
                    <tr>
                      <td className={homeStyles.plan_table_text}>配送料</td>
                      <td className={homeStyles.plan_table_text}>配送日時</td>
                    </tr>
                    <tr>
                      <td
                        className={homeStyles.plan_table_text}
                        rowSpan={2}>月額サブスクリプション</td>
                      <td className={homeStyles.plan_table_text}>説明文</td>
                      <td className={homeStyles.plan_table_text}>イメージ画像</td>
                    </tr>
                    <tr>
                      <td className={homeStyles.plan_table_text}>値段</td>
                      <td className={homeStyles.plan_table_text}>月ごと予約可能数</td>
                    </tr>
                    <tr>
                      <td
                        className={homeStyles.plan_table_text}
                        rowSpan={2}>回数券作成</td>
                      <td className={homeStyles.plan_table_text}>説明文</td>
                      <td className={homeStyles.plan_table_text}>イメージ画像</td>
                    </tr>
                    <tr>
                      <td className={homeStyles.plan_table_text}>値段</td>
                      <td className={homeStyles.plan_table_text}>発行枚数</td>
                    </tr>
                    <tr>
                      <td
                        className={homeStyles.plan_table_text}
                        rowSpan={1}>オンラインアンケート</td>
                      <td className={homeStyles.plan_table_text}>アンケート名</td>
                      <td className={homeStyles.plan_table_text}>質問内容</td>
                    </tr>
                    <tr>
                      <td
                        className={homeStyles.plan_table_text}
                        rowSpan={2}>Webページ作成</td>
                      <td className={homeStyles.plan_table_text}>テキスト、画像</td>
                      <td className={homeStyles.plan_table_text}>ページリンク</td>
                    </tr>
                    <tr>
                      <td className={homeStyles.plan_table_text}>HTML埋め込み</td>
                      <td className={homeStyles.plan_table_text}>iframe埋め込み</td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
              <Col lg={2}></Col>
            </Row>
            <DownArrawIcon width={100} height={100} fill={brandGrayRgb} />
            <div className='text-center mt20'>
              <p><span className={homeStyles.section_description}>02.入力した情報を元にWebページを自動生成！</span></p>
            </div>
            <Row>
              <Col lg={3} md={6} className='mb20'>
                <img
                  className={homeStyles.demo_page_img}
                  src='/images/tablet_shop_page.webp'
                  alt='Tablet Shop Page' />
              </Col>
              <Col lg={3} md={6} className='mb20'>
                <img
                  className={homeStyles.demo_page_img}
                  src='/images/tablet_reserve_page_image.webp'
                  alt='Tablet Reserve Page' />
              </Col>
              <Col lg={3} md={6} className='mb20'>
                <img
                  className={homeStyles.demo_page_img}
                  src='/images/top_page_yoga_ticket.webp'
                  alt='Yoga Ticket Page' />
              </Col>
              <Col lg={3} md={6} className='mb20'>
                <img
                  className={homeStyles.demo_page_img}
                  src='/images/top_page_shoes.webp'
                  alt='Tablet Shoes Page' />
              </Col>
            </Row>
            <div className='mt30'>
            <DownArrawIcon width={100} height={100} fill={brandGrayRgb} />
            </div>
            <div className='text-center mt20'>
              <p><span className={homeStyles.section_description}>03.お客様にメールやLINEでアフターフォロー!</span></p>
            </div>

            <Row>
              <Col lg={6} md={12}>
                <img
                  className={homeStyles.customer_support_img}
                  src='/images/select_mail_template_screen.webp'
                  alt='Mail Template Screen' />
              </Col>
              <Col lg={6} md={12}>
                <img
                  className={homeStyles.customer_support_img}
                  src='/images/edit_message_template_screen.webp'
                  alt='Edit Message Template' />
              </Col>
            </Row>
      </>
    )
  }
  
  export default LandingPageServiceOverview
