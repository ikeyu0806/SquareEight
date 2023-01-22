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
                alt='First slide'
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
