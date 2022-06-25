import { ImageSlideState } from '../../types/ImageSlideState'
import { Carousel } from 'react-bootstrap'

type propType = {
  blockState: ImageSlideState
}

const ImageSlideBlock = (props: propType): JSX.Element => {
  return (
    <Carousel>
      {props.blockState.imageSlide != undefined && props.blockState.imageSlide.map((slide, i) => {
        return (
          <Carousel.Item key={i}>
            <img
              className='d-block w-100'
              src={slide.image}
              alt={slide + String(i)}
            />
            <Carousel.Caption>
              <h3>{slide.title}</h3>
              <p>{slide.text}</p>
            </Carousel.Caption>
          </Carousel.Item>
        )
      })}
    </Carousel>
  )
}

export default ImageSlideBlock
