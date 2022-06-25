import { TextImageBlockStateType } from '../../types/TextImageBlockStateType'
import { Row, Col } from 'react-bootstrap'

type propType = {
  blockState: TextImageBlockStateType
}

const TextImageBlock = (props: propType): JSX.Element => {
  return (
    <Row className='mt10 mb10'>
      <Col>
        <h2>{props.blockState.title}</h2>
        <div>
          {props.blockState.text}
        </div>
      </Col>
      <Col>
      <img
        className='d-block w-100'
        src={props.blockState.image}
        alt='image'
      />
      </Col>
    </Row>
  )
}

export default TextImageBlock
