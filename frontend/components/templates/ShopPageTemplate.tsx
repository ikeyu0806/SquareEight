import { Container, Row, Col, Card, Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import shopStyles from 'styles/Shop.module.css'

const ShopPageTemplate = () => {
  const name = useSelector((state: RootState) => state.shop.name)
  const phoneNumber = useSelector((state: RootState) => state.shop.phoneNumber)
  const description1 = useSelector((state: RootState) => state.shop.description1)
  const description2 = useSelector((state: RootState) => state.shop.description2)
  const shopImage1ImagePublicUrl = useSelector((state: RootState) => state.shop.shopImage1ImagePublicUrl)
  const shopImage2ImagePublicUrl = useSelector((state: RootState) => state.shop.shopImage2ImagePublicUrl)
  const shopImage3ImagePublicUrl = useSelector((state: RootState) => state.shop.shopImage3ImagePublicUrl)
  const shopImage4ImagePublicUrl = useSelector((state: RootState) => state.shop.shopImage4ImagePublicUrl)
  const shopImage5ImagePublicUrl = useSelector((state: RootState) => state.shop.shopImage5ImagePublicUrl)
  const shopImage6ImagePublicUrl = useSelector((state: RootState) => state.shop.shopImage6ImagePublicUrl)
  const accessInfo = useSelector((state: RootState) => state.shop.accessInfo)
  const parkingLotGuidance = useSelector((state: RootState) => state.shop.parkingLotGuidance)
  const businessHoursText = useSelector((state: RootState) => state.shop.businessHoursText)
  const remarks = useSelector((state: RootState) => state.shop.remarks)
  const reserveFrameInfo = useSelector((state: RootState) => state.shop.reserveFrameInfo)
  const monthlyPatmentPlanInfo = useSelector((state: RootState) => state.shop.monthlyPatmentPlanInfo)
  const ticketMasterInfo = useSelector((state: RootState) => state.shop.ticketMasterInfo)
  const productInfo = useSelector((state: RootState) => state.shop.productInfo)

  return (
    <>
      <Container>
        <Row>
          <Col lg={6}>
            <div className='text-center' style={{marginTop: '10px', marginBottom: '10px'}}>
              <div className={shopStyles.img_parent}>
                <img
                  width={'100%'}
                  height={'100%'}
                  src={String(shopImage1ImagePublicUrl)}
                  alt='First slide'
                />
                <p className={shopStyles.headline}>{name}</p>
                <p className={shopStyles.description}>初心者からアスリートまで、全ての人々が結果を出せるようあらゆることについて考え抜かれたフィットネスクラブです。</p>
              </div>
            </div>
          </Col>
          <Col lg={6}>
            <div className='mt10'>
              <Row>
                <Col>
                  <div className={shopStyles.description_text}>{description1}</div>
                </Col>
                <Col>
                  <img
                    width={'100%'}
                    height={'100%'}
                    src={String(shopImage2ImagePublicUrl)}
                    alt='Second slide'
                  />
                </Col>
              </Row>
            </div>
            <div className='mt5'>
              <Row>
                <Col>
                  <div className={shopStyles.description_text}>{description2}</div>
                </Col>
                <Col>
                  <img
                    width={'100%'}
                    height={'100%'}
                    src={String(shopImage2ImagePublicUrl)}
                    alt='Second slide'
                  />
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
        &nbsp;
        <Row>
          <Col lg={6}>
            <div className='mt10'>
              <Row>
                <Col>
                  <div className={shopStyles.description_text}>{description1}</div>
                </Col>
                <Col>
                  <img
                    width={'100%'}
                    height={'100%'}
                    src={String(shopImage2ImagePublicUrl)}
                    alt='Second slide'
                  />
                </Col>
              </Row>
            </div>
            <div className='mt5'>
              <Row>
                <Col>
                  <div className={shopStyles.description_text}>{description2}</div>
                </Col>
                <Col>
                  <img
                    width={'100%'}
                    height={'100%'}
                    src={String(shopImage2ImagePublicUrl)}
                    alt='Second slide'
                  />
                </Col>
              </Row>
            </div>
            <Table bordered className='mt10'>
              <tbody>
                {businessHoursText && <tr>
                  <td style={{backgroundColor: 'lightgray'}}>営業時間</td>
                  <td>{businessHoursText}</td>
                </tr>}
                {phoneNumber && <tr>
                  <td style={{backgroundColor: 'lightgray'}}>電話番号</td>
                  <td>{phoneNumber}</td>
                </tr>}
                <tr>
                  <td style={{backgroundColor: 'lightgray'}}>住所</td>
                  <td>〒152-0001 東京都渋谷区渋谷なんとかビル2A</td>
                </tr>
                {accessInfo && <tr>
                  <td style={{backgroundColor: 'lightgray'}}>交通案内</td>
                  <td>{accessInfo}</td>
                </tr>}
                {parkingLotGuidance && <tr>
                  <td style={{backgroundColor: 'lightgray'}}>駐車場</td>
                  <td>{parkingLotGuidance}</td>
                </tr>}
              </tbody>
            </Table>
          </Col>
          <Col lg={6}>
            <div className='mt10'>
              <Row>
                <Col>
                  <div className={shopStyles.description_text}>{description1}</div>
                </Col>
                <Col>
                  <img
                    width={'100%'}
                    height={'100%'}
                    src={String(shopImage2ImagePublicUrl)}
                    alt='Second slide'
                  />
                </Col>
              </Row>
            </div>
            <div className='mt10'>
              <Row>
                <Col>
                  <div className={shopStyles.description_text}>{description2}</div>
                </Col>
                <Col>
                  <img
                    width={'100%'}
                    height={'100%'}
                    src={String(shopImage2ImagePublicUrl)}
                    alt='Second slide'
                  />
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
      <Container>
        {reserveFrameInfo && <div style={{padding: '30px'}}>
          <hr />
          <div>
            <p><span className={shopStyles.section_headline}>予約メニュー</span></p>
          </div>
          <Row className=''>
            {reserveFrameInfo.map((r, i) => {
              return (
                <Col lg={3} md={6} sm={6} key={i}>
                  <Card>
                    <Card.Img
                      variant="top"
                      src={r.image1_public_url} />
                    <Card.Body>
                      <div className={shopStyles.title_text}>{r.title}</div>
                      <div className={shopStyles.description_text}>{r.description}</div>
                      <div className='text-center'>
                        <a
                          href={r.url}
                          style={{backgroundColor: '#B2384E', borderColor: '#B2384E'}}
                          className='btn btn-primary mt30'>
                          予約に進む
                        </a>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              )
            })}
          </Row>
        </div>}

        {monthlyPatmentPlanInfo && <div style={{padding: '30px'}}>
          <hr />
          <div>
            <p><span className={shopStyles.section_headline}>月額サブスクリプション</span></p>
          </div>
          <Row>
            {monthlyPatmentPlanInfo.map((m, i) => {
              return (
                <Col  lg={3} md={6} sm={6} key={i}>
                  <Card>
                    <Card.Img
                      variant="top"
                      src={m.image1_public_url} />
                    <Card.Body>
                      <div className={shopStyles.title_text}>{m.name}</div>
                      <div className={shopStyles.description_text}>{m.description}</div>
                      <div className='text-center'>
                        <a
                          href={m.url}
                          style={{backgroundColor: '#B2384E', borderColor: '#B2384E'}}
                          className='btn btn-primary mt30'>
                          もっと見る
                        </a>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              )
            })}
          </Row>
        </div>}
        {ticketMasterInfo && <div style={{padding: '30px'}}>
          <hr />
          <div>
            <p><span className={shopStyles.section_headline}>回数券</span></p>
          </div>
            <Row>
              {ticketMasterInfo.map((t, i) => {
                return (
                  <Col lg={3} md={6} sm={6} key={i}>
                    <Card>
                      <Card.Img
                        variant="top"
                        src={t.image1_public_url} />
                      <Card.Body>
                        <div className={shopStyles.title_text}>{t.name}</div>
                        <div className={shopStyles.description_text}>{t.description}</div>
                        <div className='text-center'>
                          <a
                            href={t.url}
                            style={{backgroundColor: '#B2384E', borderColor: '#B2384E'}}
                            className='btn btn-primary mt30'>
                            もっと見る
                          </a>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                )
              })}
            </Row>
          </div>}
        {productInfo && <div style={{padding: '30px'}}>
          <hr />
          <div>
            <p><span className={shopStyles.section_headline}>商品一覧</span></p>
          </div>
          <Row>
            {productInfo.map((p, i) => {
              return (
                <Col lg={3} md={6} sm={6} key={i}>
                  <Card>
                    <Card.Img
                      variant="top"
                      src={p.image1_public_url} />
                    <Card.Body>
                      <div className={shopStyles.title_text}>{p.name}</div>
                      <div className={shopStyles.description_text}>{p.description}</div>
                      <div className='text-center'>
                        <a
                          href={p.url}
                          style={{backgroundColor: '#B2384E', borderColor: '#B2384E'}}
                          className='btn btn-primary mt30'>
                          もっと見る
                        </a>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              )
            })}
          </Row>
        </div>}
      </Container>
    </>
  )
}

export default ShopPageTemplate
