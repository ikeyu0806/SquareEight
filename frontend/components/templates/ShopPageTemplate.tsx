import { Container, Carousel, Row, Col } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { RootState } from 'redux/store'

const ShopPageTemplate = () => {
  const name = useSelector((state: RootState) => state.shop.name)
  const pageCoverSlide1ImagePublicUrl = useSelector((state: RootState) => state.shop.pageCoverSlide1ImagePublicUrl)
  const pageCoverSlide2ImagePublicUrl = useSelector((state: RootState) => state.shop.pageCoverSlide2ImagePublicUrl)
  const pageCoverSlide3ImagePublicUrl = useSelector((state: RootState) => state.shop.pageCoverSlide3ImagePublicUrl)

  return (
    <>
      <Carousel>
        <Carousel.Item>
          <img
            className='d-block w-100'
            src={String(pageCoverSlide1ImagePublicUrl)}
            alt='First slide'
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className='d-block w-100'
            src={String(pageCoverSlide2ImagePublicUrl)}
            alt='Second slide'
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className='d-block w-100'
            src={String(pageCoverSlide3ImagePublicUrl)}
            alt='Third slide'
          />
        </Carousel.Item>
      </Carousel>
      <Container>
        <h1>{pageCoverSlide2ImagePublicUrl}{pageCoverSlide1ImagePublicUrl}</h1>
      </Container>
    </>
  )
}

export default ShopPageTemplate
