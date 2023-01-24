import { Container, Carousel, Row, Col, Image } from 'react-bootstrap'
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
  const reserveFrameInfo = useSelector((state: RootState) => state.shop.reserveFrameInfo)
  const monthlyPatmentPlanInfo = useSelector((state: RootState) => state.shop.monthlyPatmentPlanInfo)
  const ticketMasterInfo = useSelector((state: RootState) => state.shop.ticketMasterInfo)
  const productInfo = useSelector((state: RootState) => state.shop.productInfo)

  return (
    <>
      <Container>
        <div className='text-center' style={{marginTop: '100px', marginBottom: '100px'}}>
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
      </Container>
      <div style={{backgroundColor: '#E5E5E5', padding: '30px'}}>
        <Container>
          <Row>
            <Col sm={6}>
              <div className={shopStyles.description_text}>{description1}</div>
            </Col>
            <Col sm={6}>
              <img
                width={'100%'}
                height={'100%'}
                src={String(shopImage2ImagePublicUrl)}
                alt='Second slide'
              />
            </Col>
          </Row>
          &nbsp;
          <Row>
            <Col sm={6}>
              <div className={shopStyles.description_text}>{description2}</div>
            </Col>
            <Col sm={6}>
              <img
                width={'100%'}
                height={'100%'}
                src={String(shopImage3ImagePublicUrl)}
                alt='Third slide'
              />
            </Col>
          </Row>
        </Container>
      </div>
      {reserveFrameInfo && <div style={{backgroundColor: 'white', padding: '30px'}}>
        <div className='text-center mt20 mb50'>
          <h2>予約メニュー</h2>
        </div>
        {reserveFrameInfo.map((r, i) => {
          return (
            <div key={i}>
              <Row>
                <Col>
                  <img
                    width={'100%'}
                    height={'100%'}
                    src={String(r.image1_public_url)}
                    alt='ReserveFrame slide'
                  />
                </Col>
                <Col>
                  <div className={shopStyles.title_text}>{r.title}</div>
                  <div className={shopStyles.description_text}>{r.description}</div>
                  <a
                    href={r.url}
                    className='btn btn-primary mt30'>
                    予約に進む
                  </a>
                </Col>
              </Row>
              &nbsp;
            </div>
          )
        })}
      </div>}
      {monthlyPatmentPlanInfo && <div style={{backgroundColor: '#E5E5E5', padding: '30px'}}>
        <div className='text-center mt20 mb50'>
          <h2>月額サブスクリプション</h2>
        </div>
        {monthlyPatmentPlanInfo.map((m, i) => {
          return (
            <div key={i}>
              <Row>
                <Col>
                  <img
                    width={'100%'}
                    height={'100%'}
                    src={String(m.image1_public_url)}
                    alt='ReserveFrame slide'
                  />
                </Col>
                <Col>
                <div className={shopStyles.title_text}>{m.name}</div>
                <div className={shopStyles.description_text}>{m.description}</div>
                  {m.price && <div className={shopStyles.description_text}>料金: ¥{m.price}</div>}
                  <a
                    href={m.url}
                    className='btn btn-primary mt30'>
                    もっと見る
                  </a>
                </Col>
              </Row>
              &nbsp;
            </div>
          )
        })}
      </div>}
      {ticketMasterInfo && <div style={{backgroundColor: 'white', padding: '30px'}}>
        <div className='text-center mt20 mb50'>
          <h2>回数券</h2>
        </div>
        {ticketMasterInfo.map((t, i) => {
          return (
            <div key={i}>
              <Row>
                <Col>
                  <img
                    width={'100%'}
                    height={'100%'}
                    src={String(t.image1_public_url)}
                    alt='ReserveFrame slide'
                  />
                </Col>
                <Col>
                  <div className={shopStyles.title_text}>{t.name}</div>
                  <div className={shopStyles.description_text}>{t.description}</div>
                  {t.price && <div className={shopStyles.description_text}>料金: ¥{t.price}</div>}
                  <a
                    href={t.url}
                    className='btn btn-primary mt30'>
                    もっと見る
                  </a>
                </Col>
              </Row>
              &nbsp;
            </div>
          )
        })}
      </div>}
      {productInfo && <div style={{backgroundColor: '#E5E5E5', padding: '30px'}}>
        <div className='text-center mt20 mb50'>
          <h2>物販商品</h2>
        </div>
        {productInfo.map((p, i) => {
          return (
            <div key={i}>
              <Row>
                <Col>
                  <img
                    width={'100%'}
                    height={'100%'}
                    src={String(p.image1_public_url)}
                    alt='Product slide'
                  />
                </Col>
                <Col>
                  <div className={shopStyles.title_text}>{p.name}</div>
                  <div className={shopStyles.description_text}>{p.description}</div>
                  {p.price && <div className={shopStyles.description_text}>料金: ¥{p.price}</div>}
                  <a
                    href={p.url}
                    className='btn btn-primary mt30'>
                    もっと見る
                  </a>
                </Col>
              </Row>
              &nbsp;
            </div>
          )
        })}
      </div>}
    </>
  )
}

export default ShopPageTemplate
