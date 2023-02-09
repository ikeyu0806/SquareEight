import type { NextPage } from 'next'
import React from 'react'
import RegularFooter from 'components/organisms/RegularFooter'
import homeStyles from 'styles/Home.module.css'
import BrandColorButton from 'components/atoms/BrandColorButton'
import { brandGrayRgb, brandGreenRgb } from 'constants/brandColors'
import DownArrawIcon from 'components/atoms/DownArrawIcon'
import { Container,
         Navbar,
         Nav,
         Alert,
         Card,
         Row,
         Col,
         Table } from 'react-bootstrap'

const Home: NextPage = () => {
  return (
    <>
      <Navbar collapseOnSelect expand='lg' bg='light'>
        <Container>
          <Navbar.Brand href='/' className='font-weight-bold'>
            {/* <ServiceLogoV2 width={22} height={22} /> */}
            SquareEight
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='me-auto'>
              <Nav.Link href='#benefit'>導入効果</Nav.Link>
              <Nav.Link href='#about'>サービス概要</Nav.Link>
              <Nav.Link href='#features'>機能</Nav.Link>
              <Nav.Link href='#pricing'>料金</Nav.Link>
              <Nav.Link href='/inquiry'>お問い合わせ</Nav.Link>
              <Nav.Link href='/company_info'>運営会社</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href='/customer/login'>
                <BrandColorButton
                  buttonText='SquareEightIDログイン'></BrandColorButton>
              </Nav.Link>
              <Nav.Link href='/merchant/login'>
                <BrandColorButton
                  buttonText='ビジネスアカウントログイン'></BrandColorButton>
              </Nav.Link>
              <Nav.Link href='/merchant/signup'>
                <BrandColorButton
                  brandColor='red'
                  buttonText='無料でお試し'></BrandColorButton>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* <CampaignAlert></CampaignAlert> */}
      <div className={homeStyles.cover_img_parent}>
        <img
          className={homeStyles.cover_img}
          src='/images/top_cover.png'
          alt='Top Cover' />
        <p className={homeStyles.headline_service_name}>
          SquareEight
        </p>
        {/* <p className={homeStyles.service_description}>
          無料から使えるオンラインビジネス運営サービス
        </p> */}
      </div>
      <div className='mt10'>
        <Container>
          <div className='text-center'>
            <div>
              <p className={homeStyles.section_headline_parent}>
                <span className={homeStyles.section_headline}>お店のシステム運用費用を最大90%削減</span>
              </p>
            </div>
            <p>
              <span className={homeStyles.section_description}>
              無料から使えて有料プランも￥1480~¥6980
              </span>
            </p>
            <hr />
            <p className={homeStyles.section_headline_parent} id='benefit'>
              <span className={homeStyles.section_headline}>
                導入効果
              </span>
            </p>
            <Row>
              <Col lg={6} className='mb20'>
                <div className={homeStyles.benefit_box}>
                  <div className='font-size-25'>
                    <div className={homeStyles.benefit_headline}>
                      予約システム運営費用削減
                    </div>
                  </div>
                  <div className={homeStyles.benefit_text}>
                    <br />他社クラウドサービスではスタンダードプランで月額2万、予約1件につき￥3000など高額な運用費用がかかります。
                    <br /><br />当サービスは全プラン月額¥6980以下でご利用可能！
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
                    <br />お支払いに月額サブスクリプション・回数券を導入することにより売り上げを安定させることができます。
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
                      アンケート、メッセージ機能による顧客フォロー
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
                      システムの一元化
                    </div>
                  </div>
                  <div className={homeStyles.benefit_text}>
                    <br />オンラインショップ開設サービス、予約システム、アンケートシステムと別々に契約されるケースが多いです。
                    <br />当サービスは1つでそれら全ての機能を提供することができ顧客情報も一元管理できます。
                  </div>
                </div>
              </Col>
            </Row>
            <hr />
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
                  src='/images/tablet_shop_page.png'
                  alt='Tablet Shop Page' />
              </Col>
              <Col lg={3} md={6} className='mb20'>
                <img
                  className={homeStyles.demo_page_img}
                  src='/images/tablet_reserve_page_image.png'
                  alt='Tablet Reserve Page' />
              </Col>
              <Col lg={3} md={6} className='mb20'>
                <img
                  className={homeStyles.demo_page_img}
                  src='/images/top_page_yoga_ticket.png'
                  alt='Yoga Ticket Page' />
              </Col>
              <Col lg={3} md={6} className='mb20'>
                <img
                  className={homeStyles.demo_page_img}
                  src='/images/top_page_shoes.png'
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
                  src='/images/select_mail_template_screen.png'
                  alt='Mail Template Screen' />
              </Col>
              <Col lg={6} md={12}>
                <img
                  className={homeStyles.customer_support_img}
                  src='/images/edit_message_template_screen.png'
                  alt='Edit Message Template' />
              </Col>
            </Row>
          </div>
        </Container>
      </div>

      <hr />

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
                <div className={homeStyles.function_content}>ユーザの権限設定</div>
              </Col>
              <Col lg={4} md={4}>
                <div className={homeStyles.function_content}>LINE公式アカウント連携</div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>

      <hr />

      <Container>
        <div className='text-center mt50 mb50' id='pricing'>
          <p className={homeStyles.section_headline_parent}>
            <span className={homeStyles.section_headline}>料金プラン</span>
          </p>
            <div className='mt30 mb30'>
            <p><span className={homeStyles.section_description}>基本プラン</span></p>
            <p><span className={homeStyles.section_description}>初期費用無料</span></p>
            </div>
            <div className={homeStyles.table_scroll}>
              <Table bordered className={homeStyles.plan_table_parent}>
                <thead style={{backgroundColor: '#5BA5BD'}}>
                  <tr className='text-white'>
                    <th></th>
                    <th className={homeStyles.plan_table_th}>フリープラン</th>
                    <th className={homeStyles.plan_table_th}>ライトプラン</th>
                    <th className={homeStyles.plan_table_th}>スタンダードプラン</th>
                    <th className={homeStyles.plan_table_th}>プレミアムプラン</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={homeStyles.plan_table_text}>月額料金</td>
                    <td className={homeStyles.price_text}>￥0</td>
                    <td className={homeStyles.price_text}>￥1,480</td>
                    <td className={homeStyles.price_text}>￥2,980</td>
                    <td className={homeStyles.price_text}>￥6,980</td>
                  </tr>
                  <tr className={homeStyles.plan_table_text}>
                    <td>店舗登録数</td>
                    <td>無制限</td>
                    <td>無制限</td>
                    <td>無制限</td>
                    <td>無制限</td>
                  </tr>
                  <tr className={homeStyles.plan_table_text}>
                    <td>オンライン予約受付</td>
                    <td>月間10件</td>
                    <td>月間500件</td>
                    <td>月間2000件</td>
                    <td>無制限</td>
                  </tr>
                  <tr className={homeStyles.plan_table_text}>
                    <td>EC商品登録数</td>
                    <td>無制限</td>
                    <td>無制限</td>
                    <td>無制限</td>
                    <td>無制限</td>
                  </tr>
                  <tr className={homeStyles.plan_table_text}>
                    <td>回数券登録数</td>
                    <td>無制限</td>
                    <td>無制限</td>
                    <td>無制限</td>
                    <td>無制限</td>
                  </tr>
                  <tr className={homeStyles.plan_table_text}>
                    <td>月額サブスクリプション登録数</td>
                    <td>無制限</td>
                    <td>無制限</td>
                    <td>無制限</td>
                    <td>無制限</td>
                  </tr>
                  <tr className={homeStyles.plan_table_text}>
                    <td>顧客表示数</td>
                    <td>10件</td>
                    <td>500件</td>
                    <td>2000件</td>
                    <td>無制限</td>
                  </tr>
                  <tr className={homeStyles.plan_table_text}>
                    <td>ノーコードWebページ作成機能</td>
                    <td>○</td>
                    <td>○</td>
                    <td>○</td>
                    <td>○</td>
                  </tr>
                  <tr className={homeStyles.plan_table_text}>
                    <td>オンラインアンケート作成</td>
                    <td>10件</td>
                    <td>無制限</td>
                    <td>無制限</td>
                    <td>無制限</td>
                  </tr>
                  <tr className={homeStyles.plan_table_text}>
                    <td>オンラインアンケート回答閲覧可能数</td>
                    <td>○</td>
                    <td>○</td>
                    <td>○</td>
                    <td>○</td>
                  </tr>
                  <tr className={homeStyles.plan_table_text}>
                    <td>スタッフや設備備品などのリソース登録</td>
                    <td>3件</td>
                    <td>10件</td>
                    <td>無制限</td>
                    <td>無制限</td>
                  </tr>
                  <tr className={homeStyles.plan_table_text}>
                    <td>メール配信可能数</td>
                    <td>10件</td>
                    <td>1000件</td>
                    <td>3000件</td>
                    <td>無制限</td>
                  </tr>
                  <tr className={homeStyles.plan_table_text}>
                    <td>メッセージテンプレート登録</td>
                    <td>○</td>
                    <td>○</td>
                    <td>○</td>
                    <td>○</td>
                  </tr>
                  <tr className={homeStyles.plan_table_text}>
                    <td>LINEメッセージ送信</td>
                    <td>○</td>
                    <td>○</td>
                    <td>○</td>
                    <td>○</td>
                  </tr>   
                  <tr className={homeStyles.plan_table_text}>
                    <td>メール、LINEの予約配信</td>
                    <td>○</td>
                    <td>○</td>
                    <td>○</td>
                    <td>○</td>
                  </tr>                <tr className={homeStyles.plan_table_text}>
                    <td>複数管理ユーザ登録</td>
                    <td>×</td>
                    <td>×</td>
                    <td>○</td>
                    <td>○</td>
                  </tr>
                  <tr className={homeStyles.plan_table_text}>
                    <td>管理ユーザへの権限設定</td>
                    <td>×</td>
                    <td>×</td>
                    <td>×</td>
                    <td>○</td>
                  </tr>
                  <tr className={homeStyles.plan_table_text}>
                    <td>決済手数料</td>
                    <td>8%</td>
                    <td>5%</td>
                    <td>5%</td>
                    <td>4%</td>
                  </tr>
                </tbody>
              </Table>
            </div>
            &thinsp;
            <div>
              <hr />
              <Row>
                <div className='text-center mb20'>
                <p><span className={homeStyles.section_description}>エンタープライズプラン</span></p><br />
                  <span className={homeStyles.enterprise_description}>SquareEightの機能をベースにオーダーメイドでエンタープライズ向けシステムを開発します！</span><br />
                  <span className={homeStyles.enterprise_description}>ご相談・お問い合わせは<a href='/enterprise_inquiry'>こちら</a></span>
                </div>
                <Col lg={3} md={1} sm={3}></Col>
                <Col lg={6} md={10}>
                  <Card>
                    <Card.Header style={{backgroundColor: brandGreenRgb}} className='text-white'>
                      例えばこのようなご要望にお応えします!
                    </Card.Header>
                    <Card.Body>
                    <Col></Col>
                      <Col xs={11}>
                        <Card.Text style={{textAlign: 'left'}}>
                          {/* ul/liにするとNextのHydration failed error */}
                          <span className={homeStyles.enter_prise_card_content}>・自社のブランディングに合わせたホームページや予約ページのデザイン</span><br/>
                          <span className={homeStyles.enter_prise_card_content}>・映画館の座席予約ページのようなビジネスに合わせた独自の予約機能</span><br/>
                          <span className={homeStyles.enter_prise_card_content}>・個別の業務フローに合わせた予約機能や販売管理機能</span><br/>
                          <span className={homeStyles.enter_prise_card_content}>・専用サーバ上での運用</span><br/>
                          <span className={homeStyles.enter_prise_card_content}>・他サービスとの連携機能</span><br/>
                          <span className={homeStyles.enter_prise_card_content}>・社内システムとの連携</span>
                        </Card.Text>
                      </Col>
                      <Col></Col>
                    </Card.Body>
                  </Card>
                </Col>
                <Col sm={3}></Col>
              </Row>
            </div>
        </div>

        <hr />

        <div>
          <div className='text-center' id='usecase'>
          <p className={homeStyles.section_headline_parent}>
            <span className={homeStyles.section_headline}>こんな場面でお使いになれます!</span>
          </p>
          <div className='text-center mt20'>
            <p><span className={homeStyles.section_description}>全業種対応。特にウェルネスビジネスにおすすめ</span></p>
          </div>
          <Container>
          <Row>
              <Col lg={3} md={6}>
                <div className={homeStyles.usecase_text}>
                  フィットネスジム運営
                </div>
                <img
                  className={homeStyles.usecase_img}
                  src='/images/fitness_image.jpeg'
                  alt='Fitness' />
              </Col>
              <Col lg={3} md={6}>
                <div className={homeStyles.usecase_text}>
                  パーソナルトレーニング
                </div>
                <img
                  className={homeStyles.usecase_img}
                  src='/images/personal_training.jpeg'
                  alt='Personal Training' />
              </Col>
              <Col lg={3} md={6}>
                <div className={homeStyles.usecase_text}>
                  スポーツスクール運営
                </div>
                <img
                  className={homeStyles.usecase_img}
                  src='/images/golf_image.jpeg'
                  alt='Golf' />
              </Col>
              <Col lg={3} md={6}>
                <div className={homeStyles.usecase_text}>
                  説明会・イベントページ作成
                </div>
                <img
                  className={homeStyles.usecase_img}
                  src='/images/istockphoto.jpeg'
                  alt='Istockphoto' />
              </Col>
            </Row>
            <Row>
              <Col lg={3} md={6}>
                <div className={homeStyles.usecase_text}>
                  ヨガ、ピラティススタジオ運営
                </div>
                <img
                  className={homeStyles.usecase_img}
                  src='/images/yoga_image.jpeg'
                  alt='Girl Kayak' />
              </Col>
              <Col lg={3} md={6}>
                <div className={homeStyles.usecase_text}>
                  美容室運営
                </div>
                <img
                  className={homeStyles.usecase_img}
                  src='/images/beauty_salon.jpeg'
                  alt='Beauty Kayak' />
              </Col>
              <Col lg={3} md={6}>
                <div className={homeStyles.usecase_text}>
                  ネイルサロン運営
                </div>
                <img
                  className={homeStyles.usecase_img}
                  src='/images/nail_saron.jpeg'
                  alt='Nail saron' />
              </Col>
              <Col lg={3} md={6}>
                <div className={homeStyles.usecase_text}>
                  アクティビティ・レジャービジネス
                </div>
                <img
                  className={homeStyles.usecase_img}
                  src='/images/girl_kayak.jpeg'
                  alt='Girl Kayak' />
              </Col>
            </Row>
          </Container>
          </div>
        </div>
      </Container>
      <hr />
      <RegularFooter></RegularFooter>
    </>

  )
}

export default Home
