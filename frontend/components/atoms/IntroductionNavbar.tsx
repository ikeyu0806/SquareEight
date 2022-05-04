import { Container, Navbar } from 'react-bootstrap'

const IntroductionNavbar = () => {
  return (
    <>
      <Navbar collapseOnSelect expand='lg'>
        <Container>
          <Navbar.Brand href='#home'>SmartLesson</Navbar.Brand>
        </Container>
      </Navbar>
    </>
  )
}
export default IntroductionNavbar
