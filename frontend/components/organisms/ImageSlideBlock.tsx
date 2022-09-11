import { ImageSlideChild } from 'interfaces/PageContentState'
import { Carousel } from 'react-bootstrap'

type propType = {
  atomState: ImageSlideChild[]
}

const ImageSlideBlock = (props: propType): JSX.Element => {
  return (
    <Carousel>
      {props.atomState != undefined && props.atomState.map((slide, i) => {
        return (
          <Carousel.Item key={i}>
            <img
              className='d-block w-100'
              src={slide.image}
              alt={slide + String(i)}
            />
            <Carousel.Caption>
              <h3 className={slide.imageSlideTextColor}>{slide.title}</h3>
              <p className={slide.imageSlideTextColor}>{slide.text}</p>
            </Carousel.Caption>
          </Carousel.Item>
        )
      })}
    </Carousel>
  )
}

export default ImageSlideBlock
