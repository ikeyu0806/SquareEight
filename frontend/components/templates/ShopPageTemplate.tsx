import { Container, Carousel, Row, Col, Image } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { RootState } from 'redux/store'

const ShopPageTemplate = () => {
  const name = useSelector((state: RootState) => state.shop.name)
  const description1 = useSelector((state: RootState) => state.shop.description1)
  const pageCoverSlide1ImagePublicUrl = useSelector((state: RootState) => state.shop.pageCoverSlide1ImagePublicUrl)
  const pageCoverSlide2ImagePublicUrl = useSelector((state: RootState) => state.shop.pageCoverSlide2ImagePublicUrl)
  const pageCoverSlide3ImagePublicUrl = useSelector((state: RootState) => state.shop.pageCoverSlide3ImagePublicUrl)

  return (
    <>
      <Container>
        <div className='text-center' style={{marginTop: '100px', marginBottom: '100px'}}>
          <h1 className='mb50'>お店のキャッチコピー</h1>
          <img
              width={'100%'}
              height={'100%'}
              src={String(pageCoverSlide1ImagePublicUrl)}
              alt='First slide'
            />
        </div>
      </Container>
      <div style={{backgroundColor: '#E5E5E5', padding: '30px'}}>
        <Container>
          <Row>
            <Col sm={6}>
              {description1}
              ゴールドジムは世界30カ国・700カ所以上・300万人のメンバーを誇る世界最大級ネットワークのフィットネスクラブです。
            </Col>
            <Col sm={6}>
              <img
                width={'100%'}
                height={'100%'}
                src={String(pageCoverSlide1ImagePublicUrl)}
                alt='First slide'
              />
            </Col>
          </Row>
          <Row>
            <Col sm={6}>
              {description1}
            </Col>
            <Col sm={6}>
              <img
                width={'100%'}
                height={'100%'}
                src={String(pageCoverSlide1ImagePublicUrl)}
                alt='First slide'
              />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}

export default ShopPageTemplate
