import { Container, Carousel, Row, Col, Image } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { RootState } from 'redux/store'

const ShopPageTemplate = () => {
  const name = useSelector((state: RootState) => state.shop.name)
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
          <h1 className='mb50'>{name}</h1>
          <img
              width={'100%'}
              height={'100%'}
              src={String(shopImage1ImagePublicUrl)}
              alt='First slide'
            />
        </div>
      </Container>
      <div style={{backgroundColor: '#E5E5E5', padding: '30px'}}>
        <Container>
          <Row>
            <Col sm={6}>
              {description1}
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
              {description2}
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
                  <div>{r.description}</div>
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
                  <div>{m.description}</div>
                  {m.price && <div>料金: ¥{m.price}</div>}
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
                  <div>{t.description}</div>
                  {t.price && <div>料金: ¥{t.price}</div>}
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
                  <div>{p.description}</div>
                  {p.price && <div>料金: ¥{p.price}</div>}
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
