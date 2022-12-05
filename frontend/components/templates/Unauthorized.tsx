import { Container, Row, Col } from 'react-bootstrap'

const Unauthorized = () => {
  return (
    <Container>
      <div className='text-center'>
        <div className='font-size-100'>401</div>
        <div className='font-size-50'>Unauthorized</div>
      </div>
    </Container>
  )
}

export default Unauthorized
