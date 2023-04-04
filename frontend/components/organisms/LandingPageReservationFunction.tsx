import homeStyles from 'styles/Home.module.css'
import { Container, Row, Col, Table } from 'react-bootstrap'

const LandingPageReservationFunction = (): JSX.Element => {
  return (
      <>
        <p className={homeStyles.section_headline_parent}>
          <span className={homeStyles.section_headline}>細かいところまで手が届く予約フォーム作成機能</span>
        </p>
        <Row>
          <Col lg={6} className='mb20'>
            <div className={homeStyles.benefit_box}>
              <div className='font-size-25'>
                <div className={homeStyles.benefit_headline}>
                  お支払い設定
                </div>
              </div>
              <div className={homeStyles.benefit_text}>
                <br />お支払い方法に現地払い。クレジットカード払い。回数券払い。サブスク支払いを設定可能。
                <br /><br />子供、大人など別料金を設定することも可能。
              </div>
            </div>
          </Col>
          <Col lg={6} className='mb20'>
          <div className={homeStyles.benefit_box}>
              <div className='font-size-25'>
                <div className={homeStyles.benefit_headline}>
                  受付日時設定
                </div>
              </div>
              <div className={homeStyles.benefit_text}>
                <br />日毎、曜日ごと、週ごと、月ごとに繰り返し予約受付時間を設定できます。
                <br />2日ごとなど間隔を空けた設定も可能です。
                <br />特例営業日、休業日も設定できます。
              </div>
            </div>
          </Col>
        </Row>
        <br />
        <Row>
          <Col lg={6} className='mb20'>
            <div className={homeStyles.benefit_box}>
              <div className='font-size-25'>
                <div className={homeStyles.benefit_headline}>
                  予約フォームのカスタマイズ
                </div>
              </div>
              <div className={homeStyles.benefit_text}>
                <br />アンケート機能と予約フォーム作成機能を連動させて予約フォームを自在にカスタマイズ可能。
                <br />
                <br />予約者の年齢、趣味、ご要望など必要な情報を取得できます。
                <br />
              </div>
            </div>
          </Col>
          <Col lg={6} className='mb20'>
          <div className={homeStyles.benefit_box}>
              <div className='font-size-25'>
                <div className={homeStyles.benefit_headline}>
                  スタッフ・設備備品による予約数制限
                </div>
              </div>
              <div className={homeStyles.benefit_text}>
                <br />担当スタッフやスタジオ、機材などの設備備品と予約メニューを紐づけることができます。
                <br />
                <br />複数予約メニューを跨いで予約数を制限できます。
              </div>
            </div>
          </Col>
        </Row>
      </>
      // <Container>
      //   <p className={homeStyles.section_headline_parent}>
      //     <span className={homeStyles.section_headline}>充実の予約フォーム作成機能</span>
      //   </p>
      //   <Row>
      //   <Col lg={2}></Col>
      //   <Col lg={8}>
      //     <div className={homeStyles.table_scroll}>
      //       <Table bordered className={homeStyles.plan_table_parent}>
      //         <thead style={{backgroundColor: '#5BA5BD'}}>
      //           <tr className='text-white'>
      //             <th></th>
      //             <th></th>
      //           </tr>
      //         </thead>
      //         <tbody>
      //           <tr className={homeStyles.plan_table_text}>
      //             <td>店舗登録数</td>
      //             <td>無制限</td>
      //           </tr>
      //         </tbody>
      //       </Table>
      //     </div>
      //   </Col>
      //   </Row>
      // </Container>
    )
  }
  
  export default LandingPageReservationFunction
  