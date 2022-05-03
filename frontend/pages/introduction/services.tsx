import type { NextPage } from 'next'
import ServiceTemplate from '../../components/templates/ServiceTemplate'
import { Container,
         Navbar } from 'react-bootstrap'

const Service: NextPage = () => {
  return (
    <>
      <Navbar collapseOnSelect expand='lg'>
        <Container>
          <Navbar.Brand href='#home'>SmartLesson</Navbar.Brand>
        </Container>
      </Navbar>
      <ServiceTemplate/>
    </>
  )
}

export default Service
