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
        <Row>
          <Col sm={4}>
            {description1}
          </Col>
          <Col sm={8}>
            <img
              width={'100%'}
              height={'100%'}
              src={String(pageCoverSlide1ImagePublicUrl)}
              alt='First slide'
            />
          </Col>
        </Row>

        <Row>
          <Col sm={4}>
            {description1}
          </Col>
          <Col sm={8}>
            <img
              width={'100%'}
              height={'100%'}
              src={String(pageCoverSlide1ImagePublicUrl)}
              alt='First slide'
            />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default ShopPageTemplate
