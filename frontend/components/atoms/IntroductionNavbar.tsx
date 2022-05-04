import { Container, Navbar } from 'react-bootstrap'

const IntroductionNavbar = () => {
  return (
    <>
      <Navbar collapseOnSelect expand='lg'>
        <Container>
          <Navbar.Brand href='/'>SmartLesson</Navbar.Brand>
        </Container>
      </Navbar>
    </>
  )
}
export default IntroductionNavbar
