import { Container, Carousel, Row, Col } from 'react-bootstrap'

const ShopPageTemplate = () => {
  return (
    <Container>
      <Carousel>
        <Carousel.Item>
          <img
            className='d-block w-100'
            src='https://square-eight-product-image-bucket-develop.s3.ap-northeast-1.amazonaws.com/meeting.jpg'
            alt='First slide'
          />
        </Carousel.Item>
        <Carousel.Item></Carousel.Item>
        <Carousel.Item></Carousel.Item>
      </Carousel>
    </Container>
  )
}

export default ShopPageTemplate
